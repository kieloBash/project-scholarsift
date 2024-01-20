import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import pic from "@/public/home1.jpg";
// TEMP
// import { auth } from "@clerk/nextjs";
// import { redirect } from "next/navigation";

export default function Home() {
  // const { userId: clerkId } = auth();
  // if (clerkId) redirect("/dashboard");
  return (
    <div className="relative flex items-center overflow-hidden">
      <div className="container relative flex justify-between items-center px-6 py-16 gap-32">
        <div className="relative flex flex-col w-full max-w-2xl">
          <span className="w-full h-2 mb-12 bg-gray-900"></span>
          <h1 className="flex flex-col text-4xl font-black leading-none text-gray-900 uppercase font-bebas-neue sm:text-5xl">
            Discover Your Path
            <span className="text-2xl sm:text-3xl">
              to Success with ScholarSift!
            </span>
          </h1>
          <p className="text-sm text-gray-700 sm:text-base mt-4">
            <span className="font-bold">ScholarSift</span> is an innovative
            platform that leverages emerging technologies to empower students
            and enhance college scholarship awareness.
          </p>
          <div className="flex mt-8">
            <Button className="px-4 py-2 mr-4 uppercase rounded-lg text-md">
              Get started
            </Button>
          </div>
        </div>
        <div className="flex-1 flex justify-center items-center w-full">
          <div className="w-[32rem] h-[30rem] relative overflow-hidden">
            <Image src={pic} alt="pic" fill objectFit={"cover"} />
          </div>
        </div>
      </div>
    </div>
  );
}
