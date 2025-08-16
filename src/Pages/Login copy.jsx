import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../Lib/supabaseClient";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [bgImage, setBgImage] = useState("");
  const navigate = useNavigate();

  // Fetch login banner image from Supabase
  useEffect(() => {
    const fetchBackground = async () => {
      const { data, error } = await supabase
        .from("media_assets")
        .select("url")
        .eq("name", "login-banner")
        .single();

      if (error) {
        console.error("Failed to fetch background image:", error.message);
      } else {
        setBgImage(data.url);
      }
    };

    fetchBackground();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("Login error:", error.message);
      setError("Invalid email or password.");
    } else {
      navigate("/");
    }
  };

  return (
    <>
      <section
        className="site-banner jarallax padding-large"
        style={{
          background: bgImage ? `url(${bgImage}) no-repeat` : "#f5f5f5",
          backgroundPosition: "top",
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="page-title">Login</h1>
              <div className="breadcrumbs">
                <span className="item">
                  <a href="/">Home /</a>
                </span>
                <span className="item">Login</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="padding-large">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="section-header">
                <h2 className="section-title">Welcome Back</h2>
              </div>

              {error && <p className="text-danger">{error}</p>}

              <form onSubmit={handleLogin} className="contact-form">
                <div className="form-item">
                  <input
                    type="email"
                    placeholder="E-mail"
                    className="u-full-width bg-light"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    className="u-full-width bg-light"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-dark btn-full btn-medium"
                >
                  Login
                </button>
              </form>

              <p className="mt-3">
                Don't have an account? <a href="/register">Register here</a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
