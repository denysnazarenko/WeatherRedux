import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/http.hook";

const initialState = {
  weather: [],
  weatherLoadingStatus: 'idle',
  userLocationLoadingStatus: 'idle',
  location: '',
  userLocation: '',
  lastChangedLocation: ''
}

export const fetchCurrentWeather = createAsyncThunk(
  'weather/fetchWeather',
  (lastChangedLocation, thunkAPI) => {
    const { request } = useHttp();
    const { _apiBase, _apiKey } = thunkAPI.extra;

    if (lastChangedLocation === '') {
      return request(`${_apiBase}current.json?key=${_apiKey}&q=London&aqi=no/`);
    } else {
      return request(`${_apiBase}current.json?key=${_apiKey}&q=${lastChangedLocation}&aqi=no/`);
    }
  }
);

export const fetchUserLocation = createAsyncThunk(
  'weather/fetchLocation',
  async () => {
    const { request } = useHttp();
    const _apiKey = '7cc26bc7260348939257df738e3808f6';

    const response = await request(`https://api.ipgeolocation.io/ipgeo?apiKey=${_apiKey}`);

    const city = response.city;

    return city;
  }
)

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    setLocation: (state, action) => {
      state.location = action.payload;
      state.lastChangedLocation = action.payload;
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
      .addCase(fetchUserLocation.rejected, state => { state.userLocationLoadingStatus = 'error' })
      .addCase(fetchUserLocation.pending, state => { state.userLocationLoadingStatus = 'loading' })
      .addCase(fetchUserLocation.fulfilled, (state, action) => {
        state.userLocationLoadingStatus = 'idle';
        state.userLocation = action.payload;
        state.lastChangedLocation = action.payload;
      })
      .addDefaultCase(() => { })
  }
});

const { actions, reducer } = weatherSlice;

export default reducer;
export const {
  setLocation,
  setUserLocation
} = actions;