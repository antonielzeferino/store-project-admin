import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Tipagem para os filtros suportados
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

    // Tipagem para o objeto de filtros
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
          filterObject.tags = { hasSome: value.split(",") }; // Suporta múltiplas tags
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

    return NextResponse.json(products, { status: 200 });
  } catch (error: unknown) {
    console.error("Erro ao buscar produtos:", error);

    return NextResponse.json(
      { error: "Erro ao buscar produtos", details: error instanceof Error ? error.message : '' },
      { status: 500 }
    );
  }
}
