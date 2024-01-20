"use client";
import React from "react";

// UI
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useWebUser from "@/lib/hooks/useWebUser";
import { Heart, Loader2, Trophy, User } from "lucide-react";

const InsightsCard = () => {
  const { data: userInfo, isLoading } = useWebUser();
  console.log(userInfo);

  if (isLoading)
    return (
      <Card className="w-full h-[20rem]">
        <CardContent className="flex justify-center items-center w-full h-full">
          <Loader2 className="w-5 h-5 animate-spin" />
        </CardContent>
      </Card>
    );
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Insights</CardTitle>
        <CardDescription>Here are a few insights to look for:</CardDescription>
      </CardHeader>
      <CardContent className="text-sm flex flex-col gap-2">
        <div className="flex gap-2">
          <User className="w-5 h-5" />
          <span className="font-bold">Visits:</span>
          <div className="ml-2">{userInfo?.benefactorInfo?.visits}</div>
        </div>
        <div className="flex gap-2">
          <Heart className="w-5 h-5" />
          <span className="font-bold">Favorites:</span>
          <div className="ml-2">{userInfo?.benefactorInfo?.favorites}</div>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Trophy className="w-5 h-5" />
          <span className="font-bold">Most Viewed Scholarship:</span>
          <div className="ml-2">{""}</div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InsightsCard;
