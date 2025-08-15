import React from "react";

import Billboard from "./Pages/Billboard";
import FeaturedProducts from "./Pages/FeaturedProducts";
import LatestCollection from "./Pages/LatestCollection";
import FlashSales from "./Pages/FlashSales";
import BannerSection from "./Pages/BannerSection";
import QuoteSection from "./Pages/QuoteSection";
import LatestBlog from "./Pages/LatestBlog";
import BrandCollection from "./Pages/BrandCollection";
import InstagramSection from "./Pages/InstagramSection";

function Home() {
  return (
    <>
      <Billboard />
      <FeaturedProducts />
      <LatestCollection />
      <FlashSales />
      <BannerSection />
      <QuoteSection />
      <LatestBlog />
      <BrandCollection />
      <InstagramSection />
    </>
  );
}

export default Home;
