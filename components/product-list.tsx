"use client"

import { Card } from "@/components/ui/card"
import { Products, ProductListProps } from "@/data/Products"

export function ProductList({ onProductSelect, activeCategory }: ProductListProps) {
  const filteredProducts = Products.filter(
    (product) => product.category === activeCategory
  )

  return (
    <main className="container mx-auto px-4 py-12">

      {/* Encabezado */}
      <div className="mb-8">
        <h2 className="font-serif text-4xl font-bold text-foreground md:text-5xl">
          Excelencia Artesanal
        </h2>

        <p className="mt-2 text-lg text-muted-foreground">
          Descubre nuestra colección de artículos de piel de primera calidad.
        </p>
      </div>

      {/* Validación de productos */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-20">
          <h3 className="text-2xl font-serif font-semibold text-muted-foreground">
            Sin existencias actuales
          </h3>

          <p className="mt-2 text-sm text-muted-foreground">
            Lo sentimos, no hay productos disponibles en esta categoría.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <Card
              key={product.id}
              className="group cursor-pointer overflow-hidden border-border bg-card transition-all hover:shadow-lg flex flex-col pt-0 pb-5"
              onClick={() => onProductSelect(product)}
            >
              <div className="aspect-square overflow-hidden bg-neutral-100">
                <img
                  src={
                    product?.images?.[0]
                      ? `${process.env.NEXT_PUBLIC_PRODUCTS_BLOB}${product.images[0]}`
                      : "/placeholder.svg"
                  }
                  alt={product.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="p-6 flex flex-col grow">
                <h3 className="font-serif text-xl font-semibold text-foreground">
                  {product.name}
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-muted-foreground grow">
                  {product.description}
                </p>

                <div className="mt-4 flex items-center justify-between">
                  {/* <p className="text-lg font-semibold text-primary">
                    ${product.price}
                  </p> */}

                  <span className="text-sm font-medium uppercase tracking-wide text-accent">
                    Ver detalles
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </main>
  )
}