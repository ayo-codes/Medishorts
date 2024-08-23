import { useEffect, useState ,useContext } from "react";
import { useParams } from "react-router-dom";

import PropTypes from "prop-types";

import ProductRequestsList from "../components/ProductRequestsList";
import { medishortsService } from "../../services/medishorts-service";
import { AuthContext } from "../../shared/context/AuthContext";


const UserProductRequests = (props) => {
  // GET USER ID FROM URL
  const userId = useParams().userId;

  // Gain access to object properties from the AuthContextProvider
  const auth = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [loadedProductRequests, setLoadedProductRequests] = useState([]);

  useEffect(() => {
    const sendRequest = async () => {
      setIsLoading(true);
      const response =
        await medishortsService.getProductRequestsByUserId(userId , {headers: {Authorization: `Bearer ${auth.token}`}});
      console.log(response.userProductRequests);

      if (response.state !== true) {
        setIsLoading(false);
        setError(response.error);
        console.log(response.error);
      }

      if (response.state === true) {
        setLoadedProductRequests(response.userProductRequests);
        console.log(response.userProductRequests);
        setIsLoading(false);
        setError(null);
      }
    };

    sendRequest();
  }, [userId, auth.token]);
  return (
    <>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!isLoading && loadedProductRequests && (
        <ProductRequestsList items={loadedProductRequests} />
      )}
    </>
  );
};

UserProductRequests.propTypes = {};

export default UserProductRequests;
