import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import logo from "../../assets/images/logo.svg";
import avatarTrue from "../../assets/images/avatarTrue.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import CurrentUserContext from "../../utils/contexts/CurrentUserContext";
import "./Header.css";

function Header({ weatherData, currentTemperatureUnit, handleToggleSwitchChange, onAddClick, onSignupClick, onLoginClick, onLogout }) {
  const { currentUser, isLoggedIn } = useContext(CurrentUserContext);
  const [avatarError, setAvatarError] = useState(false);
  
  // Reset avatarError when the avatar URL changes
  useEffect(() => {
    setAvatarError(false);
  }, [currentUser?.avatar]);
  
  const currentDate = new Date().toLocaleString("en-US", {
    month: "long",
    day: "numeric",
  });

  // Get user's first initial for placeholder avatar
  const getInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : '?';
  };

  // Handle avatar image load error
  const handleAvatarError = () => {
    setAvatarError(true);
  };

  return (
    <header className="header">
      <div className="header__side-left">
        <Link to="/">
          <img src={logo} alt="WTWR logo" className="header__logo" />
        </Link>
        <p className="header__place">
          <time
            className="header__datetime"
            dateTime={new Date().toISOString()}
          >
            {currentDate}
          </time>
          , {weatherData.city}
        </p>
      </div>
      <div className="header__side-right">
        <ToggleSwitch 
          currentTemperatureUnit={currentTemperatureUnit}
          handleToggleSwitchChange={handleToggleSwitchChange}
        />
        {isLoggedIn ? (
          <>
            <button className="header__add-clothes-btn" onClick={onAddClick}>+ Add clothes</button>
            <Link to="/profile" className="header__profile-link">
              <p className="header__username">{currentUser?.name || 'User'}</p>
              {currentUser?.avatar && !avatarError ? (
                <img
                  src={currentUser.avatar}
                  alt={`${currentUser?.name}'s avatar`}
                  className="header__avatar"
                  onError={handleAvatarError}
                />
              ) : (
                <div className="header__avatar-placeholder">
                  {getInitial(currentUser?.name)}
                </div>
              )}
            </Link>
            <button className="header__logout-btn" onClick={onLogout}>Log Out</button>
          </>
        ) : (
          <>
            <button className="header__auth-btn" onClick={onSignupClick}>Sign Up</button>
            <button className="header__auth-btn" onClick={onLoginClick}>Log In</button>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
