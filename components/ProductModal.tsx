import React from "react";
import { Product } from "@/components/ProductCard";
import Image from "next/image";

interface ProductModalProps {
  product: Product | null;
  open: boolean;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, open, onClose }) => {
  if (!open || !product) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-2xl text-gray-400 hover:text-gray-700"
          aria-label="Close"
        >
          &times;
        </button>
        <Image
          src={product.images[0] || "/placeholder.svg"}
          alt={product.name}
          width={300}
          height={300}
          className="mb-4 rounded-lg object-cover mx-auto"
        />
        <h2 className="text-2xl font-serif text-[#2C1A12] mb-2">{product.name}</h2>
        <p className="text-[#8B5C2C] mb-2">{product.price}</p>
        <p className="text-sm text-[#2C1A12]/70 mb-4">{product.description}</p>
        {/* Add more product details here as needed */}
      </div>
    </div>
  );
};

export default ProductModal; 