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
    <div className="half">
      <div
        className="bg order-1 order-md-2"
        style={{
          background: bgImage ? `url(${bgImage}) no-repeat` : "#f5f5f5",
        }}
      ></div>
      <div className="contents order-2 order-md-1">
        <div className="container">
          <div className="row align-items-center justify-content-center">
            <div className="col-md-6">
              <div className="form-block">
                <div className="text-center mb-5">
                  <h3>
                    Login to <strong>Colorlib</strong>
                  </h3>
                </div>

                {error && <p className="text-danger">{error}</p>}

                <form onSubmit={handleLogin} method="post">
                  <div className="form-group first">
                    <label htmlFor="username">Username</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="E-mail"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      id="username"
                      required
                    />
                  </div>
                  <div className="form-group last mb-3">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Password"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>

                  <div className="d-sm-flex mb-5 align-items-center">
                    <label className="control control--checkbox mb-3 mb-sm-0">
                      <span className="caption">Remember me</span>
                      <input type="checkbox" defaultChecked />
                      <div className="control__indicator"></div>
                    </label>
                    <span className="ml-auto">
                      <a href="#" className="forgot-pass">
                        Forgot Password
                      </a>
                    </span>
                  </div>

                  <input
                    type="submit"
                    value="Log In"
                    className="btn btn-block btn-primary"
                  />
                  <span className="d-block text-center my-4 text-muted">
                    &mdash; or &mdash;
                  </span>

                  <div className="social-login">
                    <a
                      href="#"
                      className="facebook btn d-flex justify-content-center align-items-center"
                    >
                      <span className="icon-facebook mr-3"></span> Login with
                      Facebook
                    </a>
                    <a
                      href="#"
                      className="google btn d-flex justify-content-center align-items-center"
                    >
                      <span className="icon-google mr-3"></span> Login with
                      Google
                    </a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
