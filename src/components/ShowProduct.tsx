"use client";

import { ProductData } from "@/app/api/products/route";
import Loading from "@/app/loading";
import axios from "axios";
import React, { useEffect, useState } from "react";

interface ShowProductProps {
  id: string;
}

const ShowProduct: React.FC<ShowProductProps> = ({ id }) => {
  const [product, setProduct] = useState<ProductData>();

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`/api/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Erro ao buscar os detalhes do produto:", error);
      }
    };
    fetchProductDetails();
  }, [id]);

  if (!product) return <Loading />;

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row align-middle items-center justify-center sm:gap-5 sm:space-x-6">

        <div className="w-max mb-4 sm:mb-0">
          <img
            src={product.imageUrl || "https://res.cloudinary.com/dzbwpszpa/image/upload/v1736981947/bn9ciopdszybdlmwtbrf.jpg"}
            alt={product.name}
            className="w-full max-w-72 h-auto rounded-md object-cover"
          />
        </div>

        <div className="w-full sm:w-3/5 text-left space-y-3">
          <h2 className="text-xl font-semibold text-gray-800">{product.name}</h2>

          <div className="flex flex-wrap space-x-4">
            <p className="text-lg text-gray-700">
              <strong>Preço:</strong> R$ {product.price.toFixed(2)}
            </p>

            {product.discountPercentage && (
              <p className="text-lg text-red-600">
                <strong>Desconto:</strong> {product.discountPercentage}% até{" "}
                {new Date(product.promotionEndDate!).toLocaleDateString()}
              </p>
            )}
          </div>

          <div className="flex flex-wrap space-x-4 text-sm text-gray-600">
            <p><strong>Categoria:</strong> {product.category}</p>
            <p><strong>Marca:</strong> {product.brand || "Não especificada"}</p>
            <p><strong>Quantidade:</strong> {product.quantity || "Não especificada"}</p>
            <p><strong>Peso:</strong> {product.weight ? `${product.weight} gramas` : "Não especificado"}</p>
          </div>

          {product.colors && (
            <p className="text-sm text-gray-600">
              <strong>Cor(es):</strong> {product.colors.length > 0 ? product.colors.join(", ") : "Não especificado"}
            </p>
          )}

          <p className="text-sm text-gray-600">
            <strong>Descrição:</strong> {product.description}
          </p>
        </div>

      </div>
    </div>
  );
};

export default ShowProduct;
