import React, { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import {
  useMediaQuery,
  useTheme,
  Stack,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { AuthContext } from "../contexts/AuthContext";
import LinksModal from "../components/LinksModal";
import Logo from "../components/Logo";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { ColorModeContext } from "../theme";
import { Link as RouterLink } from "react-router-dom";

const buttonStyle = {
  fontWeight: "700",
  fontSize: "14px",
};

function MainHeader() {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const navigate = useNavigate();
  const isTablet = useMediaQuery(theme.breakpoints.up("md"));
  const { user, logout } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      handleMenuClose();
      await logout(() => {
        navigate("/");
      });
    } catch (error) {
      console.error(error);
    }
  };

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      id="basic-menu"
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <Box sx={{ my: 1.5, px: 2.5, borderRadius: 1, fontFamily: "Abercu" }}>
        <Typography variant="subtitle2" noWrap>
          {user?.name}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
          {user?.email}
        </Typography>
      </Box>
      <MenuItem
        onClick={handleMenuClose}
        to="/"
        component={RouterLink}
        sx={{ mx: 1 }}
      >
        My Profile
      </MenuItem>
      <MenuItem onClick={handleLogout} sx={{ m: 1 }}>
        Logout
      </MenuItem>
    </Menu>
  );

  return (
    <>
      <Stack
        direction="row"
        spacing={4}
        paddingX={4}
        paddingTop={1}
        justifyContent="center"
      >
        <Logo sx={{ width: "150px", height: "75px" }}> </Logo>
        <Box flexGrow={1}></Box>
        {isTablet ? (
          <>
            <IconButton onClick={colorMode.toggleColorMode}>
              {theme.palette.mode === "light" ? (
                <DarkModeIcon />
              ) : (
                <LightModeIcon />
              )}
            </IconButton>
            <Button
              color={"inherit"}
              style={buttonStyle}
              onClick={() => navigate("/events")}
            >
              Discover
            </Button>
            <Button
              color={"inherit"}
              style={buttonStyle}
              onClick={() => navigate("/register")}
            >
              Join us
            </Button>
            {user ? (
              <Button
                color={"inherit"}
                style={buttonStyle}
                onClick={handleProfileMenuOpen}
              >
                Me
              </Button>
            ) : (
              <Button
                color={"inherit"}
                style={buttonStyle}
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
            )}
          </>
        ) : (
          <LinksModal />
        )}
        {renderMenu}
      </Stack>
    </>
  );
}

export default MainHeader;
