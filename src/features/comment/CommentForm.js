import React, { useContext, useState } from "react";

import { Stack, Avatar, TextField, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { createComment } from "./commentSlice";
import { AuthContext } from "../../contexts/AuthContext";

function CommentForm({ eventId }) {
  const { user } = useContext(AuthContext);
  const [content, setContent] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createComment(eventId.id, content));
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        alignItems="center"
        spacing={3}
      >
        <Avatar src={user?.avatarUrl} alt={user?.name} />
        <TextField
          fullWidth
          size="small"
          value={content}
          placeholder="Write a comment…"
          onChange={(event) => setContent(event.target.value)}
          sx={{
            ml: 2,
            mr: 1,
            "& fieldset": {
              borderWidth: `1px !important`,
              borderColor: (theme) =>
                `${theme.palette.grey[500_32]} !important`,
            },
          }}
        />
        <Button type="submit">Send</Button>
      </Stack>
    </form>
  );
}

export default CommentForm;
