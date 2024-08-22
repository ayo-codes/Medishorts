import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useState ,useContext} from "react";
import { Box, Button, Modal, Typography } from "@mui/material";

import  { AuthContext }  from "../../shared/context/AuthContext";
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
    const response =  await medishortsService.deleteProductRequest(props.id);
    props.onDelete(props.id)
    console.log(response);
    if (response.state !== true) {
      console.log(response.error);
    }

    if (response.state === true) {
      console.log(response.message);
      
    }  

  };
    
  return (
    <>
      <div>
        <h3>Product Request Item</h3>
      </div>
      <li>
        <div>
          <h3>Product Name: {props.productName}</h3>
          <h3>Generic Name: {props.genericName}</h3>
          <h3>Cost Price: {props.costPrice}</h3>
          <h3>Expiry Date: {props.expiryDate}</h3>
          <h3>Product Request Creator: {props.productRequestCreator}</h3>
          <br></br>
          <Link to={`/product-requests/${props.id}`}>
            <button>View</button>
          </Link>
        </div>
        <div>
          {auth.userId === props.productRequestCreator && 
          <button>Approve</button>}
          
          {auth.isLoggedIn &&
          <Link to={`/product-requests/${props.id}`}>
          <Button>Edit</Button>
          </Link>}

          {auth.isLoggedIn &&
          <Button onClick={handleOpen}>Delete</Button>}
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
        </div>
      </li>
    </>
  );
};

ProductRequestItem.propTypes = {
  productName: PropTypes.string.isRequired,
  genericName: PropTypes.string.isRequired,
  costPrice: PropTypes.number.isRequired,
  expiryDate: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  productRequestCreator: PropTypes.string.isRequired,
};

export default ProductRequestItem;
