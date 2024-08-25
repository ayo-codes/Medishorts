import React from "react"
import PropTypes from "prop-types"
import ProductRequestForm from "../components/ProductRequestForm"
import { Typography } from "@mui/material"

const ProductRequestCreate = props => {
  return (
    <>
      <Typography variant="h4" align="center" marginTop={4} gutterBottom >
        Add a Product Request
      </Typography>
      <ProductRequestForm />
    </>
    
  )
}

ProductRequestCreate.propTypes = {}

export default ProductRequestCreate