import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

const Header = () => {
  const [user, setUser] = useState(null);

  // Firebase Auth state change listener
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser);
    return () => unsubscribe(); // Cleanup on unmount
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null); // Set the user to null after logout
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <header className="bg-gray-800 text-white p-4">
      <nav className="flex justify-between items-center">
        <div>
          <Link to="/" className="text-xl font-bold">
            Visa Navigator
          </Link>
        </div>

        <div className="flex space-x-6">
          <Link to="/" className="text-white hover:underline">
            Home
          </Link>
          <Link to="/all-visas" className="text-white hover:underline">
            All Visas
          </Link>

          {user && (
            <>
              <Link to="/add-visa" className="text-white hover:underline">
                Add Visa
              </Link>
              <Link to="/my-added-visas" className="text-white hover:underline">
                My Added Visas
              </Link>
              <Link
                to="/my-visa-applications"
                className="text-white hover:underline"
              >
                My Visa Applications
              </Link>
            </>
          )}

          {user ? (
            <div className="flex items-center space-x-4">
              <span>Hello, {user.displayName || "User"}</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex space-x-4">
              <Link to="/login" className="text-white hover:underline">
                Login
              </Link>
              <Link to="/register" className="text-white hover:underline">
                Register
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
