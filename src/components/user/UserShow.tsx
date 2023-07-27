import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "@mui/material/styles/styled";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AddIcon from '@mui/icons-material/Add';


const dummyUsers = [
  {
    id: "1",
    name: "John Doe",
    age: 30,
    email: "john.doe@example.com",
  },
  {
    id: "2",
    name: "Jane Smith",
    age: 25,
    email: "jane.smith@example.com",
  },
  {
    id: "3",
    name: "Michael Johnson",
    age: 28,
    email: "michael.johnson@example.com",
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

  marginTop:'100px',
  marginLeft:'390px',
  height: "200px",
  backgroundColor: "#fff",
});

const Title = styled(Typography)({
  color: "#333",
  marginBottom: "10px",
});

const Age = styled(Typography)({
  color: "#555",
});

const Email = styled(Typography)({
  color: "#555",
});

const Image = styled("img")({
  maxWidth: "100%",
  height: "300px",
  marginTop: "10px",
});

const AddBox = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const StyledButton = styled(Button)({
  margin: "10px",
  backgroundColor:'white',
  color:'black',
 
  "&:hover": {
    backgroundColor: 'white', 
    color: 'black',
  },
});

const UserShowPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const handleEditButton = () => {
    navigate(`/ingredients/create`);
  };

  const user = dummyUsers.find((item) => item.id === id);

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <>
      <Container>
        <Title variant="h3">{user.name}</Title>
        <Age>Age: {user.age}</Age>
        <Email>Email: {user.email}</Email>

        {/* <Image src={user.picture} alt={user.name} /> */}

        {/* <CloseButton to="/users">&times;</CloseButton> */}
      </Container>
      <AddBox>
        <StyledButton  onClick={handleEditButton} startIcon={<AddIcon/>}>

          Add Item
        </StyledButton>
      </AddBox>
    </>
  );
};

export default UserShowPage;
