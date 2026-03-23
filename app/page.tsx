import Header from "./components/Header"
import Breadcrumb from "./components/Breadcrumb"
import FilterSidebar from "./components/FilterSidebar"
import ProductGrid from "./components/ProductGrid"

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f5f5f5] flex flex-col">
      <Header />
      <Breadcrumb />
      <main className="flex-1 py-5">
        <div className="w-[80%] mx-auto flex items-start gap-5">
          <FilterSidebar />
          <ProductGrid />
        </div>
      </main>
    </div>
  )
}
