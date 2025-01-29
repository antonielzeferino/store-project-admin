import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});

export interface ProductData {
  id?: string;
  name: string;
  description: string;
  price: number;
  discountPercentage?: number;
  promotionEndDate?: string;
  tags?: string[];
  category: string;
  brand?: string;
  quantity?: string;
  colors?: string[];
  imageUrl: string;
}

export async function GET() {
  try {
    const products = await prisma.product.findMany();

    return NextResponse.json(products, { status: 200 });
  } catch (error: unknown) {
    console.error("Erro ao buscar produtos:", error);

    if (error instanceof Error) {
      return NextResponse.json(
        { error: "Erro ao buscar produtos", details: error.message },
        { status: 500 }
      );
    } else {
      return NextResponse.json(
        { error: "Erro ao buscar produtos" },
        { status: 500 }
      );
    }
  }
}

export async function POST(request: Request) {
  try {
    const {
      imageUrl,
      id,
      name,
      description,
      price,
      discountPercentage,
      promotionEndDate,
      tags = [],
      category,
      brand,
      quantity,
      colors = [],
    }: ProductData = await request.json();

    if (!imageUrl) {
      return NextResponse.json(
        { error: "URL da imagem é obrigatória" },
        { status: 400 }
      );
    }

    if (!name || !description || !price || !category) {
      return NextResponse.json(
        { error: "Nome, descrição, preço e categoria são obrigatórios" },
        { status: 400 }
      );
    }

    if (id) {
      // update existent product
      const product = await prisma.product.findUnique({
        where: { id: id },
      });

      if (!product) {
        return NextResponse.json(
          { error: "Produto não encontrado" },
          { status: 404 }
        );
      }

      const updatedProduct = await prisma.product.update({
        where: { id: id },
        data: {
          name,
          description,
          price,
          discountPercentage,
          promotionEndDate: promotionEndDate ? new Date(promotionEndDate) : null,
          tags,
          category,
          brand,
          quantity,
          colors,
          imageUrl
        },
      });

      return NextResponse.json(updatedProduct, { status: 200 });
    } else {
      // add new product
      const newProduct = await prisma.product.create({
        data: {
          name,
          description,
          price,
          discountPercentage,
          promotionEndDate: promotionEndDate ? new Date(promotionEndDate) : null,
          tags,
          category,
          brand,
          quantity,
          colors,
          imageUrl
        },
      });

      return NextResponse.json(newProduct, { status: 201 });
    }

  } catch (error: unknown) {
    console.error("Erro ao processar a requisição:", error);

    if (error instanceof Error) {
      return NextResponse.json(
        { error: "Erro Interno do Servidor", details: error.message },
        { status: 500 }
      );
    } else {
      return NextResponse.json(
        { error: "Erro Interno do Servidor" },
        { status: 500 }
      );
    }
  }
}