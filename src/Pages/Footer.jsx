import React, { useEffect, useState } from "react";
import { supabase } from "../Lib/supabaseClient"; // Make sure this is correctly exported

const Footer = () => {
  const [logoImages, setLogoImages] = useState([]);

  useEffect(() => {
    const fetchLogos = async () => {
      try {
        const { data, error } = await supabase.from("media_assets").select("*");

        if (error) throw error;

        // Filter only logo images
        const logos = data.filter((item) => item.type === "logo");
        setLogoImages(logos);
      } catch (error) {
        console.error("Error fetching logo images:", error.message);
      }
    };

    fetchLogos();
  }, []);

  return (
    <>
      <footer id="footer">
        <div className="container">
          <div className="footer-menu-list">
            <div className="row d-flex flex-wrap justify-content-between">
              {/* Column 1 */}
              <div className="col-lg-3 col-md-6 col-sm-6">
                <div className="footer-menu">
                  <h5 className="widget-title">Ultras</h5>
                  <ul className="menu-list list-unstyled">
                    <li>
                      <a href="about.html">About us</a>
                    </li>
                    <li>
                      <a href="#">Conditions</a>
                    </li>
                    <li>
                      <a href="blog.html">Our Journals</a>
                    </li>
                    <li>
                      <a href="#">Careers</a>
                    </li>
                    <li>
                      <a href="#">Affiliate Programme</a>
                    </li>
                    <li>
                      <a href="#">Ultras Press</a>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Column 2 */}
              <div className="col-lg-3 col-md-6 col-sm-6">
                <div className="footer-menu">
                  <h5 className="widget-title">Customer Service</h5>
                  <ul className="menu-list list-unstyled">
                    <li>
                      <a href="faqs.html">FAQ</a>
                    </li>
                    <li>
                      <a href="contact.html">Contact</a>
                    </li>
                    <li>
                      <a href="#">Privacy Policy</a>
                    </li>
                    <li>
                      <a href="#">Returns & Refunds</a>
                    </li>
                    <li>
                      <a href="#">Cookie Guidelines</a>
                    </li>
                    <li>
                      <a href="#">Delivery Information</a>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Column 3 */}
              <div className="col-lg-3 col-md-6 col-sm-6">
                <div className="footer-menu">
                  <h5 className="widget-title">Contact Us</h5>
                  <p>
                    Do you have any questions or suggestions?{" "}
                    <a href="#" className="email">
                      ourservices@ultras.com
                    </a>
                  </p>
                  <p>
                    Do you need assistance? Give us a call. <br />
                    <strong>+57 444 11 00 35</strong>
                  </p>
                </div>
              </div>

              {/* Column 4 */}
              <div className="col-lg-3 col-md-6 col-sm-6">
                <div className="footer-menu">
                  <h5 className="widget-title">Forever 2018</h5>
                  <p>
                    Cras mattis sit ornare in metus eu amet adipiscing enim.
                    Ullamcorper in orci, ultrices integer eget arcu.
                  </p>
                  <div className="social-links">
                    <ul className="d-flex list-unstyled">
                      <li>
                        <a href="#">
                          <i className="icon icon-facebook"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="icon icon-twitter"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="icon icon-youtube-play"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="icon icon-behance-square"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr />
      </footer>

      {/* Footer Bottom */}
      <div id="footer-bottom">
        <div className="container">
          <div className="d-flex align-items-center flex-wrap justify-content-between">
            <div className="copyright">
              <p>
                Freebies by{" "}
                <a href="https://templatesjungle.com/">Templates Jungle</a>
                &nbsp;Distributed by{" "}
                <a href="https://themewagon.com">ThemeWagon</a>
              </p>
            </div>
            <div className="payment-method">
              <p>Payment options :</p>
              <div className="card-wrap">
                {logoImages.map((logo) => (
                  <img
                    key={logo.id}
                    src={logo.url}
                    alt={logo.alt_text || "Logo"}
                    style={{ width: "120px", height: "auto" }}
                    className="rounded-md"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
