import NextAuth from "next-auth"
import { UserRole } from "@prisma/client";
import { PrismaAdapter } from "@auth/prisma-adapter";

import { db } from "@/lib/db";
import authConfig from "@/auth.config";
import { getUserById } from "@/data/user";
import { getTwoFactorConfirmationByUserId } from "@/data/two-factor-confirmation";
import { getAccountByUserId } from "./data/account";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
  update,
} = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() }
      })
    }
  },
  callbacks: {
    async signIn({ user, account }) {
      // Allow OAuth without email verification
      if (account?.provider !== "credentials") return true;

      const existingUser = await getUserById(user.id);

      // Prevent sign in without email verification
      if (!existingUser?.emailVerified) return false;

      if (existingUser.isTwoFactorEnabled) {
        const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id);

        if (!twoFactorConfirmation) return false;

        // Delete two factor confirmation for next sign in
        await db.twoFactorConfirmation.delete({
          where: { id: twoFactorConfirmation.id }
        });
      }

      return true;
    },
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
      }

      if (session.user) {
        session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;
      }

      if (session.user) {
            session.user.firstName        = token.firstName as string;
            session.user.middleName       = token.middleName as string;
            session.user.lastName         = token.lastName as string;
            session.user.gender           = token.gender as string;
            session.user.dateOfBirth      = token.dateOfBirth as string;
            session.user.bloodGroup      = token.bloodGroup as string;
            session.user.telePhone        = token.telePhone as string;

            session.user.currentAddress   = token.currentAddress as string;
            session.user.cityName         = token.cityName as string;
            session.user.country          = token.country as string;
            session.user.pinCode          = token.pinCode as string;

            session.user.parentFirstName    = token.parentFirstName as string;
            session.user.parentMiddleName   = token.parentMiddleName as string;
            session.user.parentLastName     = token.parentLastName as string;
            session.user.parentGender       = token.parentGender as string;
            session.user.parentDateOfBirth  = token.parentDateOfBirth as string;
            session.user.parentBloodGroup  = token.parentBloodGroup as string;
            session.user.parentTelePhone    = token.parentTelePhone as string;
            session.user.parentEmail        = token.parentEmail as string;
            session.user.parentEducation    = token.parentEducation as string;
            session.user.parentProfession   = token.parentProfession as string;

            session.user.email = token.email as string;

            // Identification 
            session.user.typeOfIdentificationCard = token.typeOfIdentificationCard as string;
            session.user.identificationCardNumber = token.identificationCardNumber as string;
            session.user.identificationFile       = token.identificationFile as string;

            session.user.image = token.image as string;
            session.user.isOAuth = token.isOAuth as boolean;
      }

      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      const existingAccount = await getAccountByUserId(
        existingUser.id
      );

      token.isOAuth = !!existingAccount;
      token.firstName  = existingUser.firstName;
      token.middleName = existingUser.middleName;
      token.lastName  = existingUser.lastName; 
      token.gender = existingUser.gender
      token.dateOfBirth = existingUser.dateOfBirth;
      token.bloodGroup = existingUser.bloodGroup;
      token.telePhone = existingUser.telePhone;

      token.currentAddress = existingUser.currentAddress;
      token.cityName = existingUser.cityName;
      token.country = existingUser.country;
      token.pinCode = existingUser.pinCode;

      token.parentFirstName = existingUser.cityName;
      token.parentMiddleName = existingUser.parentMiddleName;
      token.parentLastName = existingUser.parentLastName;
      token.parentGender = existingUser.parentGender;
      token.parentDateOfBirth = existingUser.parentDateOfBirth;
      token.parentBloodGroup = existingUser.parentBloodGroup;
      token.parentTelePhone = existingUser.parentTelePhone;
      token.parentEmail = existingUser.parentEmail;
      token.parentEducation = existingUser.parentEducation;
      token.parentProfession = existingUser.parentProfession;

      token.email = existingUser.email;
      token.role = existingUser.role;
      token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;

      token.typeOfIdentificationCard = existingUser.typeOfIdentificationCard;
      token.identificationCardNumber = existingUser.identificationCardNumber;
      token.identificationFile = existingUser.identificationFile;

      token.image = existingUser.image;

      return token;
    }
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
