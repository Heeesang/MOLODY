import { cn } from "@/lib/utils";

interface ButtonProps {
    text: string;
    onClick?: () => void;
    className?: string;
  }
  
  export default function Button({ text, onClick, className }: ButtonProps) {
    return (
      <button
        onClick={onClick}
        className={cn("text-lg font-bold px-6 py-3 rounded-lg transition-colors", className)}
      >
        {text}
      </button>
    );
  }