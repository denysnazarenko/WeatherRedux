import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLocation, clearAutocompleteData, fetchUserLocation, fetchAutocomplete } from '../WeatherCurrent/weatherSlice';
import Spinner from '../spinner/Spinner';

import './header.scss';

import searchIcon from '../../assets/header/search.svg';
import locationIcon from '../../assets/header/location.svg';


const Header = () => {
  const { cityAutocomplete, cityAutocompleteLoadingStatus } = useSelector(state => state.weather);
  const dispatch = useDispatch();
  const [cityName, setCityName] = useState('');

  const inputChanged = (e) => {
    const cityName = e.target.value;
    if (/^[A-Za-z0-9\s\-.,']+$/.test(cityName)) {
      setCityName(cityName);
      dispatch(fetchAutocomplete(cityName));
    } else if (cityName === '') {
      setCityName(cityName);
    }
  }

  const onSubmitHandler = (e) => {
    e.preventDefault();

    dispatch(setLocation(cityName));

    setCityName('');
    dispatch(clearAutocompleteData());
  }

  const autocomplete = () => {
    if (cityAutocompleteLoadingStatus === "loading") {
      return <Spinner className='header__spinner' />;
    } else if (cityAutocompleteLoadingStatus === "error") {
      return <h5 className="error">Ошибка загрузки</h5>;
    } else if (cityAutocomplete.length !== 0) {
      return (
        <ul className="autocomplete-list">
          {cityAutocomplete.map((city) => (
            <li key={city} className="autocomplete-item" onClick={() => { setCityName(city); dispatch(clearAutocompleteData()); }}>
              {city}
            </li>
          ))}
        </ul>
      );
    } else {
      return null;
    }
  };

  return (
    <header className="header">
      <div className="header__container">
        <div className="header__form">
          <form className="header__search" onSubmit={onSubmitHandler}>
            <button type="submit" className="header__button">
              <img src={searchIcon} alt="searchIcon" />
            </button>
            <input
              type="text"
              placeholder="Search for your preffered city..."
              name="name"
              id="name"
              autocomplete="off"
              value={cityName}
              onChange={inputChanged}
              className="header__input" />
          </form>
          {autocomplete()}
        </div>
        <button className="header__location" onClick={() => dispatch(fetchUserLocation())}>
          <img src={locationIcon} alt="location" />
          <p>Current Location</p>
        </button>
      </div>
    </header>
  )
}

export default Header;