import type { Brand } from "./Brand"
import type { ProductType } from "./ProductType"

export interface Product {
  id: number
  name: string
  description: string
  price: number
  quantity: number
  pictureUrl: string
  brand: Brand
  productType: ProductType
}