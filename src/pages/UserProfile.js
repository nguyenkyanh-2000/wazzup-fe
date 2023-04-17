import { useEffect } from "react";
import React from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getUser } from "../features/user/userSlice";
import { useSelector } from "react-redux";
import { Avatar, Divider, Stack, Typography } from "@mui/material";

function UserProfile() {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const id = useParams();

  useEffect(() => {
    dispatch(getUser(id));
  }, [dispatch, id]);

  return (
    <Stack alignItems={"center"} spacing={5}>
      <Divider></Divider>
      <Avatar src={user.avatarUrl}></Avatar>
      <Typography>
        <strong> Name: </strong> {user.name}
      </Typography>
      <Typography>
        <strong>About me: </strong>
        {user.biography}
      </Typography>
      <Typography>
        <strong>Location: </strong>
        {user.location?.name}
      </Typography>
    </Stack>
  );
}

export default UserProfile;
