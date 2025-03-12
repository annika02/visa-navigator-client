// src/components/PrivateRoute.jsx
import { Navigate } from "react-router-dom";
import { auth } from "../firebase";
import { useState, useEffect } from "react";

const PrivateRoute = ({ element }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false); // Stop loading once user is checked
    });
    return () => unsubscribe();
  }, []);

  if (loading) return <div>Loading...</div>;

  return user ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
