import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { styled } from "@mui/material/styles";

import AddIcon from "@mui/icons-material/Add";

import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Box,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
} from "@mui/material";
const AddBox = styled(Box)({
  display: "flex",
  justifyContent: "flex-end",
  marginTop: "50px",
  marginRight: "50px",
});
const StyledButton = styled(Button)({
  margin: "10px",
  backgroundColor: "white",
  color: "black",
  "&:hover": {
    backgroundColor: "white",
    color: "black",
  },
});
const StyledButtonCreate = styled(Button)({
  marginTop: "5px",

  backgroundColor: "white",
  color: "black",

  "&:hover": {
    backgroundColor: "white",
    color: "black",
  },
});
const IngredientsList: React.FC = () => {
  const [ingredients, setIngredients] = useState<any[]>([]);

  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the list of ingredients here and update the state
    // For example:
    // const fetchIngredients = async () => {
    //   const response = await fetch("https://api.example.com/ingredients");
    //   const data = await response.json();
    //   setIngredients(data);
    // };
    // fetchIngredients();

    // Dummy data for testing
    const dummyIngredients = [
      {
        id: 1,
        name: "Garlic",
        quantity: 100,
        date: "2023-07-24",
        unit: "kg",
        picture: "url_to_picture_1",
      },
      {
        id: 2,
        name: "Onion",
        quantity: 200,
        date: "2023-07-25",
        unit: "kg",
        picture: "url_to_picture_2",
      },
      {
        id: 3,
        name: "Tomato",
        quantity: 20,
        date: "2023-07-25",
        unit: "gm",
        picture: "url_to_picture_2",
      },
    ];
    setIngredients(dummyIngredients);
  }, []);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 80 },
    { field: "name", headerName: "Name", width: 150, sortable: true, renderHeader: (params) => {
      return (
        <div style={{ cursor: "pointer" }}>
          {params.colDef.headerName}
        </div>
      );
    }, },
    { field: "quantity", headerName: "Quantity", width: 100, sortable: true },
    { field: "date", headerName: "Date", width: 140, sortable: true },
    { field: "unit", headerName: "Unit", width: 100, sortable: true },
    { field: "picture", headerName: "Picture", width: 150 },
    {
      field: "edit",
      headerName: "Edit",
      width: 100,
      sortable: false,
      renderCell: (params) => (
        <StyledButtonCreate
          variant="outlined"

          // onClick={() => handleEditClick(params.id)}
        >
          Edit
        </StyledButtonCreate>
      ),
    },
    {
      field: "delete",
      headerName: "Delete",
      width: 100,
      sortable: false,
      renderCell: (params) => (
        <StyledButtonCreate
        variant="outlined"

          // onClick={() => handleEditClick(params.id)}
        >
          Delete
        </StyledButtonCreate>
      ),
    },
  ];

  const handleDeleteClick = () => {
    // const selectedRows = gridApiRef.current?.getSelectedRows();
    // if (selectedRows) {
    //   setIngredients((prevIngredients) =>
    //     prevIngredients.filter((ingredient) => !selectedRows.includes(ingredient))
    //   );
    // }

    setIngredients([]);
  };
  const handleCreateClick = () => {
    navigate("/ingredients/create");
  };
  const handleRowSelectionModelChange = (selection: any) => {
    setSelectedRows(selection.selectionModel as string[]);
  };
  const handleRowClick = (params: any) => {
    const ingredientId = params.id;

    navigate(`/ingredients/${ingredientId}`);
  };

  return (
    <>
      <AddBox>
        {selectedRows && selectedRows.length > 0 && (
          <StyledButton startIcon={<DeleteIcon />} onClick={handleDeleteClick}>
            Bulk Delete
          </StyledButton>
        )}
        <StyledButtonCreate startIcon={<AddIcon />} onClick={handleCreateClick}>
          Create
        </StyledButtonCreate>
      </AddBox>

      <div
        style={{
          marginLeft: "220px",
          marginTop: "5px",
          height: 300,
          width: "80%",
        }}
      >
        <DataGrid
          columns={columns}
          rows={ingredients}
          checkboxSelection
          pagination
          onRowClick={handleRowClick}
          onRowSelectionModelChange={handleRowSelectionModelChange}
        />
      </div>
    </>
  );
};

export default IngredientsList;
