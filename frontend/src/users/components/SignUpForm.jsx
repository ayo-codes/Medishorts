import { useEffect, useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { DevTool } from "@hookform/devtools";

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
      auth.login(response.user.id , response.token);
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
    <div>
      <h2>Sign Up For Your Account</h2>
      {/* Form Submission logic and using the handleSubmit method from useForm */}
      <form onSubmit={handleSubmit(onSubmitAuthRequest, onError)} noValidate>
        {/* Email */}
        <label htmlFor="Email">Email</label>
        <input
          type="email"
          id="email"
          {...register("email", {
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Invalid Email",
            },
            required: { value: true, message: "Your Email is required" },
            minLength: { value: 5, message: "Min length is 5" },
          })}
          placeholder="Your Email"
        />
        <br />
        <br />
        <span>{errors.email?.message}</span>
        <br />
        <br />
        {/* Password */}
        <label htmlFor="Password">Password</label>
        <input
          type="password"
          id="password"
          {...register("password", {
            required: { value: true, message: "Password is required" },
            minLength: { value: 5, message: " Min length is 5" },
          })}
          placeholder="Password"
        />
        <br />
        <br />
        <span>{errors.password?.message}</span>
        <br />
        <br />
        {/* Pharmacy Name */}
        <label htmlFor="Pharmacy Name">Pharmacy Name</label>
        <input
          type="text"
          id="pharmacyName"
          {...register("pharmacyName", {
            required: { value: true, message: "Pharmacy Name is required" },
            minLength: { value: 5, message: " Min length is 5" },
          })}
          placeholder="Pharmacy Name"
        />
        <br />
        <br />
        <span>{errors.pharmacyName?.message}</span>
        <br />
        <br />
        {/* Pharmacy Address */}
        <label htmlFor="Pharmacy Address">Pharmacy Address</label>
        <input
          type="text"
          id="pharmacyAddress"
          {...register("pharmacyAddress", {
            required: { value: true, message: "Pharmacy Address is required" },
            minLength: { value: 5, message: " Min length is 5" },
          })}
          placeholder="Pharmacy Address"
        />
        <br />
        <br />
        <span>{errors.pharmacyAddress?.message}</span>
        <br />
        <br />
        {/* Pharmacy PSI No */}
        <label htmlFor="Pharmacy PSI Number">Pharmacy PSI Number</label>
        <input
          type="number"
          id="pharmacyPSIRegistrationNo"
          {...register("pharmacyPSIRegistrationNo", {
            valueAsNumber: true,
            required: {
              value: true,
              message: "Pharmacy PSI Number is required",
            },
            minLength: { value: 4, message: " Min length is 4" },
          })}
          placeholder="Pharmacy PSI Number"
        />
        <br />
        <br />
        <span>{errors.pharmacyPSIRegistrationNo?.message}</span>
        <br />
        <br />
        {/* Pharmacy Phone Number */}
        <label htmlFor="Pharmacy Phone Number">Pharmacy Phone Number</label>
        <input
          type="text"
          id="pharmacyPhoneNumber"
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
          placeholder="Pharmacy Phone Number"
        />
        <br />
        <br />
        <br />
        <br />
        {/* Pharmacy Fax Number */}
        <label htmlFor="Pharmacy Fax Number">Pharmacy Fax Number</label>
        <input
          type="text"
          id="pharmacyFaxNumber"
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
          placeholder="Pharmacy Fax Number"
        />
        <br />
        <br />
        <span>{errors.pharmacyFaxNumber?.message}</span>
        <br />
        <br />
        {/* Supervising Pharmacist Name */}
        <label htmlFor="Supervising Pharmacist Name">
          Supervising Pharmacist Name
        </label>
        <input
          type="text"
          id="supervisingPharmacist"
          {...register("supervisingPharmacist", {
            required: {
              value: true,
              message: "Supervising Pharmacist Name is required",
            },
            minLength: { value: 5, message: " Min length is 5" },
          })}
          placeholder="Supervising Pharmacist Name"
        />
        <br />
        <br />
        <span>{errors.supervisingPharmacist?.message}</span>
        <br />
        <br />
        {/* Superintendent Pharmacist Name */}
        <label htmlFor="Superintendent Pharmacist Name">
          Superintendent Pharmacist Name
        </label>
        <input
          type="text"
          id="superintendentPharmacist"
          {...register("superintendentPharmacist", {
            required: {
              value: true,
              message: "Superintendent Pharmacist Name is required",
            },
            minLength: { value: 5, message: " Min length is 5" },
          })}
          placeholder="Superintendent Pharmacist Name"
        />
        <br />
        <br />
        <span>{errors.superintendentPharmacist?.message}</span>
        <br />
        <br />
        {/* Pharmacy Owner */}
        <label htmlFor="Pharmacy Owner">Pharmacy Owner</label>
        <input
          type="text"
          id="pharmacyOwner"
          {...register("pharmacyOwner", {
            required: { value: true, message: "Pharmacy Owner is required" },
            minLength: { value: 5, message: " Min length is 5" },
          })}
          placeholder="Pharmacy Owner"
        />
        <br />
        <br />
        <span>{errors.pharmacyOwner?.message}</span>
        <br />
        <br />
        {/* VAT Number */}
        <label htmlFor="VAT Number">VAT Number</label>
        <input
          type="text"
          id="vatNumber"
          {...register("vatNumber", {
            required: { value: true, message: "Vat Number is required" },
            minLength: { value: 8, message: " Min length is 8" },
          })}
          placeholder="VAT Number"
        />
        <br />
        <br />
        <span>{errors.vatNumber?.message}</span>
        <br />
        <br />
        {isLoading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {/* Manage the button state based on user actions */}
        <button type="submit" disabled={!isDirty || !isValid || isSubmitting}>
          Sign Up
        </button>
        <button type="button" onClick={() => reset()}>
          Reset
        </button>
      </form>
      {/* To manage the devtool visuals */}
      <DevTool control={control} />
    </div>
  );
};

export default SignUpForm;
