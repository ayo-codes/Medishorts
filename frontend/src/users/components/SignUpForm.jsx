import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

const SignUpForm = () => {
  const defaultValues = async () => {
    return {
      email: "",
      password: "",
      pharmacyName: "",
    };
  };

  // The destructing of values from the useForm hook
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isDirty, isValid, isSubmitting, isSubmitSuccessful },
    control,
    reset,
  } = useForm({ defaultValues });

  // Function to handle the form submission
  const onSubmitAuthRequest = (data) => {
    console.log(data);
    console.log("Signing up process began");
  };

  // Function to handle Errors
  const onError = (errors) => console.log("Form Errors", errors);

    // useEffect to handle the form reset
    useEffect(() => {
      if (isSubmitSuccessful) {
        reset();
      }
    }, [isSubmitSuccessful , reset]);

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
            pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ , message: "Invalid Email" },
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
        <button type="button" onClick={() => reset()}>
          Reset
        </button>
                {/* Manage the button state based on user actions */}
        <button type="submit" disabled={!isDirty || !isValid || isSubmitting} >
          Sign Up
        </button>
      </form>
      {/* To manage the devtool visuals */}
      <DevTool control={control} />
    </div>
  );
};

export default SignUpForm;