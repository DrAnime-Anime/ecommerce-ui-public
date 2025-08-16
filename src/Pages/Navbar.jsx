import React, { useState, useEffect } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { Link } from "react-router-dom";
import { supabase } from "../Lib/supabaseClient";
function Navbar() {
  const [logo, setLogo] = useState(null);

  useEffect(() => {
    const fetchLogo = async () => {
      const { data, error } = await supabase
        .from("media_assets")
        .select("url, alt_text")
        .eq("type", "main-logo")
        .single();

      if (error) {
        console.error("Error fetching logo:", error);
      } else {
        setLogo(data);
      }
    };

    fetchLogo();
  }, []);

  return (
    <>
      <header id="header">
        <div id="header-wrap">
          <nav className="secondary-nav border-bottom">
            <div className="container">
              <div className="row d-flex align-items-center">
                <div className="col-md-4 header-contact">
                  <p>
                    Let's talk! <strong>+57 444 11 00 35</strong>
                  </p>
                </div>
                <div className="col-md-4 shipping-purchase text-center">
                  <p>Free shipping on a purchase value of $200</p>
                </div>
                <div className="col-md-4 col-sm-12 user-items">
                  <ul className="d-flex justify-content-end list-unstyled">
                    <li>
                      <a href="login">
                        <i className="icon icon-user"></i>
                      </a>
                    </li>
                    <li>
                      <a href="cart">
                        <i className="icon icon-shopping-cart"></i>
                      </a>
                    </li>
                    <li>
                      <a href="wishlist">
                        <i className="icon icon-heart"></i>
                      </a>
                    </li>
                    <li className="user-items search-item pe-3">
                      <a href="#" className="search-button">
                        <i className="icon icon-search"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </nav>
          <nav className="primary-nav padding-small">
            <div className="container">
              <div className="row d-flex align-items-center">
                <div className="col-lg-2 col-md-2">
                  <div className="main-logo">
                    {logo ? (
                      <img
                        src={logo.url}
                        alt={logo.alt_text || "Logo"}
                        style={{ height: "50px" }}
                      />
                    ) : (
                      <p>Loading...</p>
                    )}
                  </div>
                </div>
                <div className="col-lg-10 col-md-10">
                  <div className="navbar">
                    <div
                      id="main-nav"
                      className="stellarnav d-flex justify-content-end right"
                    >
                      <ul className="menu-list">
                        <li className="menu-item has-sub">
                          <Link
                            to="/"
                            className="item-anchor d-flex align-item-center"
                            data-effect="Home"
                          >
                            Home<i className="icon icon-chevron-down"></i>
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/About"
                            className="item-anchor d-flex align-item-center"
                            data-effect="About"
                          >
                            About<i className="icon icon-chevron-down"></i>
                          </Link>
                        </li>

                        <li className="menu-item has-sub">
                          <Link
                            to="/shop"
                            className="item-anchor d-flex align-item-center"
                            data-effect="Shop"
                          >
                            Shop<i className="icon icon-chevron-down"></i>
                          </Link>
                        </li>

                        <li className="menu-item has-sub">
                          <Link
                            to="/BlogPage"
                            className="item-anchor d-flex align-item-center"
                            data-effect="Blog"
                          >
                            Blog<i className="icon icon-chevron-down"></i>
                          </Link>
                        </li>

                        <li>
                          <Link
                            to="/Contact"
                            className="item-anchor d-flex align-item-center"
                            data-effect="Blog"
                          >
                            contact<i className="icon icon-chevron-down"></i>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}

export default Navbar;
