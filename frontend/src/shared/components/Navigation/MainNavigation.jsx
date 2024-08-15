import PropTypes from "prop-types";
import MainHeader from "./MainHeader";
import { Link } from "react-router-dom";
import NavLinks from "./NavLinks";

const MainNavigation = (props) => {
  return (
    <MainHeader>
      <button>
        <span />
        <span />
        <span />
      </button>
      <h4>
        <Link to="/"> Page Title/ Product Request </Link>
      </h4>
      <nav>
        <NavLinks />
      </nav>
    </MainHeader>
  );
};

MainNavigation.propTypes = {};

export default MainNavigation;
