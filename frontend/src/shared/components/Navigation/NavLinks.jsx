import { React, useContext } from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

import { Button, Stack } from "@mui/material";
import { AuthContext } from "../../context/AuthContext";

const NavLinks = (props) => {
  const auth = useContext(AuthContext);
  return (
    <Stack direction='row' spacing={2}>
      <Button color="inherit" >
        <NavLink to="/" exact>
          Home
        </NavLink>  
      </Button>
      <Button color="inherit" >
        <NavLink to="/product-requests">All Product Requests</NavLink>
      </Button>
      <Button color="inherit" >
        <NavLink to="/product-requests-table">Product Request Table</NavLink>
      </Button>
      {auth.isLoggedIn && ( 
        <Button color="inherit" >
          <NavLink to={`/${auth.userId}/product-requests`}>Your Product Requests</NavLink>
        </Button>
      )}
      {auth.isLoggedIn && (
          <Button color = "inherit">
          <NavLink to="/product-requests/new">Add Product Request</NavLink>
        </Button>
      )}
      {!auth.isLoggedIn && (
          <Button color="inherit" variant="outlined">
            <NavLink to="/auth">Sign In</NavLink>
          </Button>
      )}
      {auth.isLoggedIn && (
          <Button color ="inherit" variant="outlined" onClick={auth.logout}>
            Logout
          </Button>
      )}    
 </Stack> 
  );
};

NavLinks.propTypes = {};

export default NavLinks;
