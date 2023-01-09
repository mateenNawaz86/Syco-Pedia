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
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../state";
import Dropzone from "react-dropzone";
import FlexBetween from "./FlexBetween";

// Regist Scehma => Used for how form library saving required INFO
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
  name: yup.string().email("Inavlid Email").required("required"),
  password: yup.string().required("required"),
});
const Form = () => {
  return <div>Form</div>;
};

export default Form;
