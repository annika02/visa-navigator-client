import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const AllVisas = () => {
  const [visas, setVisas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredVisas, setFilteredVisas] = useState([]);
  const [selectedVisaType, setSelectedVisaType] = useState("All");

  // Fetch visas from the database
  useEffect(() => {
    fetch("http://localhost:5000/visas")
      .then((res) => res.json())
      .then((data) => {
        setVisas(data);
        setFilteredVisas(data); // Initialize filtered visas with all visas
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching visas:", error);
        setLoading(false);
      });
  }, []);

  // Handle filter by visa type
  const handleFilterChange = (e) => {
    const type = e.target.value;
    setSelectedVisaType(type);

    if (type === "All") {
      setFilteredVisas(visas); // Show all visas
    } else {
      const filtered = visas.filter((visa) => visa.visaType === type);
      setFilteredVisas(filtered); // Filter by visa type
    }
  };

  // Delete Visa Function
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This visa will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/visas/${id}`, {
          method: "DELETE",
        })
          .then((res) => {
            if (!res.ok) {
              throw new Error("Failed to delete visa.");
            }
            return res.json();
          })
          .then((data) => {
            if (data.success) {
              setVisas(visas.filter((visa) => visa._id !== id));
              setFilteredVisas(filteredVisas.filter((visa) => visa._id !== id));
              Swal.fire("Deleted!", "Visa has been deleted.", "success");
            } else {
              Swal.fire("Error!", "Failed to delete visa.", "error");
            }
          })
          .catch((error) => {
            console.error("Error deleting visa:", error);
            Swal.fire("Error!", "Something went wrong.", "error");
          });
      }
    });
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-6">All Visas</h2>

      {/* Filter Dropdown */}
      <div className="mb-6">
        <label htmlFor="visaType" className="mr-2">
          Filter by Visa Type:
        </label>
        <select
          id="visaType"
          value={selectedVisaType}
          onChange={handleFilterChange}
          className="p-2 border rounded"
        >
          <option value="All">All</option>
          <option value="Tourist Visa">Tourist Visa</option>
          <option value="Student Visa">Student Visa</option>
          <option value="Official Visa">Official Visa</option>
        </select>
      </div>

      {loading ? (
        <p className="text-center">Loading visas...</p>
      ) : filteredVisas.length === 0 ? (
        <p className="text-center text-gray-600">No visas available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVisas.map((visa) => (
            <div key={visa._id} className="bg-white p-4 shadow-md rounded-lg">
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

              {/* See Details Button */}
              <Link
                to={`/visa-details/${visa._id}`}
                className="bg-blue-500 text-white mt-4 px-4 py-2 rounded hover:bg-blue-700 block text-center"
              >
                See Details
              </Link>

              {/* Delete Button */}
              <button
                onClick={() => handleDelete(visa._id)}
                className="bg-red-500 text-white mt-4 px-4 py-2 rounded hover:bg-red-700 w-full"
              >
                Delete Visa
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllVisas;
