// src/Pages/Shop.jsx
import React, { useEffect, useState } from "react";
import { supabase } from "../Lib/supabaseClient";
import { Link } from "react-router-dom"; // ✅ added for navigation

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Fetch products from Supabase
  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase.from("Producta").select("*");
      if (error) {
        console.error("Error fetching products:", error);
        return;
      }
      setProducts(data);
      setFiltered(data);

      // Unique categories
      const uniqueCats = [
        "All",
        ...new Set(data.map((p) => p.category).filter(Boolean)),
      ];
      setCategories(uniqueCats);
    };

    fetchProducts();
  }, []);

  // Filter on search/category change
  useEffect(() => {
    let result = [...products];

    if (searchTerm.trim()) {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== "All") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    setFiltered(result);
  }, [searchTerm, selectedCategory, products]);

  return (
    <>
      {/* Banner Section */}
      <section
        className="site-banner jarallax min-height300 padding-large"
        style={{
          background: "url(images/hero-image.jpg) no-repeat",
          backgroundPosition: "top",
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="page-title">Shop</h1>
              <div className="breadcrumbs">
                <span className="item">
                  <a href="/">Home /</a>
                </span>
                <span className="item">Shop</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Shop Layout */}
      <div className="shopify-grid padding-large">
        <div className="container">
          <div className="row">
            {/* Product Section */}
            <section id="selling-products" className="col-md-9 product-store">
              <div className="container">
                {/* Category Tabs */}
                <ul className="tabs list-unstyled">
                  {categories.map((cat) => (
                    <li
                      key={cat}
                      className={`tab ${
                        cat === selectedCategory ? "active" : ""
                      }`}
                      onClick={() => setSelectedCategory(cat)}
                      style={{ cursor: "pointer" }}
                    >
                      {cat}
                    </li>
                  ))}
                </ul>

                {/* Product Grid */}
                <div className="tab-content">
                  <div id="all" data-tab-content className="active">
                    <div className="row d-flex flex-wrap">
                      {filtered.length === 0 ? (
                        <p>No products found.</p>
                      ) : (
                        filtered.map((product) => (
                          <div
                            className="product-item col-lg-4 col-md-6 col-sm-6"
                            key={product.id}
                          >
                            <Link
                              to={`/product/${product.id}`}
                              className="text-decoration-none"
                            >
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
                                    add to cart{" "}
                                    <i className="icon icon-arrow-io"></i>
                                  </button>
                                  <button
                                    type="button"
                                    className="view-btn tooltip d-flex"
                                  >
                                    <i className="icon icon-screen-full"></i>
                                    <span className="tooltip-text">
                                      Quick view
                                    </span>
                                  </button>
                                  <button
                                    type="button"
                                    className="wishlist-btn"
                                  >
                                    <i className="icon icon-heart"></i>
                                  </button>
                                </div>
                              </div>
                              <div className="product-detail">
                                <h3 className="product-title">
                                  {product.name}
                                </h3>
                                <div className="item-price text-primary">
                                  ₹{product.price}{" "}
                                  {product.old_price > product.price && (
                                    <span className="old-price">
                                      ₹{product.old_price}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </Link>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Sidebar */}
            <aside className="col-md-3">
              <div className="sidebar">
                {/* Search */}
                <div className="widgets widget-menu">
                  <div className="widget-search-bar">
                    <form
                      role="search"
                      className="d-flex"
                      onSubmit={(e) => e.preventDefault()}
                    >
                      <input
                        className="search-field"
                        placeholder="Search"
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                      <button className="btn btn-dark" type="submit">
                        <i className="icon icon-search"></i>
                      </button>
                    </form>
                  </div>
                </div>

                {/* Tags */}
                <div className="widgets widget-product-tags">
                  <h5 className="widget-title">Tags</h5>
                  <ul className="product-tags sidebar-list list-unstyled">
                    <li className="tags-item">
                      <a href="#">White</a>
                    </li>
                    <li className="tags-item">
                      <a href="#">Cheap</a>
                    </li>
                    <li className="tags-item">
                      <a href="#">Branded</a>
                    </li>
                    <li className="tags-item">
                      <a href="#">Modern</a>
                    </li>
                    <li className="tags-item">
                      <a href="#">Simple</a>
                    </li>
                  </ul>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
};

export default Shop;
