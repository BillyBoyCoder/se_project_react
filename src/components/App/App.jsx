import { useState, useEffect } from "react";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import NewGarment from "../NewGarment/NewGarment";
import { defaultClothingItems } from "../../utils/defaultClothing";
import { getWeather } from "../../utils/weatherApi";
import { getWeatherCondition } from "../../utils/weatherUtils";
import CurrentTemperatureUnitContext from "../../utils/contexts/CurrentTemperatureUnitContext";
import "./App.css";

function App() {
  // State to hold an object of clothing items
  const [clothingItems, setClothingItems] = useState([]);
  // State to track which modal is currently active
  // Empty string means no modal is open
  const [activeModal, setActiveModal] = useState("");
  // State to track which card was clicked
  const [selectedCard, setSelectedCard] = useState(null);
  // State to hold weather data
  const [weatherData, setWeatherData] = useState({ city: "", temp: { F: 0, C: 0 } });
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

  // Handler to open new garment modal
  function handleOpenNewGarmentModal() {
    setActiveModal("new-garment");
  }

  // Handler to add new item
  function handleAddItem(newItem) {
    const itemWithId = {
      ...newItem,
      _id: Date.now(), // Simple ID generation
    };
    setClothingItems([...clothingItems, itemWithId]);
    handleCloseModal();
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

  // useEffect to filter clothing items based on weather condition
  useEffect(() => {
    const weatherCondition = getWeatherCondition(weatherData.temp.F);
    const filteredItems = defaultClothingItems.filter((item) => {
      return item.weather.toLowerCase() === weatherCondition;
    });
    setClothingItems(filteredItems);
  }, [weatherData]);


  return (
    <CurrentTemperatureUnitContext.Provider value={{ currentTemperatureUnit, setCurrentTemperatureUnit }}>
    <div className="app">
      <Header 
        weatherData={weatherData} 
        currentTemperatureUnit={currentTemperatureUnit}
        handleToggleSwitchChange={handleToggleSwitchChange}
        onAddClick={handleOpenNewGarmentModal}
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
      {/* Render NewGarment modal */}
      <NewGarment
        isOpen={activeModal === "new-garment"}
        onClose={handleCloseModal}
        onAddItem={handleAddItem}
        weatherData={weatherData}
      />
    </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
