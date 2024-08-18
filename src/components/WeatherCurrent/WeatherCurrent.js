import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrentWeather } from './weatherSlice';

import './weatherCurrent.scss';

const WeatherCurrent = () => {
  const { weather, userLocation } = useSelector(state => state.weather);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCurrentWeather(userLocation));
  }, [userLocation]);

  console.log(weather);

  return (
    <section className="current">current</section>
  )
}

export default WeatherCurrent;