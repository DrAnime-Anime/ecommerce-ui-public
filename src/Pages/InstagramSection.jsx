import React, { useEffect, useState } from "react";
import { supabase } from "../Lib/supabaseClient"; // adjust if your supabase file is elsewhere

const InstagramSection = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchInstaImages = async () => {
      const { data, error } = await supabase
        .from("media_assets")
        .select("url")
        .eq("type", "insta");

      if (error) {
        console.error("Error fetching images from Supabase:", error.message);
      } else {
        setImages(data);
      }
    };

    fetchInstaImages();
  }, []);

  return (
    <section id="instagram" className="padding-large">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Follow our instagram</h2>
        </div>
        <p>
          Our official Instagram account <a href="#">@TGS</a> or{" "}
          <a href="#">#TheGreatStrore_Clothing</a>
        </p>
        <div className="row d-flex flex-wrap justify-content-between">
          {images.map((img, index) => (
            <div key={index} className="col-lg-2 col-md-4 col-sm-6">
              <figure className="zoom-effect position-relative">
                <img
                  src={img.url}
                  alt={`instagram-${index}`}
                  className="insta-image"
                />
                <i className="icon icon-instagram position-absolute top-50 start-50 translate-middle text-white fs-4"></i>
              </figure>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InstagramSection;
