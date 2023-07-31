import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { styled } from "@mui/material/styles";

import AddIcon from "@mui/icons-material/Add";
import axios from "axios";

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
  IconButton,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
const AddBox = styled(Box)({
  display: "flex",
  justifyContent: "flex-end",
  marginTop: "38px",
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

  color: "black",

  "&:hover": {
    // backgroundColor: "white",
    color: "black",
  },
});
const IngredientsList: React.FC = () => {
  const [ingredients, setIngredients] = useState<any[]>([]);

  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const navigate = useNavigate();
  const [isBulkDeleteVisible, setBulkDeleteVisible] = useState(false);
  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const token = document.cookie.replace(
          /(?:(?:^|.*;\s*)authToken\s*=\s*([^;]*).*$)|^.*$/,
          "$1"
        );

        const response = await axios.get(
          "http://localhost:5000/api/ingredients",
          {
            headers: {
              Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY0YmZkZDg0Y2E0YzM1NTFjOTU2ZTEzZSIsIm5hbWUiOiJzaGEiLCJlbWFpbCI6InNoYW1pbGtvdHRhOTlAZ21haWwuY29tIiwiYWN0aXZlIjp0cnVlLCJwYXNzd29yZCI6IiQyYiQxMiRXTmtLdll3eGxKdkNHRC5lSi5WNFBlY0FqeWR4SVphZmV1VWtNLjlURmNud3RCcXZrckRSNiIsInJvbGUiOiJVU0VSIiwiY3JlYXRlZEF0IjoiMjAyMy0wNy0yNVQxNDozNDo0NC4yMjFaIiwidXBkYXRlZEF0IjoiMjAyMy0wNy0yNVQxNDozNDo0NC4yMjFaIiwiX192IjowfSwiaWF0IjoxNjkwMjk2MzU3fQ.xZn1KSQ6prK6v39xs5iVFgDUAKC1ipHmCmZ6b7K-b6o`,
              "ngrok-skip-browser-warning": true,
            },
          }
        );

        const data = response.data.data.ingredients;
        setIngredients(data);
        // console.log(data);
        // console.log(ingredients)
      } catch (error) {
        console.error("Error fetching ingredients:", error);
      }
    };

    fetchIngredients();
  }, []);
  useEffect(() => {
    // Log ingredients whenever it changes
    console.log("data is", ingredients);
    // console.log(ingredients[0])
  }, [ingredients]);

  const columns: GridColDef[] = [
    { field: "_id", headerName: "ID", width: 80 },
    {
      field: "name",
      headerName: "Name",
      width: 150,
      sortable: true,
      renderHeader: (params) => {
        return (
          <div style={{ cursor: "pointer" }}>{params.colDef.headerName}</div>
        );
      },
    },
    { field: "quantity", headerName: "Quantity", width: 100, sortable: true },
    { field: "expiry", headerName: "Date", width: 140, sortable: true },
    { field: "type", headerName: "Unit", width: 100, sortable: true },
    { field: "image", headerName: "Picture", width: 150 },
    {
      field: "delete",
      headerName: "Actions",
      width: 100,
      sortable: false,
      renderCell: (params) => (
        <Box display="flex" alignItems="center" gap={2}>
          <IconButton onClick={() => handleEditClick()} >
            <Edit />
          </IconButton>
          <IconButton onClick={() => handleDeleteOneClick(params.id as string)}>
            <Delete />
          </IconButton>
        </Box>
      ),
    },
  ];

  const handleDeleteClick = () => {
    // Remove the selected rows from the state
    setIngredients((prevIngredients) =>
      prevIngredients.filter(
        (ingredient) => !selectedRows.includes(ingredient.id)
      )
    );

    // Clear the selection
    setSelectedRows([]);
    setBulkDeleteVisible(false);
  };
  const handleCreateClick = () => {
    navigate("/ingredients/create");
  };
  const handleDeleteOneClick = (ingredientId: string) => {
    // Implement the delete logic here for a single ingredient with the provided 'ingredientId'
    // For example, you can make an API call to delete the ingredient from the backend.
    // The following is a hypothetical example:
    axios.delete(`http://localhost:5000/api/ingredients/${ingredientId}`,{
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY0YzFlYjMyNTg0Mjk4YjUxNjI1YWNkZiIsIm5hbWUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AcGFsbGF0ZS5jb20iLCJhY3RpdmUiOnRydWUsInBhc3N3b3JkIjoiJDJiJDEyJE9sbHBmSmR3akNHV2F3cnNJeHgwSnVqVUxOZ2NsTXpSejUwVjZwN2V3elFJMERiRTR2LjdtIiwicm9sZSI6IkFETUlOIiwiY3JlYXRlZEF0IjoiMjAyMy0wNy0yMFQxMjoyMjozOC42NThaIiwidXBkYXRlZEF0IjoiMjAyMy0wNy0yMVQwOToyNToyNS4yOTdaIiwiX192IjowfSwiaWF0IjoxNjkwODA2OTk0fQ.7vspbw1A1N019ewYYojPHS8AyMlHzlxk134f_c5GlUI`,
        "ngrok-skip-browser-warning": true,
      },
    }
    
    ).then((response) => {
      // Handle the successful deletion in the UI
      setIngredients((prevIngredients) =>
        prevIngredients.filter((ingredient) => ingredient._id !== ingredientId)
      );
    }).catch((error) => {
      console.error("Error while deleting ingredient:", error);
    });
  };
  const handleEditClick = () => {
    navigate("/ingredients/edit");
  };
  const handleRowSelectionModelChange = (selection: any) => {
    setBulkDeleteVisible(true);
  };
  const handleRowClick = (params: any) => {
    const ingredientId = params.id;

    navigate(`/ingredients/${ingredientId}/show`);
  };

  return (
    <>
      <AddBox>
        {isBulkDeleteVisible && (
          <IconButton onClick={handleDeleteClick}>
            <Delete />
          </IconButton>
        )}
        <StyledButtonCreate startIcon={<AddIcon />} onClick={handleCreateClick}>
          Create
        </StyledButtonCreate>
      </AddBox>

      <div
        style={{
          marginLeft: "230px",
          marginTop: "0px",
          height: "80%",
          width: "80%",
          boxShadow: "0px 2px 4px rgba(4, 4, 1, 0.4)",
          // padding: "5px",
          borderRadius: "8px",
        }}
      >
        <DataGrid
          columns={columns}
          rows={ingredients}
          checkboxSelection
          pagination
          onRowClick={handleRowClick}
          onRowSelectionModelChange={handleRowSelectionModelChange}
          getRowId={(row) => row._id}
        />
      </div>
    </>
  );
};

export default IngredientsList;
