"use client";
import React, { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PageProps } from "@/lib/interface/page.props";
import { useUser } from "@clerk/nextjs";
import { createUser } from "@/lib/actions/user.action";
import { Role } from "@prisma/client";

const OnboardingRole = ({ params }: PageProps) => {
  const [contact, setContact] = useState("");
  const { user } = useUser();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!user || contact === "") return null;
    console.log(contact);

    const res = await createUser({
      email: user.emailAddresses[0].emailAddress || "",
      name: user.fullName || "",
      role: params.role as Role,
      phone: contact,
      profilePic: user.imageUrl,
    });

    console.log(res);

    if (res) {
      window.location.assign("/dashboard");
    }
  }

  if (params.role === "Student") window.location.assign("/dashboard");

  return (
    <main className="bg-gradient-to-r from-cyan-500 to-blue-500 w-full h-screen overflow-hidden flex justify-center items-center flex-col relative py-12 text-white gap-8">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md text-black">
        <header className="">
          <h1 className="text-xl font-semibold mb-2">Contact Number</h1>
          <p className="text-sm">
            Before we proceed, tell us your contact number so we can contact you
            right away with the latest updates.
          </p>
        </header>
        <main className="w-full mt-8">
          <form className="flex gap-2 w-full" onSubmit={handleSubmit}>
            <Input
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              type="input"
              placeholder="Ex. 09xxx"
            />
            <Button type="submit">Confirm</Button>
          </form>
        </main>
      </div>
    </main>
  );
};

export default OnboardingRole;
