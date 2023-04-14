import React from "react";
import { Avatar, Box, Paper, Stack, Typography } from "@mui/material";

function CommentCard({ comment }) {
  return (
    <Stack direction="row" spacing={2}>
      <Avatar alt={comment.commenter.name} src={comment.commenter?.avatarUrl} />
      <Paper sx={{ p: 1.5, flexGrow: 1, bgcolor: "background.neutral" }}>
        <Stack
          direction="row"
          alignItems={{ sm: "center" }}
          justifyContent="space-between"
          sx={{ mb: 0.5 }}
        >
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
            {comment.commenter.name}
          </Typography>
          <Typography variant="caption" sx={{ color: "text.disabled" }}>
            {comment.createdAt}
          </Typography>
        </Stack>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {comment.content}
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}></Box>
      </Paper>
    </Stack>
  );
}

export default CommentCard;
