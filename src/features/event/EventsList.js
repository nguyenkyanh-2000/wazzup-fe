import { Box, Divider, Stack, Typography } from "@mui/material";
import React from "react";
import HorizontalEventCard from "./HorizontalEventCard";

function EventsList({ events }) {
  console.log(events);
  return (
    <Stack
      alignItems={"center"}
      spacing={5}
      width={"100%"}
      marginTop={5}
      padding={5}
    >
      <Box>
        <Typography fontWeight={700}> Events</Typography>
        <Divider sx={{ width: "100%", borderBottomWidth: 5 }}></Divider>
      </Box>
      {events.length === 0 && <Typography>No results</Typography>}
      {events.map((event) => (
        <HorizontalEventCard event={event}></HorizontalEventCard>
      ))}
    </Stack>
  );
}

export default EventsList;
