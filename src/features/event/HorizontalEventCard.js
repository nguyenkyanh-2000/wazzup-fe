import {
  Avatar,
  Card,
  CardActionArea,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { fDateTime } from "../../utils/formatTime";

function HorizontalEventCard({ event }) {
  const navigate = useNavigate();
  return (
    <Card sx={{ width: "100%" }}>
      <CardActionArea onClick={() => navigate(`/events/${event._id}`)}>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: 3,
            width: "100%",
            maxWidth: "1200px",
          }}
        >
          <Avatar
            variant="square"
            src={event.coverUrl}
            sx={{ width: "200px", height: "200px" }}
          ></Avatar>
          <Stack direction={"column"} spacing={1}>
            <Typography fontWeight={700}>{fDateTime(event.time)}</Typography>
            <Typography gutterBottom variant="h5" component="div">
              {event.name}
            </Typography>
            <Typography>Location: {event.location?.name}</Typography>
            <Typography variant="body2" color="text.secondary">
              {event.description ? event.description : "No description"}
            </Typography>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default HorizontalEventCard;
