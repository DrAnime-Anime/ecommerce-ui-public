import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../Lib/supabaseClient";

const SingleProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState("");

  // ✅ UUID validation function
  const isValidUUID = (str) => {
    const uuidRegex =
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
    return uuidRegex.test(str);
  };

  // Fetch product
  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);

      // ✅ Prevent invalid UUID from causing 400 error
      if (!isValidUUID(id)) {
        console.warn("Invalid product ID:", id);
        setProduct(null);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("Producta")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error fetching product:", error);
      } else if (data) {
        setProduct(data);

        if (Array.isArray(data.image_urls) && data.image_urls.length > 0) {
          setMainImage(data.image_urls[0]);
        } else if (data.image_url) {
          setMainImage(data.image_url);
        } else {
          setMainImage("");
        }
      }

      setLoading(false);
    };

    if (id) fetchProduct();
  }, [id]);

  // Add to Cart handler
  const addToCart = async () => {
    const { data: sessionData } = await supabase.auth.getSession();
    const userId = sessionData?.session?.user?.id;

    if (!userId) {
      alert("Please log in to add items to your cart.");
      return;
    }

    // Check if product already in cart
    const { data: existingItem } = await supabase
      .from("cart")
      .select("*")
      .eq("user_id", userId)
      .eq("product_id", product.id)
      .maybeSingle(); // ✅ avoids crash if not found

    if (existingItem) {
      await supabase
        .from("cart")
        .update({ quantity: existingItem.quantity + 1 })
        .eq("id", existingItem.id);
    } else {
      await supabase
        .from("cart")
        .insert([{ user_id: userId, product_id: product.id, quantity: 1 }]);
    }

    alert("Added to cart!");
  };

  if (loading) {
    return <div className="container text-center py-5">Loading product...</div>;
  }

  if (!product) {
    return <div className="container text-center py-5">Product not found.</div>;
  }

  const discount =
    product.old_price && product.old_price > product.price
      ? Math.round(
          ((product.old_price - product.price) / product.old_price) * 100
        )
      : 0;

  return (
    <section className="product-detail container py-5">
      <div className="row">
        {/* Images */}
        <div className="col-md-6">
          {mainImage ? (
            <img
              src={mainImage}
              alt={product.name}
              className="img-fluid rounded shadow mb-3"
            />
          ) : (
            <div
              className="bg-light d-flex align-items-center justify-content-center rounded shadow mb-3"
              style={{ height: "400px" }}
            >
              No Image
            </div>
          )}

          <div className="d-flex flex-wrap">
            {(Array.isArray(product.image_urls) && product.image_urls.length > 0
              ? product.image_urls
              : product.image_url
              ? [product.image_url]
              : []
            ).map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Thumbnail ${index + 1}`}
                className="img-thumbnail me-2 mb-2"
                style={{
                  width: "80px",
                  height: "80px",
                  cursor: "pointer",
                  objectFit: "cover",
                }}
                onClick={() => setMainImage(img)}
              />
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="col-md-6">
          <h1 className="product-title">{product.name}</h1>
          <div className="product-pricing mb-3">
            {discount > 0 && (
              <span className="text-danger me-2">-{discount}%</span>
            )}
            <span className="price fs-4 fw-bold">₹{product.price}</span>{" "}
            {product.old_price && product.old_price > 0 && (
              <span className="old-price text-muted text-decoration-line-through">
                ₹{product.old_price}
              </span>
            )}
          </div>

          <p className="product-description">{product.description}</p>

          {product.size_options?.length > 0 && (
            <div className="sizes mb-3">
              <h6>Available Sizes:</h6>
              {product.size_options.map((size, index) => (
                <button key={index} className="btn btn-outline-dark me-2 mb-2">
                  {size}
                </button>
              ))}
            </div>
          )}

          <button className="btn btn-primary btn-lg" onClick={addToCart}>
            Add to Cart
          </button>
        </div>
      </div>

      {/* Reviews */}
      <div className="reviews mt-5">
        <h3>Customer Reviews</h3>
        {product.reviews?.length > 0 ? (
          product.reviews.map((review, idx) => (
            <div key={idx} className="border-bottom py-2">
              <strong>{review.user}</strong> – {review.rating}★
              <p>{review.comment}</p>
            </div>
          ))
        ) : (
          <p>No reviews yet.</p>
        )}
      </div>
    </section>
  );
};

export default SingleProduct;
