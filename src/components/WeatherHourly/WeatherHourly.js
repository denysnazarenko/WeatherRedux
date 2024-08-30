import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './weatherHourly.scss';
import windDirection from '../../assets/weatherHourly/direction.png';

const WeatherHourly = () => {
  const { hourly } = useSelector(state => state.weather);

  const renderWeatherHourly = (arr) => {
    if (arr.length === 0) {
      return (
        <div className="days__info">data missing</div>
      )
    }

    return arr.map(({ time, icon, temp_c, wind_dir, wind_kph }, index) => {
      const dayOrNight = parseInt(time.slice(0, 2)) < 6 || parseInt(time.slice(0, 2)) >= 21 ? "night" : "day";

      const windDirectionToDegrees = {
        "N": 0,
        "NNE": 22.5,
        "NE": 45,
        "ENE": 67.5,
        "E": 90,
        "ESE": 112.5,
        "SE": 135,
        "SSE": 157.5,
        "S": 180,
        "SSW": 202.5,
        "SW": 225,
        "WSW": 247.5,
        "W": 270,
        "WNW": 292.5,
        "NW": 315,
        "NNW": 337.5
      };

      const degrees = windDirectionToDegrees[wind_dir];

      return (
        <li key={index} className={`hourly__item item-hourly item-hourly-${dayOrNight}`}>
          <div className="item-hourly__time">{time}</div>
          <div className="item-hourly__icon">
            <img src={icon} alt="Weather icon" />
          </div>
          <div className="item-hourly__temp">{temp_c}°C</div>
          <div className="item-hourly__wind-icon" style={{ transform: `rotate(${degrees}deg)` }}>
            <img src={windDirection} alt="Wind direction" />
          </div>
          <div className="item-hourly__wind">{wind_kph}km/h</div>
        </li>
      )
    })
  }

  const elements = renderWeatherHourly(hourly);

  return (
    <section className="hourly">
      <div className="hourly__content">
        <h2 className="hourly__title">Hourly Forecast:</h2>
        <ul className="hourly__list">
          {elements}
        </ul>
      </div>
    </section>
  )
}

export default WeatherHourly;