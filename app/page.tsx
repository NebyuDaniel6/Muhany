"use client"
import { useState, useEffect, useRef } from "react"
import { Canvas, useFrame, type ThreeEvent } from "@react-three/fiber"
import { OrbitControls, Float, Environment, Html } from "@react-three/drei"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import {
  ChevronDown,
  MessageCircle,
  Menu,
  X,
  ShoppingBag,
  Coffee,
  Sparkles,
  ArrowLeft,
  Star,
  Heart,
  Share2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import type * as THREE from "three"
import { useGLTF } from "@react-three/drei"
import { useLoader } from '@react-three/fiber'
import { OBJLoader } from 'three-stdlib'
import { MTLLoader } from 'three-stdlib'
import { Suspense } from "react";
import dynamic from "next/dynamic";
import ProductModal from "@/components/ProductModal"

// Product data for 3D items
const chocolateProducts = [
  {
    id: "6",
    name: "Asset 4 GLB Model",
    price: "ETB 999",
    originalPrice: "ETB 1200",
    description: "A detailed GLB chocolate asset (Asset 4).",
    longDescription: "This is a sample GLB chocolate model loaded from Asset 4.glb.",
    color: "#8B5C2C",
    position: [0, 0, 0] as [number, number, number],
    type: "glb",
    rating: 4.5,
    reviews: 10,
    ingredients: ["GLB Model"],
    allergens: ["None"],
    nutritionPer100g: { calories: 0, fat: 0, carbs: 0, protein: 0, fiber: 0 },
    images: [
      "/placeholder.svg?height=400&width=400",
    ],
    inStock: true,
    stockCount: 1,
    model: "/models/OBJ/Asset 4.glb",
  },
  {
    id: "dubai",
    name: "Dubai Chocolate",
    price: "ETB 1200",
    originalPrice: "ETB 1500",
    description: "A luxurious chocolate inspired by Dubai.",
    longDescription: "This chocolate combines the finest ingredients with a touch of Dubai luxury. Rendered with OBJ+MTL.",
    color: "#C2B280",
    position: [2, 1, 2] as [number, number, number],
    type: "obj",
    rating: 4.8,
    reviews: 25,
    ingredients: ["Cocoa", "Gold Dust", "Spices"],
    allergens: ["May contain nuts"],
    nutritionPer100g: { calories: 550, fat: 35, carbs: 50, protein: 7, fiber: 5 },
    images: ["/products/dubai-chocolate.jpg"],
    inStock: true,
    stockCount: 10,
    model: "/models/OBJ/Dubai Chocolate.obj",
    mtl: "/models/OBJ/Dubai Chocolate.mtl",
  },
]

// Interactive 3D Chocolate Item
function InteractiveChocolateItem({
  product,
  onSelect,
}: {
  product: (typeof chocolateProducts)[0]
  onSelect: (product: (typeof chocolateProducts)[0]) => void
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  // Loader logic for GLB or OBJ+MTL
  let gltf: any = null
  let obj: any = null
  if (product.type === "glb" && product.model) {
    gltf = useGLTF(product.model)
  }
  if (product.type === "obj" && product.model && product.mtl) {
    // @ts-ignore
    obj = useLoader(OBJLoader, product.model, (loader) => {
      // @ts-ignore
      new MTLLoader().load(product.mtl, (materials) => {
        loader.setMaterials(materials)
      })
    })
  }

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += hovered ? 0.04 : 0.01
      meshRef.current.scale.setScalar(hovered ? 0.4 : 0.3)
    }
  })

  const handleClick = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation()
    onSelect(product)
  }

  const renderGeometry = () => {
    if (gltf && gltf.scene) {
      return <primitive object={gltf.scene} />
    }
    if (obj) {
      return <primitive object={obj} />
    }
    switch (product.type) {
      case "bar":
        return <boxGeometry args={[1.5, 0.3, 2.5]} />
      case "truffle":
        return <sphereGeometry args={[0.8, 16, 16]} />
      case "bean":
        return <sphereGeometry args={[0.4, 8, 6]} />
      default:
        return <boxGeometry args={[1, 1, 1]} />
    }
  }

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.8} position={product.position}>
      <mesh
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={handleClick}
        castShadow
        receiveShadow
      >
        {renderGeometry()}
        <meshStandardMaterial color={product.color} />
      </mesh>
    </Float>
  )
}

// Product Detail Page Component
function ProductDetailPage({
  product,
  onClose,
  onAddToCart,
}: {
  product: (typeof chocolateProducts)[0]
  onClose: () => void
  onAddToCart: (product: (typeof chocolateProducts)[0], quantity: number) => void
}) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [showNutrition, setShowNutrition] = useState(false)

  const handleWhatsAppOrder = () => {
    const message = `Hello! I'd like to order:\n\n${product.name} x${quantity}\nPrice: ${product.price} each\nTotal: ETB ${Number.parseInt(product.price.replace("ETB ", "")) * quantity}\n\nProduct Details:\n${product.longDescription}\n\nThank you!`
    const whatsappUrl = `https://wa.me/251912604444?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-[#2C1A12]/95 backdrop-blur-sm z-50 overflow-y-auto"
    >
      <div className="min-h-screen py-8 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <Button onClick={onClose} variant="ghost" className="text-[#EED9B6] hover:bg-[#EED9B6]/20">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to 3D View
            </Button>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" className="text-[#EED9B6] hover:bg-[#EED9B6]/20">
                <Heart className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-[#EED9B6] hover:bg-[#EED9B6]/20">
                <Share2 className="w-5 h-5" />
              </Button>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="aspect-square bg-[#FFF9F2] rounded-2xl overflow-hidden border border-[#EED9B6]/30">
                <Image
                  src={product.images[selectedImage] || "/placeholder.svg"}
                  alt={product.name}
                  width={600}
                  height={600}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === index ? "border-[#EED9B6]" : "border-[#EED9B6]/30"
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
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <Badge className="bg-[#EED9B6]/20 text-[#EED9B6] border-[#EED9B6]/30 mb-3">
                  {product.type === "bar"
                    ? "Chocolate Bar"
                    : product.type === "truffle"
                      ? "Truffle Collection"
                      : "Raw Cocoa"}
                </Badge>
                <h1 className="font-serif text-4xl text-[#EED9B6] mb-4">{product.name}</h1>
                <p className="text-[#FFF9F2]/80 text-lg leading-relaxed mb-6">{product.longDescription}</p>

                {/* Rating */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(product.rating) ? "fill-[#EED9B6] text-[#EED9B6]" : "text-[#EED9B6]/30"
                        }`}
                      />
                    ))}
                    <span className="text-[#FFF9F2] ml-2">{product.rating}</span>
                  </div>
                  <span className="text-[#FFF9F2]/60">({product.reviews} reviews)</span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-3xl font-bold text-[#EED9B6]">{product.price}</span>
                  {product.originalPrice && (
                    <span className="text-xl text-[#FFF9F2]/60 line-through">{product.originalPrice}</span>
                  )}
                  {product.originalPrice && (
                    <Badge variant="destructive" className="bg-red-600">
                      Save ETB{" "}
                      {Number.parseInt(product.originalPrice.replace("ETB ", "")) -
                        Number.parseInt(product.price.replace("ETB ", ""))}
                    </Badge>
                  )}
                </div>

                {/* Stock Status */}
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-[#FFF9F2]">In Stock ({product.stockCount} available)</span>
                </div>

                {/* Quantity Selector */}
                <div className="flex items-center gap-4 mb-8">
                  <span className="text-[#FFF9F2]">Quantity:</span>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="border-[#EED9B6]/30 text-[#EED9B6] hover:bg-[#EED9B6]/20"
                    >
                      -
                    </Button>
                    <span className="text-[#FFF9F2] w-12 text-center">{quantity}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setQuantity(Math.min(product.stockCount, quantity + 1))}
                      className="border-[#EED9B6]/30 text-[#EED9B6] hover:bg-[#EED9B6]/20"
                    >
                      +
                    </Button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 mb-8">
                  <Button
                    onClick={() => onAddToCart(product, quantity)}
                    className="flex-1 bg-[#EED9B6] text-[#2C1A12] hover:bg-[#EED9B6]/90 py-3"
                  >
                    <ShoppingBag className="w-5 h-5 mr-2" />
                    Add to Cart
                  </Button>
                  <Button
                    onClick={handleWhatsAppOrder}
                    className="flex-1 bg-transparent border-2 border-[#EED9B6] text-[#EED9B6] hover:bg-[#EED9B6] hover:text-[#2C1A12] py-3"
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Order via WhatsApp
                  </Button>
                </div>
              </div>

              {/* Product Details Tabs */}
              <div className="space-y-4">
                <div className="border-b border-[#EED9B6]/30">
                  <div className="flex gap-6">
                    <button
                      onClick={() => setShowNutrition(false)}
                      className={`pb-2 border-b-2 transition-colors ${
                        !showNutrition ? "border-[#EED9B6] text-[#EED9B6]" : "border-transparent text-[#FFF9F2]/60"
                      }`}
                    >
                      Ingredients
                    </button>
                    <button
                      onClick={() => setShowNutrition(true)}
                      className={`pb-2 border-b-2 transition-colors ${
                        showNutrition ? "border-[#EED9B6] text-[#EED9B6]" : "border-transparent text-[#FFF9F2]/60"
                      }`}
                    >
                      Nutrition
                    </button>
                  </div>
                </div>

                {!showNutrition ? (
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-[#EED9B6] font-medium mb-2">Ingredients:</h3>
                      <ul className="text-[#FFF9F2]/80 space-y-1">
                        {product.ingredients.map((ingredient, index) => (
                          <li key={index}>• {ingredient}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-[#EED9B6] font-medium mb-2">Allergens:</h3>
                      <ul className="text-[#FFF9F2]/80 space-y-1">
                        {product.allergens.map((allergen, index) => (
                          <li key={index}>• {allergen}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : (
                  <div>
                    <h3 className="text-[#EED9B6] font-medium mb-4">Nutrition per 100g:</h3>
                    <div className="grid grid-cols-2 gap-4 text-[#FFF9F2]/80">
                      <div>Calories: {product.nutritionPer100g.calories} kcal</div>
                      <div>Fat: {product.nutritionPer100g.fat}g</div>
                      <div>Carbohydrates: {product.nutritionPer100g.carbs}g</div>
                      <div>Protein: {product.nutritionPer100g.protein}g</div>
                      <div>Fiber: {product.nutritionPer100g.fiber}g</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// Shopping Cart Component
function ShoppingCart({
  items,
  onUpdateQuantity,
  onRemove,
  onClose,
}: {
  items: Array<{ product: (typeof chocolateProducts)[0]; quantity: number }>
  onUpdateQuantity: (id: string, quantity: number) => void
  onRemove: (id: string) => void
  onClose: () => void
}) {
  const total = items.reduce((sum, item) => {
    const price = Number.parseInt(item.product.price.replace("ETB ", ""))
    return sum + price * item.quantity
  }, 0)

  const handleWhatsAppOrder = () => {
    const orderText = items.map((item) => `${item.product.name} x${item.quantity} - ${item.product.price}`).join("\n")
    const message = `Hello! I'd like to order:\n\n${orderText}\n\nTotal: ETB ${total}\n\nThank you!`
    const whatsappUrl = `https://wa.me/251912604444?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 300 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 300 }}
      className="fixed right-4 top-20 bottom-4 w-80 bg-[#FFF9F2] rounded-2xl shadow-2xl border border-[#EED9B6]/30 z-40 overflow-hidden"
    >
      <div className="p-4 bg-[#2C1A12] text-[#FFF9F2] flex items-center justify-between">
        <h3 className="font-serif text-lg">Your Cart</h3>
        <Button variant="ghost" size="sm" onClick={onClose} className="text-[#FFF9F2] hover:bg-[#FFF9F2]/20">
          <X className="w-4 h-4" />
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 max-h-96">
        {items.length === 0 ? (
          <div className="text-center text-[#2C1A12]/60 py-8">
            <ShoppingBag className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p>Click on 3D chocolates to add them!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {items.map((item) => (
              <div key={item.product.id} className="bg-[#F5E6D3] rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-[#2C1A12] text-sm">{item.product.name}</h4>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onRemove(item.product.id)}
                    className="text-[#2C1A12]/60 hover:text-red-600 h-6 w-6 p-0"
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </div>
                <p className="text-xs text-[#2C1A12]/70 mb-2">{item.product.description}</p>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-[#2C1A12]">{item.product.price}</span>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onUpdateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                      className="h-6 w-6 p-0 border-[#2C1A12]/30"
                    >
                      -
                    </Button>
                    <span className="text-sm font-medium text-[#2C1A12] w-6 text-center">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                      className="h-6 w-6 p-0 border-[#2C1A12]/30"
                    >
                      +
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {items.length > 0 && (
        <div className="p-4 border-t border-[#EED9B6]/30 bg-[#F5E6D3]">
          <div className="flex items-center justify-between mb-3">
            <span className="font-serif text-lg text-[#2C1A12]">Total:</span>
            <span className="font-bold text-xl text-[#2C1A12]">ETB {total}</span>
          </div>
          <Button onClick={handleWhatsAppOrder} className="w-full bg-[#2C1A12] text-[#FFF9F2] hover:bg-[#2C1A12]/90">
            <MessageCircle className="w-4 h-4 mr-2" />
            Order via WhatsApp
          </Button>
        </div>
      )}
    </motion.div>
  )
}

// Enhanced 3D Scene with interactive elements
function InteractiveChocolateScene({
  onProductSelect,
}: {
  onProductSelect: (product: (typeof chocolateProducts)[0]) => void
}) {
  // Mock products for floating beans and pieces
  const floatingProducts = [
    { id: 'bean1', name: 'Cocoa Bean 1', description: 'A floating cocoa bean', color: '#3D2914', type: 'bean', position: [0,0,0], model: undefined },
    { id: 'bean2', name: 'Cocoa Bean 2', description: 'A floating cocoa bean', color: '#3D2914', type: 'bean', position: [0,0,0], model: undefined },
    { id: 'bean3', name: 'Cocoa Bean 3', description: 'A floating cocoa bean', color: '#3D2914', type: 'bean', position: [0,0,0], model: undefined },
    { id: 'piece1', name: 'Chocolate Piece 1', description: 'A floating chocolate piece', color: '#4A2C17', type: 'piece', position: [0,0,0], model: undefined },
    { id: 'piece2', name: 'Chocolate Piece 2', description: 'A floating chocolate piece', color: '#4A2C17', type: 'piece', position: [0,0,0], model: undefined },
    { id: 'piece3', name: 'Chocolate Piece 3', description: 'A floating chocolate piece', color: '#4A2C17', type: 'piece', position: [0,0,0], model: undefined },
    { id: 'piece4', name: 'Chocolate Piece 4', description: 'A floating chocolate piece', color: '#4A2C17', type: 'piece', position: [0,0,0], model: undefined },
  ];
  return (
    <group>
      {/* Interactive chocolate products */}
      {chocolateProducts.map((product) => (
        <InteractiveChocolateItem key={product.id} product={product} onSelect={onProductSelect} />
      ))}

      {/* Clickable floating cocoa beans */}
      {Array.from({ length: 3 }).map((_, i) => (
        <Float
          key={`bean-${i}`}
          speed={1 + i * 0.2}
          rotationIntensity={0.5}
          floatIntensity={0.5}
          position={[Math.sin(i * 0.8) * 6, Math.cos(i * 0.6) * 4, Math.sin(i * 1.2) * 5]}
        >
          <mesh
            castShadow
            onClick={() => onProductSelect(floatingProducts[i])}
            onPointerOver={e => (e.stopPropagation(), (e.target.scale.x = 1.2))}
            onPointerOut={e => (e.stopPropagation(), (e.target.scale.x = 1))}
          >
            <sphereGeometry args={[0.1, 8, 6]} />
            <meshPhysicalMaterial color="#3D2914" roughness={0.8} />
          </mesh>
        </Float>
      ))}

      {/* Clickable ambient chocolate pieces */}
      {Array.from({ length: 4 }).map((_, i) => (
        <Float
          key={`piece-${i}`}
          speed={0.8 + i * 0.1}
          rotationIntensity={0.3}
          floatIntensity={0.6}
          position={[Math.cos(i * 1.2) * 7, Math.sin(i * 0.9) * 3, Math.cos(i * 0.7) * 6]}
        >
          <mesh
            castShadow
            onClick={() => onProductSelect(floatingProducts[3 + i])}
            onPointerOver={e => (e.stopPropagation(), (e.target.scale.x = 1.2))}
            onPointerOut={e => (e.stopPropagation(), (e.target.scale.x = 1))}
          >
            <boxGeometry args={[0.2, 0.05, 0.3]} />
            <meshPhysicalMaterial color="#4A2C17" roughness={0.3} metalness={0.1} />
          </mesh>
        </Float>
      ))}
    </group>
  )
}

// Enhanced Navigation
function Navigation({ cartItemCount }: { cartItemCount: number }) {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [navModal, setNavModal] = useState<null | string>(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleNavLinkClick = (section: string) => {
    setNavModal(section)
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 ${
        scrolled ? "bg-[#2C1A12]/95 backdrop-blur-md shadow-xl" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between relative z-10">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="font-serif text-2xl font-bold text-[#EED9B6] flex items-center gap-2"
        >
          <Coffee className="w-6 h-6" />
          Muhany
        </motion.div>

        <div className="hidden md:flex items-center gap-8">
          {["Collection", "About", "Occasions", "Contact"].map((item) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              whileHover={{ y: -2 }}
              className="text-[#FFF9F2]/80 hover:text-[#EED9B6] transition-colors"
              onClick={() => handleNavLinkClick(item)}
            >
              {item}
            </motion.a>
          ))}
          <Button size="sm" className="bg-[#EED9B6] text-[#2C1A12] hover:bg-[#EED9B6]/90">
            <ShoppingBag className="w-4 h-4 mr-2" />
            Cart ({cartItemCount})
          </Button>
        </div>

        <Button variant="ghost" size="sm" className="md:hidden text-[#EED9B6]" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </Button>
      </div>

      {navModal && (
        <NavModal
          title={navModal}
          content={`This is placeholder information for ${navModal}. You can update this content later.`}
          onClose={() => setNavModal(null)}
        />
      )}
    </motion.nav>
  )
}

// Custom Components for Styling
const ChocolatePattern = ({ className }: { className?: string }) => (
  <div className={`absolute inset-0 bg-[url('/pattern.svg')] ${className}`} />
)

const CocoaBeanDecoration = ({ className }: { className?: string }) => (
  <div className={`absolute w-24 h-24 rounded-full bg-[#3D2914] shadow-lg ${className}`} />
)

const FloatingChocolate = ({ delay }: { delay: number }) => (
  <motion.div
    animate={{ y: [0, -10, 0] }}
    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: delay }}
    className="absolute inset-0"
  >
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-[#4A2C17] rounded-full shadow-md" />
  </motion.div>
)

// Add a simple modal component
function NavModal({ title, content, onClose }: { title: string, content: string, onClose: () => void }) {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: '#2C1A12', color: '#FFF9F2', padding: 32, borderRadius: 16, minWidth: 320, maxWidth: 480 }}>
        <h2 style={{ fontSize: 28, marginBottom: 16 }}>{title}</h2>
        <div style={{ marginBottom: 24 }}>{content}</div>
        <button onClick={onClose} style={{ background: '#EED9B6', color: '#2C1A12', padding: '8px 24px', borderRadius: 8, border: 'none', fontWeight: 600 }}>Close</button>
      </div>
    </div>
  )
}

// Add state for selected floating product

// Add a modal for floating product info

export default function MuhanyChocos() {
  const { scrollYProgress } = useScroll()
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95])

  // State management
  const [selectedProduct, setSelectedProduct] = useState<(typeof chocolateProducts)[0] | null>(null)
  const [cartItems, setCartItems] = useState<Array<{ product: (typeof chocolateProducts)[0]; quantity: number }>>([])
  const [showCart, setShowCart] = useState(false)
  const [selectedFloatingProduct, setSelectedFloatingProduct] = useState<null | (typeof chocolateProducts)[0]>(null)

  // Ensures modal always opens, even for the same product
  const handleFloatingProductSelect = (product: (typeof chocolateProducts)[0]) => {
    console.log("handleFloatingProductSelect called for:", product.name);
    setSelectedFloatingProduct(null);
    setTimeout(() => setSelectedFloatingProduct(product), 0);
  };

  const handleProductSelect = (product: (typeof chocolateProducts)[0]) => {
    setSelectedProduct(product)
  }

  const handleAddToCart = (product: (typeof chocolateProducts)[0], quantity: number) => {
    const existingItem = cartItems.find((item) => item.product.id === product.id)

    if (existingItem) {
      setCartItems(
        cartItems.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item,
        ),
      )
    } else {
      setCartItems([...cartItems, { product, quantity }])
    }

    setSelectedProduct(null)
    setShowCart(true)
  }

  const handleUpdateQuantity = (id: string, quantity: number) => {
    setCartItems(cartItems.map((item) => (item.product.id === id ? { ...item, quantity } : item)))
  }

  const handleRemoveItem = (id: string) => {
    setCartItems(cartItems.filter((item) => item.product.id !== id))
  }

  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <div className="bg-[#2C1A12] text-[#FFF9F2] overflow-x-hidden">
      <Navigation cartItemCount={cartItemCount} />

      {/* Product Detail Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <ProductDetailPage
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
            onAddToCart={handleAddToCart}
          />
        )}
      </AnimatePresence>

      {/* Shopping Cart */}
      <AnimatePresence>
        {showCart && !selectedProduct && (
          <ShoppingCart
            items={cartItems}
            onUpdateQuantity={handleUpdateQuantity}
            onRemove={handleRemoveItem}
            onClose={() => setShowCart(false)}
          />
        )}
      </AnimatePresence>

      {/* Hero Section with Interactive 3D */}
      <motion.section
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="h-screen relative flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#2C1A12] via-[#3D2914] to-[#2C1A12]" />

        {/* Interactive 3D Scene */}
        <div className="absolute inset-0 z-10">
          <Canvas camera={{ position: [0, 0, 12], fov: 45 }} shadows>
            <ambientLight intensity={0.4} />
            <pointLight position={[10, 10, 10]} intensity={1} castShadow />
            <spotLight position={[-10, -10, -10]} intensity={0.5} />
            <InteractiveChocolateScene onProductSelect={handleFloatingProductSelect} />
            <Environment preset="city" />
            <OrbitControls
              enableZoom={true}
              enablePan={true}
              autoRotate
              autoRotateSpeed={0.5}
              maxDistance={20}
              minDistance={8}
              maxPolarAngle={Math.PI / 1.5}
              minPolarAngle={Math.PI / 4}
            />
          </Canvas>
        </div>

        {/* Hero Content */}
        <div className="relative z-20 text-center px-4 max-w-5xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="font-serif text-6xl md:text-8xl lg:text-9xl mb-6 bg-gradient-to-r from-[#FFF9F2] via-[#EED9B6] to-[#FFF9F2] bg-clip-text text-transparent"
          >
            Muhany Chocos
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="text-2xl md:text-3xl font-serif text-[#EED9B6] mb-4"
          >
            Interactive 3D Chocolate Experience
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.1 }}
            className="text-lg md:text-xl text-[#FFF9F2]/80 mb-8 max-w-2xl mx-auto leading-relaxed"
          >
            Click on any floating chocolate to explore detailed product pages and order directly!
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              onClick={() => setShowCart(true)}
              size="lg"
              className="bg-[#EED9B6] text-[#2C1A12] hover:bg-[#EED9B6]/90 text-lg px-8 py-6 rounded-full font-medium"
            >
              <ShoppingBag className="w-5 h-5 mr-2" />
              View Cart ({cartItemCount})
            </Button>
          </motion.div>
        </div>

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2 }}
          className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-20 text-center"
        >
          <div className="bg-[#2C1A12]/80 backdrop-blur-sm rounded-2xl px-6 py-4 border border-[#EED9B6]/30">
            <div className="flex items-center gap-2 text-[#EED9B6] mb-2">
              <Sparkles className="w-5 h-5" />
              <span className="font-medium">Click any chocolate to view details!</span>
              <Sparkles className="w-5 h-5" />
            </div>
            <p className="text-[#FFF9F2]/80 text-sm">Hover for quick info • Click for full product page</p>
          </div>
        </motion.div>

        <motion.div
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center gap-2"
        >
          <span className="text-[#EED9B6]/60 text-sm">Scroll to explore more</span>
          <ChevronDown className="w-6 h-6 text-[#EED9B6]" />
        </motion.div>
      </motion.section>

      {/* Cart Toggle Button */}
      {!showCart && !selectedProduct && cartItemCount > 0 && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setShowCart(true)}
          className="fixed top-24 right-4 z-30 bg-[#EED9B6] text-[#2C1A12] rounded-full p-3 shadow-2xl border-2 border-[#2C1A12]/20"
        >
          <ShoppingBag className="w-6 h-6" />
          <span className="absolute -top-2 -right-2 bg-[#2C1A12] text-[#FFF9F2] rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
            {cartItemCount}
          </span>
        </motion.button>
      )}

      {/* About Our Craft Section */}
      <section className="py-20 bg-gradient-to-r from-[#EED9B6] to-[#F5E6D3] relative overflow-hidden">
        <ChocolatePattern className="opacity-10" />
        <CocoaBeanDecoration className="top-10 left-10" />
        <CocoaBeanDecoration className="bottom-10 right-10" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-serif text-5xl md:text-6xl text-[#2C1A12] mb-6">Our Ethiopian Heritage</h2>
            <p className="text-xl text-[#2C1A12]/80 max-w-2xl mx-auto">
              From the birthplace of coffee comes the finest chocolate, crafted with generations of expertise
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "🌱",
                title: "Farm to Bar",
                desc: "Direct partnerships with Ethiopian cacao farmers ensuring fair trade and quality",
              },
              {
                icon: "👨‍🍳",
                title: "Master Craftsmanship",
                desc: "Traditional techniques passed down through generations of chocolate makers",
              },
              {
                icon: "🏆",
                title: "Award Winning",
                desc: "Recognized internationally for our unique Ethiopian chocolate flavors",
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="relative"
              >
                <FloatingChocolate delay={index * 2} />
                <Card className="bg-[#2C1A12]/10 backdrop-blur-sm border-[#2C1A12]/20 h-full relative overflow-hidden">
                  <ChocolatePattern className="opacity-5" />
                  <CardContent className="p-8 text-center relative z-10">
                    <div className="text-4xl mb-4">{item.icon}</div>
                    <h3 className="font-serif text-2xl text-[#2C1A12] mb-3">{item.title}</h3>
                    <p className="text-[#2C1A12]/70">{item.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/251912604444"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          zIndex: 1000,
          background: '#25D366',
          borderRadius: '50%',
          width: 60,
          height: 60,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
        }}
        title="Chat with us on WhatsApp"
      >
        <svg width="32" height="32" viewBox="0 0 32 32" fill="white">
          <path d="M16 3C9.373 3 4 8.373 4 15c0 2.385.832 4.584 2.236 6.364L4 29l7.01-2.184C12.99 27.605 14.48 28 16 28c6.627 0 12-5.373 12-12S22.627 3 16 3zm0 22c-1.29 0-2.553-.25-3.74-.74l-.267-.11-4.16 1.297 1.297-4.16-.11-.267C6.25 17.553 6 16.29 6 15c0-5.514 4.486-10 10-10s10 4.486 10 10-4.486 10-10 10zm5.29-7.71c-.26-.13-1.53-.76-1.77-.85-.24-.09-.41-.13-.58.13-.17.26-.67.85-.82 1.02-.15.17-.3.19-.56.06-.26-.13-1.09-.4-2.07-1.28-.76-.68-1.28-1.52-1.43-1.78-.15-.26-.02-.4.11-.53.11-.11.26-.3.39-.45.13-.15.17-.26.26-.43.09-.17.04-.32-.02-.45-.06-.13-.58-1.4-.8-1.92-.21-.51-.43-.44-.58-.45-.15-.01-.32-.01-.5-.01-.17 0-.45.06-.68.28-.23.22-.9.88-.9 2.15 0 1.27.92 2.5 1.05 2.67.13.17 1.81 2.77 4.39 3.78.61.21 1.09.33 1.46.42.61.15 1.16.13 1.6.08.49-.06 1.53-.62 1.75-1.22.22-.6.22-1.12.15-1.22-.07-.1-.24-.16-.5-.29z"/>
        </svg>
      </a>

      {/* Render the FloatingProductModal if selectedFloatingProduct is set */}
      {selectedFloatingProduct && (
        <ProductModal product={selectedFloatingProduct} open={!!selectedFloatingProduct} onClose={() => setSelectedFloatingProduct(null)} />
      )}
    </div>
  )
}
