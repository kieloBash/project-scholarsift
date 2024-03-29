import React from "react";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { existingUser } from "@/lib/actions/user.action";
import OnboardingComponent from "./component";

const OnBoardingPage = async () => {
  const user = await currentUser();

  if (!user) redirect("/");

  const existing = await existingUser({
    email: user.emailAddresses[0].emailAddress,
  });

  if (existing) redirect("/dashboard");

  return (
    <main className="bg-gradient-to-r from-cyan-500 to-blue-500 w-full h-screen overflow-hidden flex justify-center items-center flex-col relative py-12 text-white gap-8">
      <OnboardingComponent />
    </main>
  );
};

export default OnBoardingPage;
