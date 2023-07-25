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



const StyledDrawer = styled(Drawer)(({ theme }) => ({
  "& .MuiDrawer-paper": {
    width: "250px",
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
}));

const SidebarList = styled(List)({
  paddingTop: "64px",
});

const SidebarItem = styled(ListItem)(({ theme }) => ({
  "&.Mui-selected": {
    backgroundColor: theme.palette.primary.dark,
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
  },
  cursor: "pointer",
}));

const UserView: React.FC = () => {
  const navigate = useNavigate();


  const [showUsers, setShowUsers] = useState(false);


  const handleUserList = () => {
    navigate("/user/userList");
  };
  const handleShowUser = () => {
    navigate("/user/userList");
  };


  return (
    <>
    <StyledDrawer>
      <SidebarList>
      
            <SidebarItem>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>

              <ListItemText primary="List User" onClick={handleUserList} />
            </SidebarItem>
            <SidebarItem>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>

              <ListItemText primary="Show" onClick={handleShowUser} />
            </SidebarItem>
         
      </SidebarList>
    </StyledDrawer>
    </>
  );
};

export default UserView;
