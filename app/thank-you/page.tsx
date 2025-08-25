"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, ShoppingBag, MessageCircle } from "lucide-react"
import Link from "next/link"

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5E6D3] to-[#EED9B6] flex items-center justify-center p-4">
      <Card className="max-w-md w-full bg-white/80 backdrop-blur-sm border-[#EED9B6]/30">
        <CardContent className="p-8 text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-3xl font-serif text-[#2C1A12] mb-4">Thank You!</h1>
          <p className="text-[#2C1A12]/60 mb-6">
            Your order has been successfully placed. We'll contact you shortly to confirm your order and arrange delivery.
          </p>
          
          <div className="space-y-4">
            <div className="bg-[#FFF9F2] rounded-lg p-4">
              <h3 className="font-medium text-[#2C1A12] mb-2">What's Next?</h3>
              <ul className="text-sm text-[#2C1A12]/60 space-y-1">
                <li>• We'll confirm your order via WhatsApp</li>
                <li>• Prepare your delicious chocolates</li>
                <li>• Deliver to your doorstep</li>
                <li>• Enjoy your premium Ethiopian chocolates!</li>
              </ul>
            </div>

            <div className="flex gap-3">
              <Link href="/shop" className="flex-1">
                <Button variant="outline" className="w-full border-[#2C1A12] text-[#2C1A12] hover:bg-[#2C1A12] hover:text-[#FFF9F2]">
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  Continue Shopping
                </Button>
              </Link>
              <Button 
                onClick={() => window.open('https://wa.me/251912604444', '_blank')}
                className="flex-1 bg-[#2C1A12] text-[#FFF9F2] hover:bg-[#2C1A12]/90"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Contact Us
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 