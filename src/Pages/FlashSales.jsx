// FlashSales.jsx
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { supabase } from "../Lib/supabaseClient"; // adjust path if needed
import "swiper/css";
import "swiper/css/pagination";

const FlashSales = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchFlashSales = async () => {
      const { data, error } = await supabase
        .from("flash_sales")
        .select(
          `
          discount,
          Producta (
            id,
            name,
            price,
            image_url,
            old_price,
            slug
          )
        `
        )
        .eq("show_on_home", true);

      if (error) {
        console.error("Error fetching flash sale products:", error);
        return;
      }

      const formatted = data.map((item) => {
        const product = item.Producta;
        const discount = item.discount;
        const discountedPrice = (product.price * (100 - discount)) / 100;

        return {
          id: product.id,
          title: product.name,
          price: `₹${discountedPrice.toFixed(0)}`,
          oldPrice: `₹${product.price}`,
          image: product.image_url,
          discount: `${discount}% OFF`,
          link: `/product/${product.slug || product.id}`, // fallback if slug missing
        };
      });

      setProducts(formatted);
    };

    fetchFlashSales();
  }, []);

  return (
    <section id="flash-sales" className="product-store padding-large">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Flash Sales</h2>
        </div>

        <Swiper
          modules={[Pagination]}
          spaceBetween={20}
          slidesPerView={3}
          pagination={{ clickable: true }}
          breakpoints={{
            320: { slidesPerView: 1 },
            576: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            992: { slidesPerView: 4 },
          }}
          className="product-swiper flash-sales overflow-hidden"
        >
          {products.map((product, index) => (
            <SwiperSlide key={index}>
              <div className="product-item">
                <img
                  src={product.image}
                  alt={product.title}
                  className="product-image"
                />
                <div className="cart-concern">
                  <div className="cart-button d-flex justify-content-between align-items-center">
                    <button
                      type="button"
                      className="btn-wrap cart-link d-flex align-items-center"
                    >
                      add to cart <i className="icon icon-arrow-io"></i>
                    </button>
                    <button type="button" className="view-btn tooltip d-flex">
                      <i className="icon icon-screen-full"></i>
                      <span className="tooltip-text">Quick view</span>
                    </button>
                    <button type="button" className="wishlist-btn">
                      <i className="icon icon-heart"></i>
                    </button>
                  </div>
                </div>
                <div className="discount">{product.discount}</div>
                <div className="product-detail">
                  <h3 className="product-title">
                    <a href={product.link}>{product.title}</a>
                  </h3>
                  <div className="item-price text-primary">
                    <del className="prev-price">{product.oldPrice}</del>
                    {product.price}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default FlashSales;
