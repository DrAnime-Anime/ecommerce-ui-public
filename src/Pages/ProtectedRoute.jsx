import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "../Lib/supabaseClient";

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
      setLoading(false);
    };
    checkAuth();
  }, []);

  if (loading) return <p>Loading...</p>;

  if (!session) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
