import React, { useEffect, useState } from "react";
import { supabase } from "../Lib/supabaseClient"; // Adjust the path if needed

const Contact = () => {
  const [heroImage, setHeroImage] = useState(null);

  useEffect(() => {
    const fetchHeroImage = async () => {
      const { data, error } = await supabase
        .from("media_assets")
        .select("url")
        .eq("type", "contact_hero")
        .single();

      if (error) {
        console.error("Error fetching contact_hero:", error.message);
      } else {
        setHeroImage(data.url);
      }
    };

    fetchHeroImage();
  }, []);

  return (
    <>
      <section
        className="site-banner jarallax padding-large"
        style={{
          background: heroImage ? `url(${heroImage}) no-repeat` : "#ccc",
          backgroundPosition: "top",
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="page-title">Contact us</h1>
              <div className="breadcrumbs">
                <span className="item">
                  <a href="/">Home /</a>
                </span>
                <span className="item">Contact us</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="contact-information padding-large">
        <div className="container">
          <div className="row">
            {/* Left Column */}
            <div className="col-md-6">
              <div className="section-header">
                <h2 className="section-title">Get in touch</h2>
              </div>
              <div className="contact-detail">
                <div className="detail-list">
                  <p>
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                  </p>
                  <ul className="list-unstyled list-icon">
                    <li>
                      <a href="#">
                        <i className="icon icon-phone"></i> +1650-243-0000
                      </a>
                    </li>
                    <li>
                      <a href="mailto:info@yourcompany.com">
                        <i className="icon icon-mail"></i> info@yourcompany.com
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="icon icon-map-pin"></i> North Melbourne
                        VIC 3051, Australia
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="social-links">
                  <h3>Social Links</h3>
                  <ul className="d-flex list-unstyled">
                    <li>
                      <a href="#" className="icon icon-facebook" />
                    </li>
                    <li>
                      <a href="#" className="icon icon-twitter" />
                    </li>
                    <li>
                      <a href="#" className="icon icon-instagram" />
                    </li>
                    <li>
                      <a href="#" className="icon icon-youtube-play" />
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="col-md-6">
              <div className="contact-information">
                <div className="section-header">
                  <h2 className="section-title">Send us a message</h2>
                </div>
                <form
                  name="contactform"
                  action="contact.php"
                  method="post"
                  className="contact-form"
                >
                  <div className="form-item">
                    <input
                      type="text"
                      minLength="2"
                      name="name"
                      placeholder="Name"
                      className="u-full-width bg-light"
                      required
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="E-mail"
                      className="u-full-width bg-light"
                      required
                    />
                    <textarea
                      name="message"
                      placeholder="Message"
                      className="u-full-width bg-light"
                      style={{ height: "180px" }}
                      required
                    />
                  </div>
                  <label>
                    <input type="checkbox" required />
                    <span className="label-body">
                      I agree all the <a href="#">terms and conditions</a>
                    </span>
                  </label>
                  <button
                    type="submit"
                    name="submit"
                    className="btn btn-dark btn-full btn-medium"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="google-map">
        <div
          className="mapouter"
          style={{
            position: "relative",
            textAlign: "right",
            height: "500px",
            width: "100%",
          }}
        >
          <div
            className="gmap_canvas"
            style={{
              overflow: "hidden",
              background: "none",
              height: "500px",
              width: "100%",
            }}
          >
            <iframe
              width="100%"
              height="500"
              id="gmap_canvas"
              src="https://maps.google.com/maps?q=2880%20Broadway,%20New%20York&t=&z=13&ie=UTF8&iwloc=&output=embed"
              frameBorder="0"
              scrolling="no"
              marginHeight="0"
              marginWidth="0"
              title="map"
            ></iframe>
          </div>
        </div>
        <br />
        <br />
        <br />
      </section>
    </>
  );
};

export default Contact;
