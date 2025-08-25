"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Heart, ShoppingBag, Trash2, ArrowLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useWishlist } from "@/hooks/use-wishlist"
import { useCart } from "@/hooks/use-cart"

export default function WishlistPage() {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist()
  const { addToCart } = useCart()

  const handleAddToCart = (product: any) => {
    addToCart(product, 1)
  }

  const handleRemoveFromWishlist = (productId: string) => {
    removeFromWishlist(productId)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5E6D3] to-[#EED9B6] py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link href="/shop" className="inline-flex items-center gap-2 text-[#2C1A12]/60 hover:text-[#2C1A12] mb-4">
            <ArrowLeft className="w-4 h-4" />
            Back to Shop
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-serif text-[#2C1A12] mb-2">My Wishlist</h1>
              <p className="text-[#2C1A12]/60">
                {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'} saved
              </p>
            </div>
            {wishlist.length > 0 && (
              <Button
                variant="outline"
                onClick={clearWishlist}
                className="border-[#2C1A12] text-[#2C1A12] hover:bg-[#2C1A12] hover:text-[#FFF9F2]"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Clear All
              </Button>
            )}
          </div>
        </div>

        {wishlist.length === 0 ? (
          <Card className="bg-white/80 backdrop-blur-sm border-[#EED9B6]/30">
            <CardContent className="p-12 text-center">
              <Heart className="w-16 h-16 text-[#2C1A12]/40 mx-auto mb-4" />
              <h2 className="text-2xl font-serif text-[#2C1A12] mb-2">Your wishlist is empty</h2>
              <p className="text-[#2C1A12]/60 mb-6">
                Start adding your favorite chocolates and treats to your wishlist!
              </p>
              <Link href="/shop">
                <Button className="bg-[#2C1A12] text-[#FFF9F2] hover:bg-[#2C1A12]/90">
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  Browse Products
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlist.map((item) => (
              <Card key={item.id} className="bg-white/80 backdrop-blur-sm border-[#EED9B6]/30 hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  {/* Product Image */}
                  <div className="relative mb-4">
                    <Image
                      src={item.images[0] || "/placeholder.svg"}
                      alt={item.name}
                      width={300}
                      height={200}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <Badge className="absolute top-2 left-2 bg-[#2C1A12]/80 text-[#FFF9F2]">
                      {item.category}
                    </Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveFromWishlist(item.id)}
                      className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm hover:bg-white"
                    >
                      <Trash2 className="w-4 h-4 text-[#2C1A12]" />
                    </Button>
                  </div>

                  {/* Product Info */}
                  <h3 className="font-serif text-xl text-[#2C1A12] mb-2">{item.name}</h3>
                  <p className="text-[#2C1A12]/60 mb-3">{item.category}</p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-lg font-bold text-[#EED9B6]">{item.price}</span>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        onClick={() => handleAddToCart(item)}
                        className="bg-[#2C1A12] text-[#FFF9F2] hover:bg-[#2C1A12]/90"
                      >
                        <ShoppingBag className="w-4 h-4 mr-1" />
                        Add to Cart
                      </Button>
                    </div>
                  </div>

                  <Separator className="bg-[#EED9B6]/30" />
                  
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-sm text-[#2C1A12]/60">Added to wishlist</span>
                    <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
} 