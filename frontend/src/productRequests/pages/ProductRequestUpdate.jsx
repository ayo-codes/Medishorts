import React from "react";
import { useParams } from "react-router-dom";
import ProductRequestUpdateForm from "../components/ProductRequestUpdateForm";

const ProductRequestUpdate = () => {
  const { productRequestId } = useParams();

  return (
    <>
          <h1>ProductRequestUpdate</h1>
          <ProductRequestUpdateForm productRequestId ={productRequestId}/>

    </>

      
    
  )
}

export default ProductRequestUpdate;