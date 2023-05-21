export type Product = {
  id: number
  name: string
  description: string
  quantity: number
}

export type Service = {
  id: number
  name: string
  description: string
}

export interface DataTableProduct {
  products: Product[]
}

export interface DataTableService {
  services: Service[]
}

export interface ProductState {
  products: Product[]
}

export interface ServiceState {
  services: Service[]
}
