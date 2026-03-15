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

// PRODUCT TYPES
export const getProductTypes = async () => {
  const response = await api.get("/products/producttypes")
  return response.data
}