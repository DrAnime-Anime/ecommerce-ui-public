import React, { useEffect, useState } from "react";
import { supabase } from "../Lib/supabaseClient"; // Adjust path as needed

const BannerSection = () => {
  const [banner, setBanner] = useState(null);

  useEffect(() => {
    const fetchBanner = async () => {
      const { data, error } = await supabase
        .from("banner_section")
        .select("*")
        .single();

      if (error) {
        console.error("Error fetching banner:", error);
      } else {
        setBanner(data);
      }
    };

    fetchBanner();
  }, []);

  if (!banner) return null;

  return (
    <section className="shoppify-section-banner">
      <div className="container">
        <div className="product-collection">
          <div className="left-content collection-item">
            <div className="products-thumb">
              <img
                src={banner.image_url}
                alt="collection item"
                className="large-image image-rounded"
              />
            </div>
            <div className="col-lg-6 col-md-6 col-sm-6 product-entry">
              <div className="categories">{banner.category}</div>
              <h3 className="item-title">{banner.title}</h3>
              <p>{banner.description}</p>
              <div className="btn-wrap">
                <a
                  href={banner.button_link}
                  className="d-flex align-items-center"
                >
                  {banner.button_text}
                  <i className="icon icon-arrow-io"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BannerSection;
