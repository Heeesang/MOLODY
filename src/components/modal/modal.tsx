"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import Button from "../button/button";

export default function Modal({ triggerText, dialogTitle, dialogDescription }: { 
  triggerText: string; 
  dialogTitle: string; 
  dialogDescription: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button text={triggerText} href="#" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogDescription>{dialogDescription}</DialogDescription>
        </DialogHeader>
        <DialogClose asChild>
          <button className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700">
            닫기
          </button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}