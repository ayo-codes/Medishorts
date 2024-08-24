import { useState , useContext } from "react";

import { Button } from "@mui/material";

import LoginForm from "../components/LoginForm";
import SignUpForm from "../components/SignUpForm";


const Auth = () => {


  const [isLoginMode, setIsLoginMode] = useState(true);

  const handleSwitchMode = () => {
    setIsLoginMode((previousMode) => !previousMode);
    console.log("Switching Mode");
  }
  return (
    <>
      {isLoginMode && <LoginForm /> } 
      {!isLoginMode && <SignUpForm />}
      <Button color="primary" variant="outlined"  onClick={handleSwitchMode}> {isLoginMode ? "Don't Have an Account? SIGNUP" : "Already Have an Account? LOGIN"} </Button>
    </>
  );
};

export default Auth;
