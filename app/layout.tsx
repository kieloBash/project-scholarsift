import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import MainNavbar from "@/components/global/navbar";
import Footer from "@/components/global/footer";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "ScholarSift",
  description: "Find your Scholarship",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider afterSignInUrl="/dashboard" afterSignUpUrl="/onboarding">
      <html lang="en">
        <body
          className={`${poppins.className} flex flex-col min-h-screen w-full bg-slate-100`}
        >
          <MainNavbar />
          <main className="pt-20 w-full h-screen flex flex-col justify-center items-center">
            {children}
          </main>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
