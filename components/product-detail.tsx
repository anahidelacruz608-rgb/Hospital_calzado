"use client"

import { useState, useEffect, useMemo } from "react"
import { ArrowLeft } from "lucide-react"
import type { Product } from "@/types/product"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface ProductDetailProps {
  product: Product
  onBack: () => void
}

export function ProductDetail({ product, onBack }: ProductDetailProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0) // Usamos Index para el array maestro
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [selectedColor, setSelectedColor] = useState<string | null>(null)

  // 1. Array Maestro (allImages): Contiene TODAS las imágenes para el carrusel de thumbnails.
  const allImages = useMemo(() => {
    // Usamos Set para evitar duplicados si las imágenes principales se repiten en colorVersions
    return Array.from(
      new Set([
        ...product.images,
        ...(product.colorVersions?.flatMap((v) => v.images) ?? []),
      ])
    )
  }, [product.images, product.colorVersions])

  // 2. Obtener opciones de color (desde 'colors' o 'colorVersions')
  const colorOptions = useMemo(() =>
    (product.colors && product.colors.length > 0)
      ? product.colors
      : product.colorVersions?.map((v) => v.name) ?? []
  , [product.colors, product.colorVersions])

  // 3. Establecer color inicial al montar el componente
  useEffect(() => {
    if (colorOptions.length > 0 && !selectedColor) {
      setSelectedColor(colorOptions[0])
    }
  }, [colorOptions, selectedColor])


  // 4. LÓGICA CLAVE: Sincronizar la Imagen Principal con el Color Seleccionado
  // Se ejecuta cuando cambia el color.
  useEffect(() => {
    // Si no hay color seleccionado o no hay versiones, no hacemos nada (la imagen principal será images[0]).
    if (!selectedColor || !product.colorVersions?.length) {
      // Si el producto no usa colorVersions, nos aseguramos de que el índice sea 0
      setSelectedImageIndex(0);
      return
    }

    // Buscamos la variante de color seleccionada
    const version = product.colorVersions.find(
      (v) => v.name === selectedColor
    )

    // Obtenemos la URL de la primera imagen de esa variante
    const firstImageOfVariant = version?.images?.[0]

    if (firstImageOfVariant) {
      // Encontramos el índice de esa URL dentro de nuestro array maestro 'allImages'
      const newIndex = allImages.indexOf(firstImageOfVariant)

      // Si se encuentra (debería), actualizamos el índice para mostrarla en la imagen principal
      if (newIndex !== -1) {
        setSelectedImageIndex(newIndex)
      }
    }
  // Añadimos 'selectedColor' y 'allImages' a las dependencias para que se ejecute al hacer clic
  }, [selectedColor, product.colorVersions, allImages])


  // 5. Función para manejar la selección de color
  const handleColorSelect = (colorName: string) => {
      setSelectedColor(colorName);
      // El useEffect anterior se encargará de sincronizar el índice de imagen.
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">

        {/* Botón atrás */}
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-6 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Regresar a los productos
        </Button>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">

          {/* Galería de imágenes */}
          <div className="space-y-4">

            {/* Imagen principal: Usa el array maestro 'allImages' */}
            <div className="aspect-square overflow-hidden rounded-lg border border-border bg-muted">
              <img
                src={process.env.NEXT_PUBLIC_PRODUCTS_BLOB?.length ? `${process.env.NEXT_PUBLIC_PRODUCTS_BLOB}${allImages[selectedImageIndex]}` : "/placeholder.svg"}
                alt={`${product.name} - Image ${selectedImageIndex + 1}`}
                className="h-full w-full object-contain"
              />
            </div>

            {/* Thumbnails: Usa el array maestro 'allImages' */}
            <div className="grid grid-cols-3 gap-4 md:grid-cols-4">
              {allImages.map((image, index) => (
                <button
                  key={image + index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`aspect-square overflow-hidden rounded-md border-2 transition-all ${
                    selectedImageIndex === index
                      ? "border-primary"
                      : "border-border hover:border-accent"
                  }`}
                >
                  <img
                    src={process.env.NEXT_PUBLIC_PRODUCTS_BLOB?.length ? `${process.env.NEXT_PUBLIC_PRODUCTS_BLOB}${image}` : "/placeholder.svg"}
                    alt={`${product.name} thumbnail ${index + 1}`}
                    className="h-full w-full object-contain"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Información del producto (El resto del JSX permanece sin cambios) */}
          <div className="flex flex-col">
            {/* ... Contenido del producto ... */}

            {/* Categoría / Título / Descripción */}
            <div className="mb-12">
              <Badge variant="secondary" className="mb-3">
                {product.category.replace("-", " ").toUpperCase()}
              </Badge>
              <h1 className="font-serif text-4xl font-bold text-foreground md:text-5xl">
                {product.name}
              </h1>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                {product.description}
              </p>
            </div>

            {/* Precio */}
            {/* <div className="mb-6">
              <p className="font-serif text-3xl font-bold text-primary">
                ${product.price}
              </p>
              {product.inStock ? (
                <p className="mt-1 text-sm text-accent">
                  Disponible
                </p>
              ) : (
                <p className="mt-1 text-sm text-destructive">
                  Sin existencias
                </p>
              )}
            </div> */}

            {/* Selección de color */}
            {colorOptions.length > 0 && (
              <div className="mb-6">
                <label className="mb-3 block text-sm font-medium uppercase tracking-wider text-foreground">
                  {product.colors && product.colors.length > 0 ? "Colores del producto" : "Variaciones de color"}
                </label>

                <div className="flex flex-wrap gap-2">
                  {colorOptions.map((color) => (
                    <button
                      key={color}
                      onClick={() => handleColorSelect(color)}
                      className={`rounded-md border-2 px-4 py-2 text-sm font-medium transition-all ${
                        selectedColor === color
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border bg-card text-foreground hover:border-accent"
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Selección de tallas */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-8">
                <label className="mb-3 block text-sm font-medium uppercase tracking-wider text-foreground">
                  Talla (Sujeto a existencias)
                </label>

                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`h-12 w-12 rounded-md border-2 text-sm font-medium transition-all ${
                        selectedSize === size
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border bg-card text-foreground hover:border-accent"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-5">
                <label className="mb-3 block text-[12px] font-light uppercase tracking-wider text-foreground">
                  Tallas extras (Verificar existencia en tienda)
                </label>

                <div className="flex flex-wrap gap-2">
                  {["18", "19", "20"].map((size) => (
                    <button
                      key={size}
                      className="h-8 w-8 rounded-md border-2 text-[12px] font-medium transition-all"
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Detalles */}
            <div className="mt-8 border-t border-border pt-6">
              <h3 className="mb-3 text-sm font-medium uppercase tracking-wider text-foreground">
                Detalles del producto
              </h3>

              <ul className="space-y-2 text-sm leading-relaxed text-muted-foreground">
                {product.product_detail.map((detail) => (
                  <li key={detail}>- {detail}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}