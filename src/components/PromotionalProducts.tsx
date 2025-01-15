"use client"

import { ProductData } from "@/app/api/products/route"
import axios from "axios";
import { useEffect, useState } from "react"

const PromotionalProducts = () => {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [isLoading, setLoading] = useState<Boolean>(true);

  useEffect(() => {
    const fetchPromotionalProducts = async () => {
      try {
        const response = await axios.get("/api/products");
        setProducts(response.data);
        setLoading(false);
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.log('Error fetching promotional products:', error.message);
        } else {
          console.log('Error ao buscar produtos promocionais:', error);
        }
        setLoading(false);
      }
    };

    fetchPromotionalProducts();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {isLoading ? (
        <p>Carregando...</p>
      ) : products.length > 0 ? (
        products.map((product) => {
          const { id, name, description, price, discountPercentage } = product;

          let discountPrice = '';
          if (discountPercentage) {
            const discountValue = Math.floor((discountPercentage / 100) * price);
            discountPrice = (price - discountValue).toFixed(2);
          }

          return (
            <div key={id} className="bg-white p-4 rounded-lg shadow-md flex flex-col justify-between">
              <h5 className="text-2xl font-bold text-indigo-600 mb-2">{name}</h5>
              <p className="text-sm text-gray-600 mb-2">{description}</p>
              <div className="flex flex-col sm:flex-row sm:justify-between">
                <span className="text-lg font-bold text-gray-800">Preço: <span className="text-2xl text-green-600">{price.toFixed(2)}</span></span>
                {discountPercentage && (
                  <div className="mt-2 sm:mt-0 text-sm text-red-500">
                    <div className="text-black text-base">Preço com desconto: <span className="font-semibold text-green-600">{discountPrice}</span></div>
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
  );
};

export default PromotionalProducts;
