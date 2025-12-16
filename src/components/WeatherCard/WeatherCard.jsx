import { useContext } from 'react';
import CurrentTemperatureUnitContext from '../../utils/contexts/CurrentTemperatureUnitContext';
import { getWeatherImage, getWeatherImageAlt } from '../../utils/weatherImageMapper';
import './WeatherCard.css';

function WeatherCard({ temp, condition }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  
  // Get the appropriate weather image based on current conditions
  const weatherImage = condition 
    ? getWeatherImage(condition.id, condition.icon)
    : null;
  
  // Get descriptive alt text
  const imageAlt = condition 
    ? getWeatherImageAlt(condition)
    : 'Weather illustration';
  
  return (
    <section className="weather-card">
      {weatherImage && (
        <img
          src={weatherImage}
          alt={imageAlt}
          className="weather-card__image"
        />
      )}
      <p className="weather-card__temp">{temp}&deg;{currentTemperatureUnit}</p>
    </section>
  );
}


export default WeatherCard;
