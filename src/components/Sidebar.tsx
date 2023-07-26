import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  "& .MuiDrawer-paper": {
    width: "190px",
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
  },
  "& .MuiBackdrop-root": {
    backgroundColor: "transparent",
  },
}));

const SidebarList = styled(List)({
  paddingTop: "64px",
});

const SidebarItem = styled(ListItem)(({ theme }) => ({
  "&.Mui-selected": {
    backgroundColor: theme.palette.common.black,
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
  },
  cursor: "pointer",
  "&:hover": {
    "& .MuiListItemText-primary": {
      backgroundColor: theme.palette.primary.dark,
      color: theme.palette.common.white,
    },
    "& .MuiListItemIcon-root": {
      backgroundColor: theme.palette.primary.dark,

      color: theme.palette.common.white, // Change the icon color on hover
    },
  },
}));

const Sidebar: React.FC<SidebarProps> = ({ open, onClose }) => {
  const navigate = useNavigate();

  const handleDashboardClick = () => {
    navigate("/admin");
  };

  const handleUserClick = () => {
    navigate('/user')
  };

  const handleIngredientsClickButton = () => {
    navigate('/ingredients');
  };

  return (
    <>
      <StyledDrawer anchor="left" open={open} onClose={onClose}>
        <SidebarList>
          <SidebarItem>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" onClick={handleDashboardClick} />
          </SidebarItem>
          <SidebarItem onClick={handleUserClick}>
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Users" onClick={handleUserClick} />
          </SidebarItem>

          <SidebarItem onClick={handleIngredientsClickButton}>
            <ListItemIcon>
              <FastfoodIcon />
            </ListItemIcon>
            <ListItemText
              primary="Ingredients"
              onClick={handleIngredientsClickButton}
            />
          </SidebarItem>
          <SidebarItem onClick={handleIngredientsClickButton}>
            <ListItemIcon>
              <FastfoodIcon />
            </ListItemIcon>
            <ListItemText
              primary="Logout"
              onClick={handleIngredientsClickButton}
            />
          </SidebarItem>
        </SidebarList>
      </StyledDrawer>
    </>
  );
};

export default Sidebar;
