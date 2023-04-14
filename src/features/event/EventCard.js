import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, useTheme } from "@mui/material";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

export default function EventCard({ event }) {
  const theme = useTheme();
  const navigate = useNavigate();
  return (
    <Card sx={{ maxWidth: 375 }}>
      <CardActionArea onClick={() => navigate(`/events/${event._id}`)}>
        <CardMedia
          component="img"
          height="140"
          image={`${event.coverUrl}`}
          alt={`${event._id}`}
        />
        <CardContent>
          <Typography
            sx={{
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
            }}
          >
            {dayjs(event.time).format("ddd, MMM D, YYYY h:mm A")}
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            {event.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {event.location.name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
