import { SchoolModel } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const { q: query } = req.query;

      if (typeof query !== "string") {
        throw new Error("Invalid request");
      }

      /**
       * Search posts
       */
      const schools: Array<SchoolModel> = await db.schoolModel.findMany({
        where: {
          OR: [
            {
              schoolName: {
                contains: query,
                mode: "insensitive",
              },
            },
            {
              author: {
                firstName: {
                  contains: query,
                  mode: "insensitive",
                },
              },
            },
          ],
        },
        include: {
          author: true,
        },
      });

      /**
       * Save search
       */
      await db.searchQuery.create({
        data: {
          query,
        },
      });

      res.status(200).json({ schools });
    } catch (error: any) {
      console.log(error);
      res.status(500).end();
    }
  }
}
