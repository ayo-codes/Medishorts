import React from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import DummyData from "../../../../backend/src/dummy_data/productsList/productsList.json";

const ProductRequestForm = (props) => {
  // Set default values for the form
  const defaultValues = async () => {
    await console.log(DummyData[70]);
    const product = await DummyData[70];
    await console.log(product);
    return {
      productName: product.productName,
      genericName: product.genericName,
    };
  };
  // The destructing of values from the useForm hook
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    control,
  } = useForm({defaultValues});

  // Watch the productName input
  watch("productName");

  // Function to handle the form submission
  const onSubmitCreateProductRequest = (data) => {
    console.log(data);
  };

  console.log(errors);
  return (
    <div>
      {/* Form Submission logic and using the handleSubmit method from useForm */}
      <form onSubmit={handleSubmit(onSubmitCreateProductRequest)} noValidate>
        <label htmlFor="productName">Product Name</label>
        <input
          type="text"
          id="productName"
          {...register("productName", {
            required: { value: true, message: "Product Name is required" },
            minLength: { value: 5, message: "Min length is 5" },
          })}
          // placeholder="Product Name"      
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
        <input type="submit" />
      </form>
      {/* To manage the devtool visuals */}
      <DevTool control={control} />
    </div>
  );
};

ProductRequestForm.propTypes = {};

export default ProductRequestForm;
