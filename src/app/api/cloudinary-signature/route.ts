import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

// Configuração do Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME as string,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY as string,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET as string,
});

interface CloudinaryResponse {
  timestamp: number;
  signature: string;
}

export interface ErrorResponse {
  error: string;
}

export async function POST(): Promise<NextResponse<CloudinaryResponse | ErrorResponse>> {
  try {
    // Gerar timestamp
    const timestamp = Math.round(new Date().getTime() / 1000);

    // Gerar assinatura para upload
    const signature = cloudinary.utils.api_sign_request(
      { timestamp, upload_preset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESENT },
      process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET as string
    );

    return NextResponse.json({ timestamp, signature });
  } catch (error) {
    console.error("Error generating Cloudinary signature:", error);
    return NextResponse.json(
      { error: "Failed to generate signature" },
      { status: 500 }
    );
  }
}
