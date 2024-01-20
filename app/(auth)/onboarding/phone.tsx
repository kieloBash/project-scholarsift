"use client";
import React, { useState } from "react";
import pic1 from "@/public/onboard/1.svg";
import pic2 from "@/public/onboard/2.svg";
import pic3 from "@/public/onboard/3.svg";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import { createUser } from "@/lib/actions/user.action";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

const TABS = [
  {
    head: "The Best Scholarship Finder.",
    p: "Find the best suited university to help you on your college.",
    image: pic1,
  },
  {
    head: `Explore Certified Universities.`,
    p: "prepare, join, and explore our trusted universities.",
    image: pic2,
  },
  {
    head: `Thank you!`,
    p: "Goodluck on your future Graduation!",
    image: pic3,
  },
];
const PhoneComponent = () => {
  const [selected, setSelected] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const { user } = useUser();

  async function handleComplete() {
    if (!user) return null;
    setIsLoading(true);
    const res = await createUser({
      email: user.primaryEmailAddress?.emailAddress || "",
      name: user.fullName || "",
      role: "Student",
      phone: user.primaryPhoneNumber?.phoneNumber,
      profilePic: user.imageUrl,
    });
    if (res) {
      setIsLoading(false);
      console.log("Success");
      router.push("/dashboard");
    } else {
      setIsLoading(false);
      console.log("Retry");
    }
  }

  return (
    <div className="relative gap-12 bg-white w-full max-w-sm border-[6px] shadow-xl rounded-[2rem] border-black h-full flex flex-col justify-center items-center px-8 py-8">
      <div className="w-5 h-5 rounded-full absolute -translate-x-1/2 left-1/2 top-4 bg-black border border-gray-800 shadow-md" />
      <div className="w-full h-full flex flex-col gap-8 py-4">
        <div className="relative overflow-hidden w-full h-full">
          <Image src={TABS[selected].image} fill alt="1" />
        </div>
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl text-center font-medium text-main-default">
            {TABS[selected].head}
          </h1>
          <p className="text-center text-base text-muted-foreground">
            {TABS[selected].p}
          </p>
        </div>
      </div>
      <div className="flex-1 flex flex-col justify-end">
        {TABS.length - 1 === selected ? (
          <>
            <Button
              type="button"
              disabled={isLoading}
              onClick={handleComplete}
              className="text-xl font-bold h-14 rounded-2xl px-20"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                "Get Started"
              )}
            </Button>
          </>
        ) : (
          <>
            <Button
              type="button"
              onClick={() => setSelected((prev) => prev + 1)}
              className="text-xl font-bold h-14 rounded-2xl px-20"
            >
              Next
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default PhoneComponent;
