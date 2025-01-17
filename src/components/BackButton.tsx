"use client";

import { useRouter } from "next/navigation";

const BackButton: React.FC = () => {
  const router = useRouter();

  const handleClick = () => {
    router.back()
  }

  return (
    <button
      onClick={handleClick}
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200 m-2"
    >
      {"<- "}Voltar
    </button>
  );
};

export default BackButton;
