import React, { useEffect, useState } from "react";
import { Stack, Pagination } from "@mui/material";
import EventsList from "../features/event/EventsList";
import { useDispatch, useSelector } from "react-redux";
import { getEventsFromCurrentUser } from "../features/event/eventSlice";

function MyEvents() {
  const { events, totalPages } = useSelector((state) => state.event);
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getEventsFromCurrentUser({ page, limit: 5 }));
  }, [dispatch, page]);

  return (
    <Stack alignItems={"center"}>
      <EventsList events={events}></EventsList>
      <Pagination
        count={totalPages}
        onChange={(event, value) => {
          setPage(value);
        }}
        sx={{ alignSelf: "center", marginTop: 6 }}
      ></Pagination>
    </Stack>
  );
}

export default MyEvents;
