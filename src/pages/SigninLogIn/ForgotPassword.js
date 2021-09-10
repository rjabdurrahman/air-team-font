import React, { useState, useRef } from "react";
import axios from "axios";
import LoadingOverlay from "react-loading-overlay";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

function ForgotPassword(props) {
  const [loader, setLoader] = useState(false);
  const [state, setState] = useState({
    femail: ""
  });

  const handleChange = e => {
    const value = e.target.value;
    setState({
      ...state,
      [e.target.name]: value
    });
  };

  //form validation
  const validationSchema = Yup.object().shape({
    femail: Yup.string()
      .required("* Email is required")
      .email("* Email is invalid")
  });

  const { register, handleSubmit, watch, errors } = useForm({
    resolver: yupResolver(validationSchema)
  });

  const onSubmit = data => {
    setLoader(true);
    let payload = { email: data.femail };
    axios
      .post(process.env.REACT_APP_API_BASE_URL + "/auth/forgot_pass", payload)
      .then(res => {
        setLoader(false);
        setState({ femail: "" });

        if (res.data.errors.message.length) {
          NotificationManager.success(
            res.data.errors.message,
            res.data.errors.title
          );
          res.data.errors.message = "";
        }

        setTimeout(function() {
          var closeModal = document.getElementsByClassName("modal-backdrop")[0];
          closeModal.click();
        }, 2000);
      })
      .catch(error => {
        setLoader(false);
        setState({ email: "" });

        if (error.response != "undefined" && error.response) {
          if (error.response.data.errors.message.length) {
            NotificationManager.error(
              error.response.data.errors.message,
              error.response.data.errors.title
            );
          }
        }
      });
  };

  return (
    <div>
      <LoadingOverlay active={loader} spinner text="Loading...">
        <NotificationContainer />
        <div className="login-register-page">
          {/* Welcome Text */}
          <div className="welcome-text">
            <h3 style={{ fontSize: "26px" }}>Reset Your Password</h3>
            <span>
              We need some basic information to get your account setup and
              present you with proposals that best suit your project needs{" "}
            </span>
          </div>
          {/* Form */}
          <form
            id="register-account-form"
            // onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <div
              className={`notification error notification1 ${
                errors.femail ? "form-error" : ""
              } `}
            >
              {errors.femail ? errors.femail.message : ""}
            </div>
            <div className="input-with-icon-left">
              <i
                className={`icon-material-baseline-mail-outline ${
                  errors.femail ? "form-error-txtbox" : ""
                }`}
              />
              <input
                name="femail"
                type="text"
                className={`input - text with-border ${
                  errors.femail ? "form-error-txtbox" : ""
                }`}
                placeholder="Enter Email Address"
                value={state.femail}
                onChange={handleChange}
                ref={register({ required: true })}
              />
            </div>

            {/* Button */}
            <button
              className="button full-width button-sliding-icon ripple-effect margin-top-30"
              type="submit"
              onClick={handleSubmit(onSubmit)}
            >
              Send Reset Link
              <i className="icon-material-outline-arrow-right-alt" />
            </button>
          </form>
        </div>
      </LoadingOverlay>
    </div>
  );
}

export default ForgotPassword;
