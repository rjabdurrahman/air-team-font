import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import LoadingOverlay from "react-loading-overlay";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

function ResetPassword(props) {
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };
  let query = useQuery();

  const [isVerified, setIsVerified] = useState(false);
  const [loader, setLoader] = useState(false);
  const [state, setState] = useState({
    token: "",
    name: "",
    password_: "",
    cpassword_: "",
    errors: {}
  });
  const [step, setStep] = useState(1);

  const handleChange = e => {
    const value = e.target.value;
    setState({
      ...state,
      [e.target.name]: value
    });
  };

  const validationSchema = Yup.object().shape({
    password_: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required")
      .matches(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$",
        "Password must contain  upper and lower letter, 1 symbol and 1number"
      ),
    cpassword_: Yup.string()
      .oneOf([Yup.ref("password_"), null], "Passwords must match")
      .required("Confirm Password is required")
  });

  const { register, handleSubmit, watch, errors } = useForm({
    resolver: yupResolver(validationSchema)
  });

  const handleSubmitClick = e => {
    // e.preventDefault();
    if (state.password_ != "" && state.password_ == state.cpassword_) {
      setLoader(true);
      let payload = { token: query.get("token"), password: state.password_ };

      axios
        .post(
          process.env.REACT_APP_API_BASE_URL + "/auth/reset_password",
          payload
        )
        .then(res => {
          setLoader(false);
          setStep(3);
          NotificationManager.success(
            "Your password has been updated successfully.",
            "Reset Password !!!"
          );
        })
        .catch(error => {
          setLoader(false);
          if (error.response != "undefined" && error.response) {
            if (error.response.data.errors.message.length) {
              NotificationManager.error(
                error.response.data.errors.message,
                error.response.data.errors.title
              );
            }
          }
        });
    } else {
      NotificationManager.error(
        "Password and Confirm Password are required.",
        "Reset Password !!!"
      );
    }
  };

  useEffect(() => {
    setLoader(true);
    var resetToken = query.get("token");
    setState({ token: resetToken });
    let payload = { token: resetToken };

    axios
      .post(
        process.env.REACT_APP_API_BASE_URL + "/auth/verify_reset_token",
        payload
      )
      .then(res => {
        setLoader(false);
        setState({ name: res.data.name });
      })
      .catch(error => {
        setLoader(false);
        setStep(2);

        if (error.response != "undefined" && error.response) {
          if (error.response.data.errors.message.length) {
            NotificationManager.error(
              error.response.data.errors.message,
              error.response.data.errors.title
            );
          }
        }
      });
  }, []);

  if (step == 1) {
    return (
      <>
        <LoadingOverlay active={loader} spinner text="Loading...">
          <NotificationContainer />
          <div className="container" style={{ margin: "100px auto" }}>
            <div className="row">
              <div className="col-xl-4 offset-xl-4">
                <div className="login-register-page">
                  {/* Welcome Text */}
                  <div className="welcome-text" style={{ textAlign: "center" }}>
                    <h3 style={{ fontSize: "26px", textAlign: "center" }}>
                      Reset Password
                    </h3>
                    <br />
                    <span>
                      Hello{" "}
                      <b style={{ textTransform: "capitalize" }}>
                        {state.name}
                      </b>
                      , Please enter your password 2x below to reset
                    </span>
                    <br />
                  </div>
                  {/* Form */}
                  <form id="register-account-form">
                    <div
                      className={`notification error  notification1 ${
                        errors.password_ ? "form-error" : ""
                      } `}
                    >
                      {errors.password_ ? errors.password_.message : ""}
                    </div>

                    <div
                      className="input-with-icon-left"
                      title="Should be at least 8 characters long"
                      data-tippy-placement="bottom"
                    >
                      <i
                        className={`icon-feather-user ${
                          errors.password_ ? "form-error-txtbox" : ""
                        }`}
                      />
                      <input
                        type="password"
                        className={`input-text with-border  ${
                          errors.password_ ? "form-error-txtbox" : ""
                        }`}
                        placeholder="Create  a password"
                        required
                        name="password_"
                        value={state.password}
                        onChange={handleChange}
                        ref={register({ required: true })}
                      />
                    </div>

                    <div
                      className={`notification error  notification1 ${
                        errors.cpassword_ ? "form-error" : ""
                      } `}
                    >
                      {errors.cpassword_ ? errors.cpassword_.message : ""}
                    </div>

                    <div
                      className="input-with-icon-left"
                      title="Should be at least 8 characters long"
                      data-tippy-placement="bottom"
                    >
                      <i
                        className={`icon-feather-user ${
                          errors.cpassword_ ? "form-error-txtbox" : ""
                        }`}
                      />{" "}
                      <input
                        type="password"
                        className="input-text with-border"
                        placeholder="Confirm a password"
                        required
                        className={`input-text with-border  ${
                          errors.password_ ? "form-error-txtbox" : ""
                        }`}
                        name="cpassword_"
                        value={state.cpassword}
                        onChange={handleChange}
                        ref={register({ required: true })}
                      />
                    </div>
                    {/* Button */}
                    <button
                      className="button full-width button-sliding-icon ripple-effect margin-top-10"
                      type="submit"
                      onClick={handleSubmit(handleSubmitClick)}
                    >
                      Reset Password
                      <i className="icon-material-outline-arrow-right-alt" />
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </LoadingOverlay>
      </>
    );
  } else if (step == 2) {
    return (
      <>
        <LoadingOverlay active={loader} spinner text="Loading...">
          <NotificationContainer />

          <div className="container" style={{ margin: "100px auto" }}>
            <div className="row">
              <div className="col-xl-6 offset-xl-3">
                <div className="login-register-page">
                  <div className="welcome-text">
                    <h3 align="center" style={{ color: "#de5959" }}>
                      Reset Password.
                    </h3>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <i
                      style={{ fontSize: "150px", color: "#ff0000" }}
                      className="icon-feather-lock"
                    />
                    <div
                      className="notification error"
                      style={{ boxShadow: "none" }}
                    >
                      Something went wrong, Your rest token might be expired or
                      invalid token, Please try again.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </LoadingOverlay>
      </>
    );
  } else if (step == 3) {
    return (
      <>
        <LoadingOverlay active={loader} spinner text="Loading...">
          <NotificationContainer />

          <div className="container" style={{ margin: "100px auto" }}>
            <div className="row">
              <div className="col-xl-6 offset-xl-3">
                <div className="login-register-page">
                  <div className="welcome-text">
                    <h3 align="center" style={{ color: "#5f9025" }}>
                      Reset Password.
                    </h3>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <i
                      style={{ fontSize: "150px", color: "green" }}
                      className="icon-line-awesome-check-circle"
                    />
                    <div
                      className="notification success"
                      style={{ boxShadow: "none" }}
                    >
                      Your password has been updated, Please continue to login.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </LoadingOverlay>
      </>
    );
  }
}

export default ResetPassword;
