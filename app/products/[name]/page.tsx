import { products } from "../data/products";
import { notFound } from "next/navigation";

export default function ProductDetailPage({ params }: { params: { name: string } }) {
  const product = products.find(
    (p) => p.name === decodeURIComponent(params.name)
  );
  if (!product) return notFound();

  return (
    <div>
      <h1 style={{ textTransform: "capitalize" }}>{product.name}</h1>
      <img src={product.image} alt={product.name} style={{ width: 400, borderRadius: 8 }} />
      {/* Add more product details here if needed */}
    </div>
  );
} 