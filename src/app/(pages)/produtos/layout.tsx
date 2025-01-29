import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Doce Essencia | Produtos",
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
    <>
      <div className="flex-grow">
        {children}
      </div>
    </>
  );
}
