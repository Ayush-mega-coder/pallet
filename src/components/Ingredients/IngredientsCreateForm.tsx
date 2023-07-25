import React, { useCallback } from "react";
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
import { userOptions } from "./data";
import { useDropzone } from "react-dropzone";

interface FormValues {
  userId: string;
  name: string;
  quantity: number;
  date: string;
  unit: string;
  picture: File | null;
}

const AddBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const StyledButton = styled(Button)({
  margin: "10px",
});

const FormContainer = styled("div")({
  margin: "20px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "20px",
  "& .MuiTextField-root, & .MuiFormControl-root": {
    width: "70%",
  },
});

const IngredientsCreateForm: React.FC = () => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
    setValue,
  } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    console.log("Form values:", data);
    reset({
      ...data,
      name: "",
      quantity: 0,
      date: new Date().toISOString().slice(0, 10),
      unit: "",
      picture: null,
    });
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
            <AsyncCreatableSelect
              cacheOptions
              defaultOptions
              loadOptions={loadOptions}
              {...field}
              placeholder="Select User ID"
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
                <MenuItem value="KG">kg</MenuItem>
                <MenuItem value="GM">g</MenuItem>
                <MenuItem value="L">L</MenuItem>
                <MenuItem value="ML">ml</MenuItem>
                <MenuItem value="COUNT">Count</MenuItem>

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

                <StyledButton variant="contained">
                  Upload or Drag Pictures
                </StyledButton>
              </div>
            </section>
          )}
        />
      </FormContainer>

      <AddBox mt={2}>
        <StyledButton
          variant="contained"
          color="primary"
          onClick={handleSubmit(onSubmit)}
        >
          Add Item
        </StyledButton>
        <StyledButton
          variant="contained"
          color="primary"
          onClick={handleAddMoreButtonClick}
        >
          Add More
        </StyledButton>
      </AddBox>
    </div>
  );
};

export default IngredientsCreateForm;
