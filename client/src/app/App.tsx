
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProductsPage from "./pages/ProductsPage";
import BrandsPage from "./pages/BrandsPage";
import ProductsTypePage from "./pages/ProductsTypePage";
import React from "react";



export default function App() {

  return (
    <React.StrictMode>
      <BrowserRouter>

        <Routes>          

          <Route path="/" element={<Navigate to="/products" />} />
          <Route path="/products" element={<ProductsPage />} />      

          <Route path="/brands" element={<BrandsPage />} />

          <Route path="/producttypes" element={<ProductsTypePage />} />

        </Routes>

      </BrowserRouter>
    </React.StrictMode>
   
  )
}

