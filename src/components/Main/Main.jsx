import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import "./Main.css";

function Main({ clothingItems, handleOpenItemModal, weatherData, currentTemperatureUnit }) {
  // Get the temperature in the current unit
  const displayTemp = currentTemperatureUnit === "F" 
    ? weatherData.temp.F 
    : weatherData.temp.C;

  return (
    <main className="main">
      <WeatherCard temp={displayTemp} currentTemperatureUnit={currentTemperatureUnit} />
      <p className="main__text">Today is {displayTemp}° {currentTemperatureUnit} / You may want to wear:</p>
      <div className="main__cards">
        {clothingItems.map((item) => {
          return (
            <ItemCard
              key={item._id}
              data={item}
              onClick={handleOpenItemModal}
            />
          );
        })}
      </div>
    </main>
  );
}

export default Main;
