import { createContext, useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";


export const AuthContext = createContext(null);

const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [userId, setUserId] = useState(null);

const login = useCallback((uid) => {
  setIsLoggedIn(true);
  setUserId(uid); // sets userId to the id of the user 
  console.log("Logging in... from AuthContextProvider");
  console.log(uid);
},[]);

const logout = useCallback(() => {
  setIsLoggedIn(false);
  setUserId(null);
},[]);

  return (
      <AuthContext.Provider
        value={{
          isLoggedIn,
          userId,
          login,
          logout
        }}
      >
        {children}
      </AuthContext.Provider>
    );
}

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthContextProvider;

// {
//   isLoggedIn: false,
//   login: () => {},
//   logout: () => {},
// }