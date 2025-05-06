"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Button from "../button/button";

export default function Modal({ triggerText, children, modalTitle}: { 
  triggerText: string; 
  modalTitle: string;
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button text={triggerText}/>
      </DialogTrigger>
      <DialogContent className="max-w-xs">
        <DialogTitle>{modalTitle}</DialogTitle>
        {children}
      </DialogContent>
    </Dialog>
  );
}