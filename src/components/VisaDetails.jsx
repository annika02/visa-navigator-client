import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

const VisaDetails = () => {
  const { id } = useParams();
  const [visa, setVisa] = useState(null);
  const [loading, setLoading] = useState(true);

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

  // Show loading state while data is being fetched
  if (loading) {
    return <p className="text-center">Loading visa details...</p>;
  }

  // Handle case where visa is not found
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
          <strong>Visa Type:</strong> {visa.visaType || "Not specified"}
        </p>
        <p>
          <strong>Processing Time:</strong> {visa.processingTime || "N/A"}
        </p>
        <p>
          <strong>Fee:</strong> ${visa.fee ?? "N/A"}
        </p>
        <p>
          <strong>Validity:</strong> {visa.validity || "N/A"}
        </p>
        <p>
          <strong>Age Restriction:</strong>{" "}
          {visa.ageRestriction ?? "No restriction"}
        </p>
        <p>
          <strong>Description:</strong>{" "}
          {visa.description || "No description available."}
        </p>
        <p>
          <strong>Application Method:</strong> {visa.applicationMethod || "N/A"}
        </p>
      </div>
    </div>
  );
};

export default VisaDetails;
