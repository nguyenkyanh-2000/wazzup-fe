import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAttendees } from "./userSlice";

function EventAttendees({ eventId }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { attendees } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getAttendees(eventId));
  }, [dispatch, eventId]);

  return (
    <Box>
      <Typography fontWeight={700} marginBottom={2}>
        Attendees
      </Typography>
      <Grid container spacing={4}>
        {attendees.map((attendee, index) => {
          return (
            <Grid item key={index}>
              <Card>
                <CardActionArea
                  onClick={() => navigate(`/users/${attendee._id}`)}
                >
                  <CardContent>
                    <Avatar src={attendee.avatarUrl}></Avatar>
                    <Typography>{attendee.name}</Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}

export default EventAttendees;
