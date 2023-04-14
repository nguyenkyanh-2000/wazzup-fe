import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import apiService from "../../app/apiService";
import { cloudinaryUpload } from "../../utils/cloudinary";

const initialState = {
  isLoading: false,
  error: null,
  user: {},
  attendees: [],
  organizer: {},
};

const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    getUserSuccess(state, action) {
      state.isLoading = true;
      state.error = null;
      const user = action.payload;
      state.user = user;
    },
    updateUserSuccess(state, action) {
      state.isLoading = true;
      state.error = null;
      const user = action.payload;
      state.user = user;
    },
    getAttendeesSuccess(state, action) {
      state.isLoading = true;
      state.error = null;
      const { attendees } = action.payload.event;
      state.attendees = attendees;
    },
    getOrganizerSuccess(state, action) {
      state.isLoading = true;
      state.error = null;
      const { organizer } = action.payload.event;
      state.organizer = organizer;
    },
    attendEventSuccess(state, action) {
      state.isLoading = true;
      state.error = null;
      state.attendees.push(state.user);
    },
    unattendEventSuccess(state, action) {
      state.isLoading = true;
      state.error = null;
      state.attendees.pull(state.user);
    },
  },
});

export const getAttendees =
  ({ id }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.get(`/events/${id}/attendees`);
      dispatch(slice.actions.getAttendeesSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast(error.message);
    }
  };

export const getOrganizer =
  ({ id }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.get(`/events/${id}/organizer`);
      dispatch(slice.actions.getOrganizerSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast(error.message);
    }
  };

export const getUser =
  ({ id }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.get(`/users/${id}`);
      dispatch(slice.actions.getUserSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast(error.message);
    }
  };

export const getCurrentUser = () => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.get(`/users/me`);
    dispatch(slice.actions.getUserSuccess(response.data));
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast(error.message);
  }
};

export const updateCurrentUser =
  ({ name, biography, avatarUrl, location }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const imageUrl = await cloudinaryUpload(avatarUrl);
      const response = await apiService.put(`/users/me`, {
        name,
        biography,
        avatarUrl: imageUrl,
        location,
      });
      dispatch(slice.actions.updateUserSuccess(response.data));
      toast("Update user successful");
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast(error.message);
    }
  };

export const attendEvent =
  ({ id }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.post(`/events/attend/${id}`);
      dispatch(slice.actions.attendEventSuccess(response.data));
      toast("Attend event successful!");
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast(error.message);
    }
  };

export const unattendEvent =
  ({ id }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.post(`/events/unattend/${id}`);
      dispatch(slice.actions.unattendEventSuccess(response.data));
      toast("Unattend event successful!");
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast(error.message);
    }
  };

export default slice.reducer;
