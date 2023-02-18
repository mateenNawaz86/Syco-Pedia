import React, { useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { Formik } from "formik"; // Used for Validation and error messages
import * as yup from "yup"; // JavaScript schema builder for value parsing and validation
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../state/index"; //Method of state for log-in setup
import Dropzone from "react-dropzone"; // upload image or insert any image in your project
import FlexBetween from "./FlexBetween";

// Registor Scehma => Used for how form library saving required INFO
const registerSchema = yup.object().shape({
  name: yup.string().required("required"),
  email: yup.string().email("Invalid email").required("required"),
  password: yup.string().required("required"),
  location: yup.string().required("required"),
  occupation: yup.string().required("required"),
  picture: yup.string().required("required"),
});

// Log-In Schema
const loginSchema = yup.object().shape({
  email: yup.string().email("Inavlid Email").required("required"),
  password: yup.string().required("required"),
});

// Initial values for register
const initialValForRegister = {
  name: "",
  email: "",
  password: "",
  location: "",
  occupation: "",
  picture: "",
};

// Intial values for Log-In
const initialValForLogin = {
  email: "",
  password: "",
};

// Components START here
const Form = () => {
  const [pageType, setPageType] = useState("login"); // state for change the page
  const { palette } = useTheme(); // Do some styling using theme.js
  const dispatch = useDispatch(); // Hook for performing some actions
  const navigate = useNavigate(); // Hooks for navigate to another page

  // Used For Responsiveness
  const isNonResponsive = useMediaQuery("(min-width:600px)");

  // Variables used for different pages
  const isLogin = pageType === "login"; // IF page type is login
  const isRegister = pageType === "register"; // IF page type is register

  // Function for handling the register of new user
  const register = async (values, onSubmitProps) => {
    // This allows us to send form with picture
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value]);
    }
    formData.append("picturePath", values.picture.name);

    // Saved the user info on local storage
    const savedUserResponse = await fetch("http://localhost:5000/api/signup", {
      method: "POST",
      body: formData,
    });

    // save the user response
    const savedUser = await savedUserResponse.json();

    // Reset the form
    onSubmitProps.resetForm();

    // After Register the user set page type to login
    if (savedUser) {
      setPageType("login");
    }
  };

  // Function for control the login page
  const login = async (values, onSubmitProps) => {
    const loggedInResponse = await fetch("http://localhost:5000/api/signin", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(values),
    });

    // Grabe logged-In info
    const loggedIn = await loggedInResponse.json();
    // Reset the form
    onSubmitProps.resetForm();

    // After login user navigate to home page
    if (loggedIn) {
      dispatch(
        setLogin({
          user: loggedIn.user,
          auth__token: loggedIn.auth__token,
        })
      );
      navigate("/home");
    }
  };

  // Function working with the help of FORMIK package
  const submitHandler = async (values, onSubmitProps) => {
    if (isLogin) await login(values, onSubmitProps);
    
    if (isRegister) await register(values, onSubmitProps);
  };

  return (
    <>
      <Formik
        onSubmit={submitHandler}
        initialValues={isLogin ? initialValForLogin : initialValForRegister}
        validationSchema={isLogin ? loginSchema : registerSchema}
      >
        {/* Function write like this just bcoz for validation */}
        {({
          values,
          handleChange,
          handleSubmit,
          errors,
          touched,
          handleBlur,
          setFieldValue, 
          resetForm,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                // IF Show form on mobile screen then each field take full width
                "& > div": {
                  gridColumn: isNonResponsive ? undefined : "span 4",
                },
              }}
            >
              {isRegister && (
                <>
                  <TextField
                    label="Name" // Show a label up the text field
                    onBlur={handleBlur} // Control the active/Unactive of text field
                    onChange={handleChange} // Control the Inputed data to text field
                    value={values.name} // used for getting values using name attribute
                    name="name"
                    error={Boolean(touched.name) && Boolean(errors.name)} // control error
                    helperText={touched.name && errors.name} // IF text field and error
                    sx={{ gridColumn: "span 4" }} // show two column on lage screen
                  />
                  <TextField
                    label="Location" // Show a label up the text field
                    onBlur={handleBlur} // Control the active/Unactive of text field
                    onChange={handleChange} // Control the Inputed data to text field
                    value={values.location} // used for getting values using name attribute
                    name="location"
                    error={
                      Boolean(touched.location) && Boolean(errors.location)
                    } // control error
                    helperText={touched.location && errors.location} // IF text field and error
                    sx={{ gridColumn: "span 4" }} // show two column on lage screen
                  />
                  <TextField
                    label="Occupation" // Show a label up the text field
                    onBlur={handleBlur} // Control the active/Unactive of text field
                    onChange={handleChange} // Control the Inputed data to text field
                    value={values.occupation} // used for getting values using name attribute
                    name="occupation"
                    error={
                      Boolean(touched.occupation) && Boolean(errors.occupation)
                    } // control error
                    helperText={touched.occupation && errors.occupation} // IF text field and error
                    sx={{ gridColumn: "span 4" }} // show two column on lage screen
                  />

                  {/* BOX for image upload */}
                  <Box
                    gridColumn="span 4"
                    border={`1px solid ${palette.neutral.medium}`}
                    borderRadius="5px"
                    p="1rem"
                  >
                    {/* Dropzone used for upload the image */}
                    <Dropzone
                      aceepetedFile=".jpg, .jpeg, .png" // Accept files only with this format
                      multiple={false}
                      onDrop={(
                        acceptedFiles // Method for handling uploading picture
                      ) => setFieldValue("picture", acceptedFiles[0])}
                    >
                      {({ getRootProps, getInputProps }) => (
                        <Box
                          {...getRootProps()} // Only write code like this in MUI
                          border={`2px dotted ${palette.primary.main}`}
                          p="1rem"
                          sx={{ "&:hover": { cursor: "pointer" } }}
                        >
                          {/* Code for uploading a picture  */}
                          <input {...getInputProps()} />
                          {!values.picture ? (
                            <p>Upload your picture</p>
                          ) : (
                            <FlexBetween>
                              <Typography>{values.picture.name}</Typography>
                              <EditIcon />
                            </FlexBetween>
                          )}
                        </Box>
                      )}
                    </Dropzone>
                  </Box>
                </>
              )}

              <TextField
                label="Email" // Show a label up the text field
                onBlur={handleBlur} // Control the active/Unactive of text field
                onChange={handleChange} // Control the Inputed data to text field
                value={values.email} // used for getting values using name attribute
                name="email"
                error={Boolean(touched.email) && Boolean(errors.email)} // control error
                helperText={touched.email && errors.email} // IF text field and error
                sx={{ gridColumn: "span 4" }} // show two column on lage screen
              />
              <TextField
                label="Password" // Show a label up the text field
                type="password" // Hide the password
                onBlur={handleBlur} // Control the active/Unactive of text field
                onChange={handleChange} // Control the Inputed data to text field
                value={values.password} // used for getting values using name attribute
                name="password"
                error={Boolean(touched.password) && Boolean(errors.password)} // control error
                helperText={touched.password && errors.password} // IF text field and error
                sx={{ gridColumn: "span 4" }} // show two column on lage screen
              />
            </Box>

            {/* BUTTONS SECTION START */}
            <Box>
              <Button
                type="submit"
                variant="contained"
                sx={{ margin: "10px 0" }}
              >
                {isLogin ? "LOGIN " : "REGISTER"}
              </Button>
            </Box>
            {/* BUTTONS SECTION END */}

            {/* Typography for switch the pages */}
            <Typography
              onClick={() => {
                setPageType(isLogin ? "register" : "login");
                resetForm();
              }}
              className="underline text-cyan-700 text-base cursor-pointer hover:text-cyan-900"
            >
              {isLogin
                ? "Don't have an account! Sign Up here"
                : "Already have an account! Login here  "}
            </Typography>
          </form>
        )}
      </Formik>
    </>
  );
};

export default Form;
