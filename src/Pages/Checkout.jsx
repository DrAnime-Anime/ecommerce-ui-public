import React from "react";

const Checkout = () => {
  return (
    <>
      {/* Banner Section */}
      <section
        className="site-banner"
        style={{
          background:
            "url(https://firebasestorage.googleapis.com/v0/b/thegreatstore-123.firebasestorage.app/o/Images%2Fhero-image.jpg?alt=media&token=598e3568-34fb-427e-b486-10ba05c56681) no-repeat",
          backgroundPosition: "top",
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="page-title">Checkout</h1>
            </div>
          </div>
        </div>
      </section>
      <br />
      <br />
      {/* Checkout Form Section */}
      <section className="checkout-form ">
        <div className="container">
          <form className="row">
            {/* Billing Details */}
            <div className="col-md-6">
              <div className="section-header">
                <h2 className="section-title">Billing Details</h2>
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="fullname"
                  placeholder="Full Name"
                  className="form-control mb-3"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  className="form-control mb-3"
                  required
                />
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone Number"
                  className="form-control mb-3"
                  required
                />
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  className="form-control mb-3"
                  required
                />
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  className="form-control mb-3"
                  required
                />
                <input
                  type="text"
                  name="zip"
                  placeholder="ZIP Code"
                  className="form-control mb-3"
                  required
                />
              </div>
            </div>

            {/* Order Summary */}
            <div className="col-md-6">
              <div className="section-header">
                <h2 className="section-title">Order Summary</h2>
              </div>
              <div className="order-summary bg-light p-4">
                <ul className="list-unstyled">
                  <li className="d-flex justify-content-between border-bottom pb-2">
                    <span>Solar Panel Kit</span>
                    <span>$299.99</span>
                  </li>
                  <li className="d-flex justify-content-between border-bottom pb-2">
                    <span>Wind Turbine Set</span>
                    <span>$499.99</span>
                  </li>
                  <li className="d-flex justify-content-between font-weight-bold pt-3">
                    <span>Total</span>
                    <span>$799.98</span>
                  </li>
                </ul>
                <button
                  type="submit"
                  className="btn btn-dark btn-full btn-medium mt-4"
                >
                  Place Order
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
      <br />
      <br />
    </>
  );
};

export default Checkout;
