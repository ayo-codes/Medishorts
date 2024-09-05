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

const ProductRequestsListTable = (props) => {
  const auth = useContext(AuthContext);

  if (props.items.length === 0) {
    return (
      <Box>
        <Box>
          <Typography variant="h4">Product Requests List</Typography>
        </Box>
        <div>
          <h2>No product Requests Found.</h2>
          <button>Add a Product Request </button>
        </div>
      </Box>
    );
  }

  console.log(props.items);
  return (
    <>
      <Box>
        <Typography variant="h4" align="center" m={2}>
          Product Requests List
        </Typography>
      </Box>

      <Box>
        <TableContainer sx={{}} component={Paper}>
          <Table stickyHeader aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Product Name</TableCell>
                <TableCell align="left">Generic Name</TableCell>
                <TableCell align="left">Cost Price</TableCell>
                <TableCell align="left">Qty</TableCell>
                <TableCell align="left">Expiry Date</TableCell>
                <TableCell align="left">Product Request Creator</TableCell>
                <TableCell align="left">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.items.map((productRequest) => (
                <>
                  <TableRow
                    key={productRequest.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="left">
                      {productRequest.productName}
                    </TableCell>
                    <TableCell align="left">
                      {productRequest.genericName}
                    </TableCell>
                    <TableCell align="left">
                      €{productRequest.costPrice}
                    </TableCell>
                    <TableCell align="left">
                      {productRequest.quantity}
                    </TableCell>
                    <TableCell align="left">
                    {`${String(productRequest.expiryDate).substring(0, 10)}`}
                    </TableCell>
                    <TableCell align="left">
                    <Link to={`/public-user/${productRequest.productRequestCreator.id}`}>
                      {productRequest.productRequestCreator.pharmacyName}
                    </Link>
                    </TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={2}>
                        {/* {auth.userId ===
                          productRequest.productRequestCreator && (
                          <Button>Approve</Button>
                        )} */}

                        {auth.userId ===
                          productRequest.productRequestCreator.id &&   (
                          <Link to={`/product-requests/${productRequest.id}`}>
                            <Button>Edit</Button>
                          </Link>
                        )}
                      </Stack>
                    </TableCell>
                  </TableRow>
                </>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

ProductRequestsListTable.propTypes = {
  items: PropTypes.array.isRequired,
  onDeleteProductRequest: PropTypes.func.isRequired,
};

export default ProductRequestsListTable;
