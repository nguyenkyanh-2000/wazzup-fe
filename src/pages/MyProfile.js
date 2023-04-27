import { useEffect } from "react";
import React from "react";
import { useDispatch } from "react-redux";
import { getCurrentUser } from "../features/user/userSlice";
import { useSelector } from "react-redux";
import { Avatar, Button, Divider, Stack, Typography } from "@mui/material";
import UpdateProfileDialog from "../features/user/UpdateProfileDialog";

function MyProfile() {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  return (
    <Stack alignItems={"center"} spacing={5}>
      <Divider></Divider>
      <Avatar src={user.avatarUrl}></Avatar>
      <Typography>
        <strong> Name: </strong> {user?.name}
      </Typography>
      <Typography>
        <strong>About me: </strong>
        {user?.biography}
      </Typography>
      <Typography>
        <strong>Location: </strong>
        {user.location?.name}
      </Typography>
      <UpdateProfileDialog></UpdateProfileDialog>
    </Stack>
  );
}

export default MyProfile;
