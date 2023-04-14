import { Pagination, Stack } from "@mui/material";
import EventForm from "../features/event/EventForm";
import EventList from "../features/event/EventList";
import React from "react";

function EventsPage() {
  return (
    <Stack alignItems={"center"}>
      <EventForm></EventForm>
      <EventList></EventList>
      <Pagination></Pagination>
    </Stack>
  );
}

export default EventsPage;
