import React, { useCallback, useState } from "react";
import { styled } from "@mui/material/styles";
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
import { useForm, Controller } from "react-hook-form";
import AsyncSelect from "react-select/async";
import AddIcon from "@mui/icons-material/Add";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import SaveIcon from "@mui/icons-material/Save";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import axios from "axios"; 
import { userOptions } from "./data";
import { useDropzone } from "react-dropzone";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    // margin: "20px",
    marginTop: "60px",
    marginLeft: "100px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    // backgroundColor:'red',
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
    // "&:hover": {
    //   backgroundColor: "white",
    //   color: "black",
    // },
  },
  button1: {
    // Move the button to the right-bottom

    color: "black",
    backgroundColor: "white",
    // "&:hover": {
    //   backgroundColor: "white",
    //   color: "black",
    // },
  },
  button2: {
    backgroundColor: "#002D62",
    color: "white",
    "&:hover": {
      backgroundColor: "#002D62",
      color: "white",
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
  alert:{
    marginLeft:'530px',
    backgroundColor:'#002D62',
  },
  inputLabel: {},
}));
const StyledAsyncSelect = styled(AsyncSelect)({
  width: "50%",
});
interface FormValues {
  userId: string;
  name: string;
  quantity: number;
  date: string;
  unit: string;
  picture: File | null;
}

const IngredientsCreateForm: React.FC = () => {
  const classes = useStyles();
  const [isDragging, setIsDragging] = useState(false);

  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
    setValue,
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    try {
      console.log("Form values:", data);

      // Send a POST request to your API endpoint
      await axios.post(
        "https://5c4e-150-129-102-218.ngrok-free.app/api/ingredients",
        data
      );

      // Show a success snackbar
      setIsSnackbarOpen(true);
      // Reset the form after successful submission
      reset({
        ...data,
        name: "",
        quantity: 0,
        date: new Date().toISOString().slice(0, 10),
        unit: "",
        picture: null,
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      // Handle error and show an error snackbar
      // You can add a state to show an error snackbar
      // setIsErrorSnackbarOpen(true);
    }
  };
  const handleDragEnter = useCallback(() => {
    setIsDragging(true);
  }, []);

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


        // Show the Snackbar with the "Picture uploaded" message
        setIsSnackbarOpen(true);
      }
    },
    [setValue]
  );
  const handleCloseSnackbar = () => {
    setIsSnackbarOpen(false);
  };

  // Hook from react-dropzone to handle file drop and selection
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleDrop,
    onDragEnter: handleDragEnter, // Add the drag enter event handler
    onDragLeave: () => setIsDragging(false),
  });

  return (
    <div>
      <div className={classes.container}>
        <Controller
          name="userId"
          control={control}
          defaultValue=""
          rules={{ required: "User ID is required" }}
          render={({ field }) => (
            <StyledAsyncSelect
              cacheOptions
              defaultOptions
              loadOptions={loadOptions}
              {...field}
              placeholder="UserID"
              className={classes.users}
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
            <FormControl error={!!errors.unit} className={classes.formControl}>
              <InputLabel className={classes.inputLabel}>Unit</InputLabel>
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
              {/* Apply the border style when a file is being dragged */}
              <div
                {...getRootProps()}
                style={{
                  border: isDragging
                    ? "2px dashed blue"
                    : "2px solid transparent",
                  padding: "10px",
                  borderRadius: "4px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <input {...getInputProps()} />
                <Button
                  startIcon={<AddAPhotoIcon />}
                  className={classes.button}
                >
                  Upload or Drag Pictures
                </Button>
              </div>
            </section>
          )}
        />
        {/* {isPictureUploaded && <p>Picture uploaded</p>} */}
        <Snackbar
        
          open={isSnackbarOpen}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
        >
          <MuiAlert
          className={classes.alert}
            onClose={handleCloseSnackbar}
            severity="success"
            elevation={6}
            variant="filled"
          >
            Picture uploaded
          </MuiAlert>
        </Snackbar>

        <Box className={classes.boxItem}>
          <Button
            className={classes.button2}
            onClick={handleSubmit(onSubmit)}
            startIcon={<SaveIcon />}
          >
            Save
          </Button>

          <Button
            className={classes.button1}
            onClick={handleSubmit(onSubmit)}
            startIcon={<AddIcon />}
          >
            Add Item
          </Button>
        </Box>
      </div>
    </div>
  );
};

export default IngredientsCreateForm;
