import { createContext, useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";


export const AuthContext = createContext(null);

const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState("");

  const [userId, setUserId] = useState(null);


const login = useCallback((uid ,token , expirationDate ) => {
  setToken(token);
  setUserId(uid); // sets userId to the id of the user 

  //token expiration date
  const tokenExpirationDate = expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60 *2); // 2 hours

  // add token to local storage
  localStorage.setItem("userData", JSON.stringify({userId: uid, token: token , expiration: tokenExpirationDate.toISOString()}));

  console.log("Logging in... from AuthContextProvider");
  console.log(uid);
  console.log(token);
},[]);

const logout = useCallback(() => {
  setToken(null);
  setUserId(null);
  localStorage.removeItem("userData"); // remove token from local storage
},[]);

// to check local storage for a token
useEffect(() => {
  const storedData = JSON.parse(localStorage.getItem("userData"));
  if (storedData && storedData.token && new Date(storedData.expiration) > new Date()) {
    login(storedData.userId, storedData.token , new Date(storedData.expiration));
  }
},[login]);


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