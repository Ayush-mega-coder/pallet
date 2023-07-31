import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  TextField,
  CircularProgress,
  Grid,
  Snackbar,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Avatar,
  Box,
  Menu,
  MenuItem,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";
import { styled } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

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
  backgroundColor: "#002D62",
  color: "white",
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
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state

  // Key to store login status in localStorage
  const LOGIN_STATUS_KEY = "isLoggedIn";

  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is already logged in
    const storedStatus = localStorage.getItem(LOGIN_STATUS_KEY);
    const jwtToken = document.cookie.replace(
      /(?:(?:^|.*;\s*)authToken\s*=\s*([^;]*).*$)|^.*$/,
      '$1'
    );

    if (storedStatus === 'true' && jwtToken) {
      setIsLoggedIn(true);
      onLoginSuccess(); // Automatically trigger login success if already logged in
    }
  }, [onLoginSuccess]);

  const handleFormSubmit = async (data: any) => {
    setLoading(true);

    try {
      // Make the API request to get the JWT token
      const response = await axios.post(
        'https://5c4e-150-129-102-218.ngrok-free.app/api/users/login',
        {
          email: data.username,
          password: data.password,
        }
      );

      // Check the response and handle login success/failure
      if (response.status === 200) {
        setLoading(false);
        setIsLoggedIn(true);  

        // Save the token as an HTTP-only cookie
        const token = response.data.token; // Assuming the token is available in the API response
        console.log(token)
        document.cookie = `authToken=${token}; path=/; secure; HttpOnly; SameSite=Strict`;

        onLoginSuccess();
      } else {
        setLoading(false);
        setShowSnackbar(true);
      }
    } catch (error) {
      console.error('Error while logging in:', error);
      setLoading(false);
      setShowSnackbar(true);
    }
  };

  const handleSnackbarClose = () => {
    setShowSnackbar(false); // Hide the Snackbar when it is closed by the user
  };

  // If already logged in, don't show the login dialog
  if (isLoggedIn) {
    return null;
  }

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Pallete
          </Typography>

          <Avatar alt="User Profile" src="/path/to/profile-image.jpg" sx={{ marginLeft: 2 }} />
        </Toolbar>
      </AppBar>

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
                  helperText={errors.username ? (errors.username.message as string) : ""}
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
                  helperText={errors.password ? (errors.password.message as string) : ""}
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
                  {loading ? <BlueCircularProgress size={24} color="secondary" /> : "Login"}
                </StyledButton>
              </Grid>
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
          </form>
        </LoginContainer>
      </Dialog>
    </ThemeProvider>
  );
};

export default Login;
