import PropTypes from "prop-types";
import ProductRequestItem from "./ProductRequestItem";
import {
  Typography,
  Box,
  Stack,
  Table,
  TableContainer,
  TableHead,
  TableCell,
  TableRow,
  Paper,
  TableBody,
  Button,
} from "@mui/material";

import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../shared/context/AuthContext";

const ProductRequestsList = (props) => {
  const auth = useContext(AuthContext);

  if (props.items.length === 0) {
    return (
      <Box>
        <Box>
          <Typography variant="h3">Product Requests List</Typography>
        </Box>
        <Box>
          <Typography variant="h2">No product Requests Found.</Typography>
          <Button>Add a Product Request </Button>
        </Box>
      </Box>
    );
  }

  console.log(props.items);
  return (
    <>
      <Box>
        {props.items.map((productRequest) => (
          <ProductRequestItem
            key={productRequest.id}
            id={productRequest.id}
            productName={productRequest.productName}
            genericName={productRequest.genericName}
            costPrice={productRequest.costPrice}
            expiryDate={productRequest.expiryDate}
            productRequestCreator={productRequest.productRequestCreator.pharmacyName}
            onDelete={props.onDeleteProductRequest}
            productRequestCreatorId={productRequest.productRequestCreator._id}
          />
        ))}
      </Box>
    </>
  );
};

ProductRequestsList.propTypes = {
  items: PropTypes.array.isRequired,
  onDeleteProductRequest: PropTypes.func,
};

export default ProductRequestsList;
