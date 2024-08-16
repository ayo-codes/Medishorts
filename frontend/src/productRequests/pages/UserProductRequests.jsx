import React from "react"
import PropTypes from "prop-types"
import ProductRequestsList from "../components/ProductRequestsList"

const DUMMY_PRODUCT_REQUESTS = [
  {
    "productName": "10% LPC IN BETNOVATE CREAM",
    "genericName": "",
    "packSize": 1,
    "gmsNo": "",
    "costPrice": 0,
    "vatRate": 23,
    "manufacturer": "",
    "legalCategory": "",
    "barcode": 222,
    "ipuCode": "",
    "user": "5f5f3b3b1f6b3b001f6b3b00",
    "productRequestId": "5f5f3b3b1f6b3b001f6b3b44"
 
   },
   {
    "productName": "12 % EUMOVATE IN PARAFFIN GEL",
    "genericName": "",
    "packSize": 1,
    "gmsNo": "",
    "costPrice": 0,
    "vatRate": 23,
    "manufacturer": "",
    "legalCategory": "",
    "barcode": 333,
    "ipuCode": "",
    "user": "5f5f3b3b1f6b3b001f6b3b00",
    "productRequestId": "5f5f3b3b1f6b3b001f6b3b45"
   },
]
const UserProductRequests = props => {
  return (
    <>
        <h1>User Product Requests</h1>
        <ProductRequestsList items={DUMMY_PRODUCT_REQUESTS} />
    </>

  )
}

UserProductRequests.propTypes = {}

export default UserProductRequests