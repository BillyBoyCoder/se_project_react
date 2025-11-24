import cloudy from '../../assets/images/cloudy.svg';
import { useContext } from 'react';
import CurrentTemperatureUnitContext from '../contexts/CurrentTemperatureUnitContext';
import './WeatherCard.css';

function WeatherCard({ temp }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  return (
    <section className="weather-card">
      <img
        src={cloudy}
        alt="WeatherCard illustration"
        className="weather-card__image"
      />
      <p className="weather-card__temp">{temp}&deg;{currentTemperatureUnit}</p>
    </section>
  );
}


export default WeatherCard;
