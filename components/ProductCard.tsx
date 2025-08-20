import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Star, ShoppingBag, Heart } from "lucide-react";
import { Product } from "@/data/products";

interface ProductCardProps {
  product: Product;
  onClick?: (product: Product) => void;
}

export default function ProductCard({ product, onClick }: ProductCardProps) {
  return (
    <Card
      className="bg-white/90 backdrop-blur-sm border-[#EED9B6]/30 cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
      onClick={() => onClick && onClick(product)}
    >
      <CardContent className="p-4">
        {/* Image Container */}
        <div className="relative mb-4 overflow-hidden rounded-lg">
        <Image
          src={product.images[0] || "/placeholder.svg"}
          alt={product.name}
            width={300}
            height={300}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Category Badge */}
          <Badge className="absolute top-2 left-2 bg-[#2C1A12]/80 text-[#FFF9F2] border-none">
            {product.category}
          </Badge>
          
          {/* Rating */}
          {product.rating && (
            <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
              <Star className="w-3 h-3 fill-[#EED9B6] text-[#EED9B6]" />
              <span className="text-xs font-medium text-[#2C1A12]">{product.rating}</span>
            </div>
          )}
          
          {/* Stock Status */}
          <div className="absolute bottom-2 left-2">
            <Badge 
              variant={product.inStock ? "default" : "destructive"}
              className={product.inStock ? "bg-green-600" : "bg-red-600"}
            >
              {product.inStock ? "In Stock" : "Out of Stock"}
            </Badge>
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-2">
          <h3 className="font-serif text-lg text-[#2C1A12] font-semibold line-clamp-2 group-hover:text-[#8B5C2C] transition-colors">
            {product.name}
          </h3>
          
          {/* Subcategory */}
          {product.subcategory && (
            <p className="text-xs text-[#2C1A12]/60 uppercase tracking-wide">
              {product.subcategory}
            </p>
          )}
          
          {/* Size/Quantity */}
          {(product.size || product.quantity) && (
            <p className="text-sm text-[#2C1A12]/70">
              {product.size && `Size: ${product.size}`}
              {product.quantity && `Quantity: ${product.quantity}`}
            </p>
          )}
          
          {/* Description */}
          <p className="text-sm text-[#2C1A12]/70 line-clamp-2">
            {product.description}
          </p>
          
          {/* Flavors */}
          {product.flavors && product.flavors.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {product.flavors.slice(0, 3).map((flavor, index) => (
                <Badge key={index} variant="outline" className="text-xs border-[#EED9B6] text-[#2C1A12]">
                  {flavor}
                </Badge>
              ))}
              {product.flavors.length > 3 && (
                <Badge variant="outline" className="text-xs border-[#EED9B6] text-[#2C1A12]">
                  +{product.flavors.length - 3} more
                </Badge>
              )}
            </div>
          )}
          
          {/* Price */}
          <div className="flex items-center justify-between pt-2">
            <div>
              <p className="text-xl font-bold text-[#2C1A12]">{product.price}</p>
              {product.originalPrice && (
                <p className="text-sm text-[#2C1A12]/60 line-through">{product.originalPrice}</p>
              )}
            </div>
            
            {/* Reviews */}
            {product.reviews && (
              <div className="flex items-center gap-1 text-xs text-[#2C1A12]/60">
                <span>({product.reviews} reviews)</span>
              </div>
            )}
          </div>
          
          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            <Button 
              className="flex-1 bg-[#2C1A12] text-[#FFF9F2] hover:bg-[#2C1A12]/90"
              onClick={(e) => {
                e.stopPropagation();
                // Add to cart logic here
              }}
            >
              <ShoppingBag className="w-4 h-4 mr-2" />
              Add to Cart
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className="border-[#2C1A12] text-[#2C1A12] hover:bg-[#2C1A12] hover:text-[#FFF9F2]"
              onClick={(e) => {
                e.stopPropagation();
                // Wishlist logic here
              }}
            >
              <Heart className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 