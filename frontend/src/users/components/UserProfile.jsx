import React from "react";
import { Box, Typography, Paper } from "@mui/material";

const UserProfile = (props) => {
  return (
    <Box
      component="div"
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          maxWidth: 400,
          width: "100%",
          maxHeight: "90vh",
          overflow: "auto",
        }}
      >
        <Typography variant="h5" align="center" gutterBottom>
          UserProfile
        </Typography>
        <Typography variant="body1" align="center" gutterBottom>
          User Profile Details
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Typography variant="h6">
            Email:
            {/* {userData.email} */}
          </Typography>
          <Typography variant="h6">
            Pharmacy Name:
            {/* {userData.pharmacyName} */}
          </Typography>
          <Typography variant="h6">
            Pharmacy Address:
            {/* {userData.pharmacyAddress} */}
          </Typography>
          <Typography variant="h6">
            Pharmacy PSI Registration No:
            {/* {userData.pharmacyPSIRegistrationNo} */}
          </Typography>
          <Typography variant="h6">
            Pharmacy Phone Number:
            {/* {userData.pharmacyPhoneNumber} */}
          </Typography>
          <Typography variant="h6">
            Pharmacy Fax Number:
            {/* {userData.pharmacyFaxNumber} */}
          </Typography>
          <Typography variant="h6">
            Supervising Pharmacist:
            {/* {userData.supervisingPharmacist} */}
          </Typography>
          <Typography variant="h6">
            Superintendent Pharmacist:
            {/* {userData.superintendentPharmacist} */}
          </Typography>
          <Typography variant="h6">
            Pharmacy Owner:
            {/* {userData.pharmacyOwner} */}
          </Typography>
          <Typography variant="h6">
            VAT Number:
            {/* {userData.vatNumber} */}
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default UserProfile;
