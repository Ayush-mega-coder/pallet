import React, { useState } from "react";
import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import LogoutIcon from "@mui/icons-material/Logout";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

const SidebarContainer = styled("div")({
  width: "210px",
  backgroundColor: 'white',
  position: "fixed",
  top: 0,
  left: 0,
  bottom: 0,
  color: 'black',
  boxShadow: "4px 0 10px rgba(0, 0, 0, 0.1)", 
  overflow: "hidden",
});

const SidebarList = styled(List)({
  paddingTop: "64px",
});

const SidebarItem = styled(ListItem)(({ theme }) => ({
  margin: "5px",
  "&.Mui-selected": {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.common.white,
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
      color: theme.palette.common.white,
    },
  },
  cursor: "pointer",
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.common.white,
  },
}));

interface SidebarProps {
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onClose }) => {
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState("");

  const handleDashboardClick = () => {
    navigate("/admin");
    setSelectedItem("dashboard");
  };

  const handleUserClick = () => {
    navigate("/user");
    setSelectedItem("users");
  };

  const handleIngredientsClickButton = () => {
    navigate("/ingredients");
    setSelectedItem("ingredients");
  };

  return (
    <SidebarContainer onClick={onClose}>
      <SidebarList>
        <SidebarItem selected={selectedItem === "dashboard"} onClick={handleDashboardClick}>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </SidebarItem>
        <SidebarItem selected={selectedItem === "users"} onClick={handleUserClick}>
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Users" />
        </SidebarItem>
        <SidebarItem selected={selectedItem === "ingredients"} onClick={handleIngredientsClickButton}>
          <ListItemIcon>
            <FastfoodIcon />
          </ListItemIcon>
          <ListItemText primary="Ingredients" />
        </SidebarItem>
        <SidebarItem selected={selectedItem === "logout"}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </SidebarItem>
      </SidebarList>
    </SidebarContainer>
  );
};

export default Sidebar;
