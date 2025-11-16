"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

const categories = [
  { id: "calzado", label: "Calzado" },
  { id: "carteras", label: "Carteras" },
  { id: "bolsos", label: "Bolsos" },
  { id: "cinturones", label: "Cinturones" },
  { id: "accesorios-telefono", label: "Accesorios de teléfono" },
]

interface NavigationProps {
  activeCategory: string
  onCategoryChange: (category: string) => void
}

export function Navigation({ activeCategory, onCategoryChange }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80">
      <div className="container mx-auto px-4">
        {/* Store Title */}
        <div className="flex items-center justify-between py-6 md:justify-center">
          <h1 className="font-serif text-3xl font-bold text-primary md:text-4xl lg:text-5xl">
            Hospital de calzado
          </h1>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            <span className="sr-only">Menú desplegable</span>
          </Button>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden border-t border-border py-4 md:block">
          <ul className="flex items-center justify-center gap-8">
            {categories.map((category) => {
              const isActive = activeCategory === category.id

              return (
                <li key={category.id}>
                  <button
                    onClick={() => onCategoryChange(category.id)}
                    className={`
                      relative text-sm font-medium uppercase tracking-wider transition-all duration-300
                      ${isActive ? "text-primary" : "text-muted-foreground hover:text-primary"}
                    `}
                  >
                    {category.label}

                    {/* Subrayado animado */}
                    <span
                      className={`
                        absolute left-0 -bottom-1 h-0.5 w-full bg-primary transition-all duration-300
                        ${isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}
                      `}
                      style={{ transformOrigin: "left" }}
                    />
                  </button>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="border-t border-border py-4 md:hidden">
            <ul className="space-y-3">
              {categories.map((category) => (
                <li key={category.id}>
                  <button
                    onClick={() => {
                      onCategoryChange(category.id)
                      setMobileMenuOpen(false)
                    }}
                    className={`
                      block w-full text-left text-sm font-medium uppercase tracking-wider transition-colors
                      ${activeCategory === category.id ? "text-primary" : "text-muted-foreground hover:text-primary"}
                    `}
                  >
                    {category.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        )}

      </div>
    </header>
  )
}
