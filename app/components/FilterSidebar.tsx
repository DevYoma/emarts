import { X, Minus } from "lucide-react"

const discountOptions = ["Show All", "With Discount", "Without Discount"]

export default function FilterSidebar() {
  return (
    <aside className="w-[260px] shrink-0 self-start sticky top-[97px]">
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3.5 border-b border-gray-100">
          <h2 className="text-sm font-semibold text-gray-900">Filters</h2>
          <button className="text-[13px] font-medium text-[#8dc63f] hover:text-[#6fa32e] cursor-pointer">
            Clear All
          </button>
        </div>

        <div className="px-4 py-4 space-y-5">
          <div>
            <span className="inline-flex items-center gap-1.5 bg-gray-100 text-gray-700 text-xs font-medium px-2.5 py-1 rounded-md">
              Mens-Clothing
              <button className="text-gray-400 hover:text-gray-700 cursor-pointer">
                <X size={12} />
              </button>
            </span>
          </div>

          <div className="border-t border-gray-100" />

          <div>
            <h3 className="text-[13px] font-semibold text-gray-800 mb-3">Discount</h3>
            <div className="space-y-2.5">
              {discountOptions.map((label, i) => (
                <label key={label} className="flex items-center gap-2.5 cursor-pointer group">
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                    i === 0 ? "border-[#8dc63f] bg-[#8dc63f]" : "border-gray-300 group-hover:border-[#8dc63f]"
                  }`}>
                    {i === 0 && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                  <span className="text-[13px] text-gray-700">{label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="border-t border-gray-100" />

          <div>
            <h3 className="text-[13px] font-semibold text-gray-800 mb-3">Price (₦)</h3>
            <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
              <div className="flex justify-between text-[11px] text-gray-400 mb-2">
                <span>₦2,000</span>
                <span>₦28,000</span>
              </div>
              <div className="flex gap-2 mb-3">
                <input
                  type="number"
                  placeholder="Min"
                  className="w-full border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs text-gray-700 outline-none focus:border-[#8dc63f] bg-white placeholder:text-gray-400"
                />
                <input
                  type="number"
                  placeholder="Max"
                  className="w-full border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs text-gray-700 outline-none focus:border-[#8dc63f] bg-white placeholder:text-gray-400"
                />
              </div>
              <div className="flex justify-between">
                <button className="text-xs text-gray-400 hover:text-gray-600 cursor-pointer">Clear</button>
                <button className="text-xs font-semibold text-[#8dc63f] hover:text-[#6fa32e] cursor-pointer">Save</button>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-100" />

          <div>
            <h3 className="text-[13px] font-semibold text-gray-800 mb-3">Categories</h3>
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="flex items-center justify-between px-3.5 py-2.5 bg-gray-50 cursor-pointer hover:bg-gray-100">
                <span className="text-[13px] font-medium text-gray-800">Fashion</span>
                <Minus size={14} className="text-gray-400" />
              </div>
              <div className="px-3.5 py-2.5 border-t border-gray-100 flex items-center gap-2.5 cursor-pointer hover:bg-gray-50">
                <div className="w-4 h-4 rounded-full border-2 border-gray-300 shrink-0" />
                <span className="text-[13px] text-gray-700">Men&apos;s Clothing</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}
