// const IngredientsEditForm:React.FC=()=>{
//     return(
//         <h1>Edit form</h1>
//     )
// }
// export default IngredientsEditForm;

import React, { useEffect, useCallback } from "react";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
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
import AsyncCreatableSelect from "react-select/async-creatable";
import SaveIcon from "@mui/icons-material/Save";
import AddIcon from "@mui/icons-material/Add";
import { useDropzone } from "react-dropzone";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";

import { userOptions } from "./data";
import Add from "@mui/icons-material/Add";

interface Ingredient {
  id: number;
  userId: string;
  name: string;
  quantity: number;
  date: string;
  unit: string;
  picture: File | null;
}

interface FormValues {
  userId: string;
  name: string;
  quantity: number;
  date: string;
  unit: string;
  picture: File | null;
}

interface IngredientsEditFormProps {
  ingredient: Ingredient;
  onSave: (data: FormValues) => void;
}

const AddBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
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

const FormContainer = styled("div")({
  marginTop: "100px",
  marginLeft: "30px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "20px",
  "& .MuiTextField-root, & .MuiFormControl-root": {
    width: "50%",
  },
});
const StyledAsyncCreatableSelect = styled(AsyncCreatableSelect)({
  width: "50%",
  // Add other styles here to match the TextField
  // For example: fontFamily, fontSize, padding, etc.
});

const IngredientsEditForm: React.FC<IngredientsEditFormProps> = ({
  ingredient,
  onSave,
}) => {
  const {
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormValues>();

  useEffect(() => {
    // Pre-populate the form fields with the existing ingredient values
    reset({
      userId: ingredient.userId,
      name: ingredient.name,
      quantity: ingredient.quantity,
      date: ingredient.date,
      unit: ingredient.unit,
      picture: ingredient.picture,
    });
  }, [ingredient]);

  const onSubmit = (data: FormValues) => {
    onSave(data);
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
  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles && acceptedFiles.length > 0) {
        const selectedFile = acceptedFiles[0];
        console.log("Selected picture:", selectedFile);
        setValue("picture", selectedFile);
      }
    },
    [setValue]
  );
  // Hook from react-dropzone to handle file drop and selection
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleDrop,
  });

  return (
    <div>
      <FormContainer>
        <Controller
          name="userId"
          control={control}
          defaultValue=""
          rules={{ required: "User ID is required" }}
          render={({ field }) => (
            <StyledAsyncCreatableSelect
              cacheOptions
              defaultOptions
              loadOptions={loadOptions}
              {...field}
              placeholder="UserID"
            />
          )}
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
          name="unit"
          control={control}
          defaultValue=""
          rules={{ required: "Unit is required" }}
          render={({ field }) => (
            <FormControl error={!!errors.unit}>
              <InputLabel>Unit</InputLabel>
              <Select {...field}>
                <MenuItem value="kg">kg</MenuItem>
                <MenuItem value="gm">g</MenuItem>
                <MenuItem value="L">L</MenuItem>
                <MenuItem value="ml">ml</MenuItem>
              </Select>
              <FormHelperText>{errors.unit?.message}</FormHelperText>
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

        <Controller
          name="picture"
          control={control}
          defaultValue={null}
          rules={{ required: "Picture is required" }}
          render={() => (
            <section>
              <div {...getRootProps()}>
                <input {...getInputProps()} />

                <StyledButton startIcon={<AddAPhotoIcon />}>
                  Upload or Drag Pictures
                </StyledButton>
              </div>
            </section>
          )}
        />
      </FormContainer>

      <AddBox mt={2}>
        <StyledButton color="primary" onClick={handleSubmit(onSubmit)}>
          <SaveIcon />
          Save
        </StyledButton>
        <StyledButton
          color="primary"
          onClick={handleAddMoreButtonClick}
          startIcon={<AddIcon />}
        >
          Add More
        </StyledButton>
      </AddBox>
    </div>
  );
};

export default IngredientsEditForm;
