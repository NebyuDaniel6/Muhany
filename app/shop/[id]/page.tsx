"use client"
import { useParams } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"

// Copy the chocolateProducts array from shop/page.tsx for now
const chocolateProducts = [
  // ... copy the chocolateProducts array here ...
]

export default function ProductDetailPage() {
  const params = useParams<{ id: string }>()
  const product = chocolateProducts.find(p => p.id.toString() === params.id)
  if (!product) return <div className="p-8">Product not found.</div>

  // Find related products (same type, different id)
  const related = chocolateProducts.filter(p => p.type === product.type && p.id !== product.id).slice(0, 3)

  return (
    <div className="min-h-screen bg-[#F5E6D3] py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Link href="/shop" className="text-[#2C1A12] underline mb-4 inline-block">← Back to Shop</Link>
        <div className="grid md:grid-cols-2 gap-8">
          {/* Image gallery */}
          <div>
            <Image src={product.images[0] || "/placeholder.svg"} alt={product.name} width={400} height={400} className="rounded-lg mb-4 object-cover" />
            <div className="flex gap-2">
              {product.images.map((img, i) => (
                <Image key={i} src={img} alt={product.name + " " + (i+1)} width={80} height={80} className="rounded object-cover border" />
              ))}
            </div>
            {/* Placeholder for 360° view */}
            <div className="mt-4 text-xs text-[#2C1A12]/60">360° view coming soon</div>
          </div>
          {/* Product info */}
          <div>
            <h1 className="text-3xl font-serif text-[#2C1A12] mb-2">{product.name}</h1>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl text-[#8B5C2C] font-bold">{product.price}</span>
              {product.originalPrice && <span className="text-sm line-through text-[#2C1A12]/50">{product.originalPrice}</span>}
            </div>
            <div className="mb-4 text-[#2C1A12]/80">{product.description}</div>
            <div className="mb-4">
              <span className="text-[#EED9B6] font-bold">Rating:</span> {product.rating} ({product.reviews} reviews)
            </div>
            <Button className="bg-[#EED9B6] text-[#2C1A12] hover:bg-[#EED9B6]/90 mb-2">Add to Cart</Button>
            <Button variant="outline" className="border-[#EED9B6] text-[#2C1A12] ml-2">Buy Now</Button>
            <div className="mt-6">
              <h2 className="font-serif text-lg text-[#2C1A12] mb-2">Ingredients</h2>
              <ul className="list-disc ml-6 text-[#2C1A12]/80">
                {product.ingredients.map((ing, i) => <li key={i}>{ing}</li>)}
              </ul>
              <h2 className="font-serif text-lg text-[#2C1A12] mt-4 mb-2">Allergens</h2>
              <ul className="list-disc ml-6 text-[#2C1A12]/80">
                {product.allergens.map((all, i) => <li key={i}>{all}</li>)}
              </ul>
              <h2 className="font-serif text-lg text-[#2C1A12] mt-4 mb-2">Nutrition (per 100g)</h2>
              <ul className="ml-6 text-[#2C1A12]/80">
                <li>Calories: {product.nutritionPer100g.calories} kcal</li>
                <li>Fat: {product.nutritionPer100g.fat}g</li>
                <li>Carbs: {product.nutritionPer100g.carbs}g</li>
                <li>Protein: {product.nutritionPer100g.protein}g</li>
                <li>Fiber: {product.nutritionPer100g.fiber}g</li>
              </ul>
            </div>
          </div>
        </div>
        {/* Related products */}
        <div className="mt-12">
          <h2 className="text-2xl font-serif text-[#2C1A12] mb-4">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {related.map(rp => (
              <Link key={rp.id} href={`/shop/${rp.id}`} className="block bg-white rounded-lg p-4 border border-[#EED9B6]/30 hover:shadow-lg transition">
                <Image src={rp.images[0] || "/placeholder.svg"} alt={rp.name} width={120} height={120} className="mb-2 rounded object-cover" />
                <div className="font-serif text-lg text-[#2C1A12]">{rp.name}</div>
                <div className="text-[#8B5C2C]">{rp.price}</div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 