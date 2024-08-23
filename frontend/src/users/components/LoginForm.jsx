import { useEffect, useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { DevTool } from "@hookform/devtools";

import { AuthContext } from "../../shared/context/AuthContext";
import { medishortsService } from "../../services/medishorts-service";

const LoginForm = () => {
  // Gain access to object properties from the AuthContextProvider
  const  auth  = useContext(AuthContext);

  // Set States for loading and error
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
  const onSubmitAuthRequest = async (data) => {
    setError(null);
    setIsLoading(true);
    console.log(data);
    console.log("Log in process began");
    const response = await medishortsService.loginUser(
      data.email,
      data.password
    );
    setIsLoading(false);
    console.log(response);
    if (response.state !== true) {
      setError(response.error);
      console.log(response.error);
    }

    if (response.state === true) {
      console.log("Login Successful");
      console.log(response.user.id);
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
    <div>
      <h2>Login To Your Account</h2>
      {/* Form Submission logic and using the handleSubmit method from useForm */}
      <form onSubmit={handleSubmit(onSubmitAuthRequest, onError)} noValidate>
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
        {isLoading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {/* Manage the button state based on user actions */}
        <button disabled={!isDirty || !isValid || isSubmitting}>Login</button>
        <button type="button" onClick={() => reset()}>
          Reset
        </button>
      </form>
      {/* To manage the devtool visuals */}
      <DevTool control={control} />
    </div>
  );
};

export default LoginForm;
