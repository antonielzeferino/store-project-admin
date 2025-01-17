import DeleteButton from "@/components/DeleteButton";
import ShowProduct from "@/components/ShowProduct";
import Link from "next/link";

const ProductManager = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  return (
    <div className="p-6 mx-auto flex-grow max-w-[1440px]">
      <h1 className="text-3xl font-semibold text-blue-600 mb-6">Administração de Produto</h1>
      <p className="text-lg text-gray-700 mb-4">
        Bem-vindo ao painel de administração de produtos! Aqui você pode visualizar e editar os detalhes de cada produto de forma rápida e fácil.
      </p>

      <div className="bg-gray-50 p-6 rounded-lg shadow-md mb-6 mx-auto">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Detalhes do Produto</h2>
        <ShowProduct id={id} />
      </div>

      <div className="flex justify-end space-x-4">
        <button
          className="px-6 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition duration-300"
        >
          <Link href={`/produtos/${id}/editar`}>
            Editar Produto
          </Link>
        </button>
        <DeleteButton id={id} />
      </div>
    </div>
  );
};

export default ProductManager;
