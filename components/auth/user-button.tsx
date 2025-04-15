"use client";

import { FaBuilding, FaUser, FaUsers } from "react-icons/fa";
import { ExitIcon } from "@radix-ui/react-icons"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/avatar";
import { useCurrentUser } from "@/hooks/use-current-user";
import { LogoutButton } from "@/components/auth/logout-button";
import { FcLineChart, FcSettings } from "react-icons/fc";
import Link from "next/link";
import { FaCircleUser, FaUsersLine } from "react-icons/fa6";

export const UserButton = () => {
  const user = useCurrentUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={user?.image || ""} />
          <AvatarFallback className="bg-sky-500">
            <FaUser className="text-white" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80" align="end">
        <DropdownMenuItem>
          <Link href="/server" className="flex justify-items-center">
              <FaUser className="h-6 w-4 mr-2"/>
               My Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="/my-schools" className="flex justify-items-center">
              <FaBuilding className="h-6 w-4 mr-2"/>
                  My Schools
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="/my-open-registrations" className="flex justify-items-center">
              <FcLineChart className="h-6 w-4 mr-2"/>
                Open Registrations
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="/admition-request" className="flex justify-items-center">
              <FaUsersLine className="h-6 w-4 mr-2"/>
              Admition Request
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="/settings" className="flex justify-items-center">
            <FcSettings className="h-6 w-4 mr-2"/>
            Settings
          </Link>
        </DropdownMenuItem>
        <LogoutButton>
          <DropdownMenuItem>
            <ExitIcon className="h-6 w-4 mr-2" />
            Logout
          </DropdownMenuItem>
        </LogoutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
