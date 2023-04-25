import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import FormProvider from "../../components/form/FormProvider";
import FTextField from "../../components/form/FTextField";
import { useForm } from "react-hook-form";
import { Stack, Typography } from "@mui/material";
import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { updateCurrentUser } from "./userSlice";

const defaultValues = {
  biography: "",
  name: "",
  location: "",
};

export default function UpdateProfileDialog() {
  const [open, setOpen] = useState(false);
  const methods = useForm({ defaultValues });
  const { handleSubmit, setValue } = methods;
  const dispatch = useDispatch();
  const fileInput = useRef();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFile = (event) => {
    const file = fileInput.current.files[0];
    if (file) {
      setValue("avatarUrl", file);
    }
  };

  const onSubmit = (data) => {
    dispatch(
      updateCurrentUser({
        name: data.name,
        biography: data.biography,
        avatarUrl: data.avatarUrl,
        location: {
          name: data.location,
        },
      })
    );
  };

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
        Update Profile
      </Button>
      <Dialog open={open} onClose={handleClose} maxWidth={"md"} fullWidth>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>New profile</DialogTitle>
          <DialogContent>
            <Stack spacing={3}>
              <DialogContentText>Update your profile here</DialogContentText>
              <FTextField name={"name"} label={"Name"}></FTextField>
              <FTextField name={"biography"} label={"Biography"}></FTextField>
              <FTextField name={"location"} label={"Location"}></FTextField>
              <Typography fontWeight={700}> Upload avatar</Typography>
              <input type="file" ref={fileInput} onChange={handleFile}></input>
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleClose} type="submit">
              Update
            </Button>
          </DialogActions>
        </FormProvider>
      </Dialog>
    </div>
  );
}
