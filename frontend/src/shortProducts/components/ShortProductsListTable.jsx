import PropTypes from "prop-types";
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

const ShortProductsListTable = (props) => {
  const auth = useContext(AuthContext);

  if (props.items.length === 0) {
    return (
      <Box>
        <Box>
          <Typography variant="h4">Short Products List</Typography>
        </Box>
        <div>
          <h2>No Short Product Found.</h2>
          <button>Add a Short Product </button>
        </div>
      </Box>
    );
  }

  console.log(props.items);
  return (
    <>
      <Box>
        <Typography variant="h4" align="center" m={2}>
          Short Product Reports
        </Typography>
        <Typography variant="h6" align="center" m={2}>
          <Link to={"/shorts-hpra"}>
            <Button> HPRA Reported Short Products </Button>
          </Link>
        </Typography>
      </Box>

      <Box>
        <TableContainer sx={{}} component={Paper}>
          <Table stickyHeader aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Product Name</TableCell>
                <TableCell align="left">Generic Name</TableCell>

                <TableCell align="left">Short Product Reporter</TableCell>
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
                      <Link
                        to={`/public-user/${productRequest.productRequestCreator.id}`}
                      >
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
                          productRequest.productRequestCreator && (
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

ShortProductsListTable.propTypes = {
  items: PropTypes.array.isRequired,
  onDeleteProductRequest: PropTypes.func.isRequired,
};

export default ShortProductsListTable;
