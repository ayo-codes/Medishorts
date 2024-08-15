import ProductRequestsList from "../components/ProductRequestsList";

const ProductRequests = () => {

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

  return (
    <div>
      <h1>Product Requests</h1>
      <ProductRequestsList items={DUMMY_PRODUCT_REQUESTS} />
    </div>
  );
}

export default ProductRequests;