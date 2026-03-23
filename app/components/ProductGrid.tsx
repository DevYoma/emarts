import { ChevronDown } from "lucide-react"
import ProductCard from "./ProductCard"
import { PRODUCTS } from "../data/products"

function formatPrice(n: number) {
  return `₦${n.toLocaleString("en-NG")}`
}

export default function ProductGrid() {
  return (
    <div className="flex-1 min-w-0 pt-1">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-[15px] font-semibold text-gray-900">
          Mens Clothing <span className="text-gray-400 font-normal text-[13px]">({PRODUCTS.length} products found)</span>
        </h1>

        <button className="flex items-center gap-1.5 border border-gray-200 rounded-lg px-3.5 py-2 text-[13px] bg-white cursor-pointer hover:bg-gray-50 shadow-sm">
          <span className="text-gray-400">Sort by:</span>
          <span className="font-semibold text-gray-800">Highest Price</span>
          <ChevronDown size={14} className="text-gray-400" />
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3.5 auto-rows-fr">
        {PRODUCTS.map((p) => {
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
            />
          )
        })}
      </div>
    </div>
  )
}
