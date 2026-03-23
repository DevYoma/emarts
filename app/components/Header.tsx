import { ShoppingCart, Bell, User, Search } from "lucide-react"

export default function Header() {
  return (
    <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-50 h-[60px]">
      <div className="w-[80%] mx-auto h-full flex items-center gap-6">
        <div className="flex items-center gap-2 w-[180px] shrink-0">
          <div className="w-9 h-9 bg-[#8dc63f] rounded-full flex items-center justify-center">
            <ShoppingCart size={16} className="text-white" />
          </div>
          <span className="text-[17px] font-bold text-gray-900">E-Marts</span>
        </div>

        <div className="flex-1 flex justify-center">
          <div className="w-[50%] flex items-center border border-[#8dc63f] rounded-full overflow-hidden h-10 bg-white">
            <input
              type="text"
              placeholder="Search products, brands and categories..."
              className="flex-1 px-4 text-sm text-gray-600 outline-none placeholder:text-gray-400"
            />
            <button className="px-4 h-full text-gray-400 hover:text-[#8dc63f] cursor-pointer transition-colors">
              <Search size={16} />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3 w-[180px] shrink-0 justify-end">
          <button className="relative w-9 h-9 bg-[#8dc63f] rounded-full flex items-center justify-center text-white cursor-pointer hover:bg-[#7ab534] transition-colors">
            <ShoppingCart size={16} />
            <span className="absolute -top-1 -right-1 w-[18px] h-[18px] bg-[#8dc63f] border-2 border-white rounded-full flex items-center justify-center text-[9px] font-bold">
              0
            </span>
          </button>

          <button className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 cursor-pointer hover:bg-gray-50 transition-colors">
            <Bell size={16} />
          </button>

          <button className="flex items-center gap-1.5 text-sm text-gray-700 cursor-pointer hover:text-gray-900 transition-colors">
            <div className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-500">
              <User size={16} />
            </div>
            <span className="hidden md:inline font-medium">Sign In / Up</span>
          </button>
        </div>
      </div>
    </header>
  )
}
