import { createContext, useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";

export const AuthContext = createContext({
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});

const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

const login = useCallback(() => {
  setIsLoggedIn(true);
},[]);

const logout = useCallback(() => {
  setIsLoggedIn(false);
},[]);

  return (
      <AuthContext.Provider
        value={{
          isLoggedIn: isLoggedIn,
          login: login,
          logout: logout,
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

