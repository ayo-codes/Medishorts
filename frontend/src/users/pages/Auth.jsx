import { useState, useContext } from "react";

import { Button, Box, Stack } from "@mui/material";

import LoginForm from "../components/LoginForm";
import SignUpForm from "../components/SignUpForm";

const Auth = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);

  const handleSwitchMode = () => {
    setIsLoginMode((previousMode) => !previousMode);
    console.log("Switching Mode");
  };
  return (
    <Stack>
      {isLoginMode && <LoginForm />}
      {!isLoginMode && <SignUpForm />}

      <Box display="flex" justifyContent="center" margin={-2}>
        <Button color="primary" variant="outlined" onClick={handleSwitchMode}>
          {" "}
          {isLoginMode
            ? "Don't Have an Account? SIGNUP"
            : "Already Have an Account? LOGIN"}{" "}
        </Button>
      </Box>
    </Stack>
  );
};

export default Auth;
