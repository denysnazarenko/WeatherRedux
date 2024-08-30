import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/http.hook";

const initialState = {
  weatherData: {},
  weatherLoadingStatus: 'idle',
  userLocationLoadingStatus: 'idle',
  location: 'London',
  userLocation: '',
  lastChangedLocation: 'London',
  cityTime: '',
  cityAutocompleteLoadingStatus: 'idle',
  cityAutocomplete: [],
  forecastDayLoadingStatus: 'idle',
  astro: {},
  hourly: [],
  forecastFiveDaysLoadingStatus: 'idle',
  forecastFiveDays: []
}

export const fetchCurrentWeather = createAsyncThunk(
  'weather/fetchWeather',
  async (lastChangedLocation, thunkAPI) => {
    const { request } = useHttp();
    const { _apiBase, _apiKey } = thunkAPI.extra;

    const response = await request(`${_apiBase}current.json?key=${_apiKey}&q=${lastChangedLocation}&aqi=no/`);

    const cityTime = response.location.localtime;

    const data = {
      temp_c: Math.round(response.current.temp_c),
      feelslike_c: Math.round(response.current.feelslike_c),
      text: response.current.condition.text,
      icon: response.current.condition.icon,
      humidity: response.current.humidity,
      wind_kph: Math.round(response.current.wind_kph),
      pressure_mb: response.current.pressure_mb,
      uv: response.current.uv
    }

    return {
      cityTime,
      data: data
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

export const fetchForecastDay = createAsyncThunk(
  'weather/fetchForecastDay',
  async (city, thunkAPI) => {
    const { request } = useHttp();
    const { _apiBase, _apiKey } = thunkAPI.extra;

    const response = await request(`${_apiBase}forecast.json?key=${_apiKey}&q=${city}&days=1`);

    const astro = {
      sunrise: response.forecast.forecastday[0].astro.sunrise,
      sunset: response.forecast.forecastday[0].astro.sunset
    };

    const hourlyData = [
      response.forecast.forecastday[0].hour[9],
      response.forecast.forecastday[0].hour[12],
      response.forecast.forecastday[0].hour[15],
      response.forecast.forecastday[0].hour[18],
      response.forecast.forecastday[0].hour[21]
    ];

    const hourlyDataFiltered = hourlyData.map(hour => {
      return {
        time: hour.time.slice(-5),
        icon: hour.condition.icon,
        temp_c: Math.round(hour.temp_c),
        wind_dir: hour.wind_dir,
        wind_kph: Math.round(hour.wind_kph)
      }
    })
    console.log(hourlyDataFiltered);
    return { astro, hourlyDataFiltered };
  }
)

export const fetchForecastFiveDays = createAsyncThunk(
  'weather/fetchForecastFiveDays',
  async (city, thunkAPI) => {
    const { request } = useHttp();
    const { _apiBase, _apiKey } = thunkAPI.extra;

    const response = await request(`${_apiBase}forecast.json?key=${_apiKey}&q=${city}&days=3`);

    const data = response.forecast.forecastday.map(day => {
      return {
        icon: day.day.condition.icon,
        maxtemp_c: Math.round(day.day.maxtemp_c),
        mintemp_c: Math.round(day.day.mintemp_c),
        date: day.date
      }
    });

    return data;
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
      .addCase(fetchForecastDay.pending, state => { state.forecastDayLoadingStatus = 'loading' })
      .addCase(fetchForecastDay.rejected, state => { state.forecastDayLoadingStatus = 'error' })
      .addCase(fetchForecastDay.fulfilled, (state, action) => {
        state.forecastDayLoadingStatus = 'idle';
        state.astro = action.payload.astro;
        state.hourly = action.payload.hourlyDataFiltered;
      })
      .addCase(fetchForecastFiveDays.pending, state => { state.forecastFiveDaysLoadingStatus = 'loading' })
      .addCase(fetchForecastFiveDays.rejected, state => { state.forecastFiveDaysLoadingStatus = 'error' })
      .addCase(fetchForecastFiveDays.fulfilled, (state, action) => {
        state.forecastFiveDaysLoadingStatus = 'idle';
        state.forecastFiveDays = action.payload;
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