import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Avatar,
  Box,
  Menu,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { styled } from "@mui/material/styles";
import Sidebar from "./Sidebar";
import Login from "./Login"; // Import your Login component here

const StyledAppBar = styled(AppBar)({
  background: "#002D62",
  zIndex: 1300,
  width: "100%",
  color: "white",
  height: "57px",
});

const HeaderContainer = styled(Box)({
  width: "400px",
  margin: "auto",
  alignContent: "center",
  display: "flex",
  marginTop: "90px",
  marginBottom: "30px",
  justifyContent: "center",
  fontSize: "40px",
});

const Header: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [showLoginPopup, setShowLoginPopup] = useState(false); // Track login popup visibility

  const handleSidebarOpen = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSidebarClose = () => {
    setIsSidebarOpen(false);
  };

  const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    // Add your logout logic here
    // For example, call an API to logout the user and clear the session
    // After logout, show the login popup
    handleMenuClose();
    setShowLoginPopup(true);
  };

  return (
    <>
      <StyledAppBar position="fixed">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleSidebarOpen}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Pallete
          </Typography>

          <Avatar
            alt="User Profile"
            src="/path/to/profile-image.jpg"
            sx={{ marginLeft: 2, cursor: "pointer" }}
            onClick={handleAvatarClick}
          />
        </Toolbar>
      </StyledAppBar>

      <Sidebar onClose={handleSidebarClose} />

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>

      {showLoginPopup && (
        <Login
          showPopup={true}
          onLoginSuccess={() => setShowLoginPopup(false)}
        />
      )}
    </>
  );
};

export default Header;
