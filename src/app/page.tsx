import Link from "next/link";

const Home = () => {
  return (
    <div className="flex-grow flex items-center justify-center bg-gray-100">
      <main className="container mx-auto px-4 text-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            href="/produtos/promo"
            className="block px-8 py-6 bg-blue-600 text-gray-50 text-lg font-semibold rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg transition-all content-center"
          >
            Promoções
          </Link>
          <Link
            href="/produtos"
            className="block px-8 py-6 bg-blue-600 text-gray-50 text-lg font-semibold rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg transition-all content-center"
          >
            Todos os Produtos
          </Link>
          <Link
            href="/produtos/adicionar"
            className="block px-8 py-6 bg-blue-600 text-gray-50 text-lg font-semibold rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg transition-all content-center"
          >
            Adicionar Produtos
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Home;
