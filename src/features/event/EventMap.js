import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import { MAPBOX_MAP_API_KEY } from "../../app/config";
import { Container } from "@mui/material";

mapboxgl.accessToken = MAPBOX_MAP_API_KEY;

export default function EventMap({ eventLng, eventLat }) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-90);
  const [lat, setLat] = useState(45);
  const [zoom, setZoom] = useState(9);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [eventLng, eventLat],
      zoom: zoom,
    });

    const marker1 = new mapboxgl.Marker().setLngLat([eventLng, eventLat]);

    marker1.addTo(map.current);
  }, [eventLat, eventLng, lat, lng, zoom]);

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });

  return (
    <Container
      ref={mapContainer}
      sx={{
        width: { xs: "250px", sm: "500px" },
        height: { xs: "250px", sm: "500px" },
      }}
    ></Container>
  );
}
