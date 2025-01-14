import type { Metadata } from "next";
import "./globals.css";

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
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
