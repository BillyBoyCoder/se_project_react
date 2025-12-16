import WeatherCard from "../WeatherCard/WeatherCard";
import ClothesSection from "../ClothesSection/ClothesSection";
import "./Main.css";

function Main({ clothingItems, handleOpenItemModal, weatherData, currentTemperatureUnit, onAddClick, onCardLike, onDelete, isLoggedIn }) {
  // Get the temperature in the current unit
  const displayTemp = currentTemperatureUnit === "F" 
    ? weatherData.temp.F 
    : weatherData.temp.C;

  return (
    <main className="main">
      <WeatherCard temp={displayTemp} currentTemperatureUnit={currentTemperatureUnit} />
      <p className="main__text">Today is {displayTemp}° {currentTemperatureUnit} / You may want to wear:</p>
      <ClothesSection 
        clothingItems={clothingItems}
        handleOpenItemModal={handleOpenItemModal}
        onAddClick={onAddClick}
        onCardLike={onCardLike}
        onDelete={onDelete}
        isLoggedIn={isLoggedIn}
      />
    </main>
  );
}

export default Main;
