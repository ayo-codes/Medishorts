import { useEffect, useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { TextField, Box , Stack , Typography , Paper, CircularProgress , Button } from "@mui/material";

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
    <Box component ="div" display="flex" justifyContent="center" alignItems="center" height="50vh"  >
      <Paper elevation={3} sx={{ padding: 4, maxWidth: 400, width: "100%" }}>

        <Typography align="center" variant="h5" gutterBottom>Login To Your Account</Typography>
        {/* Form Submission logic and using the handleSubmit method from useForm */}
        <form onSubmit={handleSubmit(onSubmitAuthRequest, onError)} noValidate>
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
               {/* Manage Loading Icon */}
              <Box justifyContent="center" sx={{display:"flex"}}>
                {isLoading && <CircularProgress />}
              </Box> 

              {/* Manage Error Messages */}
              {error && <Typography variant="h6">{error}</Typography>}
              {/* Manage the button state based on user actions */}
            </Box>

            <Box mb={2}>    
              <Button 
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={isSubmitting}>
                Login
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

export default LoginForm;
