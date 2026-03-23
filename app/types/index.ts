export type Product = {
  id: string
  name: string
  slug: string
  price: number
  sale_price: number
  quantity: number
  image: string
  gallery: string[]
  description: string
  short_description: string
  category: string
  sub_category: string
  tags: string[]
  vendor_name: string
  vendor_business_name: string
  in_stock: boolean
}

export type CardProps = {
  name: string
  price: string
  oldPrice?: string
  discount?: string
  stock: string
  inStock: boolean
  image: string
}
