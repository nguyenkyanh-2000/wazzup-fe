import { configureStore } from "@reduxjs/toolkit";
import eventReducer from "../features/event/eventSlice";
import userReducer from "../features/user/userSlice";
import commentReducer from "../features/comment/commentSlice";

const rootReducer = {
  event: eventReducer,
  user: userReducer,
  comment: commentReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
