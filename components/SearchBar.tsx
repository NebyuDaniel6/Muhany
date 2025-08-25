"use client"
import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, X, ShoppingBag } from "lucide-react"
import Image from "next/image"
import { muhanyProducts } from "@/data/products"
import { useCart } from "@/hooks/use-cart"
import { useWishlist } from "@/hooks/use-wishlist"

interface SearchBarProps {
  onProductSelect?: (product: any) => void
  className?: string
}

export default function SearchBar({ onProductSelect, className = "" }: SearchBarProps) {
  const [query, setQuery] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [results, setResults] = useState<any[]>([])
  const searchRef = useRef<HTMLDivElement>(null)
  const { addToCart } = useCart()
  const { addToWishlist, isInWishlist, removeFromWishlist } = useWishlist()

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Search products
  useEffect(() => {
    if (query.trim().length === 0) {
      setResults([])
      setIsOpen(false)
      return
    }

    const searchResults = muhanyProducts.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.category.toLowerCase().includes(query.toLowerCase()) ||
      product.description.toLowerCase().includes(query.toLowerCase()) ||
      (product.subcategory && product.subcategory.toLowerCase().includes(query.toLowerCase()))
    ).slice(0, 6) // Limit to 6 results

    setResults(searchResults)
    setIsOpen(true)
  }, [query])

  const handleProductClick = (product: any) => {
    if (onProductSelect) {
      onProductSelect(product)
    }
    setIsOpen(false)
    setQuery("")
  }

  const handleAddToCart = (e: React.MouseEvent, product: any) => {
    e.stopPropagation()
    addToCart(product, 1)
  }

  const handleWishlistToggle = (e: React.MouseEvent, product: any) => {
    e.stopPropagation()
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
    }
  }

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#2C1A12]/40" />
        <Input
          type="text"
          placeholder="Search chocolates, cakes, pastries..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10 pr-10 border-[#EED9B6]/50 focus:border-[#2C1A12] bg-white/80 backdrop-blur-sm"
        />
        {query && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setQuery("")
              setIsOpen(false)
            }}
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 text-[#2C1A12]/40 hover:text-[#2C1A12]"
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>

      {/* Search Results */}
      {isOpen && results.length > 0 && (
        <Card className="absolute top-full left-0 right-0 mt-2 z-50 bg-white/95 backdrop-blur-sm border-[#EED9B6]/30 shadow-xl">
          <CardContent className="p-4">
            <div className="space-y-3">
              {results.map((product) => (
                <div
                  key={product.id}
                  onClick={() => handleProductClick(product)}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#FFF9F2]/50 cursor-pointer transition-colors"
                >
                  {/* Product Image */}
                  <div className="relative w-12 h-12 flex-shrink-0">
                    <Image
                      src={product.images[0] || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-[#2C1A12] truncate">
                      {product.name}
                    </h4>
                    <p className="text-sm text-[#2C1A12]/60 truncate">
                      {product.category}
                    </p>
                    <p className="font-medium text-[#EED9B6] text-sm">
                      {product.price}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={(e) => handleWishlistToggle(e, product)}
                      className="w-8 h-8 p-0 text-[#2C1A12]/60 hover:text-[#2C1A12] hover:bg-[#2C1A12]/10"
                    >
                      <svg
                        className={`w-4 h-4 ${isInWishlist(product.id) ? 'fill-red-500 text-red-500' : ''}`}
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                      </svg>
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={(e) => handleAddToCart(e, product)}
                      className="w-8 h-8 p-0 text-[#2C1A12]/60 hover:text-[#2C1A12] hover:bg-[#2C1A12]/10"
                    >
                      <ShoppingBag className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {results.length === 6 && (
              <div className="mt-3 pt-3 border-t border-[#EED9B6]/30">
                <p className="text-sm text-[#2C1A12]/60 text-center">
                  Showing 6 of {muhanyProducts.length} products
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* No Results */}
      {isOpen && query && results.length === 0 && (
        <Card className="absolute top-full left-0 right-0 mt-2 z-50 bg-white/95 backdrop-blur-sm border-[#EED9B6]/30 shadow-xl">
          <CardContent className="p-4 text-center">
            <p className="text-[#2C1A12]/60">No products found for "{query}"</p>
            <p className="text-sm text-[#2C1A12]/40 mt-1">Try different keywords</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
} 