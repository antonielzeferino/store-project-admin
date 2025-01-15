import PromotionalProducts from "@/components/PromotionalProducts";
import Link from "next/link";

const Home = () => {
  return (
    <div>
      <main className="container py-4 px-2">
        <div className="flex justify-center mb-8">
          <Link
            href="/create-product"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow transition"
          >
            Adicionar Produtos
          </Link>
        </div>

        <h2 className="text-2xl font-bold text-center mb-6">
          Produtos em Promoção
        </h2>
        <PromotionalProducts />
      </main>
    </div>
  );
};

export default Home;
