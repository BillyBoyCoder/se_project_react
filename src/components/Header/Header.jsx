import logo from "../../assets/images/logo.svg";
import avatarTrue from "../../assets/images/avatarTrue.svg";
/*import avatarFalse from '../../assets/images/avatarFalse.svg';*/
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import "./Header.css";

function Header({ weatherData, currentTemperatureUnit, handleToggleSwitchChange, onAddClick }) {
  const currentDate = new Date().toLocaleString("en-US", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <div className="header__side-left">
        {" "}
        <img src={logo} alt="WTWR logo" className="header__logo" />
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
        <button className="header__add-clothes-btn" onClick={onAddClick}>+ Add clothes</button>
        <p className="header__username">Terrence Tegegne</p>
        <img
          src={avatarTrue}
          alt="Terrence Tegegne's avatar"
          className="header__avatar"
        />
      </div>
    </header>
  );
}

export default Header;
