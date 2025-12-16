import { useState, useEffect, useCallback } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import confetti from 'canvas-confetti';
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import AddItemModal from "../AddItemModal/AddItemModal";
import DeleteClothingItemModal from "../DeleteClothingItemModal/DeleteClothingItemModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Dashboard from "../Dashboard/Dashboard";
import Profile from "../Profile/Profile";
import { getWeather } from "../../utils/weatherApi";
import { getWeatherCondition } from "../../utils/weatherUtils";
import { getItems, addItem, updateItem, deleteItem, signup, signin, getCurrentUser, updateUser, likeItem, unlikeItem } from "../../utils/api";
import CurrentTemperatureUnitContext from "../../utils/contexts/CurrentTemperatureUnitContext";
import CurrentUserContext from "../../utils/contexts/CurrentUserContext";
import "./App.css";

function App() {
  const navigate = useNavigate();
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
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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

  const handleOpenRegisterModal = useCallback(() => {
    setActiveModal("register");
  }, []);

  const handleOpenLoginModal = useCallback(() => {
    setActiveModal("login");
  }, []);

  const handleOpenEditProfileModal = useCallback(() => {
    setActiveModal("edit-profile");
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
      .catch((error) => {
        console.error("Error deleting item:", error);
        alert(`Failed to delete item: ${error.message}`);
      });
  }, []);

  const handleCloseModal = useCallback(() => {
    setActiveModal("");
  }, []);

  const handleSignup = useCallback(({ email, password, name, avatar }, onError) => {
    signup({ email, password, name, avatar })
      .then(() => {
        // Auto sign-in after registration
        return signin({ email, password });
      })
      .then((data) => {
        localStorage.setItem('jwt', data.token);
        setIsLoggedIn(true);
        return getCurrentUser();
      })
      .then((user) => {
        setCurrentUser(user);
        setActiveModal("");
      })
      .catch((error) => {
        console.error("Error during signup:", error);
        if (onError) {
          onError(error);
        }
      });
  }, []);

  const handleLogin = useCallback(({ email, password }, onError) => {
    signin({ email, password })
      .then((data) => {
        localStorage.setItem('jwt', data.token);
        setIsLoggedIn(true);
        return getCurrentUser();
      })
      .then((user) => {
        setCurrentUser(user);
        setActiveModal("");
      })
      .catch((error) => {
        console.error("Error during login:", error);
        if (onError) {
          onError(error);
        }
      });
  }, []);

  const handleLogout = useCallback(() => {
    localStorage.removeItem('jwt');
    setIsLoggedIn(false);
    setCurrentUser(null);
    navigate('/');
  }, [navigate]);

  const handleUpdateProfile = useCallback(({ name, avatar }, onError) => {
    updateUser({ name, avatar })
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        // Trigger confetti
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
        // Close modal after a short delay
        setTimeout(() => {
          setActiveModal("");
        }, 1000);
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
        if (onError) {
          onError(error);
        }
      });
  }, []);

  const handleCardLike = useCallback((itemId, isLiked) => {
    const apiCall = isLiked ? unlikeItem(itemId) : likeItem(itemId);
    
    apiCall
      .then((updatedItem) => {
        setAllClothingItems((prevItems) =>
          prevItems.map((item) => 
            item._id === itemId ? { ...updatedItem, link: updatedItem.imageUrl } : item
          )
        );
      })
      .catch((error) => console.error("Error toggling like:", error));
  }, []);

  const handleSwitchToLogin = useCallback(() => {
    setActiveModal("login");
  }, []);

  const handleSwitchToRegister = useCallback(() => {
    setActiveModal("register");
  }, []);

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('jwt');
    if (token) {
      getCurrentUser()
        .then((user) => {
          setCurrentUser(user);
          setIsLoggedIn(true);
        })
        .catch((error) => {
          console.error("Error verifying token:", error);
          localStorage.removeItem('jwt');
          setIsLoggedIn(false);
          setCurrentUser(null);
        });
    }

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
      <CurrentUserContext.Provider value={{ currentUser, isLoggedIn }}>
        <div className="app">
          <Header
            weatherData={weatherData}
            currentTemperatureUnit={currentTemperatureUnit}
            handleToggleSwitchChange={handleToggleSwitchChange}
            onAddClick={handleOpenAddItemModal}
            onSignupClick={handleOpenRegisterModal}
            onLoginClick={handleOpenLoginModal}
            onLogout={handleLogout}
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
                onCardLike={handleCardLike}
                onDelete={handleOpenDeleteModal}
                isLoggedIn={isLoggedIn}
              />
            }
          />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile
                  clothingItems={allClothingItems}
                  handleOpenItemModal={handleOpenItemModal}
                  onAddClick={handleOpenAddItemModal}
                  onCardLike={handleCardLike}
                  onDelete={handleOpenDeleteModal}
                  isLoggedIn={isLoggedIn}
                  onEditProfile={handleOpenEditProfileModal}
                  onLogout={handleLogout}
                />
              </ProtectedRoute>
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
        <RegisterModal
          isOpen={activeModal === "register"}
          onClose={handleCloseModal}
          onSignup={handleSignup}
          onSwitchToLogin={handleSwitchToLogin}
        />
        <LoginModal
          isOpen={activeModal === "login"}
          onClose={handleCloseModal}
          onLogin={handleLogin}
          onSwitchToRegister={handleSwitchToRegister}
        />
        <EditProfileModal
          isOpen={activeModal === "edit-profile"}
          onClose={handleCloseModal}
          onUpdateProfile={handleUpdateProfile}
          currentUser={currentUser}
        />
      </div>
      </CurrentUserContext.Provider>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
