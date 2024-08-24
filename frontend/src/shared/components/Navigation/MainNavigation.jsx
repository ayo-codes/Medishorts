import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Stack , Button } from "@mui/material";

import MainHeader from "./MainHeader";
import NavLinks from "./NavLinks";
import SideDrawer from "./SideDrawer";
import Backdrop from "./Backdrop";

const MainNavigation = (props) => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  const openDrawerHandler = () => {
    setDrawerIsOpen(true);
  };

  const closeDrawerHandler = () => {
    setDrawerIsOpen(false);
  };

  return (
    <>
      {drawerIsOpen && <Backdrop onClick={closeDrawerHandler} /> }
      {drawerIsOpen ? (
        <SideDrawer>
          <nav>
            <NavLinks />
          </nav>
        </SideDrawer>
      ) : null}
      <MainHeader >
        <Button onClick={openDrawerHandler}>          
        </Button>
        <nav>
          <NavLinks />
        </nav>
      </MainHeader>
    </>
  );
};

MainNavigation.propTypes = {};

export default MainNavigation;
