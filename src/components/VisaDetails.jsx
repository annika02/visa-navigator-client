import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

const VisaDetails = () => {
  const { id } = useParams();
  const [visa, setVisa] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch visa details by ID
  useEffect(() => {
    fetch(`http://localhost:5000/visas/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setVisa(data.visa);
        } else {
          Swal.fire("Error!", data.message, "error");
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching visa details:", error);
        Swal.fire("Error!", "Failed to fetch visa details.", "error");
        setLoading(false);
      });
  }, [id]);

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
        <img
          src={visa.countryImage}
          alt={visa.countryName}
          className="w-full h-40 object-cover rounded-md"
        />
        <h3 className="text-xl font-semibold mt-2">{visa.countryName}</h3>
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
          <strong>Age Restriction:</strong> {visa.ageRestriction}+
        </p>
        <p>
          <strong>Description:</strong> {visa.description}
        </p>
        <p>
          <strong>Application Method:</strong> {visa.applicationMethod}
        </p>
      </div>
    </div>
  );
};

export default VisaDetails;
