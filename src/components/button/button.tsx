interface ButtonProps {
    text: string;
    onClick?: () => void;
  }
  
  export default function Button({ text, onClick }: ButtonProps) {
    return (
      <button
        onClick={onClick}
        className="bg-black text-white text-lg font-bold px-6 py-3 rounded-lg hover:bg-neutral-700 transition-colors"
      >
        {text}
      </button>
    );
  }