import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../Lib/supabaseClient";
import "swiper/css";

const About = () => {
  const [heroImage, setHeroImage] = useState("");
  const [aboutImage, setAboutImage] = useState("");

  useEffect(() => {
    const fetchImages = async () => {
      const { data, error } = await supabase
        .from("media_assets")
        .select("type, url")
        .in("type", ["about_hero", "about_image"]);

      if (!error && data) {
        const hero = data.find((img) => img.type === "about_hero");
        const about = data.find((img) => img.type === "about_image");
        if (hero) setHeroImage(hero.url);
        if (about) setAboutImage(about.url);
      }
    };

    fetchImages();
  }, []);

  return (
    <>
      {/* Banner Section */}
      <section
        className="site-banner jarallax min-height300 padding-large"
        style={{
          background: `url(${heroImage}) no-repeat`,
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="page-title">About us</h1>
              <div className="breadcrumbs">
                <span className="item">
                  <Link to="/">Home /</Link>
                </span>
                <span className="item">About</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Shipping Info Section */}
      <section id="shipping-information" className="padding-large">
        <div className="container">
          <div className="row d-flex flex-wrap align-items-center justify-content-between">
            {[
              {
                icon: "truck",
                title: "Free shipping",
                desc: "Over $200",
              },
              {
                icon: "return",
                title: "Money back",
                desc: "Return within 7 days",
              },
              {
                icon: "tags1",
                title: "Buy 4 get 5th",
                desc: "50% off",
              },
              {
                icon: "help_outline",
                title: "Any questions?",
                desc: "experts are ready",
              },
            ].map((item, i) => (
              <div key={i} className="col-md-3 col-sm-6">
                <div className="icon-box">
                  <i className={`icon icon-${item.icon}`}></i>
                  <h4 className="block-title">
                    <strong>{item.title}</strong> {item.desc}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about-us">
        <div className="container">
          <div className="row d-flex align-items-center">
            <div className="col-lg-6 col-md-12">
              <div className="image-holder">
                <img src={aboutImage} alt="About" className="about-image" />
              </div>
            </div>
            <div className="col-lg-6 col-md-12">
              <div className="detail">
                <div className="display-header">
                  <h2 className="section-title">
                    How was Ultras Store started?
                  </h2>
                  <p>
                    Risus augue curabitur diam senectus congue velit et. Sed
                    vitae metus nibh sit era. Nulla adipiscing pharetra
                    pellentesque maecenas odio eros at. Et libero vulputate amet
                    duis erat volutpat vitae eget. Sed vitae metus nibh sit era.
                    Nulla adipiscing pharetra pellentesque maecenas odio eros
                    at. Et libero vulputate amet duis erat volutpat vitae eget.
                    Quam libero etiam et in ac at quis. Risus augue curabitur
                    diam senectus congue velit et.
                  </p>
                  <div className="btn-wrap">
                    <Link
                      to="/shop"
                      className="btn btn-dark btn-medium d-flex align-items-center"
                    >
                      Shop our store
                      <i className="icon icon-arrow-io"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <br />
      <br />
    </>
  );
};

export default About;
