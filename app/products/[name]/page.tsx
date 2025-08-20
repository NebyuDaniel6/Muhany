import { products } from "../../data/products";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return products.map((product) => ({
    name: product.name.toLowerCase().replace(/\s+/g, '-'),
  }));
}

export default async function ProductDetailPage({ params }: { params: Promise<{ name: string }> }) {
  const resolvedParams = await params;
  
  // Normalize both the product name and the URL param for robust matching
  const product = products.find(
    (p) =>
      p.name.toLowerCase().trim() ===
      decodeURIComponent(resolvedParams.name).toLowerCase().trim()
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