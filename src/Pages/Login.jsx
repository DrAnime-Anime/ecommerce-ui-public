import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../Lib/supabaseClient";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [bgImage, setBgImage] = useState("");
  const navigate = useNavigate();

  // ✅ Redirect if already logged in
  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        navigate("/dashboard");
      }
    };
    checkUser();
  }, [navigate]);

  // ✅ Fetch login banner image
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

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("Login error:", error.message);
      setError("Invalid email or password.");
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <>
      <section
        className="site-banner jarallax min-height300"
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

      <section className="padding-small">
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
              <div className="divider">
                <span>OR</span>
              </div>
              <button
                type="submit"
                className="btn btn-dark btn-full btn-medium"
              >
                <i className="icon-google" style={{ marginRight: "8px" }}></i>
                Sign up with Google
              </button>
              <button
                type="button"
                onClick={() => navigate("/register")}
                className="btn btn-dark btn-full btn-medium"
              >
                Sign up with Email
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
