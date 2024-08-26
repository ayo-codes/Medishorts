import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import PropTypes from "prop-types";

const UserProfile = ({ user }) => {
  return (
    <Box
      component="div"
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      marginTop={-10}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 5,
          maxWidth: 400,
          width: "100%",
          maxHeight: "100vh",
          overflow: "auto",
        }}
      >
        <Typography variant="h5" align="center" marginTop={-1} marginBottom={3}  gutterBottom>
          User Profile Details 
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Typography variant="h6" >
            Email: {user.email}
          </Typography>
          <Typography variant="h6" >
            Pharmacy Name: {user.pharmacyName}
          </Typography>
          <Typography variant="h6">
            Pharmacy Address: {user.pharmacyAddress}
          </Typography>
          <Typography variant="h6">
            Pharmacy PSI Registration No: {user.pharmacyPSIRegistrationNo}
          </Typography>
          <Typography variant="h6">
            Pharmacy Phone Number: {user.pharmacyPhoneNumber}
          </Typography>
          <Typography variant="h6">
            Pharmacy Fax Number: {user.pharmacyFaxNumber}
          </Typography>
          <Typography variant="h6">
            Supervising Pharmacist: {user.supervisingPharmacist}
          </Typography>
          <Typography variant="h6">
            Superintendent Pharmacist: {user.superintendentPharmacist}
          </Typography>
          <Typography variant="h6">
            Pharmacy Owner: {user.pharmacyOwner}
          </Typography>
          <Typography variant="h6">
            VAT Number: {user.vatNumber}
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

UserProfile.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string.isRequired,
    pharmacyName: PropTypes.string.isRequired,
    pharmacyAddress: PropTypes.string.isRequired,
    pharmacyPSIRegistrationNo: PropTypes.number.isRequired,
    pharmacyPhoneNumber: PropTypes.string.isRequired,
    pharmacyFaxNumber: PropTypes.string.isRequired,
    supervisingPharmacist: PropTypes.string.isRequired,
    superintendentPharmacist: PropTypes.string.isRequired,
    pharmacyOwner: PropTypes.string.isRequired,
    vatNumber: PropTypes.string.isRequired,
  }).isRequired,
};

export default UserProfile;
