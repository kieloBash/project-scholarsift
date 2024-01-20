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
import { Button } from "@/components/ui/button";
import Link from "next/link";

const ViewStatusDocumentsPage = () => {
  return (
    <Card className="w-full max-w-2xl p-4 text-center">
      <CardHeader className="mb-4">
        <CardTitle className="text-4xl">Files have been uploaded!</CardTitle>
        <CardDescription>
          We appreciate your patience during this approval process.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <p>
          <span className="font-bold">ScholarSift</span> is committed to
          maintaining the highest standards to provide accurate and reliable
          information to our users.
        </p>
        <p>
          By carefully reviewing and approving submissions, we aim to ensure the
          integrity of our platform and the scholarships offered.
        </p>
      </CardContent>
      <CardFooter className="w-full flex justify-center items-center mt-6">
        <Link href={"/"}>
          <Button type="button">Go to Home</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ViewStatusDocumentsPage;
