"use client"
import { useState, useEffect } from "react"
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
import ProductModal from "@/components/ProductModal"
import { muhanyProducts } from "@/data/products"

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
    <nav
      className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 ${
        scrolled ? "bg-[#2C1A12]/95 backdrop-blur-md shadow-xl" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between relative z-10">
        <div className="font-serif text-2xl font-bold text-[#EED9B6] flex items-center gap-2">
          <Coffee className="w-6 h-6" />
          Muhany
        </div>

        <div className="hidden md:flex items-center gap-8">
          {["Collection", "About", "Occasions", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-[#FFF9F2]/80 hover:text-[#EED9B6] transition-colors"
              onClick={() => handleNavLinkClick(item)}
            >
              {item}
            </a>
          ))}
          <a
            key="Shop"
            href="/shop"
            className="text-[#FFF9F2]/80 hover:text-[#EED9B6] transition-colors"
          >
            Shop
          </a>
          <Button size="sm" className="bg-[#EED9B6] text-[#2C1A12] hover:bg-[#EED9B6]/90">
            <ShoppingBag className="w-4 h-4 mr-2" />
            Cart ({cartItemCount})
          </Button>
        </div>

        <Button variant="ghost" size="sm" className="md:hidden text-[#EED9B6]" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </Button>
      </div>

      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[#2C1A12] shadow-lg z-20 flex flex-col items-center py-4 gap-4">
          {["Collection", "About", "Occasions", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-[#FFF9F2]/80 hover:text-[#EED9B6] text-lg"
              onClick={() => {
                handleNavLinkClick(item);
                setIsOpen(false);
              }}
            >
              {item}
            </a>
          ))}
          <a
            key="Shop"
            href="/shop"
            className="text-[#FFF9F2]/80 hover:text-[#EED9B6] text-lg"
            onClick={() => setIsOpen(false)}
          >
            Shop
          </a>
        </div>
      )}
      {navModal && (
        <NavModal
          title={navModal}
          content={`This is placeholder information for ${navModal}. You can update this content later.`}
          onClose={() => setNavModal(null)}
        />
      )}
    </nav>
  )
}

// Custom Components for Styling
const ChocolatePattern = ({ className }: { className?: string }) => (
  <div className={`absolute inset-0 bg-[url('/pattern.svg')] ${className}`} />
)

const CocoaBeanDecoration = ({ className }: { className?: string }) => (
  <div className={`absolute w-24 h-24 rounded-full bg-[#3D2914] shadow-lg ${className}`} />
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

// Featured Products Section
function FeaturedProducts({ onProductSelect }: { onProductSelect: (product: any) => void }) {
  const featuredProducts = muhanyProducts.slice(0, 6)
  
  return (
    <section className="py-20 bg-gradient-to-br from-[#2C1A12] to-[#3D2914] relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-serif text-5xl md:text-6xl text-[#EED9B6] mb-6">Featured Products</h2>
          <p className="text-xl text-[#FFF9F2]/80 max-w-2xl mx-auto">
            Discover our most popular chocolate creations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product, index) => (
            <div
              key={product.id}
              className="cursor-pointer hover:-translate-y-1 transition-transform duration-300"
              onClick={() => onProductSelect(product)}
            >
              <Card className="bg-[#FFF9F2]/10 backdrop-blur-sm border-[#EED9B6]/30 h-full relative overflow-hidden group">
                <CardContent className="p-6">
                  <div className="relative mb-4">
                    <Image
                      src={product.images[0] || "/placeholder.svg"}
                      alt={product.name}
                      width={300}
                      height={200}
                      className="w-full h-48 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge className="absolute top-2 left-2 bg-[#2C1A12]/80 text-[#FFF9F2]">
                      {product.category}
                    </Badge>
                  </div>
                  <h3 className="font-serif text-xl text-[#EED9B6] mb-2">{product.name}</h3>
                  <p className="text-[#FFF9F2]/70 mb-3 line-clamp-2">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-[#EED9B6]">{product.price}</span>
                    <Button size="sm" className="bg-[#EED9B6] text-[#2C1A12] hover:bg-[#EED9B6]/90">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function MuhanyChocos() {
  // State management
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [cartItems, setCartItems] = useState<Array<{ product: any; quantity: number }>>([])
  const [showCart, setShowCart] = useState(false)

  const handleProductSelect = (product: any) => {
    setSelectedProduct(product)
  }

  const handleAddToCart = (product: any, quantity: number) => {
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

  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <div className="bg-[#2C1A12] text-[#FFF9F2] overflow-x-hidden">
      <Navigation cartItemCount={cartItemCount} />

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          open={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}

      {/* Hero Section */}
      <section className="h-screen relative flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#2C1A12] via-[#3D2914] to-[#2C1A12]" />

        {/* Hero Content */}
        <div className="relative z-20 text-center px-4 max-w-5xl mx-auto">
          <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl mb-6 bg-gradient-to-r from-[#FFF9F2] via-[#EED9B6] to-[#FFF9F2] bg-clip-text text-transparent">
            Muhany Chocos
          </h1>

          <p className="text-2xl md:text-3xl font-serif text-[#EED9B6] mb-4">
            Premium Ethiopian Chocolate Experience
          </p>

          <p className="text-lg md:text-xl text-[#FFF9F2]/80 mb-8 max-w-2xl mx-auto leading-relaxed">
            Discover our handcrafted chocolates, made with the finest Ethiopian ingredients and traditional recipes
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => window.location.href = '/shop'}
              size="lg"
              className="bg-[#EED9B6] text-[#2C1A12] hover:bg-[#EED9B6]/90 text-lg px-8 py-6 rounded-full font-medium"
            >
              <ShoppingBag className="w-5 h-5 mr-2" />
              Shop Now
            </Button>
            <Button
              onClick={() => setShowCart(true)}
              size="lg"
              variant="outline"
              className="border-2 border-[#EED9B6] text-[#EED9B6] hover:bg-[#EED9B6] hover:text-[#2C1A12] text-lg px-8 py-6 rounded-full font-medium"
            >
              View Cart ({cartItemCount})
            </Button>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center gap-2">
          <span className="text-[#EED9B6]/60 text-sm">Scroll to explore more</span>
          <ChevronDown className="w-6 h-6 text-[#EED9B6]" />
        </div>
      </section>

      {/* Featured Products */}
      <FeaturedProducts onProductSelect={handleProductSelect} />

      {/* About Our Craft Section */}
      <section className="py-20 bg-gradient-to-r from-[#EED9B6] to-[#F5E6D3] relative overflow-hidden">
        <ChocolatePattern className="opacity-10" />
        <CocoaBeanDecoration className="top-10 left-10" />
        <CocoaBeanDecoration className="bottom-10 right-10" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="font-serif text-5xl md:text-6xl text-[#2C1A12] mb-6">Our Ethiopian Heritage</h2>
            <p className="text-xl text-[#2C1A12]/80 max-w-2xl mx-auto">
              From the birthplace of coffee comes the finest chocolate, crafted with generations of expertise
            </p>
          </div>

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
              <div
                key={item.title}
                className="relative hover:-translate-y-1 transition-transform duration-300"
              >
                <Card className="bg-[#2C1A12]/10 backdrop-blur-sm border-[#2C1A12]/20 h-full relative overflow-hidden">
                  <ChocolatePattern className="opacity-5" />
                  <CardContent className="p-8 text-center relative z-10">
                    <div className="text-4xl mb-4">{item.icon}</div>
                    <h3 className="font-serif text-2xl text-[#2C1A12] mb-3">{item.title}</h3>
                    <p className="text-[#2C1A12]/70">{item.desc}</p>
                  </CardContent>
                </Card>
              </div>
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
    </div>
  )
}
