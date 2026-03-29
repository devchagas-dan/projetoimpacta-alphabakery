import axios from "axios"

export const api = axios.create({
  baseURL: "http://localhost:8080/api"
})

// PRODUCTS
export const getProducts = async () => {
  const response = await api.get("/products")
  return response.data
}

// BRANDS
export const getBrands = async () => {
  const response = await api.get("/products/brands")
  return response.data
}

export const getBrandById = async (id: number) => {
  const response = await api.get(`/products/brands/${id}`)
  return response.data
}

export const createBrand = async (brand: { name: string }) => {
  const response = await api.post("/products/brands", brand)
  return response.data
}

export const updateBrand = async (id: number, brand: { name: string }) => {
  const response = await api.put(`/products/brands/${id}`, brand)
  return response.data
}

export const deleteBrand = async (id: number) => {
  const response = await api.delete(`/products/brands/${id}`)
  return response.data
}

// PRODUCT TYPES
export const getProductTypes = async () => {
  const response = await api.get("/products/producttypes")
  return response.data
}
export const createProductTypes = async (producttypes: { name: string }) => {
  const response = await api.post("/products/producttypes", producttypes)
  return response.data
}
export const updateProductTypes = async (id: number, producttypes: { name: string }) => {
  const response = await api.put(`/products/producttypes/${id}`, producttypes)
  return response.data
}
export const deleteProductTypes = async (id: number) => {
  const response = await api.delete(`/products/producttypes/${id}`)
  return response.data
}

