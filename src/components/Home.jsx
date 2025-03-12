import { useEffect, useState } from "react";
import axios from "axios";

const HomePage = () => {
  const [visas, setVisas] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/visas")
      .then((response) => setVisas(response.data))
      .catch((error) => console.error("Error fetching visas:", error));
  }, []);

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold text-center my-4">Latest Visas</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {visas.map((visa) => (
          <div key={visa._id} className="border p-4 rounded shadow-md">
            <img
              src={visa.image}
              alt={visa.country}
              className="w-full h-48 object-cover rounded"
            />
            <h2 className="text-2xl font-semibold mt-2">{visa.country}</h2>
            <p className="mt-1">Visa Type: {visa.visaType}</p>
            <p className="mt-1">Processing Time: {visa.processingTime}</p>
            <p className="mt-1">Fee: {visa.fee}</p>
            <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
              See Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
