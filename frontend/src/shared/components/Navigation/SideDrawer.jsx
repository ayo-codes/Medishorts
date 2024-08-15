import PropTypes from "prop-types";
import "./SideDrawer.css";


const SideDrawer = (props) => {

  return <aside className="side-drawer">{props.children}</aside>;
};

SideDrawer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SideDrawer;
