import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/http.hook";

const initialState = {
  weather: [],
  weatherLoadingStatus: 'idle'
}

export const fetchWeather = createAsyncThunk(
  'weather/fetchWeather',
  () => {
    const { request } = useHttp();
    return request('http://api.weatherapi.com/v1/current.json?key=1806080f66724ac7af862245241608&q=Nemyriv&aqi=no/');
  }
);

// 1806080f66724ac7af862245241608
// http://api.weatherapi.com/v1/current.json?key=1806080f66724ac7af862245241608&q=Nemyriv&aqi=no/

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, state => { state.weatherLoadingStatus = 'loading' })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.weatherLoadingStatus = 'idle';
        state.weather = action.payload;
      })
      .addCase(fetchWeather.rejected, state => { state.weatherLoadingStatus = 'error' })
      .addDefaultCase(() => { })
  }
});

const { reducer } = weatherSlice;

export default reducer;