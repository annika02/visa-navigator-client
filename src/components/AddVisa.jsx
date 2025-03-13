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

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setVisaData({ ...visaData, [name]: value });
  };

  // Handle checkbox changes
  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    const updatedDocs = checked
      ? [...visaData.requiredDocuments, value]
      : visaData.requiredDocuments.filter((doc) => doc !== value);
    setVisaData({ ...visaData, requiredDocuments: updatedDocs });
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/visas/add-visa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(visaData),
      });

      if (response.ok) {
        toast.success("Visa added successfully!");
        navigate("/all-visas");
      } else {
        toast.error("Failed to add visa.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error adding visa.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl w-full">
        <h2 className="text-3xl font-bold mb-6 text-center">Add Visa</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="countryImage"
            placeholder="Country Image URL"
            value={visaData.countryImage}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />

          <input
            type="text"
            name="countryName"
            placeholder="Country Name"
            value={visaData.countryName}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />

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

          <input
            type="text"
            name="processingTime"
            placeholder="Processing Time (e.g., 2 weeks)"
            value={visaData.processingTime}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />

          <label>Required Documents:</label>
          {["Valid passport", "Visa application form", "Photo"].map((doc) => (
            <div key={doc} className="flex items-center">
              <input
                type="checkbox"
                value={doc}
                onChange={handleCheckboxChange}
              />
              <label className="ml-2">{doc}</label>
            </div>
          ))}

          <textarea
            name="description"
            placeholder="Visa Description"
            value={visaData.description}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />

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
