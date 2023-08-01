
import React, { useEffect, useState,useCallback } from "react";
import { useParams } from "react-router-dom";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { useLocation } from "react-router-dom";
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
import { styled } from "@mui/material/styles";
import { useForm, Controller } from "react-hook-form";
import axios from 'axios'

import AsyncSelect from "react-select/async";

import SaveIcon from "@mui/icons-material/Save";
import AddIcon from "@mui/icons-material/Add";
import { useDropzone } from "react-dropzone";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { makeStyles } from "@mui/styles";

import { userOptions } from "./data";
import Add from "@mui/icons-material/Add";

const useStyles = makeStyles((theme) => ({
  container: {
    // margin: "20px",
    marginTop: "60px",
    marginLeft: "100px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "20px",
    "& .MuiTextField-root, & .MuiFormControl-root": {
      width: "50%",
    },
  },

  formControl: {
    width: "50%",
  },
  box: {
    margin: "10px",
    display: "flex",
  },
  button: {
    margin: "5px",
    border: "2px solid blue",
    color: "black",
    "&:hover": {
      backgroundColor: "white",
      color: "black",
    },
  },
  button1: {
    // Move the button to the right-bottom

    color: "black",
    backgroundColor: "white",
    "&:hover": {
      backgroundColor: "white",
      color: "black",
    },
  },
  button2: {
    backgroundColor: "#002D62",

    color: "white",
    "&:hover": {
      // backgroundColor: "white",
      color: "black",
    },
  },
  boxItem: {
    // marginTop: "-40px",
    display: "flex",
    justifyContent: "space-between",

    // width: "550px",
    width: "50%",
  },

  users: {
    zIndex: 100,
  },
  inputLabel: {
    
  },
}));

interface Ingredient {
  id: number;
  userId: string;
  name: string;
  quantity: number;
  date: string;
  type: string;
  picture: File | null;
}

interface FormValues {
  userId: string;
  name: string;
  quantity: number;
  date: string;
  type: string;
  picture: File | null;
}

interface IngredientsEditFormProps {
  ingredient: Ingredient;
  onSave: (data: FormValues) => void;
}

const StyledAsyncSelect = styled(AsyncSelect)({
  width: "50%",
  // Add other styles here to match the TextField
  // For example: fontFamily, fontSize, padding, etc.
});

const IngredientsEditForm: React.FC<IngredientsEditFormProps> = ({
  
  onSave,
}) => {
 
const { ingredientId } = useParams<{ ingredientId: string }>();

  // Create a state to hold the fetched ingredient data
  const [ingredientData, setIngredientData] = useState<Ingredient | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const classes = useStyles();

  const {
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormValues>();

  useEffect(() => {
    const fetchIngredientData = async () => {
      try {
        // Fetch the ingredient data based on the ingredientId
        const response = await axios.get(
          `http://localhost:5000/api/ingredients/${ingredientId}`,
          {
            headers: {
              Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY0YzFlYjMyNTg0Mjk4YjUxNjI1YWNkZiIsIm5hbWUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AcGFsbGF0ZS5jb20iLCJhY3RpdmUiOnRydWUsInBhc3N3b3JkIjoiJDJiJDEyJE9sbHBmSmR3akNHV2F3cnNJeHgwSnVqVUxOZ2NsTXpSejUwVjZwN2V3elFJMERiRTR2LjdtIiwicm9sZSI6IkFETUlOIiwiY3JlYXRlZEF0IjoiMjAyMy0wNy0yMFQxMjoyMjozOC42NThaIiwidXBkYXRlZEF0IjoiMjAyMy0wNy0yMVQwOToyNToyNS4yOTdaIiwiX192IjowfSwiaWF0IjoxNjkwODA2OTk0fQ.7vspbw1A1N019ewYYojPHS8AyMlHzlxk134f_c5GlUI",
              "ngrok-skip-browser-warning": true,
            },
          }
        );

        const data = response.data.data.ingredient; 
        console.log(data)
        setIngredientData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching ingredient data:", error);
        setLoading(false);
      }
    };

    fetchIngredientData();
  }, [ingredientId]);
  useEffect(() => {

    if (ingredientData) {
      reset({
        // userId: ingredientData.userId,
        name: ingredientData.name,
        quantity: ingredientData.quantity,
        date: ingredientData.date,
        type: ingredientData.type,
        // picture: ingredientData.picture,
      });
    }
  }, [ingredientData]);

  const onSubmit = async (data: FormValues) => {
    try {

      const response = await axios.put(
        `https://8292-150-129-102-218.ngrok-free.app/api/ingredients/${ingredientId}`,
        data,
        {
          headers: {
            Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY0YzFlYjMyNTg0Mjk4YjUxNjI1YWNkZiIsIm5hbWUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AcGFsbGF0ZS5jb20iLCJhY3RpdmUiOnRydWUsInBhc3N3b3JkIjoiJDJiJDEyJE9sbHBmSmR3akNHV2F3cnNJeHgwSnVqVUxOZ2NsTXpSejUwVjZwN2V3elFJMERiRTR2LjdtIiwicm9sZSI6IkFETUlOIiwiY3JlYXRlZEF0IjoiMjAyMy0wNy0yMFQxMjoyMjozOC42NThaIiwidXBkYXRlZEF0IjoiMjAyMy0wNy0yMVQwOToyNToyNS4yOTdaIiwiX192IjowfSwiaWF0IjoxNjkwODA2OTk0fQ.7vspbw1A1N019ewYYojPHS8AyMlHzlxk134f_c5GlUI",
          },
        }
      );

      console.log("Updated ingredient:", response.data);

      // Call the onSave function to inform the parent component that the data is saved
      onSave(data);
      navigate('/ingredients');
    } catch (error) {
      console.error("Error updating ingredient:", error);
    }
  };

  const handleAddMoreButtonClick = () => {
    console.log("val");
  };

  const filterColors = (inputValue: string) => {
    return userOptions.filter((i) =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const loadOptions = (
    inputValue: string,
    callback: (options: any) => void
  ) => {
    setTimeout(() => {
      callback(filterColors(inputValue));
    }, 1000);
  };
  // const handleDrop = useCallback(
  //   (acceptedFiles: File[]) => {
  //     if (acceptedFiles && acceptedFiles.length > 0) {
  //       const selectedFile = acceptedFiles[0];
  //       console.log("Selected picture:", selectedFile);
  //       setValue("picture", selectedFile);
  //     }
  //   },
  //   [setValue]
  // );
  // // Hook from react-dropzone to handle file drop and selection
  // const { getRootProps, getInputProps } = useDropzone({
  //   onDrop: handleDrop,
  // });

  return (
    <div>
      <div className={classes.container}>
      
            <StyledAsyncSelect
              cacheOptions
              defaultOptions
              loadOptions={loadOptions}
          
              placeholder="UserID"
              className={classes.users}
            />
         

        <Controller
          name="name"
          control={control}
          defaultValue=""
          rules={{ required: "Name is required" }}
          render={({ field }) => (
            <TextField
              label="Name"
              {...field}
              error={!!errors.name}
              helperText={errors.name?.message}
            />
          )}
        />

        <Controller
          name="quantity"
          control={control}
          defaultValue={0}
          rules={{ required: "Quantity is required", min: 1 }}
          render={({ field }) => (
            <TextField
              label="Quantity"
              type="number"
              {...field}
              error={!!errors.quantity}
              helperText={errors.quantity?.message}
            />
          )}
        />

        <Controller
          name="type"
          control={control}
          defaultValue=""
          rules={{ required: "Unit is required" }}
          render={({ field }) => (
            <FormControl error={!!errors.type}>
              <InputLabel>Unit</InputLabel>
              <Select {...field}>
                <MenuItem value="kg">KG</MenuItem>
                <MenuItem value="gm">G</MenuItem>
                <MenuItem value="L">LT</MenuItem>
                <MenuItem value="ml">ML</MenuItem>
                <MenuItem value="count">COUNT</MenuItem>

              </Select>
              <FormHelperText>{errors.type?.message}</FormHelperText>
            </FormControl>
          )}
        />

        <Controller
          name="date"
          control={control}
          defaultValue={new Date().toISOString().slice(0, 10)}
          rules={{ required: "Date is required" }}
          render={({ field }) => (
            <TextField
              label="Date"
              type="date"
              {...field}
              error={!!errors.date}
              helperText={errors.date?.message}
            />
          )}
        />

        {/* <Controller
          name="picture"
          control={control}
          defaultValue={null}
          rules={{ required: "Picture is required" }}
          render={() => (
            <section>
              <div {...getRootProps()}>
                <input {...getInputProps()} />

                <Button
                  className={classes.button}
                  startIcon={<AddAPhotoIcon />}
                >
                  Upload or Drag Pictures
                </Button>
              </div>
            </section>
          )}
        /> */}
      

      <Box mt={2} className={classes.boxItem}>
        <Button
          color="primary"
          onClick={handleSubmit(onSubmit)}
          startIcon={<SaveIcon />}
          className={classes.button2}
          variant="contained"
        >
          Save
        </Button>
        <Button
          color="primary"
          onClick={handleAddMoreButtonClick}
          startIcon={<AddIcon />}
          className={classes.button1}
        >
          Add More
        </Button>
      </Box>
      </div>
    </div>
  );
};

export default IngredientsEditForm;
