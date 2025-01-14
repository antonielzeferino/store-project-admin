"use client"

import axios from "axios";
import { useEffect, useState } from "react";
import { ProductData } from "./api/upload/route";

export default function Home() {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/api/upload");
        console.log(response.data);
        setProducts(response.data);
        setLoading(false);
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.log('Error fetching products:', error.message);
        } else {
          console.log('Error ao buscar produtos:', error);
        }
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  return (
    <div>
      Doce Essência
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <ul className="m-5">
          {products.length > 0 && products.map((product) => (
            <li key={product.id}>
              <ul>
                <li key={product.name}>
                  {product.name}
                </li>
                <li key={product.description}>
                  {product.description}
                </li>
                <li key={product.price}>
                  preço: {product.price}
                </li>
                <li key={product.discountPercentage}>
                  desconto: {product.discountPercentage}
                </li>
                <li key={product.id}>
                  preço com desconto: {product.discountPercentage && 
                  (product.price - (product.discountPercentage /100) * product.price).toFixed(2)
                }
                </li>
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
