// src/App.jsx
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify"; // Import ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import AddVisa from "./components/AddVisa";
import MyAddedVisas from "./components/MyAddedVisas";
import MyVisaApplications from "./components/MyVisaApplications";
import AllVisas from "./components/AllVisas";
import Header from "./components/Header";
import Footer from "./components/Footer"; // Import Footer
import NotFound from "./components/NotFound"; // Import NotFound
import PrivateRoute from "./components/PrivateRoute";
import ForgotPassword from "./components/ForgotPassword";
const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/all-visas" element={<AllVisas />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Protected Routes */}
        <Route
          path="/add-visa"
          element={<PrivateRoute element={<AddVisa />} />}
        />
        <Route
          path="/my-added-visas"
          element={<PrivateRoute element={<MyAddedVisas />} />}
        />
        <Route
          path="/my-visa-applications"
          element={<PrivateRoute element={<MyVisaApplications />} />}
        />

        {/* 404 Page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer /> {/* Add Footer */}
      <ToastContainer /> {/* Add ToastContainer */}
    </Router>
  );
};

export default App;
