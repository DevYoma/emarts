"use client"

import { Suspense, useState } from "react"
import Header from "./components/Header"
import Breadcrumb from "./components/Breadcrumb"
import FilterSidebar from "./components/FilterSidebar"
import ProductGrid from "./components/ProductGrid"
import BottomNav from "./components/BottomNav"

function PageContent() {
  const [filterOpen, setFilterOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex flex-col">
      <Header />
      <Breadcrumb />

      <main className="flex-1 py-5 pb-20 lg:pb-5">
        <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 flex items-start gap-5">
          <FilterSidebar isOpen={filterOpen} onClose={() => setFilterOpen(false)} />
          <ProductGrid onFilterOpen={() => setFilterOpen(true)} />
        </div>
      </main>

      <BottomNav />
    </div>
  )
}

export default function Home() {
  return (
    <Suspense>
      <PageContent />
    </Suspense>
  )
}
