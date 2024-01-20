"use client";

import { useUser } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import { existingUser } from "../actions/user.action";

const useWebUser = () => {
  const { user } = useUser();
  const { data, isLoading } = useQuery({
    enabled: user !== undefined,
    queryKey: [`user`, user],
    queryFn: async () => {
      const data = await existingUser({
        email: user?.emailAddresses[0].emailAddress || "",
      });
      return data;
    },
  });
  return { data, isLoading };
};

export default useWebUser;
