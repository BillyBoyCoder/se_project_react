import { useState, useEffect } from 'react';
import './NewGarment.css';
import { getWeatherCondition } from '../../utils/weatherUtils';

function NewGarment({ isOpen, onClose, onAddItem, weatherData }) {
  // Get the default weather condition based on current temperature
  const defaultWeather = getWeatherCondition(weatherData.temp.F);
  const [selectedWeather, setSelectedWeather] = useState(defaultWeather);

  // Update selected weather when modal opens or weather changes
  useEffect(() => {
    if (isOpen) {
      const currentWeather = getWeatherCondition(weatherData.temp.F);
      setSelectedWeather(currentWeather);
      console.log("Default weather for new garment:", currentWeather);
    }
  }, [isOpen, weatherData.temp.F]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newItem = {
      name: formData.get('name'),
      link: formData.get('imageUrl'),
      weather: selectedWeather,
    };
    onAddItem(newItem);
  };

  return (
    <div className={`modal ${isOpen ? 'modal_is-opened' : ''}`} onClick={onClose}>
      <div className="modal__content modal__content_type_new-garment" onClick={(e) => e.stopPropagation()}>
        <button
          className="modal__close-btn"
          type="button"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
        <h2 className="modal__title">New garment</h2>
        <form className="modal__form" onSubmit={handleSubmit}>
          <label htmlFor="name" className="modal__label">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            className="modal__input"
            placeholder="Name"
            required
          />
          
          <label htmlFor="imageUrl" className="modal__label">
            Image
          </label>
          <input
            id="imageUrl"
            name="imageUrl"
            type="url"
            className="modal__input"
            placeholder="Image URL"
            required
          />
          
          <fieldset className="modal__fieldset">
            <legend className="modal__legend">Select the weather type:</legend>
            <div className="modal__radio-buttons">
              <label className="modal__radio-label">
                <input
                  type="radio"
                  name="weather"
                  value="hot"
                  className="modal__radio-input"
                  checked={selectedWeather === 'hot'}
                  onChange={() => setSelectedWeather('hot')}
                  required
                />
                Hot
              </label>
              <label className="modal__radio-label">
                <input
                  type="radio"
                  name="weather"
                  value="warm"
                  className="modal__radio-input"
                  checked={selectedWeather === 'warm'}
                  onChange={() => setSelectedWeather('warm')}
                />
                Warm
              </label>
              <label className="modal__radio-label">
                <input
                  type="radio"
                  name="weather"
                  value="cold"
                  className="modal__radio-input"
                  checked={selectedWeather === 'cold'}
                  onChange={() => setSelectedWeather('cold')}
                />
                Cold
              </label>
            </div>
          </fieldset>
          
          <button type="submit" className="modal__submit-btn">
            Add garment
          </button>
        </form>
      </div>
    </div>
  );
}

export default NewGarment;
