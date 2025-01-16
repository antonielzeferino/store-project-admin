"use client";

import { ProductData } from "@/app/api/products/route";
import Loading from "@/app/loading";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

interface ProductsProps {
  viewMode: "promotions" | "all";
}

const Products: React.FC<ProductsProps> = ({ viewMode }) => {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get<ProductData[]>("/api/products");
        const productList = response.data;

        const filteredProducts =
          viewMode === "promotions"
            ? productList.filter((product) => {
                if (!product.promotionEndDate || !product.discountPercentage) {
                  return false;
                }
                const promotionEndDate = new Date(product.promotionEndDate);
                return !isNaN(promotionEndDate.getTime()) && promotionEndDate > new Date();
              })
            : productList;

        setProducts(filteredProducts);
        setLoading(false);
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.log("Erro ao buscar produtos:", error.message);
        } else {
          console.log("Erro ao buscar produtos:", error);
        }
        setLoading(false);
      }
    };

    fetchProducts();
  }, [viewMode]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {products.length > 0 ? (
            products.map((product) => {
              const { id, name, description, price, discountPercentage } = product;

              let discountPrice = "";
              if (discountPercentage) {
                const discountValue = Math.floor((discountPercentage / 100) * price);
                discountPrice = (price - discountValue).toFixed(2);
              }
              return (
                <div key={id} className="bg-white p-4 rounded-lg shadow-md flex flex-col justify-between">
                  <img
                    src={product.imageUrl || "https://res.cloudinary.com/dzbwpszpa/image/upload/v1736981947/bn9ciopdszybdlmwtbrf.jpg"}
                    alt={name}
                    className="w-24 h-24 object-cover mb-4 rounded-lg mx-auto"
                  />
                  <h5 className="text-2xl font-bold text-indigo-600 mb-2">
                    <Link href={`/products/${id}`}>{name}</Link>
                  </h5>
                  <p className="text-sm text-gray-600 mb-2">
                    {description.slice(0, 75)}
                    {description.length > 75 && "..."}
                  </p>
                  <div className="flex flex-col sm:flex-row sm:justify-between">
                    <span className="text-lg font-bold text-gray-800">
                      Preço: <span className="text-2xl text-green-600">{price.toFixed(2)}</span>
                    </span>
                    {discountPercentage && (
                      <div className="mt-2 sm:mt-0 text-sm text-red-500">
                        <div className="text-black text-base">
                          Preço com desconto: <span className="font-semibold text-green-600">{discountPrice}</span>
                        </div>
                        <span className="font-semibold text-xs">Desconto: {discountPercentage}%</span>
                      </div>
                    )}
                  </div>
                </div>
              );
              
            })
          ) : (
            <p>Nenhum produto disponível</p>
          )}
        </div>
      )}
    </>
  );
};

export default Products;
