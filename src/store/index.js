import { configureStore } from "@reduxjs/toolkit";
import weather from "../components/WeatherCurrent/weatherSlice";

const _apiBase = 'http://api.weatherapi.com/v1/';
const _apiKey = 'f9f75b1932904dc6a1974331242008';

const store = configureStore({
  reducer: { weather },
  middleware: getDefaultMiddlewear => getDefaultMiddlewear({
    thunk: {
      extraArgument: { _apiBase, _apiKey }
    }
  }),
  devTools: process.env.NODE_ENV !== 'production'
})

export default store;