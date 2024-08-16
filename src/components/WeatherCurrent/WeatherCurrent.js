import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWeather } from './weatherSlice';

import './weatherCurrent.scss';

const WeatherCurrent = () => {
  const { weather } = useSelector(state => state.weather);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchWeather());
  }, []);

  console.log(weather);

  return (
    <section className="current">current</section>
  )
}

export default WeatherCurrent;