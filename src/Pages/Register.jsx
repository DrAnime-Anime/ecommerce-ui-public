import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../Lib/supabaseClient";

const Register = () => {
  const navigate = useNavigate();
  const [bgImage, setBgImage] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [checklist, setChecklist] = useState({
    length: false,
    uppercase: false,
    number: false,
    specialChar: false,
    match: false,
  });

  // Load background image for register page
  useEffect(() => {
    const fetchBackground = async () => {
      const { data, error } = await supabase
        .from("media_assets")
        .select("url")
        .eq("name", "register-banner")
        .single();

      if (!error && data) {
        setBgImage(data.url);
      }
    };

    fetchBackground();
  }, []);

  // Password validation logic
  useEffect(() => {
    const updated = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      number: /\d/.test(password),
      specialChar: /[!@#$%^&*]/.test(password),
      match: password === confirmPassword && confirmPassword.length > 0,
    };
    setChecklist(updated);
  }, [password, confirmPassword]);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const allValid = Object.values(checklist).every(Boolean);

    if (!allValid) {
      setError("Please meet all password requirements.");
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      setSuccess("Registration successful! Please check your email.");
      setTimeout(() => navigate("/login"), 3000);
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
              <h1 className="page-title">Register</h1>
              <div className="breadcrumbs">
                <span className="item">
                  <a href="/">Home /</a>
                </span>
                <span className="item">Register</span>
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
                <h2 className="section-title">Create Your Account</h2>
              </div>

              {error && <p className="text-danger">{error}</p>}
              {success && <p className="text-success">{success}</p>}

              <form onSubmit={handleRegister} className="contact-form">
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

                  <input
                    type="password"
                    placeholder="Confirm Password"
                    className="u-full-width bg-light"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>

                {/* Password Checklist */}
                {Object.values(checklist).some((v) => !v) && (
                  <ul className="text-muted mb-3">
                    <li
                      className={
                        checklist.length ? "text-success" : "text-danger"
                      }
                    >
                      At least 8 characters
                    </li>
                    <li
                      className={
                        checklist.uppercase ? "text-success" : "text-danger"
                      }
                    >
                      At least one uppercase letter
                    </li>
                    <li
                      className={
                        checklist.number ? "text-success" : "text-danger"
                      }
                    >
                      At least one number
                    </li>
                    <li
                      className={
                        checklist.specialChar ? "text-success" : "text-danger"
                      }
                    >
                      At least one special character (!@#$%^&*)
                    </li>
                    <li
                      className={
                        checklist.match ? "text-success" : "text-danger"
                      }
                    >
                      Passwords match
                    </li>
                  </ul>
                )}

                <button
                  type="submit"
                  className="btn btn-dark btn-full btn-medium"
                >
                  Register
                </button>
              </form>

              <p className="mt-3">
                Already have an account? <a href="/login">Login here</a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;
