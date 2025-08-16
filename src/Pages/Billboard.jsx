import { useEffect, useState } from "react";
import { supabase } from "../Lib/supabaseClient"; // adjust if path differs
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const Billboard = () => {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    const fetchBillboards = async () => {
      const { data, error } = await supabase
        .from("billboards")
        .select("*")
        .eq("show_on_home", true);

      if (error) {
        console.error("Error fetching billboard data:", error);
      } else {
        setBanners(data);
      }
    };

    fetchBillboards();
  }, []);

  return (
    <section id="billboard" className="overflow-hidden">
      <button className="button-prev">
        <i className="icon icon-chevron-left"></i>
      </button>
      <button className="button-next">
        <i className="icon icon-chevron-right"></i>
      </button>

      <Swiper
        modules={[Navigation]}
        navigation={{
          prevEl: ".button-prev",
          nextEl: ".button-next",
        }}
        className="main-swiper"
        loop={true}
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner.id}>
            <div
              className="swiper-slide"
              style={{
                backgroundImage: `url('${banner.image_url}')`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="banner-content">
                <div className="container">
                  <div className="row">
                    <div className="col-md-6">
                      <h2 className="banner-title">{banner.title}</h2>
                      <p>{banner.description}</p>
                      <div className="btn-wrap">
                        <a
                          href="/shop"
                          className="btn btn-light btn-medium d-flex align-items-center"
                        >
                          Shop it now <i className="icon icon-arrow-io"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Billboard;
