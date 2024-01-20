import { UserButton } from "@clerk/nextjs";
import React from "react";

const DashboardPage = () => {
  return (
    <div className="flex flex-col">
      <header className="">Dashboard</header>
      <section className="">
        <UserButton afterSignOutUrl="/" />
      </section>
    </div>
  );
};

export default DashboardPage;
