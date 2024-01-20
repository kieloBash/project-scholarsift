"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PlusCircle } from "lucide-react";
import { AddSchoolForm } from "./add-school-form";
import { useState } from "react";

export function SchoolDialogModal() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          className="w-full h-full flex flex-col justify-center items-center hover:bg-slate-50 transition bg-white"
        >
          <PlusCircle className="w-8 h-8" />
          <p className="">Add University Details</p>
        </button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-[50rem] grid grid-cols-3">
        <div className="col-span-1"></div>
        <div className="col-span-2">
          <DialogHeader>
            <DialogTitle className="text-2xl text-center">
              Edit School Details
            </DialogTitle>
            <DialogDescription>
              Make changes to your school details for other students to view.
            </DialogDescription>
          </DialogHeader>
          <AddSchoolForm close={() => setOpen(false)} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
