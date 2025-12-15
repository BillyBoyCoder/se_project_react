import { useState, useEffect, useCallback } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import AddItemModal from "../AddItemModal/AddItemModal";
import DeleteClothingItemModal from "../DeleteClothingItemModal/DeleteClothingItemModal";
import Dashboard from "../Dashboard/Dashboard";
import Profile from "../Profile/Profile";
import { getWeather } from "../../utils/weatherApi";
import { getWeatherCondition } from "../../utils/weatherUtils";
import { getItems, addItem, updateItem, deleteItem } from "../../utils/api";
import CurrentTemperatureUnitContext from "../../utils/contexts/CurrentTemperatureUnitContext";
import "./App.css";

function App() {
  const [allClothingItems, setAllClothingItems] = useState([]);
  const [clothingItems, setClothingItems] = useState([]);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [itemToEdit, setItemToEdit] = useState(null);
  const [weatherData, setWeatherData] = useState({
    city: "",
    temp: { F: 0, C: 0 },
  });
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  const handleToggleSwitchChange = useCallback(() => {
    setCurrentTemperatureUnit((current) => (current === "F" ? "C" : "F"));
  }, []);

  const handleOpenItemModal = useCallback((card) => {
    setActiveModal("active-modal");
    setSelectedCard(card);
  }, []);

  const handleOpenAddItemModal = useCallback(() => {
    setActiveModal("add-item");
  }, []);

  const handleOpenDeleteModal = useCallback((item) => {
    setItemToDelete(item);
    setActiveModal("delete-confirmation");
  }, []);

  const handleOpenEditModal = useCallback((item) => {
    setItemToEdit(item);
    setActiveModal("edit-item");
  }, []);

  const handleAddItem = useCallback((newItem) => {
    const itemForApi = {
      _id: Date.now(),
      name: newItem.name,
      weather: newItem.weather,
      imageUrl: newItem.link,
    };

    addItem(itemForApi)
      .then((addedItem) => {
        const itemForApp = { ...addedItem, link: addedItem.imageUrl };
        setAllClothingItems((prevItems) => [itemForApp, ...prevItems]);
        setActiveModal("");
      })
      .catch((error) => console.error("Error adding item:", error));
  }, []);

  const handleUpdateItem = useCallback((id, updates) => {
    const updatesForApi = {
      name: updates.name,
      weather: updates.weather,
      imageUrl: updates.link,
    };

    updateItem(id, updatesForApi)
      .then((updatedItem) => {
        const itemForApp = { ...updatedItem, link: updatedItem.imageUrl };
        setAllClothingItems((prevItems) =>
          prevItems.map((item) => (item._id === id ? itemForApp : item))
        );
        setActiveModal("");
        setItemToEdit(null);
        setSelectedCard(null);
      })
      .catch((error) => console.error("Error updating item:", error));
  }, []);

  const handleConfirmDelete = useCallback((item) => {
    deleteItem(item._id)
      .then(() => {
        setAllClothingItems((prevItems) =>
          prevItems.filter((card) => card._id !== item._id)
        );
        setActiveModal("");
        setSelectedCard(null);
        setItemToDelete(null);
      })
      .catch((error) => console.error("Error deleting item:", error));
  }, []);

  const handleCloseModal = useCallback(() => {
    setActiveModal("");
  }, []);

  useEffect(() => {
    // Get user's location using Geolocation API
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          // Fetch weather data with user's coordinates
          getWeather(latitude, longitude)
            .then(setWeatherData)
            .catch((error) =>
              console.error("Error fetching weather data:", error)
            );
        },
        (error) => {
          console.error("Error getting user location:", error.message);
          // Fallback to default location if geolocation fails
          getWeather(32.78, -96.8)
            .then(setWeatherData)
            .catch((error) =>
              console.error("Error fetching weather data:", error)
            );
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      // Fallback to default location if geolocation not supported
      /*
      The coordinates for Dallas, Texas are approximately 32.78° North latitude and -96.8° West longitude. In a more precise format, this can be expressed as 32°46′53.40″ N, 96°47′51.72″ W. 
Latitude: 32.78° N
Longitude: -96.8° W
More precise coordinates: 32°46′53.40″ N, 96°47′51.72″ W 
      */
      getWeather(32.78, -96.8)
        .then(setWeatherData)
        .catch((error) => console.error("Error fetching weather data:", error));
    }

    getItems()
      .then((items) => {
        const itemsWithLink = items.map((item) => ({
          ...item,
          link: item.imageUrl,
        }));
        setAllClothingItems(itemsWithLink);
      })
      .catch((error) => console.error("Error fetching items:", error));
  }, []);

  useEffect(() => {
    if (!weatherData.temp || !allClothingItems.length) return;

    const weatherCondition = getWeatherCondition(weatherData.temp.F);
    const filteredItems = allClothingItems.filter(
      (item) => item.weather.toLowerCase() === weatherCondition
    );
    setClothingItems(filteredItems);
  }, [weatherData, allClothingItems]);

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, setCurrentTemperatureUnit }}
    >
      <div className="app">
        <Header
          weatherData={weatherData}
          currentTemperatureUnit={currentTemperatureUnit}
          handleToggleSwitchChange={handleToggleSwitchChange}
          onAddClick={handleOpenAddItemModal}
        />
        <Routes>
          <Route
            path="/"
            element={
              <Main
                clothingItems={clothingItems}
                handleOpenItemModal={handleOpenItemModal}
                weatherData={weatherData}
                currentTemperatureUnit={currentTemperatureUnit}
                onAddClick={handleOpenAddItemModal}
              />
            }
          />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route
            path="/profile"
            element={
              <Profile
                clothingItems={allClothingItems}
                handleOpenItemModal={handleOpenItemModal}
                onAddClick={handleOpenAddItemModal}
              />
            }
          />
        </Routes>
        <Footer />
        <ItemModal
          isOpen={activeModal === "active-modal"}
          card={selectedCard}
          onClose={handleCloseModal}
          onDeleteItem={handleOpenDeleteModal}
          onEditItem={handleOpenEditModal}
        />
        <DeleteClothingItemModal
          isOpen={activeModal === "delete-confirmation"}
          onClose={handleCloseModal}
          onConfirmDelete={handleConfirmDelete}
          itemToDelete={itemToDelete}
        />
        <AddItemModal
          isOpen={activeModal === "add-item" || activeModal === "edit-item"}
          onClose={handleCloseModal}
          onAddItem={handleAddItem}
          onUpdateItem={handleUpdateItem}
          weatherData={weatherData}
          itemToEdit={activeModal === "edit-item" ? itemToEdit : null}
        />
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
