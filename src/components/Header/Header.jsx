import logo from '../../assets/images/logo.svg';
import avatarTrue from '../../assets/images/avatarTrue.svg';
/*import avatarFalse from '../../assets/images/avatarFalse.svg';*/
import './Header.css';

function Header() {
  const currentDate = new Date().toLocaleString('en-US', {
    month: 'long',
    day: 'numeric',
  });

  return (
    <header className="header">
      <img src={logo} alt="WTWR logo" className="header__logo" />
      <p className="header__place">
        <time className="header__datetime" dateTime={new Date().toISOString()}>
          {currentDate}
        </time>
        , New York
      </p>
      <button className="header__add-clothes-btn">+ Add clothes</button>
      <p className="header__username">Terrence Tegegne</p>
      <img
        src={avatarTrue}
        alt="Terrence Tegegne's avatar"
        className="header__avatar"
      />
    </header>
  );
}

export default Header;
