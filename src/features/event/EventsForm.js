import { Box, Button, IconButton, Stack } from "@mui/material";
import dayjs from "dayjs";
import React from "react";
import { useForm } from "react-hook-form";
import FDatePicker from "../../components/form/FDatePicker";
import FormProvider from "../../components/form/FormProvider";
import FSelect from "../../components/form/FSelect";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const eventFormStyle = {
  width: "100%",
  border: "2px solid ",
  padding: "24px",
  borderRadius: "8px",
};

function EventsForm({ setFormData }) {
  const methods = useForm();
  const { reset, handleSubmit, setValue } = methods;

  const handleSearchClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setValue(
          "latLng",
          `${position.coords.latitude},${position.coords.longitude}`
        );
      });
    }
  };

  const handleClearClick = () => {
    reset();
  };

  const onSubmit = (data) => {
    if (data.from) data.from = dayjs(data.from).toISOString();
    if (data.to) data.to = dayjs(data.to).toISOString();
    setFormData({ ...data });
  };

  return (
    <Box marginTop={5}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={3}
          sx={eventFormStyle}
        >
          <FSelect
            name="sortBy"
            size="small"
            label={"Sort by"}
            sx={{ width: "100%", maxWidth: "250px", alignSelf: "center" }}
          >
            {[
              { value: "nameAscending", label: "Name - Ascending" },
              { value: "nameDescending", label: "Name - Descending" },
              { value: "timeAscending", label: "Event date - Ascending" },
              { value: "timeDescending", label: "Event date - Descending" },
              { value: "nearestDate", label: "Nearest date" },
            ].map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </FSelect>
          <FSelect
            name="kmDistance"
            size="small"
            label={"Distance"}
            sx={{ width: "100%", maxWidth: "200px", alignSelf: "center" }}
          >
            {[
              { value: 5, label: "5km" },
              { value: 10, label: "10km" },
              { value: 20, label: "20km" },
              { value: 40, label: "40km" },
              { value: 100, label: "100km" },
            ].map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </FSelect>
          <FDatePicker name={"from"} label={"From MM/DD/YYYY"} />
          <FDatePicker name={"to"} label={"To MM/DD/YYYY"} />
          <IconButton onClick={handleSearchClick}>
            <LocationOnIcon />
          </IconButton>
          <Button size="small" type="submit">
            Search
          </Button>
          <Button size="small" onClick={handleClearClick}>
            Clear
          </Button>
        </Stack>
      </FormProvider>
    </Box>
  );
}

export default EventsForm;
