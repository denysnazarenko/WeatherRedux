import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrentWeather, fetchAstro } from './weatherSlice';

import './weatherCurrent.scss';

import sunriseIcon from '../../assets/weatherCurrent/sunrise.png';
import sunsetIcon from '../../assets/weatherCurrent/sunset.png';
import humidityIcon from '../../assets/weatherCurrent/humidity.png';
import windIcon from '../../assets/weatherCurrent/wind.png';
import pressureIcon from '../../assets/weatherCurrent/pressure.png';
import uvIcon from '../../assets/weatherCurrent/uv.png';

const WeatherCurrent = () => {
  const { weatherData, astro, lastChangedLocation } = useSelector(state => state.weather);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCurrentWeather(lastChangedLocation));
    dispatch(fetchAstro(lastChangedLocation));
  }, [lastChangedLocation]);

  const { temp_c, feelslike_c, text, icon, humidity, wind_kph, pressure_mb, uv } = weatherData;
  const { sunrise, sunset } = astro;
  return (
    <section className="current">
      <div className="current__content">
        <div className="current__columns">
          <div className="current__column">
            <div className="current__temp">{temp_c}°C</div>
            <div className="current__feels">Feels like: <span>{feelslike_c}°C</span></div>
            <div className="current__sunrise sunrise-current">
              <div className="sunrise-current__image">
                <img src={sunriseIcon} alt="Sunrise" />
              </div>
              <div className="sunrise-current__info">
                <h4>Sunrise</h4>
                <p>{sunrise}</p>
              </div>
            </div>
            <div className="current__sunset sunset-current">
              <div className="sunset-current__image">
                <img src={sunsetIcon} alt="Sunset" />
              </div>
              <div className="sunset-current__info">
                <h4>Sunset</h4>
                <p>{sunset}</p>
              </div>
            </div>
          </div>
          <div className="current__column">
            <div className="current__image">
              <img src={icon} alt={text} />
            </div>
            <h3 className="current__title">{text}</h3>
          </div>
          <div className="current__column">
            <div className="current__row">
              <div className="current__humidity">
                <img src={humidityIcon} alt="Humidity" />
                <p>{humidity}%</p>
                <p>Humidity</p>
              </div>
              <div className="current__wind">
                <img src={windIcon} alt="Wind" />
                <p>{wind_kph}km/h</p>
                <p>Wind Speed</p>
              </div>
            </div>
            <div className="current__row">
              <div className="current__pressure">
                <img src={pressureIcon} alt="Pressure" />
                <p>{pressure_mb}hPa</p>
                <p>Pressure</p>
              </div>
              <div className="current__uv">
                <img src={uvIcon} alt="UV" />
                <p>{uv}</p>
                <p>UV</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WeatherCurrent;