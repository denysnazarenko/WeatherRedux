import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {},
  middleware: getDefaultMiddlewear => getDefaultMiddlewear(),
  devTools: process.env.NODE_ENV !== 'production'
})

export default store;