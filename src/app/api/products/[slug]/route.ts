import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const { slug } = params;

  try {
    if (!slug) {
      return NextResponse.json(
        { error: "ID inválido ou não fornecido" },
        { status: 400 }
      );
    }

    const product = await prisma.product.findUnique({
      where: { id: slug },
    });

    if (!product) {
      return NextResponse.json(
        { error: "Produto não encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.error("Erro ao buscar produto:", error);

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return NextResponse.json(
        { error: "Erro na consulta ao banco de dados", details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

// Handler para PUT
export async function PUT(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const { slug } = params;
  
  try {
    if (!slug) {
      return NextResponse.json(
        { error: "ID inválido ou não fornecido" },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { name, price, description, imageUrl, discountPercentage, promotionEndDate, weight, tags, colors } = body;

    if (!name || typeof name !== "string") {
      return NextResponse.json(
        { error: "Nome do produto é obrigatório e deve ser uma string" },
        { status: 400 }
      );
    }

    if (price !== undefined && (typeof price !== "number" || price < 0)) {
      return NextResponse.json(
        { error: "O preço deve ser um número válido e maior ou igual a zero" },
        { status: 400 }
      );
    }

    const updatedProduct = await prisma.product.update({
      where: { id: slug },
      data: {
        name,
        price,
        description: description || undefined,
        imageUrl: imageUrl || undefined,
        discountPercentage,
        promotionEndDate,
        weight,
        tags,
        colors,
      },
    });

    return NextResponse.json(updatedProduct, { status: 200 });
  } catch (error) {
    console.error("Erro ao atualizar produto:", error);

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return NextResponse.json(
        { error: "Erro na atualização do banco de dados", details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const { slug } = params;

  try {
    if (!slug) {
      return NextResponse.json(
        { error: "ID inválido ou não fornecido" },
        { status: 400 }
      );
    }

    const existingProduct = await prisma.product.findUnique({
      where: { id: slug },
    });

    if (!existingProduct) {
      return NextResponse.json(
        { error: "Produto não encontrado" },
        { status: 404 }
      );
    }

    await prisma.product.delete({
      where: { id: slug },
    });

    return NextResponse.json(
      { message: "Produto deletado com sucesso" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro ao deletar produto:", error);

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return NextResponse.json(
        { error: "Erro ao acessar o banco de dados", details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}