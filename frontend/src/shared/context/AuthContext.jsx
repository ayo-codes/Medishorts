import { createContext, useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";


export const AuthContext = createContext(null);

const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState("");

  const [userId, setUserId] = useState(null);

const login = useCallback((uid ,token) => {
  setToken(token);
  setUserId(uid); // sets userId to the id of the user 
  console.log("Logging in... from AuthContextProvider");
  console.log(uid);
  console.log(token);
},[]);

const logout = useCallback(() => {
  setToken(null);
  setUserId(null);
},[]);

  return (
      <AuthContext.Provider
        value={{
          isLoggedIn: !!token,
          token,
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
//   token: false,
//   login: () => {},
//   logout: () => {},
// }