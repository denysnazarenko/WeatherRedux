import './header.scss';

import locationIcon from '../../assets/header/location.svg';

const Header = () => {
  return (
    <header className="header">
      <div className="header__container">
        <div className="header__search"></div>
        <button className="header__location">
          <img src={locationIcon} alt="location" />
        </button>
      </div>
    </header>
  )
}

export default Header;