import React, { useEffect, useState } from "react";
import { supabase } from "../Lib/supabaseClient"; // Adjust this path if needed

const tabs = [
  { label: "All", target: "all" },
  { label: "Sneakers", target: "sneakers" },
  { label: "T-Shirts", target: "t-shirts" },
  { label: "Pants", target: "pants" },
  { label: "Hoodies", target: "hoodies" },
  { label: "Outerwear", target: "outerwear" },
  { label: "Jackets", target: "jackets" },
  { label: "Accessories", target: "accessories" },
];

const BestSellingProducts = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [productsByCategory, setProductsByCategory] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBestSelling = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("Producta")
        .select("*")
        .eq("best_selling", true);

      if (error) {
        console.error("Error fetching best selling products:", error);
        setLoading(false);
        return;
      }

      // Group by category
      const grouped = data.reduce(
        (acc, product) => {
          const category = product.category?.toLowerCase() || "uncategorized";
          if (!acc[category]) acc[category] = [];
          acc[category].push(product);
          acc["all"].push(product); // Add to "all"
          return acc;
        },
        { all: [] }
      );

      setProductsByCategory(grouped);
      setLoading(false);
    };

    fetchBestSelling();
  }, []);

  const renderProducts = () => {
    const products = productsByCategory[activeTab] || [];

    if (products.length === 0) {
      return <p>No products found in this category.</p>;
    }

    return products.map((product) => (
      <div key={product.id} className="product-item col-lg-3 col-md-6 col-sm-6">
        <div className="image-holder">
          <img
            src={product.image_url}
            alt={product.name}
            className="product-image"
          />
        </div>
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
        <div className="product-detail">
          <h3 className="product-title">
            <a href={`/product/${product.slug}`}>{product.name}</a>
          </h3>
          <div className="item-price text-primary">₹{product.price}</div>
        </div>
      </div>
    ));
  };

  return (
    <section
      id="selling-products"
      className="product-store bg-light-grey padding-large"
    >
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Best selling products</h2>
        </div>

        <ul className="tabs list-unstyled">
          {tabs.map((tab) => (
            <li
              key={tab.target}
              className={`tab ${activeTab === tab.target ? "active" : ""}`}
              onClick={() => setActiveTab(tab.target)}
            >
              {tab.label}
            </li>
          ))}
        </ul>

        <div className="tab-content">
          <div className="row d-flex flex-wrap">
            {loading ? <p>Loading...</p> : renderProducts()}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BestSellingProducts;
