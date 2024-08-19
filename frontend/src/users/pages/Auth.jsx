import { useState } from "react";
import LoginForm from "../components/LoginForm";

const Auth = () => {

  const [isLoginMode, setIsLoginMode] = useState(true);

  const handleSwitchMode = () => {
    setIsLoginMode((previousMode) => !previousMode);
    console.log("Switching Mode");
  }
  return (
    <>
      {isLoginMode && <LoginForm /> }
      <button onClick={handleSwitchMode}>Switch to {isLoginMode ? "SIGNUP" : "LOGIN"} </button>
    </>
  );
};

export default Auth;
