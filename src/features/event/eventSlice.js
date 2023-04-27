import { createSlice } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";
import queryString from "query-string";
import { toast } from "react-hot-toast";
import { cloudinaryUpload } from "../../utils/cloudinary";

const initialState = {
  isLoading: false,
  error: null,
  events: [],
  currentEvent: {},
  totalPages: 1,
  currentPage: 1,
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
      const { events, totalPages } = action.payload;
      state.events = events;
      state.totalPages = totalPages;
    },
    getSingleEventSuccess(state, action) {
      state.isLoading = true;
      state.error = null;
      const { event } = action.payload;
      state.currentEvent = event;
    },
    deleteEventSuccess(state, action) {
      state.isLoading = true;
      state.error = null;
      const { eventId } = action.payload;
      state.events = state.events.filter((event) => event._id !== eventId);
    },
    createEventSuccess(state, action) {
      state.isLoading = true;
      state.error = null;
    },
  },
});

export const getEvents =
  ({ page = 1, limit = 5, ...body }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    const query = { page, limit, ...body };
    try {
      const response = await apiService.get(
        `/events/?${queryString.stringify(query, { encode: false })}`
      );
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

export const deleteEvent =
  ({ id }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.delete(`/events/${id}`);
      dispatch(
        slice.actions.deleteEventSuccess({ ...response.data, eventId: id })
      );
      toast("Delete event successful");
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast(error.message);
    }
  };

export const createEvent =
  ({ eventName, locationName, lngLat, time, coverUrl, eventDescription }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const imageUrl = await cloudinaryUpload(coverUrl);
      console.log({
        name: eventName,
        location: {
          name: locationName,
          coordinates: lngLat,
        },
        time: time,
        description: eventDescription,
        coverUrl: imageUrl,
      });
      const response = await apiService.post(`/events`, {
        name: eventName,
        location: {
          name: locationName,
          coordinates: lngLat,
        },
        time: time,
        description: eventDescription,
        coverUrl: imageUrl,
      });
      dispatch(slice.actions.createEventSuccess(response.data));
      toast("Create event successful");
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast(error.message);
    }
  };

export default slice.reducer;
