import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";

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
  ];

  const handleDeleteClick = () => {
    setUsers([]);
  };
  const handleRowClick = (params: any) => {
    const userId = params.id;
    navigate(`/user/${userId}`);
  };

  return (
    <div style={{ height: 300, width: "100%" }}>
      <DataGrid
        columns={columns}
        rows={users}
        checkboxSelection
        pagination
        sortModel={[
          {
            field: "name",
            sort: "asc",
          },
        ]}
        onRowClick={handleRowClick}
      />
      {/* <Button variant="contained" color="secondary" startIcon={<DeleteIcon />} onClick={handleDeleteClick}>
        Bulk Delete
      </Button> */}
    </div>
  );
};

export default UserList;
