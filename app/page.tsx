import { Button } from "@/components/ui/button";
import Link from "next/link";

// TEMP
// import { auth } from "@clerk/nextjs";
// import { redirect } from "next/navigation";

export default function Home() {
  // const { userId: clerkId } = auth();
  // if (clerkId) redirect("/dashboard");
  return (
    <main className="w-full h-screen flex flex-col justify-center items-center">
      <div className="">Hello World! Please Sign Up</div>
      <Link href={"https://heroic-kite-36.accounts.dev/sign-in"}>
        <Button>Get Started Now!</Button>
      </Link>
    </main>
  );
}
