import PropTypes from "prop-types";
import ProductRequestItem from "./ProductRequestItem";

const ProductRequestsList = (props) => {
  if (props.items.length === 0) {
    return (
      <>
        <div>
          <h1>Product Requests List</h1>
        </div>
        <div>
          <h2>No product Requests Found.</h2>
          <button>Add a Product Request </button>
        </div>
      </>
    );
  }

  console.log(props.items);
  return (
    <>
      <div>
        <h2>Product Requests List</h2>
      </div>
      <div>
        <ul>
          {props.items.map((productRequest) => (
            <ProductRequestItem key={productRequest.id}
            id= {productRequest.id} 
            productName={productRequest.productName} 
            genericName={productRequest.genericName}
            costPrice={productRequest.costPrice}
            expiryDate={productRequest.expiryDate}
            productRequestCreator={productRequest.productRequestCreator}
            onDelete={props.onDeleteProductRequest}
            />
          ))}
        </ul>
      </div>
    </>
  );
};

ProductRequestsList.propTypes = {
  items: PropTypes.array.isRequired,
  onDeleteProductRequest: PropTypes.func.isRequired,
};

export default ProductRequestsList;
