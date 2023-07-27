import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  TextField,
  CircularProgress,
  Grid,
  Snackbar,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";
import { styled } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2196F3",
    },
    secondary: {
      main: "#2196F3",
    },
  },
});

const LoginContainer = styled(DialogContent)({
  width: "400px",
  margin: "auto",
  marginTop: "10px",
  padding: "20px",
  borderRadius: "8px",
  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
});
const LoginText = styled(DialogTitle)({
  margin: "1px",
  fontSize: "30px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});
const StyledButton = styled(Button)({
  backgroundColor: "white",
  color: "black",

  "&:hover": {
    backgroundColor: "white",
    color: "black",
  },
});

const BlueCircularProgress = styled(CircularProgress)({
  color: "blue",
});

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
  const [showSnackbar, setShowSnackbar] = useState(false);

  const handleFormSubmit = async (data: any) => {
    setLoading(true);

    if (data.username === "admin" && data.password === "admin") {
      setTimeout(() => {
        setLoading(false);
        onLoginSuccess();
      }, 1000);
    } else {
      setTimeout(() => {
        setLoading(false);
        setShowSnackbar(true); // Show the Snackbar when credentials are wrong
      }, 1000);
    }
  };

  const handleSnackbarClose = () => {
    setShowSnackbar(false); // Hide the Snackbar when it is closed by the user
  };

  return (
    <ThemeProvider theme={theme}>
      <Dialog open={showPopup}>
        <LoginContainer>
          <LoginText>Login</LoginText>
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  type="text"
                  label="Username"
                  {...register("username", {
                    required: "Username is required",
                  })}
                  error={Boolean(errors.username)}
                  helperText={
                    errors.username ? errors.username.message as string: ""
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  type="password"
                  label="Password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                  error={Boolean(errors.password)}
                  helperText={
                    errors.password ? errors.password.message as string: ""
                  }
                  
                />
              </Grid>
              <Grid item xs={12}>
                <StyledButton
                  fullWidth
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? (
                    <BlueCircularProgress size={24} color="secondary" />
                  ) : (
                    "Login"
                  )}
                </StyledButton>
              <Grid item xs={12}>
                {/* Add the Snackbar component */}
                <Snackbar
                  open={showSnackbar}
                  autoHideDuration={3000} // Snackbar will automatically close after 3 seconds
                  onClose={handleSnackbarClose}
                  message="Invalid credentials"
                />
              </Grid>
              </Grid>
            </Grid>
          </form>
        </LoginContainer>
      </Dialog>

     
    </ThemeProvider>
  );
};

export default Login;
