import { Box, Divider, Stack, Typography, Button } from "@mui/material";
import { useEffect } from "react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteEvent, getSingleEvent } from "../features/event/eventSlice";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import EventAttendees from "../features/user/EventAttendees";
import {
  attendEvent,
  getAttendees,
  getCurrentUser,
  getOrganizer,
  unattendEvent,
} from "../features/user/userSlice";
import CommentList from "../features/comment/CommentList";
import CommentForm from "../features/comment/CommentForm";
import { isInThePast } from "../utils/isInThePast";
import EventMap from "../features/event/EventMap";

function SingleEventPage() {
  const { attendees } = useSelector((state) => state.user);
  const { currentEvent } = useSelector((state) => state.event);
  const { organizer } = useSelector((state) => state.user);
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const id = useParams();

  useEffect(() => {
    dispatch(getSingleEvent(id));
    dispatch(getOrganizer(id));
    dispatch(getCurrentUser());
  }, [attendees, dispatch, id]);

  return (
    <>
      <Divider />
      <Stack paddingX={"10%"}>
        <Stack marginTop={5} padding={5} spacing={5}>
          <Typography variant={"h3"} color="secondary">
            {currentEvent.name}
          </Typography>
          <Typography
            component={"span"}
            onClick={() => navigate(`/users/${organizer._id}`)}
          >
            Created by <strong>{organizer.name}</strong>
          </Typography>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={5}
            justifyContent="space-between"
            alignItems={"center"}
          >
            <Box maxWidth="1000px" width="100%">
              <img
                width={"100%"}
                height={"auto"}
                src={`${currentEvent.coverUrl}`}
                alt={`${currentEvent.description}`}
              ></img>
            </Box>
            <Stack>
              <Typography>
                <strong>Time:</strong>
                {" " +
                  dayjs(currentEvent.time).format("ddd, MMM D, YYYY h:mm A")}
              </Typography>
              <Typography>
                <strong>Location:</strong> {currentEvent.location?.name}
              </Typography>
              <Stack
                spacing={3}
                marginTop={3}
                width={{ xs: "200px", sm: "300px" }}
                height="auto"
              >
                {!isInThePast(currentEvent.time) &&
                  currentEvent.attendees?.includes(user._id) &&
                  organizer._id !== user._id && (
                    <Button
                      onClick={() => {
                        dispatch(unattendEvent({ id: currentEvent._id }));
                        dispatch(getAttendees(id));
                      }}
                      variant="contained"
                    >
                      Unattend event
                    </Button>
                  )}
                {!isInThePast(currentEvent.time) &&
                  !user.futureEvents?.includes(currentEvent._id) &&
                  currentEvent.organizer !== user._id && (
                    <Button
                      onClick={() =>
                        dispatch(attendEvent({ id: currentEvent._id }))
                      }
                      variant="contained"
                    >
                      Join event
                    </Button>
                  )}
                {!isInThePast(currentEvent.time) &&
                  organizer._id === user._id && (
                    <Button
                      onClick={() => {
                        dispatch(deleteEvent({ id: currentEvent._id }));
                        navigate("/");
                      }}
                      variant="contained"
                    >
                      Delete event
                    </Button>
                  )}
                {currentEvent.location?.coordinates && (
                  <EventMap
                    eventLng={currentEvent.location.coordinates[0]}
                    eventLat={currentEvent.location.coordinates[1]}
                  ></EventMap>
                )}
              </Stack>
            </Stack>
          </Stack>
          <Typography>
            <strong>Description:</strong>{" "}
            {currentEvent.description
              ? currentEvent.description
              : "No description"}
          </Typography>
          <EventAttendees eventId={id}></EventAttendees>
          <CommentList eventId={id}></CommentList>
          <CommentForm eventId={id}></CommentForm>
        </Stack>
      </Stack>
    </>
  );
}

export default SingleEventPage;
