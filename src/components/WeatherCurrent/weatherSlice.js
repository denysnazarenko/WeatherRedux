import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/http.hook";

const initialState = {
  weather: [],
  weatherLoadingStatus: 'idle',
  userLocation: {
    latitude: null,
    longitude: null
  }
}

export const fetchCurrentWeather = createAsyncThunk(
  'weather/fetchWeather',
  (location, thunkAPI) => {
    const { request } = useHttp();
    const { _apiBase, _apiKey } = thunkAPI.extra;

    if (location.latitude === null || location.longitude === null) {
      return request(`${_apiBase}current.json?key=${_apiKey}&q=London&aqi=no/`);
    } else {
      return request(`${_apiBase}current.json?key=${_apiKey}&q=${location.latitude},${location.longitude}&aqi=no/`);
    }
  }
);

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    setUserLocation: (state, action) => {
      state.userLocation = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentWeather.pending, state => { state.weatherLoadingStatus = 'loading' })
      .addCase(fetchCurrentWeather.fulfilled, (state, action) => {
        state.weatherLoadingStatus = 'idle';
        state.weather = action.payload;
      })
      .addCase(fetchCurrentWeather.rejected, state => { state.weatherLoadingStatus = 'error' })
      .addDefaultCase(() => { })
  }
});

const { actions, reducer } = weatherSlice;

export default reducer;
export const {
  setUserLocation
} = actions;