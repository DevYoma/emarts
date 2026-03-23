"use client"

import { useState, useRef, useEffect } from "react"
import { useQueryState } from "nuqs"
import { ChevronDown, SlidersHorizontal, Check } from "lucide-react"
import ProductCard from "./ProductCard"
import { PRODUCTS } from "../data/products"
import type { Product } from "../types"

type Props = {
  onFilterOpen?: () => void
}

type SortValue = "highest" | "lowest" | "newest" | "most-order"

const sortOptions: { label: string; value: SortValue }[] = [
  { label: "Highest Price", value: "highest" },
  { label: "Lowest Price", value: "lowest" },
  { label: "New Arrival", value: "newest" },
  { label: "Most Order", value: "most-order" },
]

function formatPrice(n: number) {
  return `₦${n.toLocaleString("en-NG")}`
}

function effectivePrice(p: Product) {
  return p.sale_price > 0 ? p.sale_price : p.price
}

function applyFilters(
  products: Product[],
  discount: string,
  min: string | null,
  max: string | null,
  sort: SortValue
) {
  let result = [...products]

  // 1. Discount filter
  if (discount === "with") result = result.filter((p) => p.sale_price > 0)
  else if (discount === "without") result = result.filter((p) => p.sale_price === 0)

  // 2. Price filter
  const minVal = min !== null && min !== "" ? Number(min) : null
  const maxVal = max !== null && max !== "" ? Number(max) : null

  if (minVal !== null && maxVal !== null && minVal <= maxVal) {
    result = result.filter((p) => {
      const price = effectivePrice(p)
      return price >= minVal && price <= maxVal
    })
  } else if (minVal !== null && maxVal === null) {
    result = result.filter((p) => effectivePrice(p) >= minVal)
  } else if (maxVal !== null && minVal === null) {
    result = result.filter((p) => effectivePrice(p) <= maxVal)
  }

  // 3. Sort
  if (sort === "highest") result.sort((a, b) => effectivePrice(b) - effectivePrice(a))
  else if (sort === "lowest") result.sort((a, b) => effectivePrice(a) - effectivePrice(b))

  return result
}

export default function ProductGrid({ onFilterOpen }: Props) {
  const [sortOpen, setSortOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const [sort, setSort] = useQueryState<SortValue>("sort", {
    defaultValue: "highest",
    parse: (v) => (["highest", "lowest", "newest", "most-order"].includes(v) ? (v as SortValue) : "highest"),
    serialize: (v) => v,
  })


  const [discount] = useQueryState("discount", { defaultValue: "all" })
  const [min] = useQueryState("min")
  const [max] = useQueryState("max")

  useEffect(() => {
    function handleOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setSortOpen(false)
      }
    }
    document.addEventListener("mousedown", handleOutside)
    return () => document.removeEventListener("mousedown", handleOutside)
  }, [])

  const filtered = applyFilters(PRODUCTS, discount ?? "all", min, max, sort)
  const currentLabel = sortOptions.find((o) => o.value === sort)?.label ?? "Highest Price"

  return (
    <div className="flex-1 min-w-0">
      <div className="flex items-center justify-between mb-3">
        <button
          onClick={onFilterOpen}
          className="lg:hidden flex items-center gap-2 border border-gray-300 rounded-lg px-3.5 py-2 text-sm bg-white cursor-pointer hover:bg-gray-50 shadow-sm"
        >
          <SlidersHorizontal size={15} className="text-gray-600" />
          <span className="font-medium text-gray-700">Filters</span>
        </button>

        <div className="hidden lg:block" />

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setSortOpen((v) => !v)}
            className="flex items-center gap-1.5 border border-gray-200 rounded-lg px-3 py-2 text-[13px] bg-white cursor-pointer hover:bg-gray-50 shadow-sm whitespace-nowrap"
          >
            <span className="text-gray-400">Sort by:</span>
            <span className="font-semibold text-gray-800">{currentLabel}</span>
            <ChevronDown size={14} className={`text-gray-400 transition-transform ${sortOpen ? "rotate-180" : ""}`} />
          </button>

          {sortOpen && (
            <div className="absolute right-0 top-full mt-1.5 w-44 bg-white border border-gray-200 rounded-xl shadow-lg z-30 py-1 overflow-hidden">
              {sortOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => { setSort(opt.value); setSortOpen(false) }}
                  className="w-full flex items-center justify-between px-4 py-2.5 text-sm cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  <span className={sort === opt.value ? "font-semibold text-gray-900" : "text-gray-600"}>
                    {opt.label}
                  </span>
                  {sort === opt.value && <Check size={14} className="text-[#8dc63f]" />}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <p className="text-[13px] text-gray-500 mb-4">({filtered.length} product(s) found)</p>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <p className="text-gray-400 text-base font-medium">No products found</p>
          <p className="text-gray-300 text-sm mt-1">Try adjusting your filters</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5 auto-rows-fr">
          {filtered.map((p, index) => {
            const hasSale = p.sale_price > 0
            const price = hasSale ? formatPrice(p.sale_price) : formatPrice(p.price)
            const oldPrice = hasSale ? formatPrice(p.price) : undefined
            const discount = hasSale ? `-${Math.round((1 - p.sale_price / p.price) * 100)}%` : undefined
            const stock = p.quantity <= 5 ? "Few Units Left" : "In Stock"
            const image = p.image || p.gallery[0]

            return (
              <ProductCard
                key={p.id}
                name={p.name}
                price={price}
                oldPrice={oldPrice}
                discount={discount}
                stock={stock}
                inStock={p.quantity > 5}
                image={image}
                priority={index < 4}
              />
            )
          })}
        </div>
      )}
    </div>
  )
}
