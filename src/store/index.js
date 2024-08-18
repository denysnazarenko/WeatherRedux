import { configureStore } from "@reduxjs/toolkit";
import weather from "../components/WeatherCurrent/weatherSlice";

const _apiBase = 'http://api.weatherapi.com/v1/';
const _apiKey = '1806080f66724ac7af862245241608';

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