import React, { useEffect, useState } from "react";
import { supabase } from "../Lib/supabaseClient";

const LatestCollection = () => {
  const [collectionData, setCollectionData] = useState([]);

  useEffect(() => {
    const fetchCollectionData = async () => {
      const { data, error } = await supabase
        .from("latest_collection")
        .select("*")
        .order("id", { ascending: true });

      if (error) {
        console.error("Error fetching LatestCollection:", error);
      } else {
        setCollectionData(data);
      }
    };

    fetchCollectionData();
  }, []);

  const leftItem = collectionData.find((item) => item.position === "left");
  const rightTopItem = collectionData.find(
    (item) => item.position === "right-top"
  );
  const rightBottomItem = collectionData.find(
    (item) => item.position === "right-bottom"
  );

  return (
    <section id="latest-collection">
      <div className="container">
        <div className="product-collection row">
          {/* Left Content */}
          <div className="col-lg-7 col-md-12 left-content">
            {leftItem && (
              <div className="collection-item">
                <div className="products-thumb">
                  <img
                    src={leftItem.image_url}
                    alt={leftItem.title}
                    className="large-image image-rounded"
                  />
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 product-entry">
                  <div className="categories">{leftItem.category}</div>
                  <h3 className="item-title">{leftItem.title}</h3>
                  <p>{leftItem.description}</p>
                  <div className="btn-wrap">
                    <a href="shop.html" className="d-flex align-items-center">
                      shop collection <i className="icon icon-arrow-io"></i>
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Content */}
          <div className="col-lg-5 col-md-12 right-content flex-wrap">
            {/* Top Item */}
            {rightTopItem && (
              <div className="collection-item top-item">
                <div className="products-thumb">
                  <img
                    src={rightTopItem.image_url}
                    alt={rightTopItem.title}
                    className="small-image image-rounded"
                  />
                </div>
                <div className="col-md-6 product-entry">
                  <div className="categories">{rightTopItem.category}</div>
                  <h3 className="item-title">{rightTopItem.title}</h3>
                  <div className="btn-wrap">
                    <a href="shop.html" className="d-flex align-items-center">
                      shop collection <i className="icon icon-arrow-io"></i>
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* Bottom Item */}
            {rightBottomItem && (
              <div className="collection-item bottom-item">
                <div className="products-thumb">
                  <img
                    src={rightBottomItem.image_url}
                    alt={rightBottomItem.title}
                    className="small-image image-rounded"
                  />
                </div>
                <div className="col-md-6 product-entry">
                  <div className="categories">{rightBottomItem.category}</div>
                  <h3 className="item-title">{rightBottomItem.title}</h3>
                  <div className="btn-wrap">
                    <a href="shop.html" className="d-flex align-items-center">
                      shop collection <i className="icon icon-arrow-io"></i>
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LatestCollection;
