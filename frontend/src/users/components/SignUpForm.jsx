import { useEffect, useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { DevTool } from "@hookform/devtools";

import {
  TextField,
  Box,
  Stack,
  Typography,
  Paper,
  CircularProgress,
  Button,
} from "@mui/material";

import { AuthContext } from "../../shared/context/AuthContext";
import { medishortsService } from "../../services/medishorts-service";

const SignUpForm = () => {
  // Gain access to object properties from the AuthContextProvider
  const auth = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const navigateBackOrHome = () => {
    const origin = location.state?.intent?.pathname || "/";
    console.log(origin);
    navigate(origin);
  };

  const defaultValues = async () => {
    return {
      email: "",
      password: "",
      pharmacyName: "",
      pharmacyAddress: "",
      pharmacyPSIRegistrationNo: "",
      pharmacyPhoneNumber: "",
      pharmacyFaxNumber: "",
      supervisingPharmacist: "",
      superintendentPharmacist: "",
      pharmacyOwner: "",
      vatNumber: "",
    };
  };

  // The destructing of values from the useForm hook
  const {
    register,
    handleSubmit,
    watch,
    formState: {
      errors,
      isDirty,
      isValid,
      isSubmitting,
      isSubmitSuccessful,
      isTouched,
    },
    control,
    reset,
  } = useForm({ defaultValues });

  // Function to handle the form submission
  const onSubmitAuthRequest = async (data) => {
    setError(null);
    setIsLoading(true);
    console.log(data);
    console.log("Signing up process began");
    const response = await medishortsService.signUpUser(
      data.email,
      data.password,
      data.pharmacyName,
      data.pharmacyAddress,
      data.pharmacyPSIRegistrationNo,
      data.pharmacyPhoneNumber,
      data.pharmacyFaxNumber,
      data.supervisingPharmacist,
      data.superintendentPharmacist,
      data.pharmacyOwner,
      data.vatNumber
    );
    setIsLoading(false);
    console.log(response);
    if (response.state !== true) {
      setError(response.error);
      console.log(response.error);
    }

    if (response.state === true) {
      console.log(response.message);
      console.log(response.user);
      console.log(`${response.token} from the signup form`);
      auth.login(response.user.id, response.token);
      navigateBackOrHome();
    }
  };

  // Function to handle Errors
  const onError = (errors) => console.log("Form Errors", errors);

  // useEffect to handle the form reset
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <Box
      component="div"
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Paper elevation={3} sx={{ padding: 4, maxWidth: 400, width: "100%" , maxHeight:"90vh", overflow:"auto"}}>
        <Typography align="center" variant="h5" gutterBottom>
          Create Your Account
        </Typography>
        
        {/* Form Submission logic and using the handleSubmit method from useForm */}
        <form onSubmit={handleSubmit(onSubmitAuthRequest, onError)} noValidate>
          
          {/* Email */}
          <Box mb={2}>
            <TextField
              fullWidth
              type="email"
              id="email"
              label="Email"
              size="small"
              variant="outlined"
              placeholder="Your Email"
              error={errors.email ? true : false}
              helperText={errors.email ? errors.email.message : null}
              {...register("email", {
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Invalid Email",
                },
                required: { value: true, message: "Your Email is required" },
                minLength: { value: 5, message: "Min length is 5" },
              })}
            />
          </Box>
          <Box mb={2}>
            <TextField
              fullWidth
              type="password"
              id="password"
              label="Password"
              size="small"
              variant="outlined"
              placeholder="Password"
              error={errors.password ? true : false}
              helperText={errors.password ? errors.password.message : null}
              {...register("password", {
                required: { value: true, message: "Password is required" },
                minLength: { value: 5, message: " Min length is 5" },
              })}
            />
          </Box>

          {/* Pharmacy Name */}
          <Box mb={2}>
            <TextField
              fullWidth
              type="text"
              id="pharmacyName"
              label="Pharmacy Name"
              size="small"
              variant="outlined"
              placeholder="Pharmacy Name"
              error={errors.pharmacyName ? true : false}
              helperText={
                errors.pharmacyName ? errors.pharmacyName.message : null
              }
              {...register("pharmacyName", {
                required: { value: true, message: "Pharmacy Name is required" },
                minLength: { value: 5, message: " Min length is 5" },
              })}
            />
          </Box>

          {/* Pharmacy Address */}
          <Box mb={2}>
            <TextField
              fullWidth
              type="text"
              id="pharmacyAddress"
              label="Pharmacy Address"
              size="small"
              variant="outlined"
              placeholder="Pharmacy Address"
              error={errors.pharmacyAddress ? true : false}
              helperText={
                errors.pharmacyAddress ? errors.pharmacyAddress.message : null
              }
              {...register("pharmacyAddress", {
                required: {
                  value: true,
                  message: "Pharmacy Address is required",
                },
                minLength: { value: 5, message: " Min length is 5" },
              })}
            />
          </Box>

          {/* Pharmacy PSI No */}
          <Box mb={2}>
            <TextField
              fullWidth
              type="number"
              id="pharmacyPSIRegistrationNo"
              label="Pharmacy PSI Number"
              size="small"
              variant="outlined"
              placeholder="Pharmacy PSI Number"
              error={errors.pharmacyPSIRegistrationNo ? true : false}
              helperText={
                errors.pharmacyPSIRegistrationNo
                  ? errors.pharmacyPSIRegistrationNo.message
                  : null
              }
              {...register("pharmacyPSIRegistrationNo", {
                valueAsNumber: true,
                required: {
                  value: true,
                  message: "Pharmacy PSI Number is required",
                },
                minLength: { value: 4, message: " Min length is 4" },
              })}
            />
          </Box>

          {/* Pharmacy Phone Number */}
          <Box mb={2}>
            <TextField
              fullWidth
              type="text"
              id="pharmacyPhoneNumber"
              label="Pharmacy Phone Number"
              size="small"
              variant="outlined"
              placeholder="Pharmacy Phone Number"
              error={errors.pharmacyPhoneNumber ? true : false}
              helperText={
                errors.pharmacyPhoneNumber
                  ? errors.pharmacyPhoneNumber.message
                  : null
              }
              {...register("pharmacyPhoneNumber", {
                pattern: { value: /^\d+$/, message: "Invalid Phone Number" },
                required: {
                  value: true,
                  message: "Pharmacy Phone Number is required",
                },
                minLength: {
                  value: 8,
                  message: " Min length is 8, Don't Forget the area code",
                },
                maxLength: {
                  value: 10,
                  message: " Max length is 10, Don't Forget the area code",
                },
              })}
            />
          </Box>

          {/* Pharmacy Fax Number */}
          <Box mb={2}>
            <TextField
              fullWidth
              type="text"
              id="pharmacyFaxNumber"
              label="Pharmacy Fax Number"
              size="small"
              variant="outlined"
              placeholder="Pharmacy Fax Number"
              error={errors.pharmacyFaxNumber ? true : false}
              helperText={
                errors.pharmacyFaxNumber
                  ? errors.pharmacyFaxNumber.message
                  : null
              }
              {...register("pharmacyFaxNumber", {
                pattern: { value: /^\d+$/, message: "Invalid Fax Number" },
                required: {
                  value: false,
                  message: "Pharmacy Fax Number is not required",
                },
                minLength: {
                  value: 8,
                  message: " Min length is 8, Don't Forget the area code",
                },
                maxLength: {
                  value: 10,
                  message: " Max length is 10, Don't Forget the area code",
                },
              })}
            />
          </Box>

          {/* Supervising Pharmacist Name */}
          <Box mb={2}>
            <TextField
              fullWidth
              type="text"
              id="supervisingPharmacist"
              label="Supervising Pharmacist Name"
              size="small"
              variant="outlined"
              placeholder="Supervising Pharmacist Name"
              error={errors.supervisingPharmacist ? true : false}
              helperText={
                errors.supervisingPharmacist
                  ? errors.supervisingPharmacist.message
                  : null
              }
              {...register("supervisingPharmacist", {
                required: {
                  value: true,
                  message: "Supervising Pharmacist Name is required",
                },
                minLength: { value: 5, message: " Min length is 5" },
              })}
            />
          </Box>

          {/* Superintendent Pharmacist Name */}
          <Box mb={2}>
            <TextField
              fullWidth
              type="text"
              id="superintendentPharmacist"
              label="Superintendent Pharmacist Name"
              size="small"
              variant="outlined"
              placeholder="Superintendent Pharmacist Name"
              error={errors.superintendentPharmacist ? true : false}
              helperText={
                errors.superintendentPharmacist
                  ? errors.superintendentPharmacist.message
                  : null
              }
              {...register("superintendentPharmacist", {
                required: {
                  value: true,
                  message: "Superintendent Pharmacist Name is required",
                },
                minLength: { value: 5, message: " Min length is 5" },
              })}
            />
          </Box>

          {/* Pharmacy Owner */}
          <Box mb={2}>
            <TextField
              fullWidth
              type="text"
              id="pharmacyOwner"
              label="Pharmacy Owner"
              size="small"
              variant="outlined"
              placeholder="Pharmacy Owner"
              error={errors.pharmacyOwner ? true : false}
              helperText={
                errors.pharmacyOwner ? errors.pharmacyOwner.message : null
              }
              {...register("pharmacyOwner", {
                required: {
                  value: true,
                  message: "Pharmacy Owner is required",
                },
                minLength: { value: 5, message: " Min length is 5" },
              })}
            />
          </Box>

          {/* VAT Number */}
          <Box mb={2}>
            <TextField
              fullWidth
              type="text"
              id="vatNumber"
              label="VAT Number"
              size="small"
              variant="outlined"
              placeholder="VAT Number"
              error={errors.vatNumber ? true : false}
              helperText={errors.vatNumber ? errors.vatNumber.message : null}
              {...register("vatNumber", {
                required: { value: true, message: "Vat Number is required" },
                minLength: { value: 8, message: " Min length is 8" },
              })}
            />
          </Box>

          {/* Manage Loading Icon */}
          <Box justifyContent="center" sx={{ display: "flex" }}>
            {isLoading && <CircularProgress />}
          </Box>

          {/* Manage Error Messages */}
          <Box>{error && <Typography variant="h6">{error}</Typography>}</Box>
          
          {/* Manage the button state based on user actions */}
          <Box mb={2}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={isSubmitting}
            >
              Create Account
            </Button>

            <Box mt={1} textAlign="center">
              <Button type="button" variant="text" onClick={() => reset()}>
                Reset
              </Button>
            </Box>
          </Box>
        </form>
        {/* To manage the devtool visuals */}
        <DevTool control={control} />
      </Paper>
    </Box>
  );
};

export default SignUpForm;
