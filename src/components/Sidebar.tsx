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
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import PreviewIcon from '@mui/icons-material/Preview';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { useNavigate } from "react-router-dom";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

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

const Sidebar: React.FC<SidebarProps> = ({ open, onClose }) => {
  const navigate = useNavigate();

  const [showIngredientsList, setShowIngredientsList] = useState(false);
  const [showUsers, setShowUsers] = useState(false);

  const handleIngredientsClick = () => {
    setShowIngredientsList(!showIngredientsList);
  };
  const handleUsersClick = () => {
    setShowUsers(!showUsers);
  };
  const handleCreateForm = () => {
    navigate("/ingredients/create");
  };
  const handleFormList = () => {
    navigate("/ingredients/list");
  };
  const handleFormShow = () => {
    navigate("/ingredients/list");
  };
  const handleFormEdit = () => {
    navigate("/ingredients/editForm");
  };
  const handleUserList = () => {
    navigate("/user/userList");
  };
  const handleShowUser = () => {
    navigate("/user/userList");
  };
  const handleDashboardClick =()=>{
    navigate('/admin')
  }
  const handleUserClick = ()=>{
    // navigate('/user')
  }

  return (
    <>
    <StyledDrawer anchor="left" open={open} onClose={onClose}>
      <SidebarList>
        <SidebarItem>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" onClick={handleDashboardClick}/>
        </SidebarItem>
        <SidebarItem onClick={handleUsersClick}>
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Users" onClick={handleUserClick}/>
        </SidebarItem>
        {showUsers && (
          <>
            <SidebarItem>
              <ListItemIcon>
              <FormatListBulletedIcon />
              </ListItemIcon>

              <ListItemText primary="List User" onClick={handleUserList} />
            </SidebarItem>
            <SidebarItem>
              <ListItemIcon>
              <PreviewIcon />
              </ListItemIcon>

              <ListItemText primary="Show" onClick={handleShowUser} />
            </SidebarItem>
          </>
        )}
        <SidebarItem onClick={handleIngredientsClick}>
          <ListItemIcon>
            <FastfoodIcon />
          </ListItemIcon>
          <ListItemText primary="Ingredients" />
        </SidebarItem>

        {showIngredientsList && (
          <>
            <SidebarItem>
              <ListItemIcon>
                <FormatListBulletedIcon />
              </ListItemIcon>

              <ListItemText primary="List" onClick={handleFormList} />
            </SidebarItem>
            <SidebarItem>
              <ListItemIcon>

                <CreateNewFolderIcon/>
              </ListItemIcon>

              <ListItemText primary="Create Form" onClick={handleCreateForm} />
            </SidebarItem>
            <SidebarItem>
              <ListItemIcon>
                <PreviewIcon />
              </ListItemIcon>
              <ListItemText primary="Show" onClick={handleFormShow} />
            </SidebarItem>
            <SidebarItem>
              <ListItemIcon>
                <EditNoteIcon/>
              </ListItemIcon>
              <ListItemText primary="Edit Form" onClick={handleFormEdit} />
            </SidebarItem>
          </>
        )}
      </SidebarList>
    </StyledDrawer>
    </>
  );
};

export default Sidebar;
