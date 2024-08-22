import { useEffect, useState } from "react";
import { medishortsService } from "../../services/medishorts-service";
import ProductRequestsList from "../components/ProductRequestsList";
import DummyProductRequestData from "../../../../backend/src/dummy_data/productRequestsList/productRequestsLists.json";

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
    <div>
      <h1>Product Requests</h1>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!isLoading && loadedProductRequests && <ProductRequestsList items={loadedProductRequests} onDeleteProductRequest={productRequestDeleteHandler} />}
    </div>
  );
}

export default ProductRequests;