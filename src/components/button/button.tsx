interface ButtonProps {
    text: string;
    href: string;
    onClick?: () => void;
  }
  
  export default function Button({ text, href, onClick }: ButtonProps) {
    return (
      <a
        href={href}
        onClick={onClick}
        className="bg-black text-white text-lg font-bold px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
      >
        {text}
      </a>
    );
  }