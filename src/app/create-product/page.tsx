"use client"

import { useState } from "react";
import axios from "axios";

const CreateProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    discountPercentage: "",
    promotionEndDate: "",
    tags: "",
    category: "",
    brand: "",
    quantity: "",
    weight: "",
    colors: "",
    imageUrl: "",
  });

  // Função para adicionar o produto
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const productData = {
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
      discountPercentage: formData.discountPercentage ? parseFloat(formData.discountPercentage) : null,
      promotionEndDate: formData.promotionEndDate ? new Date(formData.promotionEndDate) : null,
      tags: formData.tags.split(",").map(tag => tag.trim()),
      category: formData.category,
      brand: formData.brand || null,
      quantity: formData.quantity || null,
      weight: formData.weight ? parseFloat(formData.weight) : null,
      colors: formData.colors.split(",").map(color => color.trim()),
      imageUrl: formData.imageUrl || null,
    };

    try {
      console.log(productData)
      await axios.post("/api/products", productData); // Adicionar produto
      alert("Produto criado com sucesso!");
      setFormData({
        name: "",
        description: "",
        price: "",
        discountPercentage: "",
        promotionEndDate: "",
        tags: "",
        category: "",
        brand: "",
        quantity: "",
        weight: "",
        colors: "",
        imageUrl: "",
      }); // Limpar o formulário após o envio
    } catch (error) {
      console.log("Erro ao criar produto:", error);
    }
  };

  // Função para controlar as mudanças no formulário
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Função para controlar mudanças no campo de tags e cores (arrays)
  const handleArrayChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const value = e.target.value.split(",").map(item => item.trim());
    setFormData({ ...formData, [field]: value });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Criar Novo Produto</h2>

      {/* Formulário de Adicionar Produto */}
      <form onSubmit={handleSubmit} className="sm:grid gap-4">
        <div className="flex flex-wrap">
          <label htmlFor="name" className="block text-sm font-medium">Nome do Produto <span className="text-red-500">*</span></label>
          <input
            type="text"
            id="name"
            name="name"
            className="p-2 border rounded-md w-full"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="flex flex-wrap">
          <label htmlFor="description" className="block text-sm font-medium">Descrição <span className="text-red-500">*</span></label>
          <input
            type="text"
            id="description"
            name="description"
            className="p-2 border rounded-md w-full"
            value={formData.description}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="flex flex-wrap">
          <label htmlFor="price" className="block text-sm font-medium">Preço <span className="text-red-500">*</span></label>
          <input
            type="number"
            id="price"
            name="price"
            className="p-2 border rounded-md w-full"
            value={formData.price}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="flex flex-wrap">
          <label htmlFor="discountPercentage" className="block text-sm font-medium">Desconto (%)</label>
          <input
            type="number"
            id="discountPercentage"
            name="discountPercentage"
            className="p-2 border rounded-md w-full"
            value={formData.discountPercentage}
            onChange={handleInputChange}
          />
        </div>

        <div className="flex flex-wrap">
          <label htmlFor="promotionEndDate" className="block text-sm font-medium">Data de Término da Promoção</label>
          <input
            type="date"
            id="promotionEndDate"
            name="promotionEndDate"
            className="p-2 border rounded-md w-full"
            value={formData.promotionEndDate}
            onChange={handleInputChange}
          />
        </div>

        <div className="flex flex-wrap">
          <label htmlFor="tags" className="block text-sm font-medium">Tags (separadas por vírgula)</label>
          <input
            type="text"
            id="tags"
            name="tags"
            className="p-2 border rounded-md w-full"
            value={formData.tags}
            onChange={(e) => handleArrayChange(e, "tags")}
          />
        </div>

        <div className="flex flex-wrap">
          <label htmlFor="category" className="block text-sm font-medium">Categoria <span className="text-red-500">*</span></label>
          <input
            type="text"
            id="category"
            name="category"
            className="p-2 border rounded-md w-full"
            value={formData.category}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="flex flex-wrap">
          <label htmlFor="brand" className="block text-sm font-medium">Marca</label>
          <input
            type="text"
            id="brand"
            name="brand"
            className="p-2 border rounded-md w-full"
            value={formData.brand}
            onChange={handleInputChange}
          />
        </div>

        <div className="flex flex-wrap">
          <label htmlFor="quantity" className="block text-sm font-medium">Quantidade</label>
          <input
            type="text"
            id="quantity"
            name="quantity"
            className="p-2 border rounded-md w-full"
            value={formData.quantity}
            onChange={handleInputChange}
          />
        </div>

        <div className="flex flex-wrap">
          <label htmlFor="weight" className="block text-sm font-medium">Peso</label>
          <input
            type="number"
            id="weight"
            name="weight"
            className="p-2 border rounded-md w-full"
            value={formData.weight}
            onChange={handleInputChange}
          />
        </div>

        <div className="flex flex-wrap">
          <label htmlFor="colors" className="block text-sm font-medium">Cores (separadas por vírgula)</label>
          <input
            type="text"
            id="colors"
            name="colors"
            className="p-2 border rounded-md w-full"
            value={formData.colors}
            onChange={(e) => handleArrayChange(e, "colors")}
          />
        </div>

        <div className="flex flex-wrap">
          <label htmlFor="imageUrl" className="block text-sm font-medium">URL da Imagem</label>
          <input
            type="text"
            id="imageUrl"
            name="imageUrl"
            className="p-2 border rounded-md w-full"
            value={formData.imageUrl}
            onChange={handleInputChange}
          />
        </div>

        <div className="col-span-2">
          <button
            type="submit"
            className="w-full p-2 bg-green-600 text-white rounded-md mt-4"
          >
            Criar Produto
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProduct;
