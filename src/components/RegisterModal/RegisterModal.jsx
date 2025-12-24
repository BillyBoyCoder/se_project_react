import { useState, useEffect, useRef } from 'react';
import '../ModalWithForm/ModalWithForm.css';
import './RegisterModal.css';
import { useForm } from '../../hooks/useForm';

function RegisterModal({ isOpen, onClose, onSignup, onSwitchToLogin }) {
  const [errors, setErrors] = useState({ email: '', password: '', name: '', avatar: '', server: '' });
  const [showHelp, setShowHelp] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const { values: formValues, handleChange, setValues: setFormValues } = useForm({
    email: '',
    password: '',
    name: '',
    avatar: ''
  });
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const nameInputRef = useRef(null);
  const avatarInputRef = useRef(null);

  const helpTexts = {
    email: 'Enter a valid email address (e.g., user@example.com)',
    password: 'Password must be at least 8 characters long',
    name: 'Enter your full name (2-30 characters)',
    avatar: 'Optional: Enter a valid URL for your avatar image. If left blank, your initial will be displayed.'
  };

  const handleHelpClick = (field, e) => {
    e.preventDefault();
    setShowHelp(showHelp === field ? null : field);
  };

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setFormValues({ email: '', password: '', name: '', avatar: '' });
      setErrors({ email: '', password: '', name: '', avatar: '', server: '' });
      setShowHelp(null);
      setShowPassword(false);
      // Focus on email input
      setTimeout(() => {
        emailInputRef.current?.focus();
      }, 0);
    }
  }, [isOpen, setFormValues]);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateUrl = (url) => {
    // Avatar is optional - empty values are valid
    if (!url || !url.trim()) return true;
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  // Check if form is valid
  const isFormValid = () => {
    return (
      formValues.email &&
      formValues.email.trim() !== '' &&
      validateEmail(formValues.email) &&
      formValues.password &&
      formValues.password.trim() !== '' &&
      formValues.password.length >= 8 &&
      formValues.name &&
      formValues.name.trim() !== '' &&
      // Avatar is optional - if provided, it must be valid
      (!formValues.avatar || formValues.avatar.trim() === '' || validateUrl(formValues.avatar))
    );
  };

  const handleSubmitButtonHover = () => {
    if (isFormValid()) {
      // Clear all errors if form is valid
      setErrors({ email: '', password: '', name: '', avatar: '', server: '' });
    } else {
      const newErrors = { email: '', password: '', name: '', avatar: '', server: '' };

      // Validate email
      if (!formValues.email || formValues.email.trim() === '') {
        newErrors.email = 'Please enter an email';
      } else if (!validateEmail(formValues.email)) {
        newErrors.email = 'Please enter a valid email';
      }

      // Validate password
      if (!formValues.password || formValues.password.trim() === '') {
        newErrors.password = 'Please enter a password';
      } else if (formValues.password.length < 8) {
        newErrors.password = 'Password must be at least 8 characters';
      }

      // Validate name
      if (!formValues.name || formValues.name.trim() === '') {
        newErrors.name = 'Please enter your name';
      }

      // Validate avatar URL (optional - only validate if provided)
      if (formValues.avatar && formValues.avatar.trim() !== '' && !validateUrl(formValues.avatar)) {
        newErrors.avatar = 'Please enter a valid URL';
      }

      setErrors(newErrors);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');
    const name = formData.get('name');
    const avatar = formData.get('avatar');

    const newErrors = { email: '', password: '', name: '', avatar: '', server: '' };
    let hasError = false;

    // Validate email
    if (!email || email.trim() === '') {
      newErrors.email = 'Please enter an email';
      hasError = true;
    } else if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email';
      hasError = true;
    }

    // Validate password
    if (!password || password.trim() === '') {
      newErrors.password = 'Please enter a password';
      hasError = true;
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
      hasError = true;
    }

    // Validate name
    if (!name || name.trim() === '') {
      newErrors.name = 'Please enter your name';
      hasError = true;
    }

    // Validate avatar URL (optional - only validate if provided)
    if (avatar && avatar.trim() !== '' && !validateUrl(avatar)) {
      newErrors.avatar = 'Please enter a valid URL';
      hasError = true;
    }

    if (hasError) {
      setErrors(newErrors);
      // Focus on the first field with an error
      if (newErrors.email) {
        emailInputRef.current?.focus();
      } else if (newErrors.password) {
        passwordInputRef.current?.focus();
      } else if (newErrors.name) {
        nameInputRef.current?.focus();
      } else if (newErrors.avatar) {
        avatarInputRef.current?.focus();
      }
      return;
    }

    onSignup({ email, password, name, avatar }, (error) => {
      // Handle server errors
      let errorMessage = 'Signup failed. Please try again.';
      if (error.message && error.message.includes('already exists')) {
        errorMessage = 'A user with this email already exists';
      } else if (error.message) {
        errorMessage = error.message;
      }
      setErrors({ email: '', password: '', name: '', avatar: '', server: errorMessage });
    });
  };

  return (
    <div className={`modal ${isOpen ? 'modal_is-opened' : ''}`} onClick={onClose}>
      <div className="modal__content modal__content_type_auth" onClick={(e) => e.stopPropagation()}>
        <button
          className="modal__close-btn"
          type="button"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
        <h2 className="modal__title">Sign Up</h2>
        <form className="modal__form" onSubmit={handleSubmit}>
          <label className="modal__label">
            <span className="modal__label-text">
              Email*
              <button
                type="button"
                className="modal__help-btn"
                onClick={(e) => handleHelpClick('email', e)}
                aria-label="Help for email"
                tabIndex="-1"
              >
                ?
              </button>
            </span>
            {showHelp === 'email' && (
              <span className="modal__help-text">{helpTexts.email}</span>
            )}
            <input
              ref={emailInputRef}
              type="email"
              name="email"
              className={`modal__input ${errors.email ? 'modal__input_error' : ''}`}
              placeholder="Email"
              value={formValues.email}
              onChange={handleChange}
            />
            {errors.email && <span className="modal__error">{errors.email}</span>}
          </label>
          <label className="modal__label">
            <span className="modal__label-text">
              Password*
              <button
                type="button"
                className="modal__help-btn"
                onClick={(e) => handleHelpClick('password', e)}
                aria-label="Help for password"
                tabIndex="-1"
              >
                ?
              </button>
            </span>
            {showHelp === 'password' && (
              <span className="modal__help-text">{helpTexts.password}</span>
            )}
            <div className="modal__input-wrapper">
              <input
                ref={passwordInputRef}
                type={showPassword ? "text" : "password"}
                name="password"
                className={`modal__input ${errors.password ? 'modal__input_error' : ''}`}
                placeholder="Password"
                value={formValues.password}
                onChange={handleChange}
              />
              <button
                type="button"
                className="modal__password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                tabIndex="-1"
              >
                {showPassword ? (
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 4C5 4 1.73 7.11 1 10c.73 2.89 4 6 9 6s8.27-3.11 9-6c-.73-2.89-4-6-9-6zm0 10c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" fill="currentColor"/>
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 6c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-.73-2.89-4-6-9-6-1.4 0-2.74.25-3.98.7l2.16 2.16C9.74 6.13 10.35 6 11 6zM1 1.27l2.28 2.28.46.46C2.08 5.3.77 7.07 0 9c.73 2.89 4 6 9 6 1.55 0 3.03-.3 4.38-.84l.42.42L16.73 17 18 15.73 2.27 0 1 1.27zM5.53 6.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z" fill="currentColor"/>
                  </svg>
                )}
              </button>
            </div>
            {errors.password && <span className="modal__error">{errors.password}</span>}
          </label>
          <label className="modal__label">
            <span className="modal__label-text">
              Name *
              <button
                type="button"
                className="modal__help-btn"
                onClick={(e) => handleHelpClick('name', e)}
                tabIndex="-1"
                aria-label="Help for name"
              >
                ?
              </button>
            </span>
            {showHelp === 'name' && (
              <span className="modal__help-text">{helpTexts.name}</span>
            )}
            <input
              ref={nameInputRef}
              type="text"
              name="name"
              className={`modal__input ${errors.name ? 'modal__input_error' : ''}`}
              placeholder="Name"
              value={formValues.name}
              onChange={handleChange}
            />
            {errors.name && <span className="modal__error">{errors.name}</span>}
          </label>
          <label className="modal__label">
            <span className="modal__label-text">
              Avatar URL (optional)
              <button
                type="button"
                className="modal__help-btn"
                onClick={(e) => handleHelpClick('avatar', e)}
                tabIndex="-1"
                aria-label="Help for avatar URL"
              >
                ?
              </button>
            </span>
            {showHelp === 'avatar' && (
              <span className="modal__help-text">{helpTexts.avatar}</span>
            )}
            <input
              ref={avatarInputRef}
              type="text"
              name="avatar"
              className={`modal__input ${errors.avatar ? 'modal__input_error' : ''}`}
              placeholder="Avatar URL"
              value={formValues.avatar}
              onChange={handleChange}
            />
            {errors.avatar && <span className="modal__error">{errors.avatar}</span>}
          </label>
          {errors.server && <span className="modal__error modal__error_server">{errors.server}</span>}
          <div className="modal__buttons">
            <div
              className="modal__submit-wrapper"
              onMouseEnter={handleSubmitButtonHover}
            >
              <button
                type="submit"
                className="modal__submit-btn"
                disabled={!isFormValid()}
              >
                Sign Up
              </button>
            </div>
            <button
              type="button"
              className="modal__switch-btn"
              onClick={onSwitchToLogin}
            >
              or Log In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterModal;
