import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  weather: [],
  weatherLoadingStatus: 'idle'
}

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {},
  extraReducers: //ЗУпинилися тут потрібно буде створювати запити через createAsyncThunk і вже тут все обробляти
});