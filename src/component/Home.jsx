import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartContainer } from './CartContainer';
import { ProductDetailPage } from './ProductDetailPage';
export const Home = () => {
  return (
    <BrowserRouter>
        <Routes>
          <Route path='/' exac element={<CartContainer />} />
          <Route path='/product/:productId' element={<ProductDetailPage />} />
        </Routes>
    </BrowserRouter>
  );
}
