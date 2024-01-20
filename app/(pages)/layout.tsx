import MainNavbar from "@/components/global/navbar";
import Footer from "@/components/global/footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <MainNavbar />
      <main className="pt-20 w-full h-screen flex flex-col justify-center items-center">
        {children}
      </main>
      <Footer />
    </>
  );
}
