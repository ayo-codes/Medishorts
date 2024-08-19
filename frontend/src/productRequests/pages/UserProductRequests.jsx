import React from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import ProductRequestsList from "../components/ProductRequestsList";

const DUMMY_PRODUCT_REQUESTS = [
  {
    productName: "10% LPC IN BETNOVATE CREAM",
    genericName: "",
    packSize: 1,
    gmsNo: "",
    costPrice: 0,
    vatRate: 23,
    manufacturer: "",
    legalCategory: "",
    barcode: 222,
    ipuCode: "",
    user: "5f5f3b3b1f6b3b001f6b3b00",
    productRequestId: "5f5f3b3b1f6b3b001f6b3b44",
  },
  {
    productName: "12 % EUMOVATE IN PARAFFIN GEL",
    genericName: "",
    packSize: 1,
    gmsNo: "",
    costPrice: 0,
    vatRate: 23,
    manufacturer: "",
    legalCategory: "",
    barcode: 333,
    ipuCode: "",
    user: "5f5f3b3b1f6b3b001f6b3b00",
    productRequestId: "5f5f3b3b1f6b3b001f6b3b45",
  },
];
const UserProductRequests = (props) => {
  // GET USER ID FROM URL
  const userId = useParams().userId;
  const userProductRequests = DUMMY_PRODUCT_REQUESTS.filter(
    (productRequest) => productRequest.user === userId
  );
  return (
    <>
      <h1>User Product Requests</h1>
      <ProductRequestsList items={userProductRequests} />
    </>
  );
};

UserProductRequests.propTypes = {};

export default UserProductRequests;
