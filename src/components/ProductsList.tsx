"use client";

import { ProductData } from "@/app/api/products/route";
import Loading from "@/app/loading";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface ProductsProps {
  viewMode: "promotions" | "all";
  enableSearch?: boolean;
}

const ProductsList: React.FC<ProductsProps> = ({ viewMode, enableSearch = false }) => {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");

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
        console.error("Erro ao buscar produtos:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [viewMode]);

  const filteredProducts = products.filter((product) => {
    if (!searchTerm.trim()) return true;
    const lowerSearch = searchTerm.toLowerCase();
    return (
      product.name.toLowerCase().includes(lowerSearch) ||
      product.category?.toLowerCase().includes(lowerSearch) ||
      product.tags?.some((tag) => tag.toLowerCase().includes(lowerSearch)) ||
      product.description.toLowerCase().includes(lowerSearch) ||
      product.brand?.toLowerCase().includes(lowerSearch) ||
      (viewMode === "promotions" && lowerSearch.includes("promoção"))
    );
  });

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="w-full max-w-7xl mx-auto">
          <div className={`mb-2 px-4 ${!enableSearch && "hidden"}`}>
            <input
              type="text"
              placeholder="Buscar produtos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="p-2 border border-gray-300 rounded-lg w-full"
            />
          </div>
          <div className="grid grid-cols-[repeat(auto-fill,_minmax(200px,_1fr))] gap-4 p-4">

          {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => {
                const { id, name, description, price, discountPercentage } = product;

                let discountPrice = "";
                if (discountPercentage) {
                  const discountValue = Math.floor((discountPercentage / 100) * price);
                  discountPrice = (price - discountValue).toFixed(2);
                }
                return (
                  <div key={id} className="bg-white p-4 rounded-lg shadow-md flex flex-col justify-between">
                    <Image
                      src={
                        product.imageUrl ||
                        "https://res.cloudinary.com/dzbwpszpa/image/upload/v1736981947/bn9ciopdszybdlmwtbrf.jpg"
                      }
                      alt={name}
                      width={300}
                      height={400}
                      className="w-24 h-24 object-cover mb-4 rounded-lg mx-auto"
                    />
                    <h5 className="text-2xl font-bold text-indigo-600 mb-2 line-clamp-2">
                      <Link href={`/produtos/${id}`}>{name}</Link>
                    </h5>
                    <p className="text-sm text-gray-600 mb-2 line-clamp-3">
                      {description}
                    </p>
                    <div className="flex flex-col">
                      <span className="text-lg font-bold text-gray-800">
                        Preço: <span className="text-xl text-green-600">{price.toFixed(2)}</span>
                      </span>
                      {discountPercentage && (
                        <div className="mt-2 sm:mt-0 text-sm text-red-500">
                          <div className="text-black text-base">
                            Com desconto:{" "}
                            <span className="font-semibold text-green-600">{discountPrice}</span>
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
        </div>
      )}
    </>
  );
};

export default ProductsList;
