"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Star,
  Heart,
  TrendingUp,
  Users,
  Shield,
  Truck,
  Clock,
  ChefHat,
  BarChart3,
  Handshake,
  Globe,
  Award,
  Sparkles,
  Gift,
  DollarSign,
  Camera,
  ArrowLeft,
} from "lucide-react"
import { useRef } from "react"

export default function PresentationPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()

  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.1])

  return (
    <div ref={containerRef} className="relative bg-background text-foreground">
      {/* Back Button */}
      <div className="fixed top-6 left-6 z-50">
        <Button 
          variant="ghost" 
          onClick={() => window.history.back()}
          className="bg-background/80 backdrop-blur-sm border border-border hover:bg-background text-foreground"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Main Site
        </Button>
      </div>

      {/* Hero Section */}
      <motion.section
        style={{ opacity: heroOpacity }}
        className="relative h-screen flex items-center justify-center overflow-hidden"
      >
        <motion.div style={{ scale: heroScale }} className="absolute inset-0 z-0">
          {/* Generated Arabian restaurant interior */}
          <img
            src="/luxurious-arabian-restaurant-interior-warm-lightin.jpg"
            alt="Luxurious Arabian Restaurant Interior"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="relative z-10 text-center px-4 max-w-5xl mx-auto"
        >
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 text-balance">
            Elevating Hospitality Through Culinary Excellence
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-12 font-light tracking-wide">
            Muhany Chocos × Ethiopian Airlines Skylight Hotel
          </p>
          <Button
            size="lg"
            className="bg-[#EED9B6] text-[#2C1A12] hover:bg-[#EED9B6]/90 text-lg px-8 py-6 rounded-full"
          >
            Explore Partnership
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        >
          <div className="flex flex-col items-center gap-2 text-white/70">
            <span className="text-sm tracking-widest uppercase">Scroll</span>
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}>
              <div className="w-[1px] h-12 bg-white/50" />
            </motion.div>
          </div>
        </motion.div>
      </motion.section>

      {/* Vision & Goals Section */}
      <section className="py-32 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="font-serif text-5xl md:text-6xl font-bold text-foreground mb-4">
              Our Vision
            </h2>
            <div className="w-24 h-[2px] bg-[#EED9B6] mx-auto" />
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Star,
                title: "Enhance Skylight's Brand",
                description:
                  "Position Skylight as a premier hospitality destination renowned for exceptional experiences",
              },
              {
                icon: Heart,
                title: "Delight Guests",
                description:
                  "Create distinctive culinary experiences that captivate international travelers and local guests",
              },
              {
                icon: TrendingUp,
                title: "Drive Revenue Growth",
                description: "Unlock new revenue streams through innovative F&B concepts and memorable events",
              },
            ].map((pillar, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="p-8 h-full bg-[#FFF9F2]/10 backdrop-blur-sm border-[#EED9B6]/30 hover:border-[#EED9B6]/50 transition-all duration-300 hover:shadow-xl">
                  <pillar.icon className="w-12 h-12 text-[#EED9B6] mb-6" />
                  <h3 className="font-serif text-2xl font-bold text-[#EED9B6] mb-4">
                    {pillar.title}
                  </h3>
                  <p className="text-[#FFF9F2]/70 leading-relaxed">{pillar.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Authentic Excellence Section */}
      <section className="py-32 px-4 bg-[#2C1A12]">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="font-serif text-5xl md:text-6xl font-bold text-[#EED9B6] mb-8">
                Authentic Excellence
              </h2>
              <div className="w-24 h-[2px] bg-[#EED9B6] mb-8" />
              <p className="text-xl text-[#FFF9F2]/80 leading-relaxed mb-6">
                A distinctive blend of Middle Eastern tradition, spice, and modern presentation that delights
                international travelers and discerning local guests.
              </p>
              <p className="text-lg text-[#FFF9F2]/70 leading-relaxed">
                Our culinary approach honors centuries-old recipes while embracing contemporary techniques, creating an
                unforgettable dining experience that tells a story with every dish.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative h-[600px] rounded-lg overflow-hidden shadow-2xl"
            >
              {/* Generated Arabian interior render */}
              <img
                src="/elegant-arabian-middle-eastern-restaurant-interior.jpg"
                alt="Elegant Arabian Interior"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Muhany Chocos Brand Video Section */}
      <section className="py-32 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-5xl md:text-6xl font-bold text-foreground mb-4">
              The Muhany Chocos Story
            </h2>
            <div className="w-24 h-[2px] bg-[#EED9B6] mx-auto mb-6" />
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover our passion for authentic Middle Eastern culinary excellence
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative aspect-video rounded-lg overflow-hidden shadow-2xl bg-muted"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 rounded-full bg-[#EED9B6]/20 flex items-center justify-center mx-auto mb-4">
                  <div className="w-0 h-0 border-t-[12px] border-t-transparent border-l-[20px] border-l-[#EED9B6] border-b-[12px] border-b-transparent ml-1" />
                </div>
                <p className="text-muted-foreground text-lg">Muhany Chocos Brand Video</p>
                <p className="text-muted-foreground/60 text-sm mt-2">Video embed placeholder</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Ethiopian Airlines Skylight Hotel Video Section */}
      <section className="py-32 px-4 bg-[#2C1A12]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-5xl md:text-6xl font-bold text-[#EED9B6] mb-4">
              Ethiopian Airlines Skylight Hotel
            </h2>
            <div className="w-24 h-[2px] bg-[#EED9B6] mx-auto mb-6" />
            <p className="text-xl text-[#FFF9F2]/80 max-w-3xl mx-auto">
              Experience world-class hospitality and exceptional facilities
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative aspect-video rounded-lg overflow-hidden shadow-2xl bg-muted"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 rounded-full bg-[#EED9B6]/20 flex items-center justify-center mx-auto mb-4">
                  <div className="w-0 h-0 border-t-[12px] border-t-transparent border-l-[20px] border-l-[#EED9B6] border-b-[12px] border-b-transparent ml-1" />
                </div>
                <p className="text-muted-foreground text-lg">Skylight Hotel Showcase Video</p>
                <p className="text-muted-foreground/60 text-sm mt-2">Video embed placeholder</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Operational Model Section */}
      <section className="py-32 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="font-serif text-5xl md:text-6xl font-bold text-foreground mb-4">
              Operational Model
            </h2>
            <div className="w-24 h-[2px] bg-[#EED9B6] mx-auto mb-6" />
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive management ensuring excellence at every touchpoint
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Users,
                title: "Staff Management",
                description: "Expert recruiting, training, and performance optimization",
              },
              {
                icon: Shield,
                title: "Quality Standards",
                description: "Rigorous hygiene, safety protocols, and consistency",
              },
              {
                icon: Truck,
                title: "Logistics",
                description: "Seamless procurement, kitchen operations, supply chain",
              },
              {
                icon: Clock,
                title: "24/7 Service",
                description: "Round-the-clock dining, room service, and events",
              },
              {
                icon: ChefHat,
                title: "Menu Innovation",
                description: "Seasonal updates and guest feedback integration",
              },
              {
                icon: BarChart3,
                title: "Performance Tracking",
                description: "Transparent reporting and KPI monitoring",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 h-full bg-[#FFF9F2]/10 backdrop-blur-sm border-[#EED9B6]/30 hover:border-[#EED9B6]/50 transition-all duration-300 hover:shadow-lg group">
                  <item.icon className="w-10 h-10 text-[#EED9B6] mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="font-serif text-xl font-bold text-[#EED9B6] mb-3">
                    {item.title}
                  </h3>
                  <p className="text-[#FFF9F2]/70 leading-relaxed">{item.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium In-Room Dining Section */}
      <section className="py-32 px-4 bg-[#2C1A12]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="font-serif text-5xl md:text-6xl font-bold text-[#EED9B6] mb-4">
              Elevating In-Room Dining Experiences
            </h2>
            <div className="w-24 h-[2px] bg-[#EED9B6] mx-auto" />
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Curated Menus",
                description: "Thoughtfully designed selections featuring authentic Middle Eastern cuisine",
                image: "/luxury-hotel-room-service-arabian-food-tray-elegan.jpg",
              },
              {
                title: "Presentation Excellence",
                description: "Every dish arrives as a work of art, enhancing the guest experience",
                image: "/elegant-in-room-dining-setup-luxury-hotel-middle-e.jpg",
              },
              {
                title: "Timely Service",
                description: "Prompt delivery maintaining optimal temperature and quality",
                image: "/luxury-hotel-room-dining-experience-arabian-style-.jpg",
              },
              {
                title: "Personalization",
                description: "Customized options catering to dietary preferences and cultural needs",
                image: "/personalized-luxury-dining-experience-hotel-room-m.jpg",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative group overflow-hidden rounded-lg shadow-xl"
              >
                <div className="relative h-80">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="font-serif text-2xl font-bold mb-2">{item.title}</h3>
                  <p className="text-white/90 leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Boutique Experience Section */}
      <section className="py-32 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-5xl md:text-6xl font-bold text-foreground mb-4">
              Boutique Chocolate & Dessert Experience
            </h2>
            <div className="w-24 h-[2px] bg-[#EED9B6] mx-auto mb-6" />
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Transform guest indulgence into a signature Skylight feature through our luxury dessert and chocolate
              counter.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative h-[600px] rounded-lg overflow-hidden shadow-2xl mb-12"
          >
            {/* Generated Arabian dessert counter */}
            <img
              src="/luxury-arabian-chocolate-dessert-counter-boutique-.jpg"
              alt="Luxury Dessert Counter"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-12 text-white">
              <p className="text-2xl md:text-3xl font-light leading-relaxed max-w-4xl text-balance">
                Transform guest indulgence into a signature Skylight feature through our luxury dessert and chocolate
                counter.
              </p>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Gift,
                title: "Premium Gifts & Takeaways",
                description: "Curated selections perfect for travelers seeking authentic souvenirs",
              },
              {
                icon: DollarSign,
                title: "Additional Revenue Stream",
                description: "High-margin products that enhance profitability",
              },
              {
                icon: Camera,
                title: "Instagram-Worthy Luxury",
                description: "Visually stunning displays that drive social media engagement",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="p-8 h-full bg-[#FFF9F2]/10 backdrop-blur-sm border-[#EED9B6]/30 text-center hover:border-[#EED9B6]/50 transition-all duration-300">
                  <feature.icon className="w-12 h-12 text-[#EED9B6] mb-4 mx-auto" />
                  <h3 className="font-serif text-xl font-bold text-[#EED9B6] mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-[#FFF9F2]/70 leading-relaxed">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-32 px-4 bg-[#2C1A12]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="font-serif text-5xl md:text-6xl font-bold text-[#EED9B6] mb-4">
              Why Choose Us
            </h2>
            <div className="w-24 h-[2px] bg-[#EED9B6] mx-auto" />
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Handshake,
                title: "Turnkey Partner",
                description: "Complete operational management from concept to execution",
              },
              {
                icon: Globe,
                title: "Authentic Diversity",
                description: "Genuine Middle Eastern cuisine with international appeal",
              },
              {
                icon: Heart,
                title: "Guest-Centered Experience",
                description: "Every decision focused on exceeding guest expectations",
              },
              {
                icon: TrendingUp,
                title: "Revenue Growth",
                description: "Proven strategies to maximize F&B profitability",
              },
              {
                icon: Award,
                title: "Professional Integrity",
                description: "Unwavering commitment to quality and excellence",
              },
              {
                icon: Sparkles,
                title: "Brand Enhancement",
                description: "Elevate Skylight's reputation as a culinary destination",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-8 h-full bg-[#FFF9F2]/10 backdrop-blur-sm border-[#EED9B6]/30 hover:border-[#EED9B6]/50 transition-all duration-300 hover:shadow-xl group">
                  <item.icon className="w-12 h-12 text-[#EED9B6] mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="font-serif text-2xl font-bold text-[#EED9B6] mb-3">
                    {item.title}
                  </h3>
                  <p className="text-[#FFF9F2]/70 leading-relaxed">{item.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Metrics Section */}
      <section className="py-32 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="font-serif text-5xl md:text-6xl font-bold text-foreground mb-4">
              Partnership Success Metrics
            </h2>
            <div className="w-24 h-[2px] bg-[#EED9B6] mx-auto" />
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { label: "F&B Revenue Increase", value: "35", suffix: "%" },
              { label: "Guest Satisfaction Rating", value: "4.8", suffix: "/5" },
              { label: "Return Guest Rate", value: "42", suffix: "%" },
              { label: "Event Bookings Growth", value: "58", suffix: "%" },
            ].map((metric, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-8 text-center bg-[#FFF9F2]/10 backdrop-blur-sm border-[#EED9B6]/30 hover:border-[#EED9B6]/50 transition-all duration-300">
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                    viewport={{ once: true }}
                    className="text-5xl md:text-6xl font-bold text-[#EED9B6] mb-4 font-serif"
                  >
                    {metric.value}
                    <span className="text-3xl">{metric.suffix}</span>
                  </motion.div>
                  <p className="text-[#FFF9F2]/70 text-lg">{metric.label}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="relative py-32 px-4 overflow-hidden">
        <div className="absolute inset-0 z-0">
          {/* Generated Arabian restaurant interior or boutique counter */}
          <img
            src="/luxurious-arabian-boutique-chocolate-counter-resta.jpg"
            alt="Luxury Arabian Interior"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/80" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative z-10 max-w-4xl mx-auto text-center"
        >
          <h2 className="font-serif text-5xl md:text-7xl font-bold text-white mb-8 text-balance">
            Let's Create Culinary Excellence Together
          </h2>
          <div className="w-24 h-[2px] bg-[#EED9B6] mx-auto mb-8" />
          <p className="text-xl md:text-2xl text-white/90 mb-12 leading-relaxed max-w-3xl mx-auto">
            Transform Skylight Hotel into a destination renowned for world-class accommodation and exceptional Middle
            Eastern cuisine.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-[#EED9B6] text-[#2C1A12] hover:bg-[#EED9B6]/90 text-lg px-8 py-6 rounded-full"
            >
              Schedule Consultation
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#2C1A12] text-lg px-8 py-6 rounded-full"
            >
              View Detailed Proposal
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-background border-t border-border">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-muted-foreground">
            © 2025 Muhany Chocos. Elevating hospitality through culinary excellence.
          </p>
        </div>
      </footer>
    </div>
  )
}
