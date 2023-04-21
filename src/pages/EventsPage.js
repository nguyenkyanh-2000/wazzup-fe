import { Pagination, Stack } from "@mui/material";
import EventsForm from "../features/event/EventsForm";
import EventsList from "../features/event/EventsList";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEvents } from "../features/event/eventSlice";

function EventsPage() {
  const [formData, setFormData] = useState({
    sortBy: "nearestDate",
    kmDistance: 5,
    page: 1,
    limit: 5,
  });
  const dispatch = useDispatch();
  const { events } = useSelector((state) => state.event);

  useEffect(() => {
    dispatch(getEvents(formData));
  }, [dispatch, formData]);

  return (
    <Stack alignItems={"center"}>
      <EventsForm setFormData={setFormData}></EventsForm>
      <EventsList events={events}></EventsList>
      <Pagination></Pagination>
    </Stack>
  );
}

export default EventsPage;
