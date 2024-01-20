"use client";
import React, { useState } from "react";

// UI
import { Label } from "@/components/ui/label";
import { ArrowRight, GraduationCap, Loader2, School } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { createUser } from "@/lib/actions/user.action";
import { useUser } from "@clerk/nextjs";

const OnboardingComponent = () => {
  const [role, setRole] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUser();

  async function handleCreateStudent() {
    if (!user) return null;

    const res = await createUser({
      email: user.emailAddresses[0].emailAddress || "",
      name: user?.fullName || "",
      role: "Student",
      profilePic: user.imageUrl,
    });

    if (res) {
      window.location.assign("/dashboard");
    }
  }
  return (
    <>
      <h1 className="text-4xl font-bold">Signing up as</h1>
      <div className="text-black flex justify-center items-center w-full">
        <div className="grid grid-cols-2 gap-8 w-full h-[20rem] max-w-2xl">
          {[
            { lbl: "Student", icon: GraduationCap, value: "Student" },
            { lbl: "School Admin", icon: School, value: "Admin" },
          ].map((choice, index) => {
            const active =
              choice.lbl.includes(role) && role !== ""
                ? "border-black bg-white"
                : "bg-white hover:bg-slate-100 border-muted";
            return (
              <button
                key={index}
                type="button"
                onClick={() => setRole(choice.value)}
                className={`${active} p-10 flex-col cursor-pointer w-full h-full transition rounded-lg border-2 flex justify-center items-center`}
              >
                <div id={choice.lbl} className="peer sr-only" />
                <Label
                  htmlFor={choice.lbl}
                  className="flex flex-col items-center justify-between p-10 cursor-pointer text-lg"
                >
                  <choice.icon className="mb-3 h-16 w-16" />
                  {choice.lbl}
                </Label>
              </button>
            );
          })}
        </div>
      </div>
      <div className="flex justify-center items-center h-32 w-full">
        {role === "Student" ? (
          <>
            <Button
              disabled={isLoading}
              type="button"
              variant={"secondary"}
              className="text-xl h-14 px-6"
              onClick={handleCreateStudent}
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  Get Started <ArrowRight className="ml-2 w-6 h-6" />
                </>
              )}
            </Button>
          </>
        ) : (
          <>
            <Link href={`/onboarding/${role}`}>
              <Button
                disabled={role === "" || isLoading}
                type="button"
                variant={"secondary"}
                className="text-xl h-14 px-6"
                onClick={() => setIsLoading(true)}
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    Get Started <ArrowRight className="ml-2 w-6 h-6" />
                  </>
                )}
              </Button>
            </Link>
          </>
        )}
      </div>
    </>
  );
};

export default OnboardingComponent;
