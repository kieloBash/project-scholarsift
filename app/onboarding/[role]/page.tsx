"use client";
import React, { FormEvent, useState } from "react";

import { PageProps } from "@/lib/interface/page.props";
import { useUser } from "@clerk/nextjs";
import { createUser } from "@/lib/actions/user.action";

// FORM
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

// UI
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

const schema = z.object({
  phone: z.string().length(11, {
    message: "Phone number should be exactly 11 characters long",
  }),
  staffId: z.string(),
  staffIdPic: z.string(),
});

const OnboardingRole = ({ params }: PageProps) => {
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      phone: "",
      staffId: "",
      staffIdPic: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof schema>) {
    if (!user) return null;

    const res = await createUser({
      email: user.emailAddresses[0].emailAddress || "",
      name: user.fullName || "",
      role: "Benefactor",
      profilePic: user.imageUrl,

      phone: values.phone,
      staffID: values.staffId,
      staffIDPic: values.staffIdPic,
    });

    if (res) {
      form.reset();
      window.location.assign("/dashboard");
    }
  }

  if (params.role === "Student") window.location.assign("/dashboard");

  return (
    <main className="bg-gradient-to-r from-cyan-500 to-blue-500 w-full h-screen overflow-hidden flex justify-center items-center flex-col relative py-12 gap-8">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4 w-full max-w-lg bg-white p-10 rounded-2xl"
        >
          <div className="flex flex-col mb-4">
            <Label className="text-xl">Verification Information</Label>
            <p className="text-sm text-muted-foreground">
              {`Please fill up all the informations below. We'll let you know if
              your account is verified.`}
            </p>
          </div>
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Ex. 09xx" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="staffId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Staff ID Number</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Staff ID Number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="staffIdPic"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Staff ID Picture</FormLabel>
                <FormControl>
                  <Input type="file" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="mt-4"
            disabled={
              form.watch("phone") === "" ||
              form.watch("staffId") === "" ||
              form.watch("staffIdPic") === "" ||
              isLoading
            }
          >
            Submit
            {isLoading && <Loader2 className="w-5 h-5 animate-spin ml-2" />}
          </Button>
        </form>
      </Form>
    </main>
  );
};

export default OnboardingRole;
