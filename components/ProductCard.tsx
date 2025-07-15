import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

export interface Product {
  id: string;
  name: string;
  price: string;
  description: string;
  images: string[];
  type: string;
  rating: number;
}

interface ProductCardProps {
  product: Product;
  onClick?: (product: Product) => void;
}

export default function ProductCard({ product, onClick }: ProductCardProps) {
  return (
    <Card
      className="bg-white border-[#EED9B6]/30 cursor-pointer hover:shadow-lg transition"
      onClick={() => onClick && onClick(product)}
    >
      <CardContent className="p-4 flex flex-col items-center">
        <Image
          src={product.images[0] || "/placeholder.svg"}
          alt={product.name}
          width={200}
          height={200}
          className="mb-4 rounded-lg object-cover"
        />
        <h2 className="text-xl font-serif text-[#2C1A12] mb-2">{product.name}</h2>
        <p className="text-[#8B5C2C] mb-2">{product.price}</p>
        <p className="text-sm text-[#2C1A12]/70 mb-4">{product.description}</p>
        <div className="flex gap-2">
          <Button className="bg-[#EED9B6] text-[#2C1A12] hover:bg-[#EED9B6]/90">Add to Cart</Button>
          <Button variant="outline" className="border-[#EED9B6] text-[#2C1A12]">Buy Now</Button>
        </div>
      </CardContent>
    </Card>
  );
} 