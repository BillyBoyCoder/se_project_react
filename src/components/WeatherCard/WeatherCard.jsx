import weatherConditionsCard from '../../assets/images/weatherConditionsCard.svg';
import './WeatherCard.css';

function WeatherCard() {
  return (
    <section className="weather-card">
      <img
        src={weatherConditionsCard}
        alt="WeatherCard illustration"
        className="weather-card__image"
      />
      <p className="weather-card__temp">75&deg;F</p>
    </section>
  );
}


export default WeatherCard;
