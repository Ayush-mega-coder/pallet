import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import styled from "@mui/material/styles/styled";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import onion from "../../assets/ingredients/onion.png";
import garlic from "../../assets/ingredients/garlic.png";
import tomato from "../../assets/ingredients/tomato.png";

const dummyIngredients = [
  // Your dummy ingredient data here...
  {
    id: 1,
    name: "Garlic",
    quantity: 100,
    date: "2023-07-24",
    unit: "kg",
    picture: garlic,
  },
  {
    id: 2,
    name: "Onion",
    quantity: 200,
    date: "2023-07-25",
    unit: "kg",
    picture: onion,
  },
  {
    id: 3,
    name: "Tomato",
    quantity: 20,
    date: "2023-07-25",
    unit: "gm",
    picture: tomato,
  },

];

const Container = styled(Box)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: "20px",
  border: "1px solid #ccc",
  borderRadius: "5px",
  boxShadow: "0 2px 5px rgba(1, 1, 1, 0.1)",
  maxWidth: "400px",
  margin: "0 auto",
  backgroundColor: "#fff",
});

const Title = styled(Typography)({
  color: "#333",
  marginBottom: "10px",
});

const Quantity = styled(Typography)({
  color: "#555",
});

const Date = styled(Typography)({
  color: "#555",
});

const Unit = styled(Typography)({
  color: "#555",
});

const Image = styled("img")({
  maxWidth: "100%",
  height: "300px",
  marginTop: "10px",
});

const CloseButton = styled(Link)({
  cursor: "pointer",
  fontSize: "20px",
  marginLeft: "auto",
});
const AddBox = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});
const StyledButton = styled(Button)({
  margin: "10px",
});

const IngredientShowPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const handleAddButton = () => {
    navigate("/ingredients/create");
  };
  const handleEditButton = () => {
    navigate("/ingredients/editForm");
  };

  const ingredient = dummyIngredients.find((item) => item.id.toString() === id);

  if (!ingredient) {
    return <div>Ingredient not found</div>;
  }

  return (
    <>
      <Container>
        <Title variant="h2">{ingredient.name}</Title>
        <Quantity>
          Quantity: {ingredient.quantity} {ingredient.unit}
        </Quantity>
        <Date>Date: {ingredient.date}</Date>

        <Image src={ingredient.picture} alt={ingredient.name} />


        {/* <CloseButton to="/ingredients">&times;</CloseButton> */}
      </Container>
      <AddBox>
        <StyledButton variant="contained" onClick={handleAddButton}>
          Add Item
        </StyledButton>
        <StyledButton variant="contained" onClick={handleEditButton}>
          Edit Item
        </StyledButton>
      </AddBox>
    </>
  );
};

export default IngredientShowPage;






// import React, { useCallback } from "react";
// import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
// import {
//   Button,
//   Box,
//   TextField,
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel,
//   FormHelperText,
// } from "@mui/material";
// import { styled } from "@mui/material/styles";
// import { useForm, Controller } from "react-hook-form";
// import AsyncCreatableSelect from "react-select/async-creatable";
// import { userOptions } from "./data";
// import { useDropzone } from "react-dropzone";

// interface FormValues {
//   userId: string;
//   name: string;
//   quantity: number;
//   date: string;
//   unit: string;
//   picture: File | null; // We will store the picture file here
// }

// const AddBox = styled(Box)({
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
// });

// const StyledButton = styled(Button)({
//   margin: "10px",
// });

// const FormContainer = styled("div")({
//   margin: "20px",
//   display: "flex",
//   flexDirection: "column",
//   alignItems: "center",
//   justifyContent: "center",
//   gap: "20px",
//   "& .MuiTextField-root, & .MuiFormControl-root": {
//     width: "70%",
//   },
// });

// const IngredientsCreateForm: React.FC = () => {
//   const {
//     handleSubmit,
//     control,
//     reset,
//     formState: { errors },
//     setValue, // We will use setValue to set the picture file in the form
//   } = useForm<FormValues>();

//   const onSubmit = (data: FormValues) => {
//     console.log("Form values:", data);
//     reset({
//       ...data,
//       name: "",
//       quantity: 0,
//       date: new Date().toISOString().slice(0, 10),
//       unit: "",
//       picture: null,
//     });
//   };

//   const handleAddMoreButtonClick = () => {
//     console.log("val");
//   };

//   const filterColors = (inputValue: string) => {
//     return userOptions.filter((i) =>
//       i.label.toLowerCase().includes(inputValue.toLowerCase())
//     );
//   };

//   const loadOptions = (inputValue: string, callback: (options: any) => void) => {
//     setTimeout(() => {
//       callback(filterColors(inputValue));
//     }, 1000);
//   };

//   const handleDrop = useCallback(
//     (acceptedFiles: File[]) => {
//       if (acceptedFiles && acceptedFiles.length > 0) {
//         const selectedFile = acceptedFiles[0];
//         console.log("Selected picture:", selectedFile);
//         setValue("picture", selectedFile); // Set the picture file in the form
//       }
//     },
//     [setValue]
//   );


//   // Hook from react-dropzone to handle file drop and selection
//   const { getRootProps, getInputProps } = useDropzone({
//     onDrop: handleDrop,
//     // Specify the accepted file types (in this case, images)
//   });

//   return (
//     <div>
//       <FormContainer>
//         {/* Rest of the form fields (userId, name, quantity, date, unit) */}
//         {/* ... */}
//         <Controller
//           name="picture"
//           control={control}
//           defaultValue={null}
//           rules={{ required: "Picture is required" }}
//           render={() => (
//             <section>
//               <div {...getRootProps()}>
//                 <input {...getInputProps()} />
//                 <StyledButton variant="contained">
//                   Upload or Drag Pictures
//                 </StyledButton>
//               </div>
//             </section>
//           )}
//         />
//       </FormContainer>

//       <AddBox mt={2}>
//         <StyledButton
//           variant="contained"
//           color="primary"
//           onClick={handleSubmit(onSubmit)}
//         >
//           Add Item
//         </StyledButton>
//         <StyledButton
//           variant="contained"
//           color="primary"
//           onClick={handleAddMoreButtonClick}
//         >
//           Add More
//         </StyledButton>
//       </AddBox>
//     </div>
//   );
// };

// export default IngredientsCreateForm;
