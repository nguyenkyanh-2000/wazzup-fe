import { createSlice } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";
import queryString from "query-string";
import { toast } from "react-hot-toast";

const initialState = {
  isLoading: false,
  error: null,
  events: [],
  currentEvent: {},
  totalPages: 1,
};

const slice = createSlice({
  name: "event",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    getEventsSuccess(state, action) {
      state.isLoading = true;
      state.error = null;
      const { events } = action.payload;
      state.events = events;
    },
    getSingleEventSuccess(state, action) {
      state.isLoading = true;
      state.error = null;
      const { event } = action.payload;
      state.currentEvent = event;
    },
  },
});

export const getEvents =
  ({ page = 1, limit = 5, ...body }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    const query = { page, limit, ...body };
    try {
      console.log(queryString.stringify(query));
      const response = await apiService.get(
        `/events/?${queryString.stringify(query)}`
      );
      console.log(response);
      dispatch(slice.actions.getEventsSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast(error.message);
    }
  };

export const getSingleEvent =
  ({ id }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.get(`/events/${id}`);
      dispatch(slice.actions.getSingleEventSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
    }
  };

export default slice.reducer;
