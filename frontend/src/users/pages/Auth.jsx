import { useState , useContext } from "react";

import LoginForm from "../components/LoginForm";
import SignUpForm from "../components/SignUpForm";
import AuthContextProvider  from "../../shared/context/AuthContext";

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
      <button onClick={handleSwitchMode}>Switch to {isLoginMode ? "SIGNUP" : "LOGIN"} </button>
    </>
  );
};

export default Auth;
