import { useSelector } from 'react-redux';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './weatherInfo.scss';

const WeatherInfo = () => {
  const city = useSelector(state => state.weather.lastChangedLocation);
  const cityTime = useSelector(state => state.weather.cityTime);
  const { weatherLoadingStatus } = useSelector(state => state.weather);

  const time = cityTime.slice(-5);
  const day = cityTime.slice(8, 10);

  const gettingMonth = (cityTime) => {
    const month = cityTime.slice(5, 7);

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
    return months.find(m => m.key === month)?.name
  }

  let content;

  if (weatherLoadingStatus === 'loading') {
    content = <div className="info__content">
      <Spinner />
    </div>;
  } else if (weatherLoadingStatus === 'error') {
    content = <div className="info__content">
      <ErrorMessage />
    </div>;
  } else if (weatherLoadingStatus === 'idle') {
    content = (
      <div className="info__content">
        <h2 className="info__city">{city}</h2>
        <div className="info__time">{time}</div>
        <div className="info__day">{`${day} ${gettingMonth(cityTime)}`}</div>
      </div>
    );
  }

  return (
    <section className="info">
      {content}
    </section>
  )
}

export default WeatherInfo;