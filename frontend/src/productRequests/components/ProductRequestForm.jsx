import { useEffect, useContext, useState } from "react";
import PropTypes from "prop-types";
import { useForm, useController, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { DevTool } from "@hookform/devtools";
import DummyProductsData from "../../../../backend/src/dummy_data/productsList/productsList.json";

import {
  TextField,
  Box,
  Autocomplete,
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

const ProductRequestForm = (props) => {
  // Gain access to object properties from the AuthContextProvider
  const auth = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Use Navigate
  const navigate = useNavigate();

  // Product Data List
  const options = DummyProductsData.slice(900, 1000);

  const filterOptions = (options, { inputValue }) => {
    return options.filter((option) =>
      option.productName.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  // Set default values for the form
  const defaultValues = async () => {
    const product = await DummyProductsData[70];
    return {
      // productName: product.productName,
      // genericName: product.genericName,
      productName: "",
      genericName: "",
      costPrice: 0.0,
      quantity: 0,
      expiryDate: null,
      shortProduct: "false",
    };
  };
  // The destructuring of values from the useForm hook
  const {
    onChange,
    register,
    handleSubmit,
    watch,
    formState: { errors, isDirty, isValid, isSubmitting, isSubmitSuccessful },
    control,
    reset,
  } = useForm({ defaultValues });

  // Watch the productName input
  watch("productName");

  // Function to handle the form submission
  const onSubmitCreateProductRequest = async (data) => {
    setSelectedProduct(null);
    setError(null);
    setIsLoading(true);
    console.log(data);
    console.log(selectedProduct);
    console.log("Product Request process began");
    const response = await medishortsService.createProductRequest(
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
      console.log("Product Request created successfully");
      navigate(`/${auth.userId}/product-requests`);
    }
  };

  // Function to handle Errors
  const onError = (errors) => console.log("Form Errors", errors);

  // useEffect to handle the form reset
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        productName: "",
        genericName: "",
        costPrice: 0,
        quantity: 0,
      });
    }
  }, [isSubmitSuccessful, reset, selectedProduct]);

  // use effect to manage the new product selection
  useEffect(() => {
    if (selectedProduct) {
      reset({
        productName: selectedProduct.productName,
        genericName: selectedProduct.genericName,
        costPrice: selectedProduct.costPrice,
      });
    }
  }, [selectedProduct, reset, isSubmitSuccessful]);

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
        <form
          onSubmit={handleSubmit(onSubmitCreateProductRequest, onError)}
          noValidate
        >
          <Box mb={2}>
            <Controller
              onChange={onChange}
              name="productName"
              control={control}
              rules={{
                required: "Product Name is required",
                minLength: { value: 3, message: "Min length is 3" },
              }}
              render={({ field: { onChange, value, ...fieldProps } }) => {
                return (
                  <Autocomplete
                    options={options}
                    inputValue={inputValue}
                    value={selectedProduct} // Set the value prop
                    onInputChange={(event, newInputValue) => {
                      setInputValue(newInputValue);
                    }}
                    onChange={(event, newValue) => {
                      setSelectedProduct(newValue); // Update the state
                      onChange(newValue ? newValue.productName : "");
                    }}
                    getOptionLabel={(option) => option.productName}
                    filterOptions={filterOptions}
                    renderOption={(props, option) => (
                      <li {...props} key={option.barcode + option.productName}>
                        <Box display="flex" flexDirection="column">
                          <Typography variant="body1">
                            {option.productName + " - " + option.packSize}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            {option.manufacturer}
                          </Typography>
                        </Box>
                      </li>
                    )}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        variant="outlined"
                        size="small"
                        id="productName"
                        label={value ? "" : "Product Name"}
                        placeholder={value ? "" : "Product Name"}
                        error={errors.productName ? true : false}
                        helperText={errors.productName?.message}
                      />
                    )}
                    {...fieldProps}
                  />
                );
              }}
            />
          </Box>

          {/* Generic Name */}
          <Box mb={2}>
            <TextField
              fullWidth
              type="text"
              id="genericName"
              label="Generic Name"
              size="small"
              variant="outlined"
              placeholder="Generic Name"
              value={selectedProduct ? selectedProduct.genericName : ""}
              error={errors.genericName ? true : false}
              helperText={
                errors.genericName ? errors.genericName.message : null
              }
              {...register("genericName", {
                required: { value: true, message: "Generic Name is required" },
                minLength: { value: 5, message: " Min length is 5" },
              })}
            />
          </Box>

          {/* Cost Price */}
          <Box mb={2}>
            <TextField
              type="number"
              size="small"
              variant="outlined"
              id="costPrice"
              label="Cost Price"
              placeholder="Cost Price"
              value={selectedProduct ? selectedProduct.costPrice : 0}
              error={errors.costPrice ? true : false}
              helperText={errors.costPrice ? errors.costPrice.message : null}
              step={0.01}
              sx={{
                "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
                  { display: "none" },
                "& input[type=number]": { MozAppearance: "textfield" },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">€</InputAdornment>
                ),
              }}
              {...register("costPrice", {
                required: { value: true, message: "Cost Price is required" },
                minLength: { value: 5, message: " Min length is 5" },
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
              label="Quantity"
              placeholder="Quantity"
              // value={selectedProduct ? selectedProduct.costPrice : 0}
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
            render={({ field: { onChange, value } }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  fullWidth
                  type="date"
                  size="small"
                  variant="outlined"
                  id="expiryDate"
                  label="Expiry Date"
                  value={value}
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
              defaultValue={selectedProduct ? selectedProduct.shortProduct : "false"}
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


    

          {/* Manage Loading Icon */}
          <Box justifyContent="center" sx={{ display: "flex" }}>
            {isLoading && <CircularProgress />}
          </Box>

          {/* Manage Error Messages */}
          <Box>{error && <Typography variant="h6">{error}</Typography>}</Box>

          {/* Manage the button state based on user actions */}
          <Box mt={4} textAlign="center">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isSubmitting}
            >
              Add a Product Request
            </Button>
          </Box>
        </form>

        {/* To manage the devtool visuals */}
        <DevTool control={control} />
      </Paper>
    </Box>
  );
};

ProductRequestForm.propTypes = {};

export default ProductRequestForm;
