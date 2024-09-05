import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { Box, Button, Modal, Typography, Paper } from "@mui/material";

import { AuthContext } from "../../shared/context/AuthContext";
import { medishortsService } from "../../services/medishorts-service";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ProductRequestItem = (props) => {
  const auth = useContext(AuthContext);
  console.log(auth);

  // Manages the state of the modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleConfirmDelete = async () => {
    setOpen(false);
    console.log("Deleting product request...");
    const response = await medishortsService.deleteProductRequest(props.id, {
      headers: { Authorization: `Bearer ${auth.token}` },
    });
    props.onDelete(props.id);
    console.log(response);
    if (response.state !== true) {
      console.log(response.error);
    }

    if (response.state === true) {
      console.log(response.message);
    }
  };

  return (
    <Box
    fixedWidth={400}
    alignItems="center"
    justifyContent="center"
    >
      <Box 
      sx={{paddingLeft :"25%", paddingRight: "25%" , paddingBottom:"1%"}}
      component="div"

      margin={1}
      >
        <Paper alignItems="center" justifyContent="center" elevation={3} sx={{ paddingLeft: 4, maxWidth: 600, width: "100%" }}>
          <Typography variant="h6" m={0.25} p={0.5} >Product Name: {props.productName}</Typography>
          <Typography variant="body1"  m={0.25} p={0.5} >Generic Name: {props.genericName}</Typography>
          <Typography m={0.25} p={0.5}  >Cost Price: €{props.costPrice}</Typography>
          <Typography m={0.25} p={0.5}  >Expiry Date: {`${String(props.expiryDate).substring(0, 10)}`} </Typography>
          <Typography m={0.25} p={0.5} >
            Product Request Creator: {props.productRequestCreator}
          </Typography>

          <Link to={`/product-requests/${props.id}`}>
            <Button>View</Button>
          </Link>

          {auth.userId === props.productRequestCreator && (
            <Button>Approve</Button>
          )}

          {auth.userId === props.productRequestCreator && (
            <Link to={`/product-requests/${props.id}`}>
              <Button>Edit</Button>
            </Link>
          )}

          {auth.userId === props.productRequestCreator && (
            <Button onClick={handleOpen}>Delete</Button>
          )}
        </Paper>
      </Box>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Are you sure you want to delete this product request?
          </Typography>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleConfirmDelete}>Delete</Button>
        </Box>
      </Modal>
    </Box>
  );
};

ProductRequestItem.propTypes = {
  productName: PropTypes.string.isRequired,
  genericName: PropTypes.string.isRequired,
  costPrice: PropTypes.number.isRequired,
  expiryDate: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  onDelete: PropTypes.func,
  productRequestCreator: PropTypes.string.isRequired,
};

export default ProductRequestItem;
