import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import styled from "@emotion/styled";

const TypographyUser = styled(Typography)({
  margin:'10px',
  fontWeight: "bold",
})

const UserList: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const navigate = useNavigate();
  

  useEffect(() => {
    // Fetch the list of users here and update the state
    // For example:
    // const fetchUsers = async () => {
    //   const response = await fetch("https://pallete.example.com/users");
    //   const data = await response.json();
    //   setUsers(data);
    // };
    // fetchUsers();

    const dummyUsers = [
      { id: 1, name: "John Doe", email: "john@example.com", age: 30 },
      { id: 2, name: "Jane Smith", email: "jane@example.com", age: 25 },
      { id: 3, name: "Bob Johnson", email: "bob@example.com", age: 40 },
    ];
    setUsers(dummyUsers);
  }, []);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "name", headerName: "Name", width: 200, sortable: true },
    { field: "email", headerName: "Email", width: 200, sortable: true },
    { field: "age", headerName: "Age", width: 200, sortable: true },
  ];

  const handleDeleteClick = () => {
    setUsers([]);
  };
  const handleRowClick = (params: any) => {
    const userId = params.id;
    navigate(`/user/${userId}`);
  };

  return (
    <div style={{ marginLeft:'250px', marginTop:'70px' }}>
      <TypographyUser>
        Users
      </TypographyUser>
    <div style={{ height: 300, width: "95%",boxShadow: '0px 2px 4px rgba(4, 4, 1, 0.4)',borderRadius: "8px", }}>
      <DataGrid
        columns={columns}
        rows={users}
        pagination
        onRowClick={handleRowClick}
      />
      </div>
    </div>
  );
};

export default UserList;
