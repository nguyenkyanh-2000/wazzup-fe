import { Link as RouterLink } from "react-router-dom";
import { Box } from "@mui/material";
import logoImg from "../assets/wazzup_w300_h150.png";

function Logo({ disabledLink = false, sx }) {
  const logo = (
    <Box sx={{ width: 40, height: 40, ...sx }}>
      <img src={logoImg} alt="logo" width={"100%"} height={"auto"} />
    </Box>
  );

  if (disabledLink) {
    return <>{logo}</>;
  }

  return <RouterLink to="/">{logo}</RouterLink>;
}

export default Logo;
