import PropTypes from "prop-types";

const ProductRequestItem = props => {

  console.log(props); 
  return (
    <>
      <div>
        <h3>Product Request Item</h3>
      </div>
      <li>
        <div>
          <h3>Product Name: {props.productName}</h3>
          <h3>Generic Name: {props.genericName}</h3>
          <h3>Pack Size: {props.packSize}</h3>
          <br></br>
        </div>
      </li>
    </>
  );
};

ProductRequestItem.propTypes = {
  productName: PropTypes.string.isRequired,
  genericName: PropTypes.string.isRequired,
  packSize: PropTypes.number.isRequired,
};

export default ProductRequestItem;
