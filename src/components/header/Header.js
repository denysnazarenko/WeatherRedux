import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUserLocation } from '../WeatherCurrent/weatherSlice';

import './header.scss';

import searchIcon from '../../assets/header/search.svg';
import locationIcon from '../../assets/header/location.svg';


const Header = () => {
  const dispatch = useDispatch();
  const [cityName, setCityName] = useState('');

  const onSubmitHandler = (e) => {
    e.preventDefault();
  }

  const searchUserLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        }

        dispatch(setUserLocation(location));
      },
      (error) => {
        console.error("Error getting location: ", error);
      }
    );
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
        <button className="header__location" onClick={searchUserLocation}>
          <img src={locationIcon} alt="location" />
          <p>Current Location</p>
        </button>
      </div>
    </header>
  )
}

export default Header;