import { Button, Stack, Typography } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import FormProvider from "../components/form/FormProvider";
import FTextField from "../components/form/FTextField";
import EventMapForm from "../features/event/EventMapForm";

function CreateEventPage() {
  const methods = useForm();
  const { handleSubmit } = methods;

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={5}>
        <FTextField name={"name"} label={"Event name"}></FTextField>
        <EventMapForm></EventMapForm>
        <Typography>Create your event</Typography>
        <Button type="submit">Create!</Button>
      </Stack>
    </FormProvider>
  );
}

export default CreateEventPage;
