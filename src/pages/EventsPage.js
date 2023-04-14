import { Button } from "@mui/material";
import React from "react";

function EventsPage() {
  const successCallback = (position) => {
    console.log(position.coords.latitude);
  };

  const errorCallback = (error) => {
    console.log(error);
  };

  return (
    <Button
      onClick={() =>
        navigator.geolocation.getCurrentPosition(successCallback, errorCallback)
      }
    >
      Click me
    </Button>
  );
}

export default EventsPage;
