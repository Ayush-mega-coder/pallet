import React, { useState, useEffect, PropsWithChildren } from "react";
import Login from "./Login";
import Header from "./Header";

interface LoginPopupProps {
  onClose: () => void;
  onLoginSuccess: () => void;
}

const Layout: React.FC<PropsWithChildren> = (props) => {
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
        <Header />
        {/* showLoginPopup && (
          <Login
            showPopup={showLoginPopup}
            onLoginSuccess={handleLoginSuccess}
          /> */}
        )
          {props.children}
          
    </>
  );
};

export default Layout;
