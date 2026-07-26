import Header from "./components/Header"
import Footer from "./components/Footer"
import Cart from "./components/Cart"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home"
import Brands from "./pages/Brands"
import BrandsPage from "./pages/Brands/BrandsPage"
import ProductDetails from "./pages/ProductDetails"
import Orders from "./pages/Orders"
import Addresses from "./pages/Addresses/Addresses"
import Shopping from "./pages/Shopping"
import Favorites from "./pages/Favorites"
import Category from "./pages/Category"
import { useState } from "react";
import Search from "./components/Header/Search";
import Profil_responsive from "./components/Header/Profil_responsive";
// import Search from "./components/Header/Search";

function App() {
  const [user,setUser]=useState(null)

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/category/:id" element={<Category />}/>
        <Route path="/ProductDetails/:id" element={<ProductDetails />}/>
        <Route path="/brands" element={<Brands />}/>
        <Route path="/Orders" element={<Orders />}/>
        <Route path="/Addresses" element={<Addresses />}/>
        <Route path="/Shopping" element={<Shopping />}/>
        <Route path="/Favorites" element={<Favorites />}/>
        <Route path="/BrandsPage" element={<BrandsPage />}/>
        <Route path="/Search" element={<Search />} />
        <Route path="/Profil_responsive" element={<Profil_responsive />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
