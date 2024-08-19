import React from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import DummyData from "../../../../backend/src/dummy_data/productsList/productsList.json";

const ProductRequestForm = (props) => {
  // Set default values for the form
  const defaultValues = async () => {
    const product = await DummyData[70];
    return {
      productName: product.productName,
      genericName: product.genericName,
      costPrice: 0.00,
      expiryDate: new Date(),
    };
  };
  // The destructing of values from the useForm hook
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isDirty ,isValid },
    control,
  } = useForm({defaultValues});

  // Watch the productName input
  watch("productName");

  // Function to handle the form submission
  const onSubmitCreateProductRequest = (data) => {
    console.log(data);
  };

  // Function to handle Errors
  const onError = (errors) => console.log("Form Errors", errors);

  return (
    <div>
      {/* Form Submission logic and using the handleSubmit method from useForm */}
      <form onSubmit={handleSubmit(onSubmitCreateProductRequest , onError)} noValidate>
        <label htmlFor="productName">Product Name</label>
        <input
          type="text"
          id="productName"
          {...register("productName", {
            required: { value: true, message: "Product Name is required" },
            minLength: { value: 5, message: "Min length is 5" },
          })}
          placeholder="Product Name"      
        />
        <br />
        <br />
        <span>{errors.productName?.message}</span>
        <br />
        <br />
        <label htmlFor="genericName">Generic Name</label>
        <input
          type="text"
          id="genericName"
          {...register("genericName", {
            required: { value: true, message: "Generic Name is required" },
            minLength: { value: 5, message: " Min length is 5" },
          })}
          placeholder="Generic Name"
        />
        <br />
        <br />
        <span>{errors.genericName?.message}</span>
        <br />
        <br />
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
        <br />
        <label htmlFor="expiryDate"> Expiry Date</label>
        <input
          type="date"
          id="expiryDate"
          {...register("expiryDate", {
            disabled : watch("costPrice") === "",
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
        {/* Manage the button state based on user actions */}
        <input disabled={!isDirty || !isValid } type="submit" />
      </form>
      {/* To manage the devtool visuals */}
      <DevTool control={control} />
    </div>
  );
};

ProductRequestForm.propTypes = {};

export default ProductRequestForm;
