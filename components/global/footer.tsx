import React from "react";
import { Button } from "../ui/button";
import { Facebook, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white pt-4 pb-8 xl:pt-12 flex flex-col px-20 gap-16">
      <div className="flex justify-between items-start w-full">
        <h1 className="font-semibold text-4xl">
          Scholar<span className="text-main-default">Sift</span>
        </h1>
        <div className="flex gap-8">
          <ul className="flex flex-col gap-2">
            <h3 className="font-bold">Scholarships</h3>
            <h4 className="">Scholarship Search</h4>
            <h4 className="">Chatbot</h4>
          </ul>
          <ul className="flex flex-col gap-2">
            <h3 className="font-bold">Our Story</h3>
            <h4 className="">About Us</h4>
            <h4 className="">Contact Us</h4>
          </ul>
          <ul className="flex flex-col gap-2">
            <h3 className="font-bold">Partners</h3>
            <h4 className="">School Profiles</h4>
            <h4 className="">Partner with Us</h4>
          </ul>
        </div>
      </div>
      <div className="w-full flex justify-between items-center">
        <div className="flex gap-8 font-bold">
          <div className="">© ScholarSift</div>
          <div className="">Privacy Policy</div>
          <div className="">Terms of use</div>
        </div>
        <div className="flex gap-2">
          <Button variant={"ghost"} className="p-1 rounded-full aspect-square">
            <Facebook />
          </Button>
          <Button variant={"ghost"} className="p-1 rounded-full aspect-square">
            <Instagram />
          </Button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
