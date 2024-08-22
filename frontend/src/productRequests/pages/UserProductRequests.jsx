import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import PropTypes from "prop-types";

import ProductRequestsList from "../components/ProductRequestsList";
import { medishortsService } from "../../services/medishorts-service";

// const DUMMY_PRODUCT_REQUESTS = [
//   {
//     productName: "10% LPC IN BETNOVATE CREAM",
//     genericName: "",
//     packSize: 1,
//     gmsNo: "",
//     costPrice: 0,
//     vatRate: 23,
//     manufacturer: "",
//     legalCategory: "",
//     barcode: 222,
//     ipuCode: "",
//     user: "5f5f3b3b1f6b3b001f6b3b00",
//     productRequestId: "5f5f3b3b1f6b3b001f6b3b44",
//   },
//   {
//     productName: "12 % EUMOVATE IN PARAFFIN GEL",
//     genericName: "",
//     packSize: 1,
//     gmsNo: "",
//     costPrice: 0,
//     vatRate: 23,
//     manufacturer: "",
//     legalCategory: "",
//     barcode: 333,
//     ipuCode: "",
//     user: "5f5f3b3b1f6b3b001f6b3b00",
//     productRequestId: "5f5f3b3b1f6b3b001f6b3b45",
//   },
// ];
const UserProductRequests = (props) => {
  // GET USER ID FROM URL
  const userId = useParams().userId;

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [loadedProductRequests, setLoadedProductRequests] = useState([]);

  useEffect(() => {
    const sendRequest = async () => {
      setIsLoading(true);
      const response =
        await medishortsService.getProductRequestsByUserId(userId);
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
  }, [userId]);
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
