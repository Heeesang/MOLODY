"use client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function Modal({
  trigger,
  children,
  modalTitle,
}: {
  trigger: React.ReactNode;
  modalTitle: string;
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-xs">
        <DialogTitle>{modalTitle}</DialogTitle>
        {children}
      </DialogContent>
    </Dialog>
  );
}