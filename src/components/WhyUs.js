import { Stack, Typography, Box } from "@mui/material";
import React from "react";
import leftColumnImg from "../assets/connected_world.png";
import rightColumnImg from "../assets/customer_support.png";

function WhyUs() {
  return (
    <Stack direction="column">
      <Typography
        textAlign={"center"}
        fontSize={"5vw"}
        fontWeight={"1000"}
        marginBottom={5}
      >
        Why us?
      </Typography>
      <Stack
        width="80%"
        marginX={"auto"}
        direction={{ xs: "column", md: "row" }}
        alignItems={"center"}
        spacing={10}
        justifyContent="space-around"
        padding={5}
      >
        <Stack direction="column" justifyContent="center" alignContent="center">
          <Box sx={{ width: "100%", maxWidth: "500px" }}>
            <img
              src={leftColumnImg}
              alt="connected_world_logo"
              width={"100%"}
              height={"auto"}
            />
          </Box>
          <Typography
            textAlign={"center"}
            fontSize={{ xs: "10px", sm: "2vw" }}
            fontWeight={700}
          >
            New connections
          </Typography>
          <Typography
            fontSize={{ xs: "10px", sm: "1.5vw" }}
            textAlign={"center"}
          >
            Relationships are not magically built.
          </Typography>
          <Typography
            fontSize={{ xs: "10px", sm: "1.5vw" }}
            textAlign={"center"}
          >
            We can help that.
          </Typography>
        </Stack>
        <Stack direction="column" justifyContent="center" alignContent="center">
          <Box sx={{ width: "100%", maxWidth: "500px" }}>
            <img
              src={rightColumnImg}
              alt="customer_support_logo"
              width={"100%"}
              height={"auto"}
            />
          </Box>
          <Typography
            textAlign={"center"}
            fontSize={{ xs: "10px", sm: "2vw" }}
            fontWeight={700}
          >
            Customer support
          </Typography>
          <Typography
            fontSize={{ xs: "10px", sm: "1.5vw" }}
            textAlign={"center"}
          >
            Our helpdesk is always there for you.
          </Typography>
          <Typography
            fontSize={{ xs: "10px", sm: "1.5vw" }}
            textAlign={"center"}
          >
            Not satisfied? Ask away.
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
}

export default WhyUs;
