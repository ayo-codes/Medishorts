import { useEffect, useContext, useState } from "react";
import PropTypes from "prop-types";
import { useForm, Controller } from "react-hook-form";

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
      expiryDate: new Date(),
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
              render={({ field: { onChange, ...fieldProps } }) => {
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
                        label="Product Name"
                        placeholder="Product Name"
                        error={errors.productName ? true : false}
                        helperText={errors.productName?.message}
                        {...register("productName", {
                          required: {
                            value: true,
                            message: "Product Name is required",
                          },
                          minLength: { value: 3, message: "Min length is 3" },
                        })}
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
                required: { value: true, message: "Pharmacy Name is required" },
                minLength: { value: 5, message: " Min length is 5" },
              })}
            />
          </Box>

          {/* Cost Price */}

          <Box mb={2}>
            <TextField
              fullWidth
              type="number"
              size="small"
              variant="outlined"
              id="costPrice"
              label="Cost Price"
              placeholder="Cost Price"
              value={selectedProduct ? selectedProduct.costPrice : 0 }
              error={errors.costPrice ? true : false}
              helperText={errors.costPrice ? errors.costPrice.message : null}
              step={0.01}
              sx={{
                "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
                  { display: "none" },
                "& input[type=number]": { MozAppearance: "textfield" },
              }}
              {...register("costPrice", {
                required: { value: true, message: "Pharmacy Name is required" },
                minLength: { value: 5, message: " Min length is 5" },
              })}
            />
          </Box>

          {/* Cost Price
          <label htmlFor="costPrice">CostPrice</label>
          <input
            type="number"
            id="costPrice"
            step={0.01}
            {...register("costPrice", {
              valueAsNumber: true,
              required: { value: true, message: "Cost Price is required" },
              maxLength: { value: 6, message: "Max length is 6" },
            })}
            placeholder="Cost Price"
          />
          <br />
          <br />
          <span>{errors.costPrice?.message}</span>
          <br />
          <br /> */}
          <label htmlFor="expiryDate"> Expiry Date</label>
          <input
            type="date"
            id="expiryDate"
            {...register("expiryDate", {
              disabled: watch("costPrice") === "",
              valueAsDate: true,
              required: { value: true, message: "Expiry Date is required" },
            })}
            placeholder=""
          />
          <br />
          <br />
          <span>{errors.costPrice?.message}</span>
          <br />
          <br />
          {isLoading && <p>Loading...</p>}
          {error && <p>{error}</p>}
          {/* Manage the button state based on user actions */}
          <input
            disabled={!isDirty || !isValid || isSubmitting}
            type="submit"
          />
          <button type="button" onClick={() => reset()}>
            Reset
          </button>
        </form>

        {/* To manage the devtool visuals */}
        <DevTool control={control} />
      </Paper>
    </Box>
  );
};

ProductRequestForm.propTypes = {};

export default ProductRequestForm;
