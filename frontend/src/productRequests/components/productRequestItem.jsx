import PropTypes from "prop-types";
import {Link } from "react-router-dom"

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
          <Link to={`/product-requests/${props.id}`}>
          <button>View</button>
          </Link>
        </div>
        <div>
          <button>Approve</button>
          <button>Edit</button>
          <button>Delete</button>
        </div>
      </li>
    </>
  );
};

ProductRequestItem.propTypes = {
  productName: PropTypes.string.isRequired,
  genericName: PropTypes.string.isRequired,
  packSize: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired
};

export default ProductRequestItem;
