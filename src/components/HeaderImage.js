import { Link as RouterLink } from "react-router-dom";
import { Box } from "@mui/material";
import { motion } from "framer-motion";
import headerImage from "../assets/event.png";

function HeaderImage({ sx }) {
  return (
    <Box
      component={motion.div}
      initial={{ y: 0, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 2, delay: 1 }}
      sx={{ width: 40, height: 40, ...sx }}
    >
      <img src={headerImage} alt="headerImage" width={"100%"} height={"auto"} />
    </Box>
  );
}

export default HeaderImage;
