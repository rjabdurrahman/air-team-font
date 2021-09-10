import React, { useState, useRef } from "react";
import axios from "axios";
import LoadingOverlay from "react-loading-overlay";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";

// export default function Register(props) {
const Register = props => {
  const [loader, setLoader] = useState(false);
  const [state1, setState] = useState(props.state);
  const [error, setError] = useState({});

  const handleChange = e => {
    const value = e.target.value;
    setState({
      ...state1,
      [e.target.name]: value
    });
  };

  //form validation start
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("* Name is required"),
    isCompany: Yup.string()
      .required("* Field is required")
      .nullable(),
    email: Yup.string()
      .required("* Email is required")
      .email("* Email is invalid"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required")
      .matches(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$",
        "Password must contain  upper and lower letter, 1 symbol and 1number"
      )
  });

  const { register, handleSubmit, watch, errors } = useForm({
    resolver: yupResolver(validationSchema)
  });
  //form validation end

  const handleSubmitClick = e => {
    // e.preventDefault();
    // console.log("state2", state1);
    if (
      state1.name != "" &&
      state1.email != "" &&
      state1.password != "" &&
      state1.isCompany != ""
    ) {
      sendRegisterRequest();
    } else {
      NotificationManager.error("Sign Up Error", "All fields are required.");
    }
  };

  const sendRegisterRequest = () => {
    // console.log("state1", state1);
    if (state1.email != undefined && state1.password.length) {
      let isCompany = false;
      if (state1.isCompany == "Yes") isCompany = true;
      const payload = {
        name: state1.name,
        email: state1.email,
        password: state1.password,
        isCompany: isCompany
      };

      if (
        localStorage.getItem("POST_PROJECT_SOMETHING_ELSE") ||
        localStorage.getItem("POST_PROJECT")
      ) {
        payload.user_role = "Client";
      }

      setState({ isCompany: isCompany });
      setLoader(true);
      axios
        .post(process.env.REACT_APP_API_BASE_URL + "/users", payload)
        .then(function(res) {
          setLoader(false);
          props.handleData(state1); // send data to parent Page
          props.modalRegRef.current.close(); //  close model
        })
        .catch(function(error) {
          if (error.response != "undefined" && error.response) {
            if (error.response.data.errors.message.length) {
              NotificationManager.error(
                error.response.data.errors.message,
                error.response.data.errors.title
              );
            }
          }

          setLoader(false);
        });
    } else {
      // console.log("Please enter valid username and password");
      NotificationManager.error("Sign Up Error", "All fields are required.");
    }
  };

  return (
    <>
      <style>
        {
          ".google-login{width:225px !important;margin:0;padding:0}\
          .facebook-login{width:225px !important;margin:0;padding:0;margin-top:0}"
        }
      </style>
      <LoadingOverlay active={loader} spinner text="Loading...">
        <div className="" style={{ padding: "20px !important" }}>
          {/* <div
            className="section-headline  margin-bottom-5"
            style={{
              padding: "0",
              textAlign: "right",
              width: "100%",
              cursor: "pointer"
            }}
          >
            <i
              className="icon-line-awesome-close"
              onClick={props.modalRegRef.current.close()}
            ></i>
          </div> */}
          {/* Welcome Text */}
          <div className="welcome-text margin-top-25">
            <h3 style={{ color: "#2e3a59", fontSize: "22px" }}>
              Sign up to access proposals
            </h3>
            <span
              style={{ color: "#3a3a3c", fontSize: "14px", lineHeight: 1.43 }}
            >
              Create your own secure Air Teams account to post a brief, access
              proposals for your projects and connect with professionals who
              offer bench-marked services.
            </span>
          </div>
          {/* Form */}
          <form id="register-account-form">
            <div
              className={`notification error  notification1 ${
                errors.name ? "form-error" : ""
              } `}
            >
              {errors.name ? errors.name.message : ""}
            </div>

            <div className="input-with-icon-left">
              <i
                className={`icon-feather-user ${
                  errors.password ? "form-error-txtbox" : ""
                }`}
              />
              <input
                type="text"
                name="name"
                className={`input-text with-border  ${
                  errors.password ? "form-error-txtbox" : ""
                }`}
                placeholder="Enter Name"
                required
                value={state1.name}
                onChange={handleChange}
                ref={register({ required: true })}
              />
            </div>

            <div
              className={`notification error  notification1 ${
                errors.email ? "form-error" : ""
              } `}
            >
              {errors.email ? errors.email.message : ""}
            </div>

            <div className="input-with-icon-left">
              <i
                className={`icon-material-baseline-mail-outline ${
                  errors.email ? "form-error-txtbox" : ""
                }`}
              />
              <input
                type="text"
                name="email"
                className={`input-text with-border ${
                  errors.email ? "form-error-txtbox" : ""
                }`}
                placeholder="Enter Email Address"
                required
                id="regEmail"
                value={state1.email}
                onChange={handleChange}
                ref={register({ required: true })}
              />
            </div>

            <div
              className={`notification error  notification1 ${
                errors.password ? "form-error" : ""
              } `}
            >
              {errors.password ? errors.password.message : ""}
            </div>

            <div
              className="input-with-icon-left"
              title="Should be at least 8 characters long"
              data-tippy-placement="bottom"
            >
              <i
                className={`icon-material-outline-lock ${
                  errors.password ? "form-error-txtbox" : ""
                }`}
              />
              <input
                type="password"
                name="password"
                className={`input-text with-border ${
                  errors.password ? "form-error-txtbox" : ""
                }`}
                placeholder="Create  a password"
                required
                id="regPassword"
                value={state1.password}
                onChange={handleChange}
                ref={register({ required: true })}
              />
            </div>

            <div style={{ margin: "10px 0px" }}>
              <p style={{ marginBottom: "0px", fontSize: "14px" }}>
                Do you represent a company?
              </p>

              <div
                className={`notification error  notification1 ${
                  errors.isCompany ? "form-error" : ""
                } `}
              >
                {errors.isCompany ? errors.isCompany.message : ""}
              </div>

              <div className={`radio`}>
                <input
                  id="rdoIsCompany-Y"
                  name="isCompany"
                  type="radio"
                  value="Yes"
                  defaultChecked
                  checked={state1.isCompany === "Yes"}
                  onChange={handleChange}
                  ref={register({ required: true })}
                />
                <label htmlFor="rdoIsCompany-Y">
                  <span className="radio-label" /> Yes
                </label>
              </div>
              <div className="radio" style={{ marginLeft: "30px" }}>
                <input
                  id="rdoIsCompany-N"
                  name="isCompany"
                  type="radio"
                  value="No"
                  checked={state1.isCompany === "No"}
                  onChange={handleChange}
                  ref={register({ required: true })}
                />
                <label htmlFor="rdoIsCompany-N">
                  <span className="radio-label" /> No
                </label>
              </div>
            </div>
            {/* Button */}
            <button
              className="button full-width button-sliding-icon ripple-effect margin-top-10"
              type="submit"
              onClick={handleSubmit(handleSubmitClick)}
            >
              Get Started{" "}
              <i className="icon-material-outline-arrow-right-alt" />
            </button>
          </form>
          {/* Social Login */}
          <p
            style={{
              textAlign: "center",
              marginTop: "30px",
              marginBottom: "0px"
            }}
          >
            Or continue with your social profile
          </p>
          <div
            className="social-login-separator"
            style={{ margin: "10px 0" }}
          />
          <div className="social-login-buttons">
            <button className="facebook-login ripple-effect">
              <i className="icon-brand-facebook-f" /> Register via Facebook
            </button>
            <button
              className="google-login ripple-effect"
              style={{ marginTop: "0px", marginLeft: "10px" }}
            >
              <i className="icon-brand-google-plus-g" /> Register via Google+
            </button>
          </div>
          <div
            className="social-login-separator"
            style={{ margin: "10px 0" }}
          />
        </div>
      </LoadingOverlay>
    </>
  );
};

export default Register;
