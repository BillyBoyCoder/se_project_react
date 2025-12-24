import { useState, useEffect, useRef } from 'react';
import './AddItemModal.css';
import { getWeatherCondition } from '../../utils/weatherUtils';
import { useForm } from '../../hooks/useForm';

function AddItemModal({ isOpen, onClose, onAddItem, onUpdateItem, weatherData, itemToEdit }) {
  // Get the default weather condition based on current temperature
  const defaultWeather = getWeatherCondition(weatherData.temp.F);
  const [selectedWeather, setSelectedWeather] = useState(defaultWeather);
  const [errors, setErrors] = useState({ name: '', imageUrl: '' });
  const { values: formValues, handleChange, setValues: setFormValues } = useForm({ name: '', imageUrl: '' });
  const nameInputRef = useRef(null);
  const imageUrlInputRef = useRef(null);
  const isEditMode = Boolean(itemToEdit);

  // Update selected weather when modal opens or weather changes
  useEffect(() => {
    if (isOpen) {
      if (itemToEdit) {
        // Edit mode - populate form with existing item data
        setFormValues({ name: itemToEdit.name, imageUrl: itemToEdit.link });
        setSelectedWeather(itemToEdit.weather);
      } else {
        // Add mode - use default weather and clear form
        const currentWeather = getWeatherCondition(weatherData.temp.F);
        setFormValues({ name: '', imageUrl: '' });
        setSelectedWeather(currentWeather);
      }
      setErrors({ name: '', imageUrl: '' });
    }
  }, [isOpen, weatherData.temp.F, itemToEdit]);

  const validateUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const imageUrl = formData.get('imageUrl');
    
    const newErrors = { name: '', imageUrl: '' };
    let hasError = false;

    // Validate name
    if (!name || name.trim() === '') {
      newErrors.name = 'Please enter a garment name';
      hasError = true;
    }

    // Validate URL
    if (!imageUrl || imageUrl.trim() === '') {
      newErrors.imageUrl = 'Please enter an image URL';
      hasError = true;
    } else if (!validateUrl(imageUrl)) {
      newErrors.imageUrl = 'Please enter a valid URL';
      hasError = true;
    }

    if (hasError) {
      setErrors(newErrors);
      // Focus on the first field with an error
      if (newErrors.name) {
        nameInputRef.current?.focus();
      } else if (newErrors.imageUrl) {
        imageUrlInputRef.current?.focus();
      }
      return;
    }

    const itemData = {
      name,
      imageUrl: imageUrl,
      weather: selectedWeather,
    };
    
    if (isEditMode) {
      onUpdateItem(itemToEdit._id, itemData);
    } else {
      onAddItem(itemData);
    }
    e.target.reset();
    setFormValues({ name: '', imageUrl: '' });
    setErrors({ name: '', imageUrl: '' });
  };

  return (
    <div className={`modal ${isOpen ? 'modal_is-opened' : ''}`} onClick={onClose}>
      <div className="modal__content modal__content_type_add-item" onClick={(e) => e.stopPropagation()}>
        <button
          className="modal__close-btn"
          type="button"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
        <h2 className="modal__title">{isEditMode ? 'Edit garment' : 'New garment'}</h2>
        <form className="modal__form" onSubmit={handleSubmit}>
          <label htmlFor="name" className="modal__label">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            className={`modal__input ${errors.name ? 'modal__input_error' : ''}`}
            placeholder="Name"
            value={formValues.name}
            onChange={handleChange}
            ref={nameInputRef}
          />
          {errors.name && <span className="modal__error">{errors.name}</span>}
          
          <label htmlFor="imageUrl" className="modal__label">
            Image
          </label>
          <input
            id="imageUrl"
            name="imageUrl"
            type="text"
            className={`modal__input ${errors.imageUrl ? 'modal__input_error' : ''}`}
            placeholder="Image URL"
            value={formValues.imageUrl}
            onChange={handleChange}
            ref={imageUrlInputRef}
          />
          {errors.imageUrl && <span className="modal__error">{errors.imageUrl}</span>}
          
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
            {isEditMode ? 'Save changes' : 'Add garment'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddItemModal;
