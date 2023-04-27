import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import { MAPBOX_MAP_API_KEY } from "../../app/config";
import { Container, IconButton, Stack, Typography } from "@mui/material";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import AddLocationIcon from "@mui/icons-material/AddLocation";

mapboxgl.accessToken = MAPBOX_MAP_API_KEY;

function EventMapForm({ setValue }) {
  const mapContainer = useRef(null);
  const geocoder = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(9);

  useEffect(() => {
    if (map.current) return; // initialize map only once

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [lng, lat],
      zoom: zoom,
      attributionControl: false,
    });

    geocoder.current = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      placeholder: "Choose your location",
      marker: {
        color: "orange",
      },
      mapboxgl: mapboxgl,
    });

    map.current.addControl(geocoder.current, "top-left");
  }, [lat, lng, zoom]);

  useEffect(() => {
    if (!map.current) return;

    geocoder.current.on("result", function (result) {
      setLng(result.result.geometry.coordinates[0]);
      setLat(result.result.geometry.coordinates[1]);
    });
  }, [lat, lng, setValue]);

  return (
    <>
      <Stack flexDirection={"row"} alignItems="center">
        <Typography> Click the right icon to add location</Typography>
        <IconButton onClick={() => setValue("lngLat", [lng, lat])}>
          <AddLocationIcon></AddLocationIcon>
        </IconButton>
      </Stack>
      <Container
        ref={mapContainer}
        sx={{
          width: { xs: "250px", sm: "500px" },
          height: { xs: "250px", sm: "500px" },
        }}
      ></Container>
    </>
  );
}

export default EventMapForm;
