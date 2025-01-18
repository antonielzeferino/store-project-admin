import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https", // Especifica o protocolo
        hostname: "res.cloudinary.com", // Nome do host
        pathname: "/**", // Isso permite qualquer caminho
      },
    ],
  },
};

export default nextConfig;
