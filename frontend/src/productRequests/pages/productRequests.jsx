import ProductRequestsList from "../components/ProductRequestsList";
import DummyProductRequestData from "../../../../backend/src/dummy_data/productRequestsList/productRequestsLists.json";

const ProductRequests = () => {

  const DUMMY_PRODUCT_REQUESTS = DummyProductRequestData.slice(0, 10);


  return (
    <div>
      <h1>Product Requests</h1>
      <ProductRequestsList items={DUMMY_PRODUCT_REQUESTS} />
    </div>
  );
}

export default ProductRequests;