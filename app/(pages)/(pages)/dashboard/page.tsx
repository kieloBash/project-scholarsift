import React from "react";
import SchoolInfoCard from "./school-info";
import InsightsCard from "./insights";

const DashboardPage = () => {
  return (
    <div className="w-full h-full flex flex-col px-10 py-8 gap-6">
      <header className="">
        <h1 className="text-2xl font-semibold">Welcome to your Dashboard!</h1>
        <p className="text-muted-foreground text-sm">
          Here are your insights we've gathered!
        </p>
      </header>
      <main className="flex-1 grid grid-cols-8 gap-4">
        <div className="col-span-6">
          <SchoolInfoCard />
        </div>
        <div className="col-span-2">
          <InsightsCard />
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
