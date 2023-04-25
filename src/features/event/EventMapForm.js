import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import { MAPBOX_MAP_API_KEY } from "../../app/config";
import { Container } from "@mui/material";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";

mapboxgl.accessToken = MAPBOX_MAP_API_KEY;

function EventMapForm({ setValue }) {
  const mapContainer = useRef(null);
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

    let geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      placeholder: "Choose your location",
      marker: {
        color: "orange",
      },
      mapboxgl: mapboxgl,
    });

    map.current.addControl(geocoder, "top-left");
    map.current.on("moveend", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setValue("lngLat", [lng, lat]);
      setZoom(map.current.getZoom().toFixed(2));
    });
  }, [lat, lng, zoom, setValue]);

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

export default EventMapForm;
