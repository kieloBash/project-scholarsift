import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

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
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
