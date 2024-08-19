import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

const LoginForm = () => {
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
  const onSubmitAuthRequest = (data) => {
    console.log(data);
  };

  // Function to handle Errors
  const onError = (errors) => console.log("Form Errors", errors);

  return (
    <div>
      {/* Form Submission logic and using the handleSubmit method from useForm */}
      <form onSubmit={handleSubmit(onSubmitAuthRequest, onError)} noValidate>
        <label htmlFor="userEmail">Email</label>
        <input
          type="email"
          id="userEmail"
          {...register("userEmail", {
            pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ , message: "Invalid Email" },
            required: { value: true, message: "Your Email is required" },
            minLength: { value: 5, message: "Min length is 5" },
          })}
          placeholder="Your Email"
        />
        <br />
        <br />
        <span>{errors.userEmail?.message}</span>
        <br />
        <br />
        <label htmlFor="password">Password</label>
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
        {/* Manage the button state based on user actions */}
        <input disabled={!isDirty || !isValid || isSubmitting} type="submit" />
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
