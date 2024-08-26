import React from "react";
import UserProfile from "../components/UserProfile";


import {Box , Typography} from "@mui/material";


const User = () => {
  return (
    <Box>
      <Typography variant="h3" align="center" m={2}>Users Page</Typography>
      <UserProfile />
    </Box>
  );
}

export default User;