
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProductsPage from "./pages/ProductsPage";
import BrandsPage from "./pages/BrandsPage";
import ProductsTypePage from "./pages/ProductsTypePage";
import React from "react";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import ProductRegistrationPage from "./pages/ProductRegistrationPage"
import ProductTypeRegistrationPage from "./pages/ProductTypeRegistrationPage"
import BrandsRegistrationPage from "./pages/BrandsRegistrationPage"



export default function App() {

  return (
    <React.StrictMode>
      <BrowserRouter>

        <Routes>          

          <Route path="/" element={<Navigate to="/products" />} />
          <Route path="/products" element={<ProductsPage />} />      

          <Route path="/brands" element={<BrandsPage />} />

          <Route path="/producttypes" element={<ProductsTypePage />} />
          <Route path="/products/:id" element={<ProductDetailsPage />} />
          <Route path="/products/create" element={<ProductRegistrationPage />} />
          <Route path="/producttype/create" element={<ProductTypeRegistrationPage />} />
          <Route path="/brands/create" element={<BrandsRegistrationPage />} />

        </Routes>

      </BrowserRouter>
    </React.StrictMode>
   
  )
}

