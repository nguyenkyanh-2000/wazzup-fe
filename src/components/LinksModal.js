import React, { useState, useContext } from "react";
import { Stack, IconButton, Modal, Button, useTheme } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import Logo from "./Logo";
import { ColorModeContext } from "../theme";

const stackStyling = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  height: "50%",
  width: "75%",
  bgcolor: "background.paper",
  borderRadius: "8px",
};

const buttonStyle = {
  fontWeight: "700",
  fontSize: "14px",
};

function LinksModal() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const colorMode = useContext(ColorModeContext);
  const theme = useTheme();

  const handleClickLogout = () => {
    auth.logout(() => {
      navigate("/");
    });
  };

  return (
    <>
      <IconButton onClick={handleOpen}>
        <MenuIcon color="white" />
      </IconButton>
      <Modal open={open} onClose={handleClose}>
        <Stack
          direction={"column"}
          sx={stackStyling}
          alignContent={"center"}
          justifyContent={"center"}
          spacing={3}
        >
          <Logo
            sx={{ width: "150px", alignSelf: "center", marginY: 1 }}
            disabledLink
          ></Logo>
          <Button
            sx={buttonStyle}
            color={"inherit"}
            onClick={() => navigate("/")}
          >
            Home
          </Button>
          <Button
            sx={buttonStyle}
            color={"inherit"}
            onClick={() => navigate("/")}
          >
            Discover
          </Button>
          <Button
            sx={buttonStyle}
            color={"inherit"}
            onClick={colorMode.toggleColorMode}
          >
            {theme.palette.mode === "light" ? "Night mode" : "Morning mode"}
          </Button>
          {auth?.user ? (
            <Button
              sx={buttonStyle}
              color={"inherit"}
              onClick={handleClickLogout}
            >
              Logout
            </Button>
          ) : (
            <Button
              sx={buttonStyle}
              color={"inherit"}
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
          )}
        </Stack>
      </Modal>
    </>
  );
}

export default LinksModal;
