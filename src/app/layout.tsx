import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import AuthProvider from "@/components/AuthProvider";

export const metadata: Metadata = {
  title: "Doce Essencia | Home",
  description: "O lugar perfeito para fazer suas compras.",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className="antialiased flex flex-col min-h-screen">
        <Header />
        <div className="flex flex-col flex-grow">
          <AuthProvider>{children}</AuthProvider>
        </div>
      </body>
    </html>
  );
}