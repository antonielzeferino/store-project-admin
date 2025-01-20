import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

type FilterKeys = "name" | "description" | "tags" | "category";

type FilterValue = {
  name?: { contains: string; mode: "insensitive" };
  description?: { contains: string; mode: "insensitive" };
  tags?: { hasSome: string[] };
  category?: { equals: string };
};

export async function GET(
  request: Request,
  { params }: { params: Promise<{ filters: string[] }> }
) {
  try {
    const { filters } = await params;

    const filterObject: FilterValue = {};

    for (const filter of filters) {
      const [key, value] = filter.split("=");
      if (!key || !value) continue;

      switch (key as FilterKeys) {
        case "name":
          filterObject.name = { contains: value, mode: "insensitive" };
          break;
        case "description":
          filterObject.description = { contains: value, mode: "insensitive" };
          break;
        case "tags":
          filterObject.tags = { hasSome: value.split(",") };
          break;
        case "category":
          filterObject.category = { equals: value };
          break;
        default:
          break;
      }
    }

    const products = await prisma.product.findMany({
      where: filterObject,
    });

    const response = NextResponse.json(products, { status: 200 });

    // Adicionar cabeçalhos CORS
    response.headers.set("Access-Control-Allow-Origin", "*");
    response.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    response.headers.set(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );

    return response;
  } catch (error: unknown) {
    console.error("Erro ao buscar produtos:", error);

    const response = NextResponse.json(
      {
        error: "Erro ao buscar produtos",
        details: error instanceof Error ? error.message : "",
      },
      { status: 500 }
    );

    // Adicionar cabeçalhos CORS em caso de erro
    response.headers.set("Access-Control-Allow-Origin", "*");
    response.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    response.headers.set(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );

    return response;
  }
}

// Suporte para OPTIONS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}
