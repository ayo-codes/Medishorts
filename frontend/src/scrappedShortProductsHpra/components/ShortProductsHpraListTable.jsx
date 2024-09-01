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

const ShortProductsHpraListTable = (props) => {
  const auth = useContext(AuthContext);

  if (props.items.length === 0) {
    return (
      <Box>
        <Box>
          <Typography variant="h4">Short Products List from HPRA</Typography>
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
        Short Products List from HPRA
        </Typography>
      </Box>

      <Box>
        <TableContainer sx={{}} component={Paper}>
          <Table stickyHeader aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Product Name</TableCell>
                <TableCell align="left">Generic Name</TableCell>
                <TableCell align="left">Manufacturer</TableCell>
                <TableCell align="left">Shortage Reason</TableCell>
                <TableCell align="left">Shortage Date</TableCell>
                <TableCell align="left">Expected Return Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.items.map((shortProductHpra) => (
                <>
                  <TableRow
                    key={shortProductHpra.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="left">
                      {shortProductHpra.productName}
                    </TableCell>
                    <TableCell align="left">
                      {shortProductHpra.genericName}
                    </TableCell>
                    <TableCell align="left">
                      {shortProductHpra.manufacturer}
                    </TableCell>
                    <TableCell align="left">
                      {shortProductHpra.shortageReason}
                    </TableCell>
                    <TableCell align="left">
                      {shortProductHpra.shortageDate}
                    </TableCell>
                    <TableCell align="left">
                      {shortProductHpra.expectedReturnDate}
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

ShortProductsHpraListTable.propTypes = {
  items: PropTypes.array.isRequired,
  onDeleteProductRequest: PropTypes.func.isRequired,
};

export default ShortProductsHpraListTable;