import { Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CommentCard from "./CommentCard";
import { getComments } from "./commentSlice";

function CommentList({ eventId }) {
  const { comments } = useSelector((state) => state.comment);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getComments(eventId.id));
  }, [dispatch, eventId]);

  return (
    <>
      <Typography fontWeight={700}>Comments</Typography>
      <Stack spacing={3}>
        {comments.map((comment) => {
          return <CommentCard comment={comment} />;
        })}
      </Stack>
    </>
  );
}

export default CommentList;
