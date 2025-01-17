"use client";
import { useRouter } from "next/navigation";

 // Indica que este é um componente cliente

interface DeleteButtonProps {
  id: string;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ id }) => {
  const router = useRouter();

  const handleDeleteProduct = async () => {
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("Produto deletado com sucesso!");
        router.push("/produtos")
      } else {
        alert("Erro ao deletar o produto!");
      }
    } catch (error) {
      console.error("Erro ao deletar produto:", error);
      alert("Erro interno ao tentar deletar o produto.");
    }
  };

  const handleDelete = () => {
    const confirmation = confirm(
      "Tem certeza que deseja excluir esse produto?\nEssa ação não é reversível."
    );
    if (confirmation) {
      handleDeleteProduct();
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="px-6 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition duration-300"
    >
      Deletar Produto
    </button>
  );
};

export default DeleteButton;
