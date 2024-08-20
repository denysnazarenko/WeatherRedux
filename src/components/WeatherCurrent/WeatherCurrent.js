import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrentWeather } from './weatherSlice';

import './weatherCurrent.scss';

const WeatherCurrent = () => {
  const { weather, lastChangedLocation } = useSelector(state => state.weather);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCurrentWeather(lastChangedLocation));
  }, [lastChangedLocation]);

  console.log(weather);

  return (
    <section className="current">current</section>
  )
}

export default WeatherCurrent;