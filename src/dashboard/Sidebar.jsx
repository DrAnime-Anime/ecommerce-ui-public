import React, { useEffect, useState } from "react";
import { supabase } from "../Lib/supabaseClient";
import { useNavigate } from "react-router-dom";
import "../../components/Dashboard-sidebar.css";

const Sidebar = ({ activeTab, setActiveTab }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [bgImage, setBgImage] = useState("");

  // ✅ Session check
  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session?.user) {
        setUser(session.user);
      } else {
        navigate("/login");
      }
    };

    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session?.user) {
          setUser(session.user);
        } else {
          navigate("/login");
        }
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, [navigate]);

  // ✅ Fetch banner image
  useEffect(() => {
    const fetchBackground = async () => {
      const { data, error } = await supabase
        .from("media_assets")
        .select("url")
        .eq("name", "login-banner")
        .single();

      if (!error && data?.url) {
        setBgImage(data.url);
      }
    };

    fetchBackground();
  }, []);

  const navItems = [
    "Dashboard",
    "Orders",
    "Wishlist",
    "Saved Cards",
    "UPI",
    "Address",
    "Profile",
    "Logout",
  ];

  const handleNavClick = (item) => {
    if (item === "Logout") {
      supabase.auth.signOut();
      navigate("/login");
    } else {
      setActiveTab(item);
    }
  };

  return (
    <>
      {/* ✅ Slim Banner */}
      <section
        className="site-banner"
        style={{
          background: bgImage ? `url(${bgImage}) no-repeat center` : "#f5f5f5",
          backgroundSize: "cover",
          height: "180px",
          margin: 0,
          padding: 0,
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="page-title fs-9">Your DashBoard</h1>
            </div>
          </div>
        </div>
      </section>

      {/* ✅ Clean Horizontal Nav with Unique IDs */}
      <nav id="custom-horizontal-nav">
        <div className="nav-container">
          <div className="nav-items">
            {navItems.map((item, index) => (
              <button
                key={item}
                id={`nav-btn-${index}`} // ✅ unique ID for each button
                onClick={() => handleNavClick(item)}
                className={`nav-btn ${activeTab === item ? "active" : ""}`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Sidebar;
