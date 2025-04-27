'use client';

interface PrimaryButtonProps {
  text: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
}

export default function PrimaryButton({ text, onClick, type = 'button' }: PrimaryButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded transition-all transform hover:scale-105"
    >
      {text}
    </button>
  );
}
