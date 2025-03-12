// src/components/Register.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase";
import { toast } from "react-toastify";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();

  // Password validation function
  const isValidPassword = (password) => {
    return (
      /[A-Z]/.test(password) && // At least one uppercase
      /[a-z]/.test(password) && // At least one lowercase
      password.length >= 6 // Minimum 6 characters
    );
  };

  // Handle Registration
  const handleRegister = async (e) => {
    e.preventDefault();
    if (!isValidPassword(password)) {
      setError(
        "Password must have at least 6 characters, an uppercase letter, and a lowercase letter."
      );
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(userCredential.user, {
        displayName: name,
        photoURL: photoURL,
      });
      toast.success("Registered successfully!");
      navigate("/"); // Navigate to Home
    } catch (error) {
      setError(error.message);
      toast.error("Registration failed.");
    }
  };

  // Handle Google Register
  const handleGoogleRegister = async () => {
    try {
      await signInWithPopup(auth, provider);
      toast.success("Registered with Google!");
      navigate("/"); // Navigate to Home
    } catch (error) {
      toast.error("Google registration failed.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg"
          />
          <input
            type="text"
            placeholder="Photo URL"
            value={photoURL}
            onChange={(e) => setPhotoURL(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
          >
            Register
          </button>
        </form>

        <button
          onClick={handleGoogleRegister}
          className="w-full mt-4 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
        >
          Register with Google
        </button>

        {error && <p className="mt-4 text-red-500 text-center">{error}</p>}

        <p className="mt-4 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
