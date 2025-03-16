import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useAuth } from "../context/AuthContext";

const VisaDetails = () => {
  const { id } = useParams();
  const [visa, setVisa] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  // Fetch visa details by ID
  useEffect(() => {
    const fetchVisaDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/visas/${id}`);
        const data = await response.json();
        if (data.success) {
          setVisa(data.visa);
        } else {
          Swal.fire("Error!", data.message, "error");
        }
      } catch (error) {
        console.error("❌ Error fetching visa details:", error);
        Swal.fire("Error!", "Failed to fetch visa details.", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchVisaDetails();
  }, [id]);

  // Handle apply for visa
  const handleApply = async () => {
    if (!user) {
      Swal.fire(
        "Error!",
        "You must be logged in to apply for a visa.",
        "error"
      );
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/visas/add-visa", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...visa, // Include all visa details
          email: user.email, // Add the user's email
          appliedDate: new Date().toISOString(), // Add the applied date
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Swal.fire(
          "Success!",
          "Visa application submitted successfully!",
          "success"
        );
        navigate("/my-visa-applications"); // Redirect to the applications page
      } else {
        Swal.fire("Error!", data.message, "error");
      }
    } catch (error) {
      console.error("❌ Error applying for visa:", error);
      Swal.fire("Error!", "Failed to apply for visa.", "error");
    }
  };

  if (loading) {
    return <p className="text-center">Loading visa details...</p>;
  }

  if (!visa) {
    return <p className="text-center text-gray-600">Visa not found.</p>;
  }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-6">Visa Details</h2>
      <div className="bg-white p-4 shadow-md rounded-lg">
        {visa.countryImage && (
          <img
            src={visa.countryImage}
            alt={visa.countryName || "Visa Image"}
            className="w-full h-40 object-cover rounded-md"
          />
        )}

        <h3 className="text-xl font-semibold mt-2">
          {visa.countryName || "Unknown Country"}
        </h3>

        <p>
          <strong>Visa Type:</strong> {visa.visaType}
        </p>
        <p>
          <strong>Processing Time:</strong> {visa.processingTime}
        </p>
        <p>
          <strong>Fee:</strong> ${visa.fee}
        </p>
        <p>
          <strong>Validity:</strong> {visa.validity}
        </p>
        <p>
          <strong>Description:</strong> {visa.description}
        </p>
        <p>
          <strong>Application Method:</strong> {visa.applicationMethod}
        </p>

        {/* Apply for visa button (only visible if user is logged in) */}
        {user && (
          <button
            onClick={handleApply}
            className="bg-blue-500 text-white py-2 px-4 rounded mt-4"
          >
            Apply for the visa
          </button>
        )}
      </div>
    </div>
  );
};

export default VisaDetails;
