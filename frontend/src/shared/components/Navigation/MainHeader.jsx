import { AppBar , Toolbar , IconButton , Stack, Button , Typography } from "@mui/material"
import LocalPharmacyIcon from "@mui/icons-material/LocalPharmacy";
import PropTypes from "prop-types";

const MainHeader = props => {
  return (
    <AppBar position="static" color="transparent">
      <Toolbar>
        <IconButton size="large" edge="start" color="inherit" aria-label="menu">
          <LocalPharmacyIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          MediShorts
        </Typography>                 
        {props.children}         
      </Toolbar>
    </AppBar>
  )
}

MainHeader.propTypes = {
  children: PropTypes.node
}

export default MainHeader