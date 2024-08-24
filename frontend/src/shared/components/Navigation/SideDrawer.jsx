import PropTypes from "prop-types";
import { Stack } from "@mui/material";
import ReactDOM from "react-dom";
import "./SideDrawer.css";


const SideDrawer = (props) => {

  const content = <aside className="side-drawer">{props.children}</aside>;

  return ReactDOM.createPortal(content, document.getElementById("drawer"));
};

SideDrawer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SideDrawer;
