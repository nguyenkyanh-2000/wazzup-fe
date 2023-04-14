import { createSlice } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";

const initialState = {
  isLoading: false,
  error: null,
  comments: [],
  commentById: {},
};

const slice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },

    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    getCommentsSuccess(state, action) {
      state.isLoading = false;
      state.error = "";
      const { comments } = action.payload;
      state.comments = comments;
    },

    createCommentSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
    },
  },
});

export const getComments = (eventId) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.get(`/events/${eventId}/comments`);

    dispatch(
      slice.actions.getCommentsSuccess({
        ...response.data,
        eventId,
      })
    );
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
  }
};

export const createComment = (eventId, content) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.post("/comments", {
      eventId,
      content,
    });
    dispatch(slice.actions.createCommentSuccess(response.data));
    dispatch(getComments(eventId));
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
  }
};

export default slice.reducer;
