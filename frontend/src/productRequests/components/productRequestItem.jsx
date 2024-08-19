import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Box, Button, Modal, Typography } from "@mui/material";

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
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
          <Button href={`/product-requests/${props.id}`}>Edit</Button>
          <Button onClick={handleOpen}>Delete</Button>
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
            <Button>Delete</Button>
          </Box>

          </Modal>
        </div>
      </li>
    </>
  );
};

ProductRequestItem.propTypes = {
  productName: PropTypes.string.isRequired,
  genericName: PropTypes.string.isRequired,
  packSize: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
};

export default ProductRequestItem;
