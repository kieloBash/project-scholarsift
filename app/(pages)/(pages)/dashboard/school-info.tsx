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
import { Loader2, MapPinIcon, Plus } from "lucide-react";
import { SchoolDialogModal } from "./school-dialog";
import { Label } from "@/components/ui/label";

const SchoolInfoCard = () => {
  const { data: userInfo, isLoading } = useWebUser();

  if (isLoading)
    return (
      <Card className="w-full h-full">
        <CardContent className="flex justify-center items-center w-full h-full">
          <Loader2 className="w-5 h-5 animate-spin" />
        </CardContent>
      </Card>
    );

  if (!userInfo?.benefactorInfo?.approved)
    window.location.assign("/view-documents");

  if (!userInfo?.benefactorInfo?.university)
    return (
      <Card className="w-full h-full justify-center items-center gap-2 overflow-hidden">
        <SchoolDialogModal />
      </Card>
    );

  return (
    <Card className="w-full h-full p-4">
      <CardHeader>
        <CardTitle>{userInfo.benefactorInfo.university.name}</CardTitle>
        <CardDescription className="flex justify-start items-center">
          <MapPinIcon className="w-5 h-5 mr-2" />
          {userInfo.benefactorInfo.university.address}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <Label className="ml-2">Scholarships</Label>
        <div className="w-full grid grid-flow-row grid-cols-4 gap-4 p-2">
          {/* {Array(2)
          .fill([])
          .map((_, index) => {
            return (
              <div
                className="w-full rounded-lg bg-black h-[10rem]"
                key={index}
              ></div>
            );
          })} */}
          <button
            type="button"
            className="w-full rounded-lg flex justify-center items-center h-[10rem] border border-black hover:bg-slate-50 bg-transparent transition"
          >
            <Plus className="w-6 h-6" />
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SchoolInfoCard;
