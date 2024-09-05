import {useContext, React } from "react";
import { Box , Stack, Typography } from "@mui/material";
import { AuthContext } from "../../shared/context/AuthContext";

const HomePage = () => {
  const auth = useContext(AuthContext);
  return (
    <Box>
      <Typography variant="h3" align="center" m={4}>
        Welcome to MediShorts
      </Typography>
      <Stack direction="column" spacing={2} justifyContent="center"  >
        <Typography variant="h4" align="center" m={2}>
          A platform to track and help pharmacists manage medicine shortages
        </Typography>
        {!auth.isLoggedIn && ( 
        <Typography variant="h5" align="center" m={2} >
          To take advantage of all the features please login or create an account
        </Typography>
        )}
      </Stack>
    </Box>

  )
}

export default HomePage;