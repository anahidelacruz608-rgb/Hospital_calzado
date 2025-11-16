export type ProductColorVariant = {
  name: string
  images: string[]
}

export interface Product {
  id: string
  name: string
  description: string
  price: number
  category: "calzado" | "carteras" | "bolsos" | "cinturones" | "accesorios-telefono"
  images: string[]
  sizes?: string[]
  colors?: string[]
  colorVersions?: ProductColorVariant[]
  inStock: boolean
  product_detail: string[]
}
