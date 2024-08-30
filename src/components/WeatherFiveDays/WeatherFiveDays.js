import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchForecastFiveDays } from '../WeatherCurrent/weatherSlice';

import './weatherFiveDays.scss';

const WeatherFiveDays = () => {
  const { lastChangedLocation, forecastFiveDays } = useSelector(state => state.weather);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchForecastFiveDays(lastChangedLocation));
  }, [lastChangedLocation])

  const renderWeatherDay = (arr) => {
    if (arr.length === 0) {
      return (
        <div className="days__info">data missing</div>
      )
    }

    return arr.map(({ icon, maxtemp_c, mintemp_c, date }, index) => {
      const day = date.slice(8, 10);
      const month = date.slice(5, 7);

      const months = [
        { key: '01', name: 'January' },
        { key: '02', name: 'February' },
        { key: '03', name: 'March' },
        { key: '04', name: 'April' },
        { key: '05', name: 'May' },
        { key: '06', name: 'June' },
        { key: '07', name: 'July' },
        { key: '08', name: 'August' },
        { key: '09', name: 'September' },
        { key: '10', name: 'October' },
        { key: '11', name: 'November' },
        { key: '12', name: 'December' }
      ];

      return (
        <li key={index} className="days__item item-days">
          <div className="item-days__icon">
            <img src={icon} alt="Weather icon" />
          </div>
          <div className="item-days__temp">{maxtemp_c}°C/{mintemp_c}°C</div>
          <div className="item-days__day">{day} {months.find(m => m.key === month)?.name}</div>
        </li>
      )
    })
  }

  const days = renderWeatherDay(forecastFiveDays);

  return (
    <section className="days">
      <div className="days__content">
        <h2 className="days__title">3 Days Forecast:</h2>
        <ul className="days__list">
          {days}
        </ul>
      </div>
    </section>
  )
}

export default WeatherFiveDays;