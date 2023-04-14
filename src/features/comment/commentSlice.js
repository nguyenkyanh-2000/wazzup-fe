import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
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
      state.error = null;
      const { comments } = action.payload;
      state.comments = comments;
    },

    createCommentSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
    },

    updateCommentSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { comment } = action.payload;
      const commentId = state.comments.findIndex(
        (currentComment) => currentComment._id === comment._id
      );
      state.comments[commentId] = comment;
    },

    deleteCommentSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { commentId } = action.payload;
      state.comments = state.comments.filter(
        (comment) => comment._id !== commentId
      );
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
    toast(error.message);
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
    toast("Create comment successful");
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast(error.message);
  }
};

export const updateComment =
  (commentId, eventId, content) => async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.put(`/comments/${commentId}`, {
        content,
      });
      dispatch(slice.actions.updateCommentSuccess(response.data));
      dispatch(getComments(eventId));
      toast("Update comment successful!");
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast(error.message);
    }
  };

export const deleteComment = (commentId, eventId) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.delete(`/comments/${commentId}`);
    dispatch(
      slice.actions.deleteCommentSuccess({ ...response.data, commentId })
    );
    dispatch(getComments(eventId));
    toast("Comment deleted");
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast(error.message);
  }
};

export default slice.reducer;
