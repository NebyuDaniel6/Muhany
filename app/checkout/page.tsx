"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, ShoppingBag, MapPin, Phone, Mail, Clock } from "lucide-react"
import Image from "next/image"
import { useCart } from "@/hooks/use-cart"
import Link from "next/link"

export default function CheckoutPage() {
  const { cart, clearCart } = useCart()
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    deliveryNotes: "",
    paymentMethod: "cash"
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const formatPrice = (price: number) => {
    return `ETB ${price.toLocaleString()}`
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate order processing
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Create WhatsApp message
    const orderItems = cart.items.map(item => 
      `${item.product.name} x${item.quantity} - ${item.product.price}`
    ).join('\n')

    const message = `🍫 *New Order from Muhany Website*

*Customer Details:*
Name: ${formData.name}
Phone: ${formData.phone}
Email: ${formData.email}
Address: ${formData.address}, ${formData.city}

*Order Items:*
${orderItems}

*Order Summary:*
Subtotal: ${formatPrice(cart.totalPrice)}
Delivery: Free
Total: ${formatPrice(cart.totalPrice)}

*Delivery Notes:*
${formData.deliveryNotes || 'None'}

*Payment Method:*
${formData.paymentMethod === 'cash' ? 'Cash on Delivery' : 'Bank Transfer'}

---
Order placed via website at ${new Date().toLocaleString()}`

    const whatsappUrl = `https://wa.me/251912604444?text=${encodeURIComponent(message)}`
    
    // Clear cart and redirect to WhatsApp
    clearCart()
    window.open(whatsappUrl, "_blank")
    
    // Redirect to thank you page
    window.location.href = "/thank-you"
  }

  if (cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F5E6D3] to-[#EED9B6] flex items-center justify-center">
        <Card className="max-w-md w-full mx-4">
          <CardContent className="p-8 text-center">
            <ShoppingBag className="w-16 h-16 text-[#2C1A12]/40 mx-auto mb-4" />
            <h2 className="text-2xl font-serif text-[#2C1A12] mb-2">Your cart is empty</h2>
            <p className="text-[#2C1A12]/60 mb-6">Add some delicious chocolates to your cart first!</p>
            <Link href="/shop">
              <Button className="bg-[#2C1A12] text-[#FFF9F2] hover:bg-[#2C1A12]/90">
                Continue Shopping
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
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
          <h1 className="text-4xl font-serif text-[#2C1A12] mb-2">Checkout</h1>
          <p className="text-[#2C1A12]/60">Complete your order and we'll deliver your chocolates!</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Order Form */}
          <Card className="bg-white/80 backdrop-blur-sm border-[#EED9B6]/30">
            <CardHeader>
              <CardTitle className="text-[#2C1A12]">Delivery Information</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="text-[#2C1A12]">Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      required
                      className="border-[#EED9B6]/50 focus:border-[#2C1A12]"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-[#2C1A12]">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      required
                      className="border-[#EED9B6]/50 focus:border-[#2C1A12]"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email" className="text-[#2C1A12]">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="border-[#EED9B6]/50 focus:border-[#2C1A12]"
                  />
                </div>

                <div>
                  <Label htmlFor="address" className="text-[#2C1A12]">Delivery Address *</Label>
                  <Textarea
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    required
                    className="border-[#EED9B6]/50 focus:border-[#2C1A12]"
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="city" className="text-[#2C1A12]">City *</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                    required
                    className="border-[#EED9B6]/50 focus:border-[#2C1A12]"
                  />
                </div>

                <div>
                  <Label htmlFor="deliveryNotes" className="text-[#2C1A12]">Delivery Notes</Label>
                  <Textarea
                    id="deliveryNotes"
                    value={formData.deliveryNotes}
                    onChange={(e) => handleInputChange("deliveryNotes", e.target.value)}
                    className="border-[#EED9B6]/50 focus:border-[#2C1A12]"
                    rows={2}
                    placeholder="Any special instructions for delivery..."
                  />
                </div>

                <div>
                  <Label className="text-[#2C1A12]">Payment Method</Label>
                  <div className="flex gap-4 mt-2">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cash"
                        checked={formData.paymentMethod === "cash"}
                        onChange={(e) => handleInputChange("paymentMethod", e.target.value)}
                        className="text-[#2C1A12]"
                      />
                      <span className="text-[#2C1A12]">Cash on Delivery</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="bank"
                        checked={formData.paymentMethod === "bank"}
                        onChange={(e) => handleInputChange("paymentMethod", e.target.value)}
                        className="text-[#2C1A12]"
                      />
                      <span className="text-[#2C1A12]">Bank Transfer</span>
                    </label>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#2C1A12] text-[#FFF9F2] hover:bg-[#2C1A12]/90 py-3"
                >
                  {isSubmitting ? "Processing..." : "Place Order"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Order Summary */}
          <div className="space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm border-[#EED9B6]/30">
              <CardHeader>
                <CardTitle className="text-[#2C1A12]">Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {cart.items.map((item) => (
                    <div key={item.product.id} className="flex gap-3">
                      <div className="relative w-16 h-16 flex-shrink-0">
                        <Image
                          src={item.product.images[0] || "/placeholder.svg"}
                          alt={item.product.name}
                          fill
                          className="object-cover rounded-lg"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-[#2C1A12] truncate">
                          {item.product.name}
                        </h4>
                        <p className="text-sm text-[#2C1A12]/60">
                          {item.product.category}
                        </p>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-sm text-[#2C1A12]/60">
                            Qty: {item.quantity}
                          </span>
                          <span className="font-medium text-[#EED9B6]">
                            {item.product.price}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator className="my-4 bg-[#EED9B6]/30" />

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#2C1A12]/60">Subtotal ({cart.totalItems} items)</span>
                    <span className="font-medium text-[#2C1A12]">
                      {formatPrice(cart.totalPrice)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#2C1A12]/60">Delivery</span>
                    <span className="font-medium text-[#2C1A12]">Free</span>
                  </div>
                  <Separator className="bg-[#EED9B6]/30" />
                  <div className="flex justify-between text-lg font-bold">
                    <span className="text-[#2C1A12]">Total</span>
                    <span className="text-[#EED9B6]">{formatPrice(cart.totalPrice)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Delivery Info */}
            <Card className="bg-white/80 backdrop-blur-sm border-[#EED9B6]/30">
              <CardHeader>
                <CardTitle className="text-[#2C1A12] flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Delivery Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-[#EED9B6] mt-0.5" />
                  <div>
                    <h4 className="font-medium text-[#2C1A12]">Delivery Time</h4>
                    <p className="text-sm text-[#2C1A12]/60">
                      Same day delivery for orders placed before 2 PM
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-[#EED9B6] mt-0.5" />
                  <div>
                    <h4 className="font-medium text-[#2C1A12]">Contact Us</h4>
                    <p className="text-sm text-[#2C1A12]/60">
                      Call us at +251 912 604 444 for any questions
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
} 