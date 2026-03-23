import Image from "next/image"
import { ShoppingCart } from "lucide-react"
import type { CardProps } from "../types"

export default function ProductCard({ name, price, oldPrice, discount, stock, inStock, image }: CardProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group flex flex-col h-full cursor-pointer">
      <div className="relative w-full aspect-[4/3] bg-gray-100 overflow-hidden shrink-0">
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover group-hover:scale-[1.04] transition-transform duration-300"
        />
        {discount && (
          <span className="absolute top-2 right-2 bg-[#8dc63f] text-white text-[11px] font-bold px-1.5 py-0.5 rounded-md">
            {discount}
          </span>
        )}
      </div>

      <div className="p-3 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-1">
          <p className="text-[13px] font-medium text-gray-800 leading-snug line-clamp-2 flex-1">{name}</p>
          <button className="shrink-0 w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 cursor-pointer hover:bg-[#8dc63f] hover:text-white hover:border-[#8dc63f] transition-all">
            <ShoppingCart size={13} />
          </button>
        </div>

        <div className="flex-1" />

        <div className="flex items-center gap-2 mt-2 mb-1">
          <span className="text-[13px] font-bold text-gray-900">{price}</span>
          {oldPrice && <span className="text-xs text-gray-400 line-through">{oldPrice}</span>}
        </div>

        <p className={`text-xs font-medium ${inStock ? "text-[#8dc63f]" : "text-orange-400"}`}>
          {stock}
        </p>
      </div>
    </div>
  )
}
