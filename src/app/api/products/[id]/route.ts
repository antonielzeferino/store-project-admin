import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> } 
) {
  const { id } = await params;
  
  try {
    if (!id) {
      return NextResponse.json(
        { error: "ID inválido ou não fornecido" },
        { status: 400 }
      );
    }

    const product = await prisma.product.findUnique({
      where: { id },
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

    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

// PUT Handler
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> } 
) {
  const { id } = await params;

  try {
    if (!id) {
      return NextResponse.json(
        { error: "ID inválido ou não fornecido" },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { name, price, description, imageUrl, ...rest } = body;

    if (!name || typeof name !== "string") {
      return NextResponse.json(
        { error: "Nome do produto é obrigatório e deve ser uma string" },
        { status: 400 }
      );
    }

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        name,
        price,
        description: description || undefined,
        imageUrl: imageUrl || undefined,
        ...rest,
      },
    });

    return NextResponse.json(updatedProduct, { status: 200 });
  } catch (error) {
    console.error("Erro ao atualizar produto:", error);

    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

// DELETE Handler
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> } 
) {
  const { id } = await params; 

  try {
    if (!id) {
      return NextResponse.json(
        { error: "ID inválido ou não fornecido" },
        { status: 400 }
      );
    }

    const existingProduct = await prisma.product.findUnique({
      where: { id },
    });

    if (!existingProduct) {
      return NextResponse.json(
        { error: "Produto não encontrado" },
        { status: 404 }
      );
    }

    await prisma.product.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "Produto deletado com sucesso" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro ao deletar produto:", error);

    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
