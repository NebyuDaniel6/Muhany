import Link from "next/link";
import { products } from "../data/products";

export default function ChocolatesShopPage() {
  return (
    <div>
      <h1>Shop Chocolates</h1>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "2rem" }}>
        {products.map((product, idx) => (
          <div key={idx} style={{ width: 200 }}>
            <Link href={`/products/${encodeURIComponent(product.name)}`}>
              <img
                src={product.image}
                alt={product.name}
                style={{ width: "100%", borderRadius: 8 }}
              />
              <h2 style={{ textTransform: "capitalize" }}>{product.name}</h2>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
} 