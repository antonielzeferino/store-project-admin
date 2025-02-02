import BackButton from "@/components/BackButton";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Doce Essência | Produtos",
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
    <div className="flex flex-col min-h-screen">
      <BackButton/>
      <div className="flex-grow">{children}</div>
    </div>
  );
}
