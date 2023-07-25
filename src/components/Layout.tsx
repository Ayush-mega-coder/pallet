// Layout.tsx

import React, { useState, useEffect } from "react";
import Login from "./Login";
import Admin from "./Admin";

interface LoginPopupProps {
  onClose: () => void;
  onLoginSuccess: () => void;
}

const Layout: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  const checkLoginStatus = () => {
    //check login status
    return false;
  };

  useEffect(() => {
    // Check the login status on component mount or page refresh
    const userLoggedIn = checkLoginStatus();
    setIsLoggedIn(userLoggedIn);
    setShowLoginPopup(!userLoggedIn); 
  }, []);

  // Function to handle successful login
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setShowLoginPopup(false);
  };

  const handlePopupClose = () => {
    setShowLoginPopup(false);
  };

  return (
    <>
      {isLoggedIn ? (
        <Admin />
      ) : (

        showLoginPopup && (
          <Login
            showPopup={showLoginPopup}
            onLoginSuccess={handleLoginSuccess}
          />
        )
      )}
    </>
  );
};

export default Layout;
