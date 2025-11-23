import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import "./Main.css";

function Main({ clothingItems, handleOpenItemModal, weatherData, currentTemperatureUnit }) {
  // Convert Fahrenheit to Celsius
  const convertToCelsius = (tempF) => {
    return Math.round((tempF - 32) * (5 / 9));
  };

  // Get the temperature in the current unit
  const displayTemp = currentTemperatureUnit === "F" 
    ? weatherData.temp 
    : convertToCelsius(weatherData.temp);

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
