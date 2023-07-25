import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { styled } from "@mui/material/styles";

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
  justifyContent: "center",
});
const StyledButton = styled(Button)({
  margin: "20px",
});
const IngredientsList: React.FC = () => {
  const [ingredients, setIngredients] = useState<any[]>([]);
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
    { field: "id", headerName: "ID", width: 100 },
    { field: "name", headerName: "Name", width: 200, sortable: true },
    { field: "quantity", headerName: "Quantity", width: 150, sortable: true },
    { field: "date", headerName: "Date", width: 150, sortable: true },
    { field: "unit", headerName: "Unit", width: 150, sortable: true },
    { field: "picture", headerName: "Picture", width: 150 },
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
  const handleRowClick = (params: any) => {
    const ingredientId = params.id;
    navigate(`/ingredients/${ingredientId}`);
  };

  return (
    <div style={{ height: 300, width: "100%" }}>
      <DataGrid
        columns={columns}
        rows={ingredients}
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
      <AddBox>
        <StyledButton
          variant="contained"
          startIcon={<DeleteIcon />}
          onClick={handleDeleteClick}
        >
          Bulk Delete
        </StyledButton>
        <StyledButton
          variant="contained"
          startIcon={<DeleteIcon />}
          onClick={handleCreateClick}
        >
          Create Item
        </StyledButton>
      </AddBox>
    </div>
  );
};

export default IngredientsList;
