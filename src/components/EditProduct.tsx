"use client";

import { ChangeEvent, useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

interface EditProductProps {
  id: string;
}

const EditProduct: React.FC<EditProductProps> = ({ id }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    discountPercentage: "",
    promotionEndDate: "",
    tags: [],
    category: "",
    brand: "",
    quantity: "",
    colors: [],
    imageUrl: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`/api/products/${id}`);
        const product = response.data;
        setFormData({
          name: product.name || "",
          description: product.description || "",
          price: product.price?.toString() || "",
          discountPercentage: product.discountPercentage?.toString() || "",
          promotionEndDate: product.promotionEndDate?.split("T")[0] || "",
          tags: product.tags || [],
          category: product.category || "",
          brand: product.brand || "",
          quantity: product.quantity?.toString() || "",
          colors: product.colors || [],
          imageUrl: product.imageUrl || "",
        });
      } catch (error) {
        console.error("Erro ao buscar o produto:", error);
        alert("Não foi possível carregar as informações do produto.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setSelectedFile(file || null);
  };

  const uploadImageToCloudinary = async (): Promise<string | null> => {
    if (!selectedFile) return formData.imageUrl;

    try {
      const signatureResponse = await fetch("/api/cloudinary-signature", { method: "POST" });
      if (!signatureResponse.ok) throw new Error("Erro ao obter assinatura para o Cloudinary.");

      const { timestamp, signature } = await signatureResponse.json();
      const imageData = new FormData();
      imageData.append("file", selectedFile);
      imageData.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY as string);
      imageData.append("timestamp", timestamp);
      imageData.append("signature", signature);
      imageData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESENT as string);

      const cloudinaryResponse = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`,
        { method: "POST", body: imageData }
      );

      if (!cloudinaryResponse.ok) throw new Error("Erro ao fazer upload da imagem para o Cloudinary.");

      const cloudinaryData = await cloudinaryResponse.json();
      return cloudinaryData.secure_url;
    } catch (error) {
      console.error("Erro ao fazer upload da imagem:", error);
      alert("Erro ao fazer upload da imagem. Tente novamente.");
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const imageUrl = await uploadImageToCloudinary();
      if (!imageUrl) {
        setIsLoading(false);
        return;
      }

      const updatedProduct = {
        ...formData,
        price: parseFloat(formData.price),
        discountPercentage: formData.discountPercentage ? parseFloat(formData.discountPercentage) : null,
        promotionEndDate: formData.promotionEndDate ? new Date(formData.promotionEndDate) : null,
        tags: formData.tags || [],
        colors: formData.colors || [],
        imageUrl,
      };

      await axios.put(`/api/products/${id}`, updatedProduct);
      router.push(`/produtos/${id}`)
    } catch (error) {
      console.error("Erro ao atualizar produto:", error);
      alert("Algo deu errado! Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleArrayChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const value = e.target.value.split(",").map((item) => item.trim());
    setFormData({ ...formData, [field]: value });
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Criar Novo Produto</h2>

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
          <label htmlFor="category" className="block text-sm font-medium">
            Categoria <span className="text-red-500">*</span>
          </label>
          <select
            name="category"
            id="category"
            value={formData.category}
            onChange={(e) => handleSelectChange(e)}
            className="p-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-medium-blue"
          >
            <option value="Perfumes">Perfumes</option>
            <option value="Kits & Presentes">Kits & Presentes</option>
            <option value="Cosmeticos">Cosmeticos</option>
          </select>
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
          <label htmlFor="quantity" className="block text-sm font-medium">Quantidade (ml/g)</label>
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
            type="file"
            id="imageUrl"
            name="imageUrl"
            className="p-2 border rounded-md w-full"
            onChange={(ev) => handleFileChange(ev)}
          />

        </div>

        <div className="col-span-2">
          <button
            type="submit"
            className={`w-full p-2 text-white rounded-md mt-4 ${isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-green-600"
              }`}
            disabled={isLoading}
          >
            {isLoading ? "Salvando..." : "Editar Produto"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
