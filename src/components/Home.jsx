import { useEffect, useState } from "react";
import axios from "axios";
import BannerSlider from "./BannerSlider";

const HomePage = () => {
  const [visas, setVisas] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/visas")
      .then((response) => setVisas(response.data))
      .catch((error) => console.error("Error fetching visas:", error));
  }, []);

  return (
    <>
      <BannerSlider></BannerSlider>
    </>
  );
};

export default HomePage;
