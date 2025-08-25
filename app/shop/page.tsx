"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import ProductCard from "@/components/ProductCard"
import { muhanyProducts, productCategories, productSubcategories, Product } from "../data/products"
import ProductFilter from "@/components/ProductFilter"
import ProductModal from "@/components/ProductModal"
import { Badge } from "@/components/ui/badge"
import { ShoppingBag, Filter, Star } from "lucide-react"
import { useCart } from "@/hooks/use-cart"

export default function ShopPage() {
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null)
  const [subcategoryFilter, setSubcategoryFilter] = useState<string | null>(null)
  const [sort, setSort] = useState<string>("name")
  const [modalProduct, setModalProduct] = useState<Product | null>(null)
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000])
  const { addToCart } = useCart()

  // Filter products based on selected filters
  let filtered = muhanyProducts
  
  if (categoryFilter) {
    filtered = filtered.filter(p => p.category === categoryFilter)
  }
  
  if (subcategoryFilter) {
    filtered = filtered.filter(p => p.subcategory === subcategoryFilter)
  }

  // Price range filter
  filtered = filtered.filter(p => {
    const price = parseInt(p.price.replace(/[^\d]/g, ''))
    return price >= priceRange[0] && price <= priceRange[1]
  })

  // Sort products
  if (sort === "price") {
    filtered = [...filtered].sort((a, b) => {
      const priceA = parseInt(a.price.replace(/[^\d]/g, ''))
      const priceB = parseInt(b.price.replace(/[^\d]/g, ''))
      return priceA - priceB
    })
  } else if (sort === "rating") {
    filtered = [...filtered].sort((a, b) => (b.rating || 0) - (a.rating || 0))
  } else if (sort === "name") {
    filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name))
  }

  const getSubcategoriesForCategory = (category: string) => {
    return productSubcategories[category as keyof typeof productSubcategories] || []
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5E6D3] to-[#EED9B6] py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-serif text-[#2C1A12] mb-4">Muhany Shop</h1>
          <p className="text-xl text-[#2C1A12]/80 max-w-2xl mx-auto">
            Discover our complete collection of premium chocolates, cakes, pastries, and more
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 mb-8 shadow-lg">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              <Button
                variant={categoryFilter === null ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  setCategoryFilter(null)
                  setSubcategoryFilter(null)
                }}
                className={categoryFilter === null ? "bg-[#2C1A12] text-[#FFF9F2]" : "border-[#2C1A12] text-[#2C1A12]"}
              >
                All Categories
              </Button>
              {productCategories.map((category) => (
                <Button
                  key={category}
                  variant={categoryFilter === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    setCategoryFilter(category)
                    setSubcategoryFilter(null)
                  }}
                  className={categoryFilter === category ? "bg-[#2C1A12] text-[#FFF9F2]" : "border-[#2C1A12] text-[#2C1A12]"}
                >
                  {category}
                </Button>
              ))}
            </div>

            {/* Subcategory Filter */}
            {categoryFilter && getSubcategoriesForCategory(categoryFilter).length > 0 && (
              <div className="flex flex-wrap gap-2">
                <span className="text-[#2C1A12] font-medium">Type:</span>
                <Button
                  variant={subcategoryFilter === null ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSubcategoryFilter(null)}
                  className={subcategoryFilter === null ? "bg-[#2C1A12] text-[#FFF9F2]" : "border-[#2C1A12] text-[#2C1A12]"}
                >
                  All
                </Button>
                {getSubcategoriesForCategory(categoryFilter).map((subcategory) => (
                  <Button
                    key={subcategory}
                    variant={subcategoryFilter === subcategory ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSubcategoryFilter(subcategory)}
                    className={subcategoryFilter === subcategory ? "bg-[#2C1A12] text-[#FFF9F2]" : "border-[#2C1A12] text-[#2C1A12]"}
                  >
                    {subcategory}
                  </Button>
                ))}
              </div>
            )}

            {/* Sort */}
            <div className="flex items-center gap-2">
              <span className="text-[#2C1A12] font-medium">Sort:</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="border border-[#2C1A12]/30 rounded-lg px-3 py-1 text-[#2C1A12] bg-white/50"
              >
                <option value="name">Name</option>
                <option value="price">Price: Low to High</option>
                <option value="rating">Rating</option>
              </select>
            </div>
          </div>

          {/* Price Range */}
          <div className="mt-4 flex items-center gap-4">
            <span className="text-[#2C1A12] font-medium">Price Range:</span>
            <input
              type="range"
              min="0"
              max="10000"
              step="100"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
              className="flex-1"
            />
            <span className="text-[#2C1A12] text-sm">
              ETB {priceRange[0]} - ETB {priceRange[1]}
            </span>
          </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-[#2C1A12]">
            Showing {filtered.length} of {muhanyProducts.length} products
          </p>
          {categoryFilter && (
            <Badge className="bg-[#2C1A12] text-[#FFF9F2]">
              {categoryFilter}
              {subcategoryFilter && ` > ${subcategoryFilter}`}
            </Badge>
          )}
        </div>

        {/* Products Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-12">
            <ShoppingBag className="w-16 h-16 text-[#2C1A12]/40 mx-auto mb-4" />
            <h3 className="text-xl text-[#2C1A12] mb-2">No products found</h3>
            <p className="text-[#2C1A12]/60 mb-4">Try adjusting your filters</p>
            <Button
              onClick={() => {
                setCategoryFilter(null)
                setSubcategoryFilter(null)
                setPriceRange([0, 10000])
              }}
              className="bg-[#2C1A12] text-[#FFF9F2] hover:bg-[#2C1A12]/90"
            >
              Clear Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map(product => (
            <ProductCard key={product.id} product={product} onClick={(product) => setModalProduct(product)} />
          ))}
        </div>
        )}

        {/* Product Modal */}
        <ProductModal product={modalProduct} open={!!modalProduct} onClose={() => setModalProduct(null)} />
      </div>
    </div>
  )
} 