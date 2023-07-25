import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Box, Button, TextField, Typography, Grid, CircularProgress } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";
import { styled } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: red[500],
    },
  },
});

const LoginContainer = styled(Box)({
  width: "400px",
  margin: "auto",
  marginTop: "90px",
  padding: "20px",
  borderRadius: "8px",
  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
});
const LoginText = styled(Typography)({

  margin:'13px'
})



interface LoginProps {
  showPopup: boolean;
  onLoginSuccess: () => void;
}

const Login: React.FC<LoginProps> = ({ showPopup, onLoginSuccess }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);

  const handleFormSubmit = async (data: any) => {
    // Perform authentication logic here

    setLoading(true);
    
    setTimeout(() => {
      setLoading(false);
      if (data.username === "demo" && data.password === "1234") {
        onLoginSuccess();
      } else {
        alert("Invalid credentials");
      }
    }, 1000);
  };

  return (
    <>
    <ThemeProvider theme={theme}>
      <LoginContainer>
        <LoginText variant="h3" align="center">
          Login
        </LoginText>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="text"
                label="Username"
                {...register("username", { required: "Username is required" })}
                error={Boolean(errors.username)}
                helperText={
                  errors.username ? (errors.username.message as React.ReactNode) : ""
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="password"
                label="Password"
                {...register("password", { required: "Password is required" })}
                error={Boolean(errors.password)}
                helperText={
                  errors.password ? (errors.password.message as React.ReactNode) : ""
                }
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                type="submit"
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : "Login"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </LoginContainer>
    </ThemeProvider>
    </>
  );
};

export default Login;
