import { Stack } from "@mui/material";
import React from "react";
import HeaderImage from "../components/HeaderImage";
import HeaderText from "../components/HeaderText";
import UpcomingEvents from "../features/event/UpcomingEvents";
import WhyUs from "../components/WhyUs";
import { motion } from "framer-motion";

function HomePage() {
  return (
    <Stack>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 2, delay: 1 }}
      >
        <HeaderText />
      </motion.div>

      <HeaderImage
        sx={{
          width: "100%",
          maxWidth: "850px",
          height: "auto",
          alignSelf: "center",
          marginY: 5,
          padding: 5,
        }}
      ></HeaderImage>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 2, delay: 1 }}
      >
        <WhyUs />
      </motion.div>
      <UpcomingEvents />
    </Stack>
  );
}

export default HomePage;
