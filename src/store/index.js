import { configureStore } from "@reduxjs/toolkit";
import weather from "../components/WeatherCurrent/weatherSlice";

const store = configureStore({
  reducer: { weather },
  middleware: getDefaultMiddlewear => getDefaultMiddlewear(),
  devTools: process.env.NODE_ENV !== 'production'
})

export default store;