import { useEffect, useState, useContext } from "react";
import { useNavigate ,Link } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import PropTypes from "prop-types";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

import { DevTool } from "@hookform/devtools";

import {
  TextField,
  Box,
  Stack,
  Typography,
  Paper,
  CircularProgress,
  Button,
  InputAdornment,
  RadioGroup, 
  FormControlLabel, 
  Radio, 
  FormHelperText
} from "@mui/material";



import { AuthContext } from "../../shared/context/AuthContext";
import { medishortsService } from "../../services/medishorts-service";

const ProductRequestUpdateForm = (props) => {
  const auth = useContext(AuthContext);
  console.log(auth);
  const productRequestId = props.productRequestId;
  console.log(productRequestId);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [loadedProductRequest, setLoadedProductRequest] = useState({});

  const navigate = useNavigate();

  const navigateBackOrHome = () => {
    const origin = location.state?.intent?.pathname || "/product-requests";
    console.log(origin);
    navigate(origin);
  };

  // Find the product request to update
  useEffect(() => {
    const sendRequest = async () => {
      setIsLoading(true);
      const response = await medishortsService.getProductRequestById(
        productRequestId,
        { headers: { Authorization: `Bearer ${auth.token}` } }
      );
      console.log(response.productRequest);

      if (response.state !== true) {
        setIsLoading(false);
        setError(response.error);
        console.log(response.error);
      }

      if (response.state === true) {
        setLoadedProductRequest(response.productRequest);
        console.log(response.productRequest);
        setIsLoading(false);
        setError(null);
      }
    };
    sendRequest();
  }, [productRequestId, auth.token]);

  // The destructing of values from the useForm hook
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isDirty, isValid, isSubmitting, isSubmitSuccessful },
    control,
    reset,
  } = useForm({ defaultValues: loadedProductRequest });

  // Watch the productName input
  watch("productName");

  // Function to handle the form submission
  const onSubmitUpdateProductRequest = async (data) => {
    setError(null);
    setIsLoading(true);
    console.log(data);
    console.log("Product Request process began");
    const response = await medishortsService.updateProductRequest(
      productRequestId,
      data.productName,
      data.genericName,
      data.costPrice,
      data.expiryDate,
      data.shortProduct,
      data.quantity,
      { headers: { Authorization: `Bearer ${auth.token}` } }
    );
    setIsLoading(false);
    console.log(response);
    if (response.state !== true) {
      setError(response.error);
      console.log(response.error);
    }

    if (response.state === true) {
      console.log(response.message);
      console.log(response.productRequest);
      console.log("Product Request updated successfully");
      navigateBackOrHome();
    }
  };

  // Function to handle Errors
  const onError = (errors) => console.log("Form Errors", errors);

  // Update form default values when loadedProductRequest changes
  useEffect(() => {
    if (loadedProductRequest) {
      reset({
        productName: loadedProductRequest.productName,
        genericName: loadedProductRequest.genericName,
        costPrice: loadedProductRequest.costPrice,
        expiryDate: loadedProductRequest.expiryDate,
        shortProduct: loadedProductRequest.shortProduct,
        quantity: loadedProductRequest.quantity,
      });
    }
  }, [loadedProductRequest, reset]);

  // useEffect to handle the form reset
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  if (!loadedProductRequest) {
    return <h2>Product Request not found</h2>;
  }
  return (
    <Box
      component="div"
      display="flex"
      justifyContent="center"
      // alignItems="center"
      height="100vh"
      m={1}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          maxWidth: 600,
          width: "100%",
          maxHeight: "90vh",
          overflow: "auto",
        }}
      >
        {/* Form Submission logic and using the handleSubmit method from useForm */}
        {!isLoading && loadedProductRequest && (
          <form
            onSubmit={handleSubmit(onSubmitUpdateProductRequest, onError)}
            noValidate
          >
            {/* Product Name */}
            <Box mb={2}>
              <TextField
                autoFocus={true}
                fullWidth
                type="text"
                id="productName"
                // label="Product Name"
                size="small"
                variant="outlined"
                placeholder="Product Name"
                error={errors.productName ? true : false}
                helperText={
                  errors.productName ? errors.productName.message : null
                }
                {...register("productName", {
                  required: {
                    value: true,
                    message: "Product Name is required",
                  },
                  minLength: { value: 5, message: "Min length is 5" },
                })}
              />
            </Box>

            {/* Generic Name */}
            <Box mb={2}>
              <TextField
                autoFocus={true}
                fullWidth
                type="text"
                id="genericName"
                // label="Generic Name"
                size="small"
                variant="outlined"
                placeholder="Generic Name"
                error={errors.genericName ? true : false}
                helperText={
                  errors.genericName ? errors.genericName.message : null
                }
                {...register("genericName", {
                  required: {
                    value: true,
                    message: "Generic Name is required",
                  },
                  minLength: { value: 5, message: " Min length is 5" },
                })}
              />
            </Box>

            {/* Cost Price */}
            <Box mb={2}>
              <TextField
                type="number"
                autoFocus={true}
                step={0.01}
                id="costPrice"
                label="€ Cost Price"
                size="small"
                variant="outlined"
                placeholder="€ Cost Price"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">€</InputAdornment>
                  ),
                }}
                sx={{
                  "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
                    { display: "none" },
                  "& input[type=number]": { MozAppearance: "textfield" },
                }}
                error={errors.costPrice ? true : false}
                helperText={errors.costPrice ? errors.costPrice.message : null}
                {...register("costPrice", {
                  valueAsNumber: true,
                  required: { value: true, message: "Cost Price is required" },
                  maxLength: { value: 6, message: "Max length is 6" },
                })}
              />
            </Box>

            {/* Quantity */}
          <Box mb={2}>
            <TextField
              type="number"
              size="small"
              variant="outlined"
              id="quantity"
              // label="Quantity"
              placeholder="Quantity"
              error={errors.quantity ? true : false}
              helperText={errors.quantity ? errors.quantity.message : null}
              step={1}
              sx={{
                "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
                  { display: "none" },
                "& input[type=number]": { MozAppearance: "textfield" },
              }}
              {...register("quantity", {
                required: { value: true, message: "Quantity is required" },
                minLength: { value: 1, message: " Min length is 1" },
              })}
            />
          </Box>

            <Controller
              name="expiryDate"
              control={control}
              rules={{
                disabled: watch("costPrice") === "",
                valueAsDate: true,
                required: { value: true, message: "Expiry Date is required" },
              }}
              render={({ field: { onChange } }) => (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    
                    fullWidth
                    type="date"
                    size="small"
                    variant="outlined"
                    id="expiryDate"
                    label="Expiry Date"
                    onChange={onChange}
                    error={errors.expiryDate ? true : false}
                    helperText={
                      errors.expiryDate ? errors.expiryDate.message : null
                    }
                  />
                </LocalizationProvider>
              )}
            />

                      {/* Radio Group */}
          <Box mt={2} mb={2}>
            <Typography variant="body1">Is this product short?</Typography>
            <RadioGroup
              row
              aria-label="shortProduct"
              name="shortProduct"
              defaultValue={loadedProductRequest ? loadedProductRequest.shortProduct : "false"}
            >
              <FormControlLabel
                value="true"
                control={<Radio />}
                label="Yes"
                {...register("shortProduct", { required: "This field is required" })}
              />
              <FormControlLabel
                value="false"
                control={<Radio />}
                label="No"
                {...register("shortProduct", { required: "This field is required" })}
              />
            </RadioGroup>
            {errors.shortProduct && (
              <FormHelperText error>{errors.shortProduct.message}</FormHelperText>
            )}
          </Box>

            {/* Expiry Date */}

            {/* <label htmlFor="expiryDate"> Expiry Date</label>
            <input
              type="date"
              id="expiryDate"
              {...register("expiryDate", {
                disabled: watch("costPrice") === "",
                valueAsDate: true,
                required: { value: true, message: "Expiry Date is required" },
              })}
            />
            <br />
            <br />
            <span>{errors.expiryDate?.message}</span>
            <br />
            <br /> */}

            {/* Manage Loading Icon */}
            {isLoading && <CircularProgress />}

            {/* Manage Error Messages */}
            <Box>{error && <Typography variant="h6">{error}</Typography>}</Box>

            {/* Manage the button state based on user actions */}
            <Box mt={4} textAlign="center">

            <Link to={"/product-requests/"}>
              <Button>Back</Button>
            </Link>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isSubmitting}
              >
                Update your Product Request
              </Button>

            </Box>
          </form>
        )}

        {/* To manage the devtool visuals */}
        {/* <DevTool control={control} /> */}
      </Paper>
    </Box>
  );
};

ProductRequestUpdateForm.propTypes = {
  productRequestId: PropTypes.string.isRequired,
};

export default ProductRequestUpdateForm;
