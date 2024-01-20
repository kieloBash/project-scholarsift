"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

// UI
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { createSchool } from "@/lib/actions/user.action";
import useWebUser from "@/lib/hooks/useWebUser";
import { Loader2 } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "name must be at least 2 characters.",
  }),
  address: z.string().min(2, {
    message: "address must be at least 2 characters.",
  }),
  description: z.string().min(2, {
    message: "description must be at least 2 characters.",
  }),
});

export function AddSchoolForm({ close }: { close: () => void }) {
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();
  const { data: userInfo } = useWebUser();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      address: "",
      description: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!userInfo) return null;
    setIsLoading(true);

    const res = await createSchool({
      name: values.name,
      address: values.address,
      description: values.description,
      photo: "",
      benefactorId: userInfo.benefactorInfo?.id || "",
    });

    if (res) {
      setIsLoading(false);
      queryClient.invalidateQueries({
        queryKey: [`user`],
      });
      close();
    } else {
      console.log("Error");
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4 mt-6"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>School Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="De La Salle-College of Saint Benilde"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>School Address</FormLabel>
              <FormControl>
                <Input placeholder="Address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading}>
          Save Changes
          {isLoading && <Loader2 className="w-5 h-5 animate-spin ml-2" />}
        </Button>
      </form>
    </Form>
  );
}
