import { useEffect, useState ,useContext} from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";

import { DevTool } from "@hookform/devtools";
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
    const origin = location.state?.intent?.pathname || "/productRequests";
    console.log(origin);
    navigate(origin);
  };

  
  // Find the product request to update
  useEffect(() => {
    const sendRequest = async () => {
      setIsLoading(true);
      const response =
        await medishortsService.getProductRequestById(productRequestId);
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
  }, [productRequestId]);




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
      data.expiryDate
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
    <div>
      {/* Form Submission logic and using the handleSubmit method from useForm */}
      {!isLoading && loadedProductRequest && (
        <form
          onSubmit={handleSubmit(onSubmitUpdateProductRequest, onError)}
          noValidate
        >
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
              disabled: watch("costPrice") === "",
              valueAsDate: true,
              required: { value: true, message: "Expiry Date is required" },
            })}
          />
          <br />
          <br />
          <span>{errors.expiryDate?.message}</span>
          <br />
          <br />
          {isLoading && <p>Loading...</p>}
          {error && <p>{error}</p>}
          {/* Manage the button state based on user actions */}
          <input disabled={!isValid || isSubmitting} type="submit" />
          <button type="button" onClick={() => reset()}>
            Reset
          </button>
        </form>
      )}

      {/* To manage the devtool visuals */}
      <DevTool control={control} />
    </div>
  );
};

ProductRequestUpdateForm.propTypes = {
  productRequestId: PropTypes.string.isRequired,
};

export default ProductRequestUpdateForm;
