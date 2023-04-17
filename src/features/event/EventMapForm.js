import {
  Autocomplete,
  GoogleMap,
  LoadScript,
  MarkerF,
} from "@react-google-maps/api";
import React, { useState } from "react";
import { GOOGLE_MAP_API_KEY } from "../../app/config";

const containerStyle = {
  width: "100%",
  height: "500px",
};

const center = {
  lat: 10.823099,
  lng: 106.629662,
};

function EventMapForm() {
  const [markerLocation, setMarkerLocation] = useState(center);
  const [autocompleteResult, setAutocompleteResult] = useState();
  const handleOnClick = (e) => {
    setMarkerLocation({
      lat: parseFloat(e.latLng.lat()),
      lng: parseFloat(e.latLng.lng()),
    });
  };

  const onPlaceChanged = () => {
    if (autocompleteResult) {
      console.log(autocompleteResult.getPlace().formatted_address);
      const lat = autocompleteResult.getPlace().geometry.location.lat();
      const lng = autocompleteResult.getPlace().geometry.location.lng();
      setMarkerLocation({ lat, lng });
    }
  };

  const onLoad = (autocomplete) => {
    setAutocompleteResult(autocomplete);
  };
  return (
    <LoadScript googleMapsApiKey={GOOGLE_MAP_API_KEY} libraries={["places"]}>
      <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
        <input
          type="text"
          placeholder="Location name"
          style={{
            boxSizing: `border-box`,
            border: `1px solid transparent`,
            width: `240px`,
            height: `32px`,
            padding: `0 12px`,
            borderRadius: `3px`,
            boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
            fontSize: `14px`,
            outline: `none`,
            textOverflow: `ellipses`,
            position: "absolute",
            left: "50%",
            marginLeft: "-120px",
          }}
        />
      </Autocomplete>
      <GoogleMap
        mapContainerStyle={containerStyle}
        options={{
          draggingCursor: true,
          scrollwheel: false,
          keyboardShortcuts: false,
          mapTypeControl: false,
          fullscreenControl: false,
          zoomControl: true,
          streetViewControl: false,
        }}
        onClick={handleOnClick}
        center={markerLocation}
        zoom={14}
      >
        <MarkerF position={markerLocation}></MarkerF>
      </GoogleMap>
    </LoadScript>
  );
}

export default EventMapForm;
