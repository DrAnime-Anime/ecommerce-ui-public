import React, { useEffect, useState } from "react";
import { supabase } from "../Lib/supabaseClient";
import "../../components/BrandScroll.css";

const BrandCollection = () => {
  const [brands, setBrands] = useState([]);

  const fetchBrands = async () => {
    const { data, error } = await supabase
      .from("media_assets")
      .select("*")
      .eq("type", "brand");

    if (error) {
      console.error("Error fetching brand assets:", error);
    } else {
      setBrands(data);
    }
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  return (
    <section id="brand-collection" className="padding-medium bg-light-grey">
      <div className="container text-center">
        <h2 className="mb-4">Our Brand Partners</h2>

        {/* Scrolling wrapper */}
        <div className="scroll-container">
          <div className="scroll-track">
            {[...brands, ...brands].map((brand, index) => (
              <div key={index} className="brand-item">
                <img
                  src={brand.image_url || brand.url || brand.path}
                  alt={`Brand ${index + 1}`}
                  className="brand-logo"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandCollection;
