import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Avatar,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { styled } from "@mui/material/styles";
import { Theme } from "@mui/material/styles";
import Sidebar from "./Sidebar";

// const StyledAppBar = styled(AppBar)(({ theme: Theme }) => ({
//   zIndex: Theme.zIndex.drawer + 1,
//   backgroundColor: Theme.palette.common.white,
//   color: Theme.palette.common.black,


// }));
const StyledAppBar = styled(Box)({
  background:'#002D62',
  zIndex: 1300,
  width:'100%',
  color:'white',
  height:'57px'
})

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

  const handleSidebarOpen = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSidebarClose = () => {
    setIsSidebarOpen(false);
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
            sx={{ marginLeft: 2 }}
          />
        </Toolbar>
      </StyledAppBar>

      <Sidebar open={isSidebarOpen} onClose={handleSidebarClose} />


    </>
  );
};

export default Header;
