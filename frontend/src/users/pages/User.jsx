import {useState } from "react";
import UserProfile from "../components/UserProfile";


import {Box , Typography} from "@mui/material";


const User = () => {
  

  return (
    <Box>
      <Typography variant="h4" align="center" m={2}>Users Page</Typography>
      <UserProfile userid={""} />
    </Box>
  );
}

export default User;