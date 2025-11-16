"use client"

import { useState } from "react"
import { ProductList } from "@/components/product-list"
import { ProductDetail } from "@/components/product-detail"
import { Navigation } from "@/components/navigation"
import type { Product } from "@/types/product"

export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [activeCategory, setActiveCategory] = useState("calzado")

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category)
    setSelectedProduct(null)
  }

  return (
    <div className="min-h-screen">
      <Navigation activeCategory={activeCategory} onCategoryChange={handleCategoryChange} />

      {selectedProduct ? (
        <ProductDetail product={selectedProduct} onBack={() => setSelectedProduct(null)} />
      ) : (
        <ProductList onProductSelect={setSelectedProduct} activeCategory={activeCategory} />
      )}
    </div>
  )
}
