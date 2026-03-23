"use client"

import { useState } from "react"
import { useQueryState } from "nuqs"
import { ArrowLeft, Minus, Plus } from "lucide-react"

type Props = {
  isOpen?: boolean
  onClose?: () => void
}

type DiscountValue = "all" | "with" | "without"

const discountOptions: { label: string; value: DiscountValue }[] = [
  { label: "Show All", value: "all" },
  { label: "With Discount", value: "with" },
  { label: "Without Discount", value: "without" },
]

const categories = [
  {
    name: "Fashion",
    expanded: true,
    items: ["Men's Clothing", "Women's Clothing", "Footwear", "Bags & Accessories", "Jewelry & Watches"],
  },
  { name: "Phones & Tablets", expanded: false, items: [] },
  { name: "Health & Beauty", expanded: false, items: [] },
]

function FilterContent({ onClose }: { onClose?: () => void }) {
  const [discount, setDiscount] = useQueryState<DiscountValue>("discount", {
    defaultValue: "all",
    parse: (v) => (["all", "with", "without"].includes(v) ? (v as DiscountValue) : "all"),
    serialize: (v) => v,
  })

  const [minParam, setMinParam] = useQueryState("min", {
    defaultValue: "",
    parse: (v) => v,
    serialize: (v) => v,
  })
  const [maxParam, setMaxParam] = useQueryState("max", {
    defaultValue: "",
    parse: (v) => v,
    serialize: (v) => v,
  })

  const [minInput, setMinInput] = useState(minParam ?? "")
  const [maxInput, setMaxInput] = useState(maxParam ?? "")

  function handleSave() {
    const min = Number(minInput)
    const max = Number(maxInput)
    const validMin = minInput !== "" && !isNaN(min) && min >= 0
    const validMax = maxInput !== "" && !isNaN(max) && max >= 0

    if (validMin && validMax && min > max) return

    setMinParam(validMin ? String(min) : null)
    setMaxParam(validMax ? String(max) : null)
  }

  function handleClear() {
    setMinInput("")
    setMaxInput("")
    setMinParam(null)
    setMaxParam(null)
  }

  return (
    <div className="px-4 py-4 space-y-6">
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Discount</h3>
        <div className="border border-gray-200 rounded-lg overflow-hidden divide-y divide-gray-100">
          {discountOptions.map((opt) => (
            <label key={opt.value} className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-gray-50" onClick={() => setDiscount(opt.value)}>
              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                discount === opt.value ? "border-[#8dc63f] bg-[#8dc63f]" : "border-gray-300"
              }`}>
                {discount === opt.value && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
              </div>
              <span className="text-sm text-gray-700">{opt.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Price (₦)</h3>
        <div className="border border-gray-200 rounded-lg p-4 space-y-3">
          <div className="flex justify-between text-xs text-gray-400">
            <span>₦250</span>
            <span>₦28,000</span>
          </div>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Min"
              value={minInput}
              onChange={(e) => setMinInput(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 outline-none focus:border-[#8dc63f] placeholder:text-gray-400"
            />
            <input
              type="number"
              placeholder="Max"
              value={maxInput}
              onChange={(e) => setMaxInput(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 outline-none focus:border-[#8dc63f] placeholder:text-gray-400"
            />
          </div>
          <div className="flex justify-between">
            <button onClick={handleClear} className="text-sm text-gray-400 hover:text-gray-600 cursor-pointer">Clear</button>
            <button onClick={handleSave} className="text-sm font-semibold text-[#8dc63f] hover:text-[#6fa32e] cursor-pointer">Save</button>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Categories</h3>
        <div className="border border-gray-200 rounded-lg overflow-hidden divide-y divide-gray-100">
          {categories.map((cat) => (
            <div key={cat.name}>
              <div className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-gray-50">
                <span className="text-sm font-medium text-gray-800">{cat.name}</span>
                {cat.expanded ? <Minus size={14} className="text-gray-400" /> : <Plus size={14} className="text-gray-400" />}
              </div>
              {cat.expanded && cat.items.map((item) => (
                <label key={item} className="flex items-center gap-3 px-4 py-2.5 border-t border-gray-50 cursor-pointer hover:bg-gray-50">
                  <div className="w-4 h-4 rounded-full border-2 border-gray-300 shrink-0" />
                  <span className="text-sm text-gray-600">{item}</span>
                </label>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function FilterSidebar({ isOpen = false, onClose }: Props) {
  return (
    <>
      <aside className="hidden lg:block w-[260px] shrink-0 self-start sticky top-[97px]">
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-4 py-3.5 border-b border-gray-100">
            <h2 className="text-sm font-semibold text-gray-900">Filters</h2>
            {/* <button className="text-[13px] font-medium text-[#8dc63f] hover:text-[#6fa32e] cursor-pointer">Clear All</button> */}
          </div>
          <FilterContent />
        </div>
      </aside>

      <div className={`lg:hidden fixed inset-0 z-50 transition-all duration-300 ${isOpen ? "pointer-events-auto" : "pointer-events-none"}`}>
        <div
          className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"}`}
          onClick={onClose}
        />
        <div className={`absolute left-0 top-0 bottom-0 w-[80%] max-w-sm bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
          <div className="flex items-center gap-3 px-4 py-4 border-b border-gray-100 shrink-0">
            <button onClick={onClose} className="cursor-pointer p-1 -ml-1">
              <ArrowLeft size={20} className="text-gray-700" />
            </button>
            <h2 className="text-base font-semibold text-gray-900">Filters</h2>
          </div>
          <div className="flex-1 overflow-y-auto">
            <FilterContent onClose={onClose} />
          </div>
          <div className="px-4 py-4 border-t border-gray-100 shrink-0">
            <button onClick={onClose} className="w-full text-center text-sm font-medium text-gray-600 cursor-pointer py-2 hover:text-gray-900">
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
