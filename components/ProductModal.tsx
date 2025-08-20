import React, { useState } from "react";
import { Product } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { X, Star, ShoppingBag, Heart, MessageCircle, Share2, ChevronLeft, ChevronRight } from "lucide-react";

interface ProductModalProps {
  product: Product | null;
  open: boolean;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, open, onClose }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [showNutrition, setShowNutrition] = useState(false);

  if (!open || !product) return null;

  const handleWhatsAppOrder = () => {
    const message = `Hello! I'd like to order:\n\n${product.name} x${quantity}\nPrice: ${product.price} each\nTotal: ETB ${parseInt(product.price.replace(/[^\d]/g, '')) * quantity}\n\nProduct Details:\n${product.longDescription || product.description}\n\nThank you!`;
    const whatsappUrl = `https://wa.me/251912604444?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-colors"
          aria-label="Close"
        >
          <X className="w-6 h-6 text-[#2C1A12]" />
        </button>

        <div className="grid lg:grid-cols-2 gap-8 p-8">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative aspect-square bg-[#FFF9F2] rounded-2xl overflow-hidden border border-[#EED9B6]/30">
        <Image
                src={product.images[selectedImage] || "/placeholder.svg"}
          alt={product.name}
                fill
                className="object-cover"
              />
              
              {/* Image Navigation */}
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5 text-[#2C1A12]" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-colors"
                  >
                    <ChevronRight className="w-5 h-5 text-[#2C1A12]" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail Images */}
            {product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors flex-shrink-0 ${
                      selectedImage === index ? "border-[#2C1A12]" : "border-[#EED9B6]/30"
                    }`}
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${product.name} ${index + 1}`}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Badge className="bg-[#2C1A12] text-[#FFF9F2]">
                  {product.category}
                </Badge>
                {product.subcategory && (
                  <Badge variant="outline" className="border-[#2C1A12] text-[#2C1A12]">
                    {product.subcategory}
                  </Badge>
                )}
              </div>
              
              <h1 className="font-serif text-3xl text-[#2C1A12] mb-2">{product.name}</h1>
              
              {product.longDescription && (
                <p className="text-[#2C1A12]/80 text-lg leading-relaxed mb-4">
                  {product.longDescription}
                </p>
              )}

              {/* Rating */}
              {product.rating && (
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(product.rating!) ? "fill-[#EED9B6] text-[#EED9B6]" : "text-[#EED9B6]/30"
                        }`}
                      />
                    ))}
                    <span className="text-[#2C1A12] ml-2 font-medium">{product.rating}</span>
                  </div>
                  {product.reviews && (
                    <span className="text-[#2C1A12]/60">({product.reviews} reviews)</span>
                  )}
                </div>
              )}

              {/* Price */}
              <div className="flex items-center gap-4 mb-4">
                <span className="text-3xl font-bold text-[#2C1A12]">{product.price}</span>
                {product.originalPrice && (
                  <span className="text-xl text-[#2C1A12]/60 line-through">{product.originalPrice}</span>
                )}
              </div>

              {/* Size/Quantity */}
              {(product.size || product.quantity) && (
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-[#2C1A12] font-medium">Details:</span>
                  {product.size && <Badge variant="outline">{product.size}</Badge>}
                  {product.quantity && <Badge variant="outline">{product.quantity}</Badge>}
                </div>
              )}

              {/* Stock Status */}
              <div className="flex items-center gap-2 mb-6">
                <div className={`w-3 h-3 rounded-full ${product.inStock ? "bg-green-500" : "bg-red-500"}`}></div>
                <span className="text-[#2C1A12]">
                  {product.inStock ? `In Stock (${product.stockCount} available)` : "Out of Stock"}
                </span>
              </div>
            </div>

            {/* Flavors */}
            {product.flavors && product.flavors.length > 0 && (
              <div>
                <h3 className="text-[#2C1A12] font-medium mb-2">Available Flavors:</h3>
                <div className="flex flex-wrap gap-2">
                  {product.flavors.map((flavor, index) => (
                    <Badge key={index} variant="outline" className="border-[#EED9B6] text-[#2C1A12]">
                      {flavor}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="flex items-center gap-4">
              <span className="text-[#2C1A12] font-medium">Quantity:</span>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="border-[#2C1A12]/30 text-[#2C1A12] hover:bg-[#2C1A12]/10"
                >
                  -
                </Button>
                <span className="text-[#2C1A12] w-12 text-center font-medium">{quantity}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(Math.min(product.stockCount, quantity + 1))}
                  className="border-[#2C1A12]/30 text-[#2C1A12] hover:bg-[#2C1A12]/10"
                >
                  +
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button
                className="flex-1 bg-[#2C1A12] text-[#FFF9F2] hover:bg-[#2C1A12]/90 py-3"
                disabled={!product.inStock}
              >
                <ShoppingBag className="w-5 h-5 mr-2" />
                Add to Cart
              </Button>
              <Button
                onClick={handleWhatsAppOrder}
                className="flex-1 bg-transparent border-2 border-[#2C1A12] text-[#2C1A12] hover:bg-[#2C1A12] hover:text-[#FFF9F2] py-3"
                disabled={!product.inStock}
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Order via WhatsApp
              </Button>
            </div>

            {/* Product Details Tabs */}
            <div className="space-y-4">
              <div className="border-b border-[#EED9B6]/30">
                <div className="flex gap-6">
                  <button
                    onClick={() => setShowNutrition(false)}
                    className={`pb-2 border-b-2 transition-colors ${
                      !showNutrition ? "border-[#2C1A12] text-[#2C1A12]" : "border-transparent text-[#2C1A12]/60"
                    }`}
                  >
                    Ingredients
                  </button>
                  <button
                    onClick={() => setShowNutrition(true)}
                    className={`pb-2 border-b-2 transition-colors ${
                      showNutrition ? "border-[#2C1A12] text-[#2C1A12]" : "border-transparent text-[#2C1A12]/60"
                    }`}
                  >
                    Nutrition
                  </button>
                </div>
              </div>

              {!showNutrition ? (
                <div className="space-y-4">
                  {product.ingredients && (
                    <div>
                      <h3 className="text-[#2C1A12] font-medium mb-2">Ingredients:</h3>
                      <ul className="text-[#2C1A12]/80 space-y-1">
                        {product.ingredients.map((ingredient, index) => (
                          <li key={index}>• {ingredient}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {product.allergens && (
                    <div>
                      <h3 className="text-[#2C1A12] font-medium mb-2">Allergens:</h3>
                      <ul className="text-[#2C1A12]/80 space-y-1">
                        {product.allergens.map((allergen, index) => (
                          <li key={index}>• {allergen}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                product.nutritionPer100g && (
                  <div>
                    <h3 className="text-[#2C1A12] font-medium mb-4">Nutrition per 100g:</h3>
                    <div className="grid grid-cols-2 gap-4 text-[#2C1A12]/80">
                      <div>Calories: {product.nutritionPer100g.calories} kcal</div>
                      <div>Fat: {product.nutritionPer100g.fat}g</div>
                      <div>Carbohydrates: {product.nutritionPer100g.carbs}g</div>
                      <div>Protein: {product.nutritionPer100g.protein}g</div>
                      <div>Fiber: {product.nutritionPer100g.fiber}g</div>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal; 