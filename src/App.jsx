import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import AddVisa from "./components/AddVisa";
import MyAddedVisas from "./components/MyAddedVisas";
import MyVisaApplications from "./components/MyVisaApplications";
import AllVisas from "./components/AllVisas";
import VisaDetails from "./components/VisaDetails";
import Header from "./components/Header";
import Footer from "./components/Footer";
import NotFound from "./components/NotFound";
import PrivateRoute from "./components/PrivateRoute";
import ForgotPassword from "./components/ForgotPassword";
import { AuthProvider } from "./context/AuthContext";
const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/all-visas" element={<AllVisas />} />
          <Route path="/visa-details/:id" element={<VisaDetails />} />
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
        <Footer />
        <ToastContainer />
      </Router>
    </AuthProvider>
  );
};

export default App;
