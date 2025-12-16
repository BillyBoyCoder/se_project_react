import { useState, useEffect, useRef } from 'react';
import '../RegisterModal/RegisterModal.css';
import { useForm } from '../../hooks/useForm';

function EditProfileModal({ isOpen, onClose, onUpdateProfile, currentUser }) {
  const [errors, setErrors] = useState({ name: '', avatar: '', server: '' });
  const [showHelp, setShowHelp] = useState(null);
  const { values: formValues, handleChange, setValues: setFormValues } = useForm({
    name: '',
    avatar: ''
  });
  const nameInputRef = useRef(null);

  const helpTexts = {
    name: 'Enter your full name (2-30 characters)',
    avatar: 'Optional: Enter a valid URL for your avatar image. If left blank, your initial will be displayed.'
  };

  const handleHelpClick = (field, e) => {
    e.preventDefault();
    setShowHelp(showHelp === field ? null : field);
  };

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen && currentUser) {
      setFormValues({ 
        name: currentUser.name || '', 
        avatar: currentUser.avatar || '' 
      });
      setErrors({ name: '', avatar: '', server: '' });
      setShowHelp(null);
      // Focus on name input
      setTimeout(() => {
        nameInputRef.current?.focus();
      }, 0);
    }
  }, [isOpen, currentUser, setFormValues]);

  const validateUrl = (url) => {
    if (!url || url.trim() === '') return true; // Avatar is optional
    try {
      const urlObj = new URL(url);
      return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
    } catch {
      return false;
    }
  };

  const validateName = (name) => {
    return name && name.length >= 2 && name.length <= 30;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    handleChange(e);

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    if (errors.server) {
      setErrors(prev => ({ ...prev, server: '' }));
    }

    // Validate on change
    if (name === 'name') {
      if (!value) {
        setErrors(prev => ({ ...prev, name: 'Name is required' }));
      } else if (value.length < 2) {
        setErrors(prev => ({ ...prev, name: 'Name must be at least 2 characters' }));
      } else if (value.length > 30) {
        setErrors(prev => ({ ...prev, name: 'Name must not exceed 30 characters' }));
      }
    }

    if (name === 'avatar') {
      if (value && !validateUrl(value)) {
        setErrors(prev => ({ ...prev, avatar: 'Please enter a valid URL' }));
      }
    }
  };

  const isFormValid = () => {
    return (
      validateName(formValues.name) &&
      (!formValues.avatar || formValues.avatar.trim() === '' || validateUrl(formValues.avatar)) &&
      !errors.name &&
      !errors.avatar
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate all fields
    const newErrors = { name: '', avatar: '', server: '' };
    
    if (!validateName(formValues.name)) {
      newErrors.name = 'Name must be 2-30 characters';
    }

    if (formValues.avatar && !validateUrl(formValues.avatar)) {
      newErrors.avatar = 'Please enter a valid URL';
    }

    if (newErrors.name || newErrors.avatar) {
      setErrors(newErrors);
      return;
    }

    // Call the update function
    onUpdateProfile(
      { 
        name: formValues.name, 
        avatar: formValues.avatar.trim() 
      },
      (error) => {
        setErrors(prev => ({ 
          ...prev, 
          server: error.message || 'Failed to update profile. Please try again.' 
        }));
      }
    );
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className={`modal ${isOpen ? 'modal_is-opened' : ''}`} onClick={handleOverlayClick}>
      <div className="modal__content modal__content_type_auth" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="modal__close-btn"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
        <h2 className="modal__title">Change profile data</h2>
        <form className="modal__form" onSubmit={handleSubmit} noValidate>
          {/* Name Field */}
          <label className="modal__label">
            <span className="modal__label-text">
              Name *
              <button
                type="button"
                className="modal__help-btn"
                onClick={(e) => handleHelpClick('name', e)}
                aria-label="Help for name"
                tabIndex="-1"
              >
                ?
              </button>
            </span>
            {showHelp === 'name' && (
              <span className="modal__help-text">{helpTexts.name}</span>
            )}
            <input
              type="text"
              className={`modal__input ${errors.name ? 'modal__input_error' : ''}`}
              name="name"
              placeholder="Name"
              value={formValues.name}
              onChange={handleInputChange}
              required
              minLength="2"
              maxLength="30"
              ref={nameInputRef}
            />
            {errors.name && <span className="modal__error">{errors.name}</span>}
          </label>

          {/* Avatar Field */}
          <label className="modal__label">
            <span className="modal__label-text">
              Avatar *
              <button
                type="button"
                className="modal__help-btn"
                onClick={(e) => handleHelpClick('avatar', e)}
                aria-label="Help for avatar"
                tabIndex="-1"
              >
                ?
              </button>
            </span>
            {showHelp === 'avatar' && (
              <span className="modal__help-text">{helpTexts.avatar}</span>
            )}
            <input
              type="text"
              className={`modal__input ${errors.avatar ? 'modal__input_error' : ''}`}
              name="avatar"
              placeholder="Avatar URL"
              value={formValues.avatar}
              onChange={handleInputChange}
            />
            {errors.avatar && <span className="modal__error">{errors.avatar}</span>}
          </label>

          {errors.server && (
            <span className="modal__error modal__error_server">{errors.server}</span>
          )}

          <div className="modal__buttons">
            <button
              type="submit"
              className="modal__submit-btn"
              disabled={!isFormValid()}
            >
              Save changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProfileModal;
