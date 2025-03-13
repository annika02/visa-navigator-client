// src/components/AddVisa.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddVisa = () => {
  const [visaData, setVisaData] = useState({
    countryImage: "",
    countryName: "",
    visaType: "Tourist Visa",
    processingTime: "",
    requiredDocuments: [],
    description: "",
    ageRestriction: "",
    fee: "",
    validity: "",
    applicationMethod: "",
  });

  const navigate = useNavigate();

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setVisaData({ ...visaData, [name]: value });
  };

  // Handle checkbox selection
  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    const updatedDocuments = checked
      ? [...visaData.requiredDocuments, value]
      : visaData.requiredDocuments.filter((doc) => doc !== value);

    setVisaData({ ...visaData, requiredDocuments: updatedDocuments });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send data to your backend
      const response = await fetch("http://localhost:5000/add-visa", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(visaData),
      });

      if (response.ok) {
        toast.success("Visa added successfully!");
        navigate("/all-visas"); // Redirect to All Visas page
      } else {
        toast.error("Failed to add visa. Please try again.");
      }
    } catch (error) {
      toast.error("Error adding visa. Please check your input.");
      console.error("Error:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl w-full">
        <h2 className="text-3xl font-bold mb-6 text-center">Add Visa</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Country Image */}
          <input
            type="text"
            name="countryImage"
            placeholder="Country Image URL"
            value={visaData.countryImage}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />

          {/* Country Name */}
          <input
            type="text"
            name="countryName"
            placeholder="Country Name"
            value={visaData.countryName}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />

          {/* Visa Type (Dropdown) */}
          <select
            name="visaType"
            value={visaData.visaType}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          >
            <option value="Tourist Visa">Tourist Visa</option>
            <option value="Student Visa">Student Visa</option>
            <option value="Official Visa">Official Visa</option>
          </select>

          {/* Processing Time */}
          <input
            type="text"
            name="processingTime"
            placeholder="Processing Time (e.g., 2 weeks)"
            value={visaData.processingTime}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />

          {/* Required Documents (Checkboxes) */}
          <label className="block font-semibold">Required Documents:</label>
          {[
            "Valid passport",
            "Visa application form",
            "Recent passport-sized photograph",
          ].map((doc) => (
            <div key={doc} className="flex items-center">
              <input
                type="checkbox"
                value={doc}
                onChange={handleCheckboxChange}
              />
              <label className="ml-2">{doc}</label>
            </div>
          ))}

          {/* Description */}
          <textarea
            name="description"
            placeholder="Visa Description"
            value={visaData.description}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />

          {/* Age Restriction */}
          <input
            type="number"
            name="ageRestriction"
            placeholder="Age Restriction (e.g., 18)"
            value={visaData.ageRestriction}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />

          {/* Fee */}
          <input
            type="number"
            name="fee"
            placeholder="Visa Fee (e.g., 150)"
            value={visaData.fee}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />

          {/* Validity */}
          <input
            type="text"
            name="validity"
            placeholder="Validity (e.g., 6 months)"
            value={visaData.validity}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />

          {/* Application Method */}
          <input
            type="text"
            name="applicationMethod"
            placeholder="Application Method (e.g., Online, In-person)"
            value={visaData.applicationMethod}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Add Visa
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddVisa;
