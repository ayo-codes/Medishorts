import { useEffect, useState } from "react";
import { medishortsService } from "../../services/medishorts-service";
// import ShortProductsHpraListTable from "../components/ShortProductsHpraListTable";
import { Box , Typography } from "@mui/material";

const ShortProductsHpraTable = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [loadedShortProductsHpra, setLoadedShortProductsHpra] = useState([]);

  
  useEffect(() => {
    const sendRequest = async () => {
      setIsLoading(true);
      const response = await medishortsService.getAllShortProductsHpra();
      console.log(response.shortProductsHpra);
      
      if (response.state !== true) {
        setIsLoading(false);
        setError(response.error);
        console.log(response.error);
      }

      if(response.state === true){
        // Filter the product requests to only include those with shortProduct === true
  
        setLoadedShortProductsHpra(response.shortProductsHpra);
        console.log(response.shortProductsHpra);
        setIsLoading(false);
        setError(null);
      }
    };

    sendRequest();
  }, []);

//   const productRequestDeleteHandler = (deletedProductRequestId) => {
//     console.log("Deleting product request...");
//     setLoadedShortProductsHpra((prevProductRequests) => {
//       return prevProductRequests.filter((productRequest) => productRequest.id !== deletedProductRequestId); 
//   }
// )}

  // const DUMMY_PRODUCT_REQUESTS = DummyProductRequestData.slice(0, 10);


  return (
    <Box>
      <Typography>Shorts HPRA List</Typography>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {/* {!isLoading && loadedShortProductsHpra && <ShortProductsHpraListTable items={loadedShortProductsHpra} onDeleteProductRequest={productRequestDeleteHandler} />} */}
    </Box>
  );
}

export default ShortProductsHpraTable;