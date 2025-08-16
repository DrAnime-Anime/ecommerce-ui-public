import React, { useState, useEffect } from "react";

// Replace this with API call in future
const mockProducts = [
  {
    id: 1,
    title: "Half sleeve T-shirt",
    price: 40,
    category: "tshirts",
    tags: ["Modern", "White"],
    image: "images/selling-products1.jpg",
  },
  {
    id: 2,
    title: "Orange white Nike",
    price: 55,
    category: "shoes",
    tags: ["Branded", "Cheap"],
    image: "images/selling-products13.jpg",
  },
  {
    id: 3,
    title: "Silk White Shirt",
    price: 35,
    category: "tshirts",
    tags: ["Simple", "White"],
    image: "images/selling-products3.jpg",
  },
  {
    id: 4,
    title: "Running Shoe",
    price: 65,
    category: "shoes",
    tags: ["Branded"],
    image: "images/selling-products14.jpg",
  },
  {
    id: 5,
    title: "Grunge Hoodie",
    price: 30,
    category: "hoodie",
    tags: ["Modern"],
    image: "images/selling-products4.jpg",
  },
  {
    id: 6,
    title: "Grey Check Coat",
    price: 30,
    category: "jackets",
    tags: ["Simple"],
    image: "images/selling-products6.jpg",
  },
  {
    id: 7,
    title: "Stylish Grey T-shirt",
    price: 35,
    category: "tshirts",
    tags: ["Branded"],
    image: "images/selling-products2.jpg",
  },
  {
    id: 8,
    title: "Nike Brand Shoe",
    price: 65,
    category: "shoes",
    tags: ["Nike"],
    image: "images/selling-products16.jpg",
  },
];

const categories = [
  "All",
  "Shoes",
  "Tshirts",
  "Pants",
  "Hoodie",
  "Outer",
  "Jackets",
  "Accessories",
];

const Shop = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;
  const [products, setProducts] = useState([]);
  const [activeTag, setActiveTag] = useState(null);

  useEffect(() => {
    // Future: fetch from API and setProducts(data)
    setProducts(mockProducts);
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      activeTab === "All" || product.category === activeTab.toLowerCase();
    const matchesTag = !activeTag || product.tags.includes(activeTag);
    return matchesCategory && matchesTag;
  });

  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <>
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
              <h1 className="page-title">Shop page</h1>
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

      <div className="shopify-grid padding-large">
        <div className="container">
          <div className="row">
            <section id="selling-products" className="col-md-9 product-store">
              <div className="container">
                <ul className="tabs list-unstyled">
                  {categories.map((tab) => (
                    <li
                      key={tab}
                      className={`tab ${activeTab === tab ? "active" : ""}`}
                      onClick={() => {
                        setActiveTab(tab);
                        setCurrentPage(1);
                        setActiveTag(null);
                      }}
                    >
                      {tab}
                    </li>
                  ))}
                </ul>

                <div className="tab-content">
                  <div className="row d-flex flex-wrap">
                    {currentProducts.map((product) => (
                      <div
                        key={product.id}
                        className="product-item col-lg-4 col-md-6 col-sm-6"
                      >
                        <div className="image-holder">
                          <img
                            src={product.image}
                            alt={product.title}
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
                            <button
                              type="button"
                              className="view-btn tooltip d-flex"
                            >
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
                            <a href="/single-product">{product.title}</a>
                          </h3>
                          <div className="item-price text-primary">
                            ${product.price}.00
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Pagination */}
                  <nav className="navigation paging-navigation text-center padding-medium">
                    <div className="pagination loop-pagination d-flex justify-content-center gap-1 align-items-center">
                      <button
                        onClick={() =>
                          setCurrentPage((p) => Math.max(p - 1, 1))
                        }
                        className="pagination-arrow"
                      >
                        <i className="icon icon-arrow-left"></i>
                      </button>
                      {Array.from({ length: totalPages }, (_, i) => (
                        <button
                          key={i + 1}
                          onClick={() => setCurrentPage(i + 1)}
                          className={`page-numbers ${
                            currentPage === i + 1 ? "current" : ""
                          }`}
                        >
                          {i + 1}
                        </button>
                      ))}
                      <button
                        onClick={() =>
                          setCurrentPage((p) => Math.min(p + 1, totalPages))
                        }
                        className="pagination-arrow"
                      >
                        <i className="icon icon-arrow-right"></i>
                      </button>
                    </div>
                  </nav>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default Shop;
