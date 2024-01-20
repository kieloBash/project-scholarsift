"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { Button } from "../ui/button";
import { useUser } from "@clerk/nextjs";
import ProfileBar from "./profile";

const MainNavbar = () => {
  const pathname = usePathname();
  const { user } = useUser();
  const NavLinks = [
    { label: "Scholarship Search", href: "/scholarship-search" },
    { label: "Schools", href: "/schools" },
    { label: "ChatBot", href: "/chatbot" },
    { label: "About Us", href: "/about-us" },
    { label: "Contact Us", href: "/contact-us" },
  ];

  return (
    <nav className="w-full h-20 z-[10] bg-white px-10 flex justify-between items-center fixed top-0 shadow-sm">
      <Link href={"/"}>
        <div className="font-bold text-lg">
          Scholar<span className="text-main-default">Sift</span>
        </div>
      </Link>
      <ul className="flex gap-4 justify-center items-center">
        {NavLinks.map((nav) => {
          const isActive =
            (pathname.includes(nav.href) && nav.href.length > 1) ||
            pathname === nav.href;
          return (
            <Link key={nav.label} href={nav.href}>
              <li
                className={`text-sm transition ${
                  isActive
                    ? "text-main-default font-semibold"
                    : "text-muted-foreground hover:underline underline-offset-[4px]"
                }`}
              >
                {nav.label}
              </li>
            </Link>
          );
        })}

        <div className="flex ml-4">
          {user ? (
            <ProfileBar name={user.firstName || ""} />
          ) : (
            <>
              <div className="flex gap-2">
                <Link href={"/sign-in"}>
                  <Button variant={"outline"}>Log In</Button>
                </Link>
                <Link href={"/sign-up"}>
                  <Button>Sign Up</Button>
                </Link>
              </div>
            </>
          )}
        </div>
      </ul>
    </nav>
  );
};

export default MainNavbar;
