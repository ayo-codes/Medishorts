import { createContext, useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";


let logoutTimer;

export const AuthContext = createContext(null);

const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState(null);
  const [tokenExpirationDate, setTokenExpirationDate ]= useState(null);


const login = useCallback((uid ,token , expirationDate ) => {
  setToken(token);
  setUserId(uid); // sets userId to the id of the user 

  //token expiration date
  const tokenExpirationTime = expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60 *2); // 2 hours

  // set token expiration date
  setTokenExpirationDate(tokenExpirationTime);

  // add token to local storage
  localStorage.setItem("userData", JSON.stringify({userId: uid, token: token , expiration: tokenExpirationTime.toISOString()}));

  console.log("Logging in... from AuthContextProvider");
  console.log(uid);
  console.log(token);
},[]);

const logout = useCallback(() => {
  setToken(null);
  setUserId(null);
  setTokenExpirationDate(null);
  localStorage.removeItem("userData"); // remove token from local storage
},[]);

// to check timer for token expiration
useEffect(() => {
  if (token && tokenExpirationDate) {
    const remainingTime = tokenExpirationDate.getTime() - new Date().getTime(); // to check remaining time and convert to milliseconds for 
    logoutTimer = setTimeout(logout, remainingTime); // store the id of the timer
  } else {
    clearTimeout(logoutTimer); // clear the timer using the id of the timer 
  } 
},[token, logout, tokenExpirationDate]);



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