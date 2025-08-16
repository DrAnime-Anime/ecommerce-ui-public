import React, { useEffect, useState } from "react";
import { supabase } from "../Lib/supabaseClient"; // your existing config

const QuoteSection = () => {
  const [quote, setQuote] = useState(null);

  const fetchQuote = async () => {
    const { data, error } = await supabase
      .from("quotes")
      .select("*")
      .eq("is_active", true);

    if (error) {
      console.error("Error fetching quote:", error);
    } else if (data && data.length > 0) {
      const randomQuote = data[Math.floor(Math.random() * data.length)];
      setQuote(randomQuote);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <section id="quotation" className="align-center padding-large">
      <div className="inner-content">
        <h2 className="section-title divider">Quote of the day</h2>
        {quote ? (
          <blockquote>
            <q>{quote.quote}</q>
            <div className="author-name">- {quote.author}</div>
          </blockquote>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <hr />
    </section>
  );
};

export default QuoteSection;
