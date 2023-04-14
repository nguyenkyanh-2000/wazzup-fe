import { Outlet } from "react-router-dom";
import { Stack } from "@mui/material";
import Logo from "../components/Logo";

const style = {
  minHeight: "100vh",
  justifyContent: "center",
  alignItems: "center",
};

function BlankLayout() {
  return (
    <Stack sx={style}>
      <Logo
        sx={{ width: "300px", height: "150px", margin: "auto", mb: 1 }}
      ></Logo>
      <Outlet />
    </Stack>
  );
}

export default BlankLayout;
