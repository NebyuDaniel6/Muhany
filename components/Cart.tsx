"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { X, Plus, Minus, ShoppingBag, Trash2 } from "lucide-react"
import Image from "next/image"
import { useCart, CartItem } from "@/hooks/use-cart"

interface CartProps {
  open: boolean
  onClose: () => void
}

export default function Cart({ open, onClose }: CartProps) {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart()

  const formatPrice = (price: number) => {
    return `ETB ${price.toLocaleString()}`
  }

  const handleQuantityChange = (item: CartItem, newQuantity: number) => {
    updateQuantity(item.product.id, newQuantity)
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-[#2C1A12]">
            <ShoppingBag className="w-5 h-5" />
            Shopping Cart ({cart.totalItems})
          </DialogTitle>
        </DialogHeader>

        {cart.items.length === 0 ? (
          <div className="text-center py-8">
            <ShoppingBag className="w-16 h-16 text-[#2C1A12]/40 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-[#2C1A12] mb-2">Your cart is empty</h3>
            <p className="text-[#2C1A12]/60 mb-4">Add some delicious chocolates to get started!</p>
            <Button onClick={onClose} className="bg-[#2C1A12] text-[#FFF9F2] hover:bg-[#2C1A12]/90">
              Continue Shopping
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Cart Items */}
            <div className="space-y-3">
              {cart.items.map((item) => (
                <Card key={item.product.id} className="bg-[#FFF9F2]/50 border-[#EED9B6]/30">
                  <CardContent className="p-4">
                    <div className="flex gap-3">
                      {/* Product Image */}
                      <div className="relative w-16 h-16 flex-shrink-0">
                        <Image
                          src={item.product.images[0] || "/placeholder.svg"}
                          alt={item.product.name}
                          fill
                          className="object-cover rounded-lg"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-[#2C1A12] truncate">
                              {item.product.name}
                            </h4>
                            <p className="text-sm text-[#2C1A12]/60">
                              {item.product.category}
                            </p>
                            <p className="font-medium text-[#EED9B6]">
                              {item.product.price}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFromCart(item.product.id)}
                            className="text-[#2C1A12]/60 hover:text-[#2C1A12] hover:bg-[#2C1A12]/10"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2 mt-3">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleQuantityChange(item, item.quantity - 1)}
                            className="w-8 h-8 p-0 border-[#EED9B6] text-[#2C1A12] hover:bg-[#EED9B6]"
                          >
                            <Minus className="w-3 h-3" />
                          </Button>
                          <Badge variant="secondary" className="bg-[#2C1A12] text-[#FFF9F2]">
                            {item.quantity}
                          </Badge>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleQuantityChange(item, item.quantity + 1)}
                            className="w-8 h-8 p-0 border-[#EED9B6] text-[#2C1A12] hover:bg-[#EED9B6]"
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Separator className="bg-[#EED9B6]/30" />

            {/* Cart Summary */}
            <div className="space-y-3">
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

            {/* Action Buttons */}
            <div className="flex gap-2 pt-4">
              <Button
                variant="outline"
                onClick={clearCart}
                className="flex-1 border-[#2C1A12] text-[#2C1A12] hover:bg-[#2C1A12] hover:text-[#FFF9F2]"
              >
                Clear Cart
              </Button>
              <Button
                onClick={() => {
                  onClose()
                  window.location.href = "/checkout"
                }}
                className="flex-1 bg-[#2C1A12] text-[#FFF9F2] hover:bg-[#2C1A12]/90"
              >
                Checkout
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
} 