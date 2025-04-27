'use client';

interface SecondaryButtonProps {
  text: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
}

export default function SecondaryButton({ text, onClick, type = 'button' }: SecondaryButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded transition-all transform hover:scale-105"
    >
      {text}
    </button>
  );
}
