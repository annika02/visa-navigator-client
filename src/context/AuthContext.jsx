import React, { createContext, useState, useEffect } from "react";
import { auth } from "../firebase"; // Assuming you're using Firebase for auth

// Create AuthContext
const AuthContext = createContext();

// Create AuthProvider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Listen for changes in authentication state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user); // Update state when auth state changes
    });

    return () => unsubscribe(); // Cleanup the listener
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

// Custom hook to use authentication context
export const useAuth = () => {
  return React.useContext(AuthContext); // Ensure React is imported and used correctly
};
