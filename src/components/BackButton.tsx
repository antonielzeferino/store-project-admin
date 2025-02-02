"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="bg-blue-600 text-white px-4 py-2 m-4 rounded-lg shadow-md hover:bg-blue-700 transition w-24"
    >
      {"< "} Voltar
    </button>
  );
}
