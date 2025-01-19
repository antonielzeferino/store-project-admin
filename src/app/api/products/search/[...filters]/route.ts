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

function corsResponse(request: Request) {
  const origin = request.headers.get("origin");

  const allowedOrigins = [
    "http://localhost:3000",
    "https://doce-essencia.vercel.app",
  ];

  if (origin && allowedOrigins.includes(origin)) {
    return new NextResponse(null, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  }

  return NextResponse.json(
    { error: "CORS não permitido para esta origem" },
    { status: 403 }
  );
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ filters: string[] }> }
) {
  const cors = corsResponse(request);
  if (cors && cors.status === 403) return cors;

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
