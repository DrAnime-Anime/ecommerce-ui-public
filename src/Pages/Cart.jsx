import React, { useEffect, useState } from "react";
import { supabase } from "../Lib/supabaseClient";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCart();
  }, []);

  async function fetchCart() {
    setLoading(true);

    // Get logged-in user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();
    if (userError || !user) {
      console.error("User not logged in");
      setCartItems([]);
      setLoading(false);
      return;
    }

    // Fetch cart items with product details
    const { data, error } = await supabase
      .from("cart")
      .select(
        `
        id,
        quantity,
        product_id,
        Producta (
          id,
          name,
          price,
          image_url
        )
      `
      )
      .eq("user_id", user.id);

    if (error) {
      console.error("Error fetching cart:", error.message);
      setCartItems([]);
    } else {
      // Ensure we don't break if Producta is missing
      const safeData = data.map((item) => ({
        ...item,
        Producta: item.Producta || {
          name: "Product not found",
          price: 0,
          image_url: "/placeholder.jpg",
        },
      }));
      setCartItems(safeData);
    }
    setLoading(false);
  }

  async function removeFromCart(cartId) {
    const { error } = await supabase.from("cart").delete().eq("id", cartId);
    if (error) {
      console.error("Error removing item:", error.message);
    } else {
      fetchCart();
    }
  }

  if (loading) return <p>Loading cart...</p>;

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        cartItems.map((item) => (
          <div key={item.id} className="cart-item">
            <img
              src={item.Producta.image_url}
              alt={item.Producta.name}
              width={80}
            />
            <div>
              <h4>{item.Producta.name}</h4>
              <p>₹{item.Producta.price}</p>
              <p>Quantity: {item.quantity}</p>
              <button onClick={() => removeFromCart(item.id)}>Remove</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Cart;
