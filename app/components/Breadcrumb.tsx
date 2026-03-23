import { ChevronRight } from "lucide-react"

const crumbs = ["Home", "Market", "Search", "Mens-clothing"]

export default function Breadcrumb() {
  return (
    <nav className="bg-white border-b border-gray-100">
      <div className="w-[80%] mx-auto py-2 flex items-center gap-1">
        {crumbs.map((crumb, i) => {
          const isLast = i === crumbs.length - 1
          return (
            <span key={crumb} className="flex items-center gap-1">
              {isLast ? (
                <span className="text-[13px] text-gray-400">{crumb}</span>
              ) : (
                <>
                  <a href="#" className="text-[13px] text-gray-500 hover:text-gray-800 cursor-pointer">
                    {crumb}
                  </a>
                  <ChevronRight size={13} className="text-gray-300" />
                </>
              )}
            </span>
          )
        })}
      </div>
    </nav>
  )
}
