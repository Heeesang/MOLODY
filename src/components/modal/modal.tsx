"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
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
        {children}
      </DialogContent>
    </Dialog>
  );
}