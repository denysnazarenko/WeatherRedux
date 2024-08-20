import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setLocation, fetchUserLocation } from '../WeatherCurrent/weatherSlice';

import './header.scss';

import searchIcon from '../../assets/header/search.svg';
import locationIcon from '../../assets/header/location.svg';


const Header = () => {
  const dispatch = useDispatch();
  const [cityName, setCityName] = useState('');

  const onSubmitHandler = (e) => {
    e.preventDefault();

    dispatch(setLocation(cityName));

    setCityName('');
  }

  return (
    <header className="header">
      <div className="header__container">
        <form className="header__search" onSubmit={onSubmitHandler}>
          <button type="submit" className="header__button">
            <img src={searchIcon} alt="searchIcon" />
          </button>
          <input
            type="text"
            placeholder="Search for your preffered city..."
            name="name"
            id="name"
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
            className="header__input" />
        </form>
        <button className="header__location" onClick={() => dispatch(fetchUserLocation())}>
          <img src={locationIcon} alt="location" />
          <p>Current Location</p>
        </button>
      </div>
    </header>
  )
}

export default Header;