import { useState, useEffect } from "react";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import { defaultClothingItems } from "../../utils/defaultClothing";
import { getWeather } from "../../utils/weatherApi";
import "./App.css";

function App() {
  // State to hold an object of clothing items
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);
  // State to track which modal is currently active
  // Empty string means no modal is open
  const [activeModal, setActiveModal] = useState("");
  // State to track which card was clicked
  const [selectedCard, setSelectedCard] = useState(null);
  // State to hold weather data
  const [weatherData, setWeatherData] = useState({ city: "", temp: 0 });
  // State to track current temperature unit (F or C)
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  // Handler to toggle temperature unit
  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  // Handler to open the item modal
  // Sets activeModal to "active-modal" to display the modal
  // Receives the card data and stores it in selectedCard state
  function handleOpenItemModal(card) {
    setActiveModal("active-modal");
    setSelectedCard(card);
  }

  // Handler to close any open modal
  // Sets activeModal back to empty string
  function handleCloseModal() {
    setActiveModal("");
  }

  // useEffect to fetch weather data when component mounts
  useEffect(() => {
    getWeather()
      .then((data) => {
        setWeatherData(data);
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
      });
  }, []); // Empty dependency array means this runs once on mount

  return (
    <div className="app">
      <Header 
        weatherData={weatherData} 
        currentTemperatureUnit={currentTemperatureUnit}
        handleToggleSwitchChange={handleToggleSwitchChange}
      />
      <Main
        clothingItems={clothingItems}
        handleOpenItemModal={handleOpenItemModal}
        weatherData={weatherData}
        currentTemperatureUnit={currentTemperatureUnit}
      />
      <Footer />
      {/* Render ItemModal and pass isOpen prop */}
      {/* isOpen is true when activeModal equals "active-modal" */}
      <ItemModal
        isOpen={activeModal === "active-modal"}
        card={selectedCard}
        onClose={handleCloseModal}
      />
    </div>
  );
}

export default App;
