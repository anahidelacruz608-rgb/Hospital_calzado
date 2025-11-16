import type { Product } from "@/types/product"
import raw from "@/data/products.json"

export interface ProductListProps {
  onProductSelect: (product: Product) => void
  activeCategory: string
}

export const Products: Product[] = raw as Product[]
