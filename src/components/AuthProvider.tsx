"use client";

import { useEffect, useState } from "react";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authorized, setAuthorized] = useState(false);
  const correctPassword = process.env.NEXT_PUBLIC_AUTH_PASSWORD as string; 

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token === "authorized") {
      setAuthorized(true);
    }
  }, []);

  const handlePasswordSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const enteredPassword = formData.get("password");

    if (enteredPassword === correctPassword) {
      localStorage.setItem("authToken", "authorized");
      setAuthorized(true);
    } else {
      alert("Senha incorreta!");
    }
  };

  if (!authorized) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <form
          onSubmit={handlePasswordSubmit}
          className="bg-white p-6 rounded-lg shadow-md text-center"
        >
          <h2 className="text-lg font-semibold mb-4">
            Digite a senha para acessar
          </h2>
          <input
            type="password"
            name="password"
            className="border p-2 rounded w-full mb-4"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }

  return <>{children}</>;
}
