import { Button, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import FormProvider from "../components/form/FormProvider";
import FTextField from "../components/form/FTextField";
import EventMapForm from "../features/event/EventMapForm";
import * as yup from "yup";
import FDateTimePicker from "../components/form/FDateTimePicker";

function CreateEventPage() {
  const methods = useForm();
  const fileInput = useRef();
  const { handleSubmit, setValue } = methods;

  const onSubmit = (data) => {
    console.log(data);
  };

  const handleFile = (event) => {
    const file = fileInput.current.files[0];
    if (file) {
      setValue("coverUrl", file);
    }
  };

  return (
    <Stack sx={{ width: "100%", alignItems: "center", marginTop: 5 }}>
      <Typography marginBottom={5} variant="h4">
        Create a new event
      </Typography>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={5}>
          <FTextField name={"eventName"} label={"Event name"}></FTextField>
          <FTextField
            name={"locationName"}
            label={"Location name"}
          ></FTextField>
          <FTextField
            name={"eventDescription"}
            label={"Description"}
          ></FTextField>
          <Typography> Please choose time for the event</Typography>
          <FDateTimePicker name={"eventTime"}></FDateTimePicker>
          <Typography> Please choose the location on the map</Typography>
          <EventMapForm setValue={setValue}></EventMapForm>
          <Typography> Please upload the event's cover</Typography>
          <input
            type="file"
            ref={fileInput}
            onChange={handleFile}
            accept="image/*"
          ></input>
          <Button type="submit">Create!</Button>
        </Stack>
      </FormProvider>
    </Stack>
  );
}

export default CreateEventPage;
