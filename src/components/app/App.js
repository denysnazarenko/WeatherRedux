import Header from '../header/Header';
import WeatherInfo from '../WeatherInfo/WeatherInfo';
import WeatherCurrent from '../WeatherCurrent/WeatherCurrent';
import WeatherHourly from '../WeatherHourly/WeatherHourly';
import WeatherFiveDays from '../WeatherFiveDays/WeatherFiveDays';

import '../../styles/index.scss';
import './app.scss';

const App = () => {
  return (
    <main className="app">
      <div className="app__header">
        <Header />
      </div>
      <div className="app__container">
        <div className="app__content">
          <div className="app__top">
            <WeatherInfo />
            <WeatherCurrent />
          </div>
          <div className="app__bottom">
            <WeatherHourly />
            <WeatherFiveDays />
          </div>
        </div>
      </div>
    </main>
  )
}

export default App;