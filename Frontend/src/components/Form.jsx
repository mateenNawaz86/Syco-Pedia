import React, { useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik"; // Used for Validation and error messages
import * as yup from "yup"; // JavaScript schema builder for value parsing and validation
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../state";
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
const Form = () => {
  const [pageType, setPageType] = useState("login");
  const { palatte } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Used For Responsiveness
  const isNonResponsive = useMediaQuery("(min-width:600px)");

  // Variables used for different pages
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";

  // Function working with help of FORMIK package
  const submitHandler = async (values, onSubmitProps) => {};
  return (
    <>
      <Formik
        onSubmit={submitHandler}
        initialValues={isLogin ? initialValForLogin : initialValForRegister}
        validationSchema={isLogin ? loginSchema : registerSchema}
      >
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
          <Form onSubmit={handleSubmit}>
            <Box display="grid" gap="30px"></Box>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default Form;
