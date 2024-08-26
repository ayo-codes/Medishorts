import { useParams } from "react-router-dom";
import { Box, Typography } from "@mui/material";

import ProductRequestUpdateForm from "../components/ProductRequestUpdateForm";


const ProductRequestUpdate = () => {

  const productRequestId  = useParams().productRequestId;
  console.log(productRequestId);

  return (
    <>
          <Box>
        <Typography variant="h4" align="center" m={2}>
          Update Product Request
        </Typography>
          </Box>
          <ProductRequestUpdateForm productRequestId ={productRequestId}/>

    </>

      
    
  )
}

export default ProductRequestUpdate;