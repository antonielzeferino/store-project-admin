import EditProduct from "@/components/EditProduct";

const ProductEdit = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  return (
    <div className="p-6 mx-auto flex-grow max-w-[1440px]">
      <h1 className="text-3xl font-semibold text-blue-600 mb-6">Editar Produto</h1>
      <p className="text-lg text-gray-700 mb-4">
        Bem-vindo ao painel de edição de produtos! Aqui você editar os detalhes de cada produto de forma rápida e fácil.
      </p>
      <EditProduct id={id}/>
    </div>
  );
};

export default ProductEdit;
