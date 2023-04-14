import { Stack, Typography } from "@mui/material";
import { motion } from "framer-motion";
import React from "react";

function HeaderText() {
  return (
    <Stack marginTop={10}>
      <Typography fontSize={"6.5vw"} fontWeight={"1000"} alignSelf="center">
        YOUR NEXT EVENT IS HERE
      </Typography>
      <Typography fontSize={{ xs: "10px", sm: "2vw" }} alignSelf="center">
        Wazzup, your go-to source for all your event organizing needs.
      </Typography>
      <Typography fontSize={{ xs: "10px", sm: "2vw" }} alignSelf="center">
        From small meetups to corporate conferences, we got it all.
      </Typography>
    </Stack>
  );
}

export default HeaderText;
