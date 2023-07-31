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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
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
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false); // Track logout confirmation dialog visibility
  const LOGIN_STATUS_KEY = "isLoggedIn";

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
    handleMenuClose();
    setShowLogoutConfirmation(true);
  };

  const handleLogoutConfirmation = (confirmed: boolean) => {
    setShowLogoutConfirmation(false);
    if (confirmed) {
      localStorage.setItem(LOGIN_STATUS_KEY, "false");
      setShowLoginPopup(true);
    }
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
            Palette
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

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>

      {showLoginPopup && (
        <Login showPopup={true} onLoginSuccess={() => setShowLoginPopup(false)} />
      )}

      <Dialog open={showLogoutConfirmation} onClose={() => handleLogoutConfirmation(false)}>
        <DialogTitle>Are you sure you want to logout?</DialogTitle>
        <DialogContent>
          {/* You can add more details or a message here */}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleLogoutConfirmation(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={() => handleLogoutConfirmation(true)} color="primary">
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Header;
