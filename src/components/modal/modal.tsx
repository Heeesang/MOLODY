"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Button from "../button/button";

export default function Modal({ triggerText, children}: { 
  triggerText: string; 
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button text={triggerText} href="#" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogTitle>무료 구독</DialogTitle>
        {children}
      </DialogContent>
    </Dialog>
  );
}