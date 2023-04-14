import React, { useContext, useState } from "react";
import { Avatar, Box, Paper, Stack, Typography } from "@mui/material";
import { AuthContext } from "../../contexts/AuthContext";
import { IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CommentEditDialog from "./CommentEditDialog";
import CommentDeleteDialog from "./CommentDeleteDialog";
import { Menu } from "@mui/material";
import { MenuItem } from "@mui/material";
import { fDate } from "../../utils/formatTime";

function CommentCard({ comment }) {
  const { user } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = useState();
  const areOptionsOpened = Boolean(anchorEl);
  const handleOptionsOpen = (event) => {
    setAnchorEl(event.target);
  };

  const handleOptionsClose = () => {
    setAnchorEl(null);
  };

  const deleteCommentOption = () => {
    setAnchorEl(null);
  };

  const editCommentOption = () => {
    setAnchorEl(null);
  };
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
          <Stack direction="row" alignItems={"center"}>
            <Typography variant="caption" sx={{ color: "text.disabled" }}>
              {fDate(comment.updatedAt)}
            </Typography>
            {user?._id === comment.commenter?._id && (
              <IconButton onClick={handleOptionsOpen}>
                <MoreVertIcon sx={{ fontSize: 18, marginBottom: "2px" }} />
              </IconButton>
            )}
            {user?._id === comment.commenter?._id && (
              <Menu
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                id={"primary-search-account-menu"}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={areOptionsOpened}
                onClose={handleOptionsClose}
              >
                <MenuItem onClick={editCommentOption}>
                  <CommentEditDialog
                    commentId={comment._id}
                    eventId={comment.event}
                  />
                </MenuItem>
                <MenuItem onClick={deleteCommentOption}>
                  <CommentDeleteDialog
                    commentId={comment._id}
                    eventId={comment.event}
                  />
                </MenuItem>
              </Menu>
            )}
          </Stack>
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
