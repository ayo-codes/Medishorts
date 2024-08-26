import { useState, useEffect, useContext } from "react";

import UserProfile from "../components/UserProfile";
import { medishortsService } from "../../services/medishorts-service";
import { AuthContext } from "../../shared/context/AuthContext";

import { Box, Typography, CircularProgress } from "@mui/material";

const User = () => {
  const auth = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [loadedUsers, setLoadedUsers] = useState([]);
  const [loadedUser, setLoadedUser] = useState({});

  useEffect(() => {
    const sendRequest = async () => {
      setIsLoading(true);
      const response = await medishortsService.getAllUsers();
      console.log(response.users);

      if (response.state !== true) {
        setIsLoading(false);
        setError(response.error);
        console.log(response.error);
      }

      if (response.state === true) {
        setLoadedUsers(response.users);
        console.log(response.users);

        const currentUser = response.users.find(
          (user) => user.id === auth.userId
        );
        setLoadedUser(currentUser);

        setIsLoading(false);
        setError(null);
      }
    };

    sendRequest();
  }, [auth.userId]);

  return (
    <Box>
      <Typography variant="h4" align="center" m={2}>
        User Profile
      </Typography>
      {isLoading && <Typography>Loading...</Typography> && <CircularProgress />}
      {error && <Typography>{error}</Typography>}
      {!isLoading && loadedUsers && <UserProfile user={loadedUser} />}
    </Box>
  );
};

export default User;
