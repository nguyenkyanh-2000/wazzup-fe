import React, { useEffect } from "react";
import { Button, Grid, Stack, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getEvents } from "./eventSlice";
import EventCard from "./EventCard";
import { useNavigate } from "react-router-dom";

function UpcomingEvents() {
  const { events } = useSelector((state) => state.event);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getEvents({ page: 1, limit: 5, sortBy: "nearestDate" }));
    return () => {};
  }, [dispatch]);

  return (
    <Stack>
      <Typography
        textAlign={"center"}
        fontSize={"5vw"}
        fontWeight={"1000"}
        marginBottom={5}
        justifyItems="center"
      >
        Upcoming events
      </Typography>
      <Grid container spacing={4} paddingX={4} justifyContent="center" my={1}>
        {events.map((event, index) => {
          return (
            <Grid key={index} item>
              <EventCard event={event}></EventCard>
            </Grid>
          );
        })}
      </Grid>
      <Button
        variant="contained"
        size="small"
        sx={{ maxWidth: "120px", alignSelf: "center", marginTop: 5 }}
        onClick={() => navigate("/events")}
      >
        More events
      </Button>
    </Stack>
  );
}

export default UpcomingEvents;
