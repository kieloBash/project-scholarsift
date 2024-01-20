import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

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
        <body className={`${inter.className} flex min-h-screen`}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
