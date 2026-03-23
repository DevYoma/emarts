import { Home, Store, Search, ShoppingCart, Menu } from "lucide-react"

const navItems = [
  { icon: Home, label: "Home" },
  { icon: Store, label: "Market" },
  { icon: Search, label: "Search" },
  { icon: ShoppingCart, label: "Cart" },
  { icon: Menu, label: "Menu" },
]

export default function BottomNav() {
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40">
      <div className="flex items-center justify-around py-2">
        {navItems.map(({ icon: Icon, label }) => (
          <button key={label} className="flex flex-col items-center gap-0.5 cursor-pointer px-4 py-1 text-gray-500 hover:text-[#8dc63f] transition-colors">
            <Icon size={20} />
            <span className="text-[11px] font-medium">{label}</span>
          </button>
        ))}
      </div>
    </nav>
  )
}
