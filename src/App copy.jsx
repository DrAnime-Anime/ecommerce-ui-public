import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Preloader from "./Pages/Preloader";
import Navbar from "./Pages/Navbar";
import FeaturedProducts from "./Pages/FeaturedProducts";
import Billboard from "./Pages/Billboard";
import LatestCollection from "./Pages/LatestCollection";
import FlashSales from "./Pages/FlashSales";
import QuoteSection from "./Pages/QuoteSection";
import LatestBlog from "./Pages/LatestBlog";
import BrandCollection from "./Pages/BrandCollection";
import Footer from "./Pages/Footer";
import InstagramSection from "./Pages/InstagramSection";
import Shop from "./Pages/Shop";
import BlogPage from "./Pages/BlogPage";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Cart from "./Pages/Cart";
import Checkout from "./Pages/Checkout";
import Login from "./Pages/Login";

const Home = () => (
  <>
    <Billboard />
    <FeaturedProducts />
    <LatestCollection />
    <FlashSales />
    <QuoteSection />
    <LatestBlog />
    <BrandCollection />
  </>
);

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Preloader />;

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/BlogPage" element={<BlogPage />} />
        <Route path="/About" element={<About />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/Checkout" element={<Checkout />} />
        <Route path="/Login" element={<Login />} />
      </Routes>
      <InstagramSection />
      <Footer />
    </BrowserRouter>
  );
};

export default App;
