interface ButtonProps {
    text: string;
    href: string;
  }
  
  export default function Button({ text, href }: ButtonProps) {
    return (
      <a
        href={href}
        className="bg-black text-white text-lg font-bold px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
      >
        {text}
      </a>
    );
  }