import { useEffect, useState } from "react";
import { medishortsService } from "../../services/medishorts-service";
import ProductRequestsList from "../components/ProductRequestsList";
import DummyProductRequestData from "../../../../backend/src/dummy_data/productRequestsList/productRequestsLists.json";
import { Box , Typography } from "@mui/material";

const ProductRequests = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [loadedProductRequests, setLoadedProductRequests] = useState([]);

  
  useEffect(() => {
    const sendRequest = async () => {
      setIsLoading(true);
      const response = await medishortsService.getAllProductRequests();
      console.log(response.productRequests);
      
      if (response.state !== true) {
        setIsLoading(false);
        setError(response.error);
        console.log(response.error);
      }

      if(response.state === true){
        setLoadedProductRequests(response.productRequests);
        console.log(response.productRequests);
        setIsLoading(false);
        setError(null);
      }
    };

    sendRequest();
  }, []);

  const productRequestDeleteHandler = (deletedProductRequestId) => {
    console.log("Deleting product request...");
    setLoadedProductRequests((prevProductRequests) => {
      return prevProductRequests.filter((productRequest) => productRequest.id !== deletedProductRequestId); 
  }
)}

  const DUMMY_PRODUCT_REQUESTS = DummyProductRequestData.slice(0, 10);


  return (
    <Box>
      {/* <Typography>Product Requests</Typography> */}
      <Box>
        <Typography variant="h3" align="center" m={2}>
          All Product Requests
        </Typography>
      </Box>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!isLoading && loadedProductRequests && <ProductRequestsList items={loadedProductRequests} onDeleteProductRequest={productRequestDeleteHandler} />}
    </Box>
  );
}

export default ProductRequests;