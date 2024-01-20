"use client";

import React from "react";
import {
  ChevronDown,
  FilePlus,
  Heart,
  LayoutDashboard,
  LogOut,
  Paperclip,
  School2Icon,
  User,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import useWebUser from "@/lib/hooks/useWebUser";

const ProfileBar = ({ name }: { name: string }) => {
  const { signOut } = useClerk();
  const router = useRouter();

  const { data: userInfo } = useWebUser();

  if (!userInfo) return null;

  console.log(userInfo);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button type="button">
          <div className="flex gap-2 justify-center items-center">
            <p className="font-medium">Hello, {name}</p>
            <ChevronDown className="w-4 h-4" />
          </div>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 mr-4">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {userInfo.role === "Student" ? (
          <>
            <Link href={"/profile"}>
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
            </Link>
            <Link href={"/my-favorites"}>
              <DropdownMenuItem>
                <Heart className="mr-2 h-4 w-4" />
                <span>My Favorites</span>
              </DropdownMenuItem>
            </Link>
          </>
        ) : (
          <>
            {userInfo?.benefactorInfo?.approved ? (
              <>
                <Link href={"/dashboard"}>
                  <DropdownMenuItem>
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    <span>Admin Dashboard</span>
                  </DropdownMenuItem>
                </Link>
                <Link href={"/school-profile"}>
                  <DropdownMenuItem>
                    <School2Icon className="mr-2 h-4 w-4" />
                    <span>Edit School Profile</span>
                  </DropdownMenuItem>
                </Link>
                <Link href={"/add-scholarship"}>
                  <DropdownMenuItem>
                    <FilePlus className="mr-2 h-4 w-4" />
                    <span>Add Scholarship</span>
                  </DropdownMenuItem>
                </Link>
              </>
            ) : (
              <>
                <Link href={"/view-documents"}>
                  <DropdownMenuItem>
                    <Paperclip className="mr-2 h-4 w-4" />
                    <span>View Status Documents</span>
                  </DropdownMenuItem>
                </Link>
              </>
            )}
          </>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut(() => router.push("/"))}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileBar;
