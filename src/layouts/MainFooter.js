import { Divider, IconButton, Stack, Typography } from "@mui/material";
import React from "react";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const textStyle = {
  textAlign: "center",
  height: "fit",
  fontSize: { xs: "12px", sm: "1.5vw" },
  fontWeight: 700,
};
function MainFooter() {
  return (
    <Stack
      height="300px"
      direction={"column"}
      spacing={3}
      alignContent="center"
      justifyContent="center"
    >
      <Divider width="100%"></Divider>
      <Stack
        height="auto"
        direction={"row"}
        spacing={3}
        alignContent="center"
        justifyContent="center"
      >
        <Typography sx={textStyle}>Events</Typography>
        <Typography sx={textStyle}>About us</Typography>
        <Typography sx={textStyle}>Career</Typography>
        <Typography sx={textStyle}>Info</Typography>
      </Stack>
      <Stack
        height="auto"
        direction={"row"}
        spacing={3}
        alignContent="center"
        justifyContent="center"
      >
        <IconButton>
          <TwitterIcon fontSize="small" />
        </IconButton>
        <IconButton>
          <FacebookIcon fontSize="small" />
        </IconButton>
        <IconButton>
          <InstagramIcon fontSize="small" />
        </IconButton>
        <IconButton>
          <LinkedInIcon fontSize="small" />
        </IconButton>
      </Stack>
      <Typography alignSelf={"center"}>
        {`© 2023 Anh Ky Nguyen. All rights reserved.`}
      </Typography>
    </Stack>
  );
}

export default MainFooter;
