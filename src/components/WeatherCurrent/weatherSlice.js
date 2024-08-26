import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/http.hook";

const initialState = {
  weatherData: [],
  weatherLoadingStatus: 'idle',
  userLocationLoadingStatus: 'idle',
  location: 'London',
  userLocation: '',
  lastChangedLocation: 'London',
  cityTime: '',
  cityAutocompleteLoadingStatus: 'idle',
  cityAutocomplete: []
}

export const fetchCurrentWeather = createAsyncThunk(
  'weather/fetchWeather',
  async (lastChangedLocation, thunkAPI) => {
    const { request } = useHttp();
    const { _apiBase, _apiKey } = thunkAPI.extra;

    const respons = await request(`${_apiBase}current.json?key=${_apiKey}&q=${lastChangedLocation}&aqi=no/`);

    const cityTime = respons.location.localtime;

    return {
      cityTime,
      data: respons
    };
  }
);

export const fetchUserLocation = createAsyncThunk(
  'weather/fetchLocation',
  async () => {
    const { request } = useHttp();
    const _apiKey = 'a0f5bd2704494ca0941f202760000437';

    const response = await request(`https://api.ipgeolocation.io/ipgeo?apiKey=${_apiKey}`);

    const city = response.city;

    return city;
  }
)

export const fetchAutocomplete = createAsyncThunk(
  'weather/fetchAutocomplete',
  async (city, thunkAPI) => {
    const { request } = useHttp();
    const { _apiBase, _apiKey } = thunkAPI.extra;

    const response = await request(`${_apiBase}search.json?key=${_apiKey}&q=${city}`);

    const citys = response.map(obj => obj.name);

    return citys;
  }
)

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    setLocation: (state, action) => {
      state.location = action.payload;
      state.lastChangedLocation = action.payload;
    },
    clearAutocompleteData: (state) => {
      state.cityAutocomplete = '';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentWeather.pending, state => { state.weatherLoadingStatus = 'loading' })
      .addCase(fetchCurrentWeather.fulfilled, (state, action) => {
        state.weatherLoadingStatus = 'idle';
        state.cityTime = action.payload.cityTime;
        state.weatherData = action.payload.data;
      })
      .addCase(fetchCurrentWeather.rejected, state => { state.weatherLoadingStatus = 'error' })
      .addCase(fetchUserLocation.rejected, state => { state.userLocationLoadingStatus = 'error' })
      .addCase(fetchUserLocation.pending, state => { state.userLocationLoadingStatus = 'loading' })
      .addCase(fetchUserLocation.fulfilled, (state, action) => {
        state.userLocationLoadingStatus = 'idle';
        state.userLocation = action.payload;
        state.lastChangedLocation = action.payload;
      })
      .addCase(fetchAutocomplete.pending, state => { state.cityAutocompleteLoadingStatus = 'loading' })
      .addCase(fetchAutocomplete.rejected, state => { state.cityAutocompleteLoadingStatus = 'error' })
      .addCase(fetchAutocomplete.fulfilled, (state, action) => {
        state.cityAutocompleteLoadingStatus = 'idle';
        state.cityAutocomplete = action.payload;
      })
      .addDefaultCase(() => { })
  }
});

const { actions, reducer } = weatherSlice;

export default reducer;
export const {
  setLocation,
  clearAutocompleteData
} = actions;