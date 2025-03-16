import { Navigate } from "react-router-dom";
import { auth } from "../firebase"; // Import your firebase configuration
import { useState, useEffect } from "react";

const PrivateRoute = ({ element }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Firebase auth state listener
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user); // Set user object (null if not logged in)
      setLoading(false); // Set loading to false once the user is checked
    });

    return () => unsubscribe(); // Clean up the listener on component unmount
  }, []);

  if (loading) {
    return <div>Loading...</div>; // You can replace this with a loading spinner
  }

  // If the user is not logged in, redirect them to the login page
  return user ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
