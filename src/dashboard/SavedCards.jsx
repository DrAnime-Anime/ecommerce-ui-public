import React, { useState, useEffect } from "react";
import { supabase } from "../Lib/supabaseClient";

const SavedCards = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const [newCard, setNewCard] = useState({
    card_holder: "",
    card_number: "",
    expiry_month: "",
    expiry_year: "",
  });

  useEffect(() => {
    const getUserAndCards = async () => {
      // ✅ Get logged in user securely
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        console.error("No user logged in");
        setLoading(false);
        return;
      }
      setUser(user);

      // ✅ Fetch only this user's cards
      const { data, error } = await supabase
        .from("saved_cards")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) {
        console.error(error);
      } else {
        setCards(data || []);
      }
      setLoading(false);
    };

    getUserAndCards();
  }, []);

  const handleAddCard = async (e) => {
    e.preventDefault();
    if (!user) return;

    const { data, error } = await supabase.from("saved_cards").insert([
      {
        user_id: user.id,
        card_holder: newCard.card_holder,
        card_number: newCard.card_number,
        expiry_month: parseInt(newCard.expiry_month),
        expiry_year: parseInt(newCard.expiry_year),
      },
    ]);

    if (error) {
      console.error(error);
    } else {
      setCards((prev) => [...data, ...prev]);
      setNewCard({
        card_holder: "",
        card_number: "",
        expiry_month: "",
        expiry_year: "",
      });
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container">
      <h2>Saved Cards</h2>

      {cards.length === 0 ? (
        <p>No cards saved yet. Add one below.</p>
      ) : (
        <ul>
          {cards.map((card) => (
            <li key={card.id}>
              <strong>{card.card_holder}</strong> — **** **** ****{" "}
              {card.card_number.slice(-4)}
              (Exp: {card.expiry_month}/{card.expiry_year})
            </li>
          ))}
        </ul>
      )}

      {/* Add Card Form */}
      <form onSubmit={handleAddCard} style={{ marginTop: "20px" }}>
        <input
          type="text"
          placeholder="Card Holder"
          value={newCard.card_holder}
          onChange={(e) =>
            setNewCard({ ...newCard, card_holder: e.target.value })
          }
          required
        />
        <input
          type="text"
          placeholder="Card Number"
          value={newCard.card_number}
          onChange={(e) =>
            setNewCard({ ...newCard, card_number: e.target.value })
          }
          required
        />
        <input
          type="number"
          placeholder="Expiry Month"
          value={newCard.expiry_month}
          onChange={(e) =>
            setNewCard({ ...newCard, expiry_month: e.target.value })
          }
          required
        />
        <input
          type="number"
          placeholder="Expiry Year"
          value={newCard.expiry_year}
          onChange={(e) =>
            setNewCard({ ...newCard, expiry_year: e.target.value })
          }
          required
        />
        <button type="submit">Add Card</button>
      </form>
    </div>
  );
};

export default SavedCards;
