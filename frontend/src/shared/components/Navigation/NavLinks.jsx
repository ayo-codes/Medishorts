import React from "react"
import PropTypes from "prop-types"
import {NavLink} from "react-router-dom"

const NavLinks = props => {
  return (
    <ul>
        <li>
          <NavLink to="/" exact >Home</NavLink>
        </li>
        <li>
          <NavLink to="/product-requests">Product Requests</NavLink>
        </li>
        <li>
          <NavLink to="/product-request/new">Add Product Request</NavLink>
        </li>
        <li>
          <NavLink to="/products">Products</NavLink>
        </li>
        <li>
          <NavLink to="/product/new">Add Product</NavLink>
        </li>
        <li>
          <NavLink to="/signin">Sign In</NavLink>
        </li>
    </ul>
    
  )
}

NavLinks.propTypes = {}

export default NavLinks