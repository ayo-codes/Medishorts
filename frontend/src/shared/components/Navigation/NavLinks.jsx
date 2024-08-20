import {React, useContext} from "react"
import PropTypes from "prop-types"
import {NavLink} from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"

const NavLinks = props => {
  const auth = useContext(AuthContext);
  return (
    <ul>
        <li>
          <NavLink to="/" exact >Home</NavLink>
        </li>
        <li>
          <NavLink to="/product-requests">Product Requests</NavLink>
        </li>
        <li>
          <NavLink to="/product-requests/new">Add Product Request</NavLink>
        </li>
        <li>
          <NavLink to="/products">Products</NavLink>
        </li>
        <li>
          <NavLink to="/product/new">Add Product</NavLink>
        </li>
        <li>
          <NavLink to="/auth">Sign In</NavLink>
          {auth.isLoggedIn && 
            <li>
          <button onClick={auth.logout}>Logout</button>
          </li>}
        </li>
    </ul>
    
  )
}

NavLinks.propTypes = {}

export default NavLinks