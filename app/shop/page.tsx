"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import ProductCard from "@/components/ProductCard"
import { chocolateProducts } from "@/data/products"
import ProductFilter from "@/components/ProductFilter"
import ProductModal from "@/components/ProductModal"

const types = Array.from(new Set(chocolateProducts.map(p => p.type)))

export default function ShopPage() {
  const [typeFilter, setTypeFilter] = useState<string | null>(null)
  const [sort, setSort] = useState<string>("rating")
  const [modalProduct, setModalProduct] = useState(null)

  let filtered = chocolateProducts
  if (typeFilter) filtered = filtered.filter(p => p.type === typeFilter)
  if (sort === "price") filtered = [...filtered].sort((a, b) => parseInt(a.price.replace(/\D/g, "")) - parseInt(b.price.replace(/\D/g, "")))
  if (sort === "rating") filtered = [...filtered].sort((a, b) => b.rating - a.rating)

  return (
    <div className="min-h-screen bg-[#F5E6D3] py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-serif text-[#2C1A12] mb-8">Shop Chocolates</h1>
        <ProductFilter
          types={types}
          typeFilter={typeFilter}
          setTypeFilter={setTypeFilter}
          sort={sort}
          setSort={setSort}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {filtered.map(product => (
            <ProductCard key={product.id} product={product} onClick={setModalProduct} />
          ))}
        </div>
        <ProductModal product={modalProduct} open={!!modalProduct} onClose={() => setModalProduct(null)} />
      </div>
    </div>
  )
} 