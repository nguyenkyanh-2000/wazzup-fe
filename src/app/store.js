import { configureStore } from "@reduxjs/toolkit";
import eventReducer from "../features/event/eventSlice";

const rootReducer = {
  event: eventReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
