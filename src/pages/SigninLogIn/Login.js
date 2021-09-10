import React, { useState, useRef, Profiler } from "react";
import axios from "axios";
import LoadingOverlay from "react-loading-overlay";
import { NotificationManager } from "react-notifications";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login";
import SubmitProject from "../../components/PostProject/SubmitProject";
import SubmitSomethingElse from "../../components/PostProject/SubmitSomethingElse";
import jwt_decode from "jwt-decode";

//export default function Login(props) {
export default function Login(props) {
  const [loader, setLoader] = useState(false);
  const [state, setState] = useState({
    email: "",
    password: ""
  });

  const handleChange = e => {
    const value = e.target.value;
    setState({
      ...state,
      [e.target.name]: value
    });
  };

  //form validatio
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required("* Email is required")
      .email("* Email is invalid"),
    password: Yup.string().required("Password is required")
  });

  const { register, handleSubmit, watch, errors } = useForm({
    resolver: yupResolver(validationSchema)
  });

  const handleSubmitClick = e => {
    if (state.email != "" && state.password != "") {
      sendLoginRequest();
    } else {
      NotificationManager.error("Email and password are required.", "Error!!!");
    }
  };
  const sendLoginRequest = () => {
    setLoader(true);
    if (state.email != "" && state.password != "") {
      const payload = {
        email: state.email,
        password: state.password
      };
      axios
        .post(process.env.REACT_APP_API_BASE_URL + "/auth", payload)
        .then(res => {
          setLoader(false);
          const loginData = res.data;
          if (loginData.status) {
            setLoginSessions(loginData, res);
          } else {
            NotificationManager.error(
              "Something went wrong, Please try again.",
              "Error !!!"
            );
          }
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
      NotificationManager.error("Email and password are required.", "Error!!!");
    }
  };

  const setLoginSessions = (loginData, res) => {
    localStorage.setItem("ACCESS_TOKEN", loginData.accessToken);
    localStorage.setItem("REFRESH_TOKEN", loginData.refreshToken);
    localStorage.setItem("USER_ID", loginData.userId);

    if (
      localStorage.getItem("POST_PROJECT") &&
      localStorage.getItem("POST_PROJECT_STEP") === "step7"
    ) {
      // update user role to client

      var formData = JSON.parse(localStorage.getItem("POST_PROJECT"));
      var payload = { formData };
      SubmitProject(payload);
    } else if (localStorage.getItem("POST_PROJECT_SOMETHING_ELSE")) {
      // alert("Submit POST_PROJECT_SOMETHING_ELSE");
      var payload = JSON.parse(
        localStorage.getItem("POST_PROJECT_SOMETHING_ELSE")
      );
      SubmitSomethingElse(payload);

      // update user role to client
    } else {
      if (res.data.errors.message.length) {
        NotificationManager.success(
          res.data.errors.message,
          res.data.errors.title
        );
      }

      var userDecodedData = jwt_decode(localStorage.getItem("ACCESS_TOKEN"));
      // if (userDecodedData && userDecodedData.user_role === "Creator") {
      //   // console.log("userDecodedData", userDecodedData);
      // }
      axios
        .get(process.env.REACT_APP_API_BASE_URL + "/users/" + loginData.userId)
        .then(res => {
          if (res.data.user_role === "Creator") {
            if (res.data.profile_status.is_profile_submitted === 0)
              window.location = "/creator-dash/profile";
            else window.location = "/creator-dash";
          } else if (res.data.user_role === "Client") {
            window.location = "/client-dash";
          }
        });
    }
  };

  const handleGoogleLogin = async googleData => {
    setLoader(true);

    if (googleData) {
      let payload = googleData;
      payload.user_role = "Creator";
      if (
        localStorage.getItem("POST_PROJECT_SOMETHING_ELSE") ||
        localStorage.getItem("POST_PROJECT")
      ) {
        payload.user_role = "Client";
      }
      axios
        .post(process.env.REACT_APP_API_BASE_URL + "/auth/googleLogin", payload)
        .then(res => {
          setLoader(false);
          let loginData = res.data;
          if (res.data.status) setLoginSessions(loginData, res);
        })
        .catch(err => {
          setLoader(false);
        });
    }
  };

  const responseFacebook = facebookData => {
    // console.log("responseFacebook", facebookData);
    if (facebookData) {
      let payload = facebookData;
      payload.user_role = "Creator";
      if (
        localStorage.getItem("POST_PROJECT_SOMETHING_ELSE") ||
        localStorage.getItem("POST_PROJECT")
      ) {
        payload.user_role = "Client";
      }

      axios
        .post(process.env.REACT_APP_API_BASE_URL + "/auth/fbLogin", payload)
        .then(res => {
          setLoader(false);
          let loginData = res.data;
          if (res.data.status) setLoginSessions(loginData, res);
        })
        .catch(err => {
          setLoader(false);
        });
    }
  };

  const openForgotPassword = () => {
    props.modalFPRef.current.open();
    props.modalSignRef.current.close();
  };
  return (
    <>
      <LoadingOverlay active={loader} spinner text="Signing In...">
        <div className="sign-in-form">
          <div className="popup-tabs-container">
            {/* Tab */}
            <div className="popup-tab-content" id="tab1">
              {/* Welcome Text */}
              <div className="welcome-text margin-top-25">
                <h3 style={{ color: "#2e3a59", fontSize: "22px" }}>
                  Sign in to your account
                </h3>
                <span style={{ color: "#3a3a3c", fontSize: "14px" }}>
                  Sign in to your Air Teams account to complete the process and
                  submit your brief.
                </span>
              </div>
              {/* Form */}
              <form id="login-form">
                <div
                  className={`notification error  notification1 ${
                    errors != undefined &&
                    errors.email != undefined &&
                    errors.email
                      ? "form-error"
                      : ""
                  } `}
                >
                  {errors.email ? errors.email.message : ""}
                </div>

                <label
                  style={{
                    color: "#2e3a59",
                    fontSize: "16px",
                    fontWeight: "bold"
                  }}
                >
                  Email ID
                </label>

                <input
                  name="email"
                  type="text"
                  className={`input - text  ${
                    errors.email ? "form-error-txtbox" : ""
                  }`}
                  placeholder="Email Address"
                  value={state.email}
                  onChange={handleChange}
                  ref={register({ required: true })}
                />

                <div
                  className={`notification error  notification1 ${
                    errors.password ? "form-error" : ""
                  } `}
                >
                  {errors.password ? errors.password.message : ""}
                </div>

                <label
                  style={{
                    color: "#2e3a59",
                    fontSize: "16px",
                    fontWeight: "bold"
                  }}
                >
                  Password
                </label>
                <input
                  name="password"
                  type="password"
                  className={`input - text  ${
                    errors.password ? "form-error-txtbox" : ""
                  }`}
                  placeholder="Password"
                  value={state.password}
                  onChange={handleChange}
                  ref={register({ required: true })}
                />

                <a
                  className="forgot-password margin-top-20 margin-bottom-20"
                  // onClick={props.modalFPRef.current.open}
                  onClick={openForgotPassword}
                  style={{
                    color: "#ffb92a",
                    fontSize: "14px",
                    fontWeight: 500
                  }}
                >
                  Forgot Password?
                </a>
              </form>
              {/* Button */}
              <button
                className="button full-width margin-top-10"
                onClick={handleSubmit(handleSubmitClick)}
              >
                Sign In
              </button>
              {/* Social Login */}
              <div className="social-login-separator">
                <span>or</span>
              </div>

              <div className="social-login-buttons">
                <FacebookLogin
                  appId={process.env.REACT_APP_FB_APP_ID}
                  fields="name,email,picture"
                  icon="fa-facebook"
                  callback={responseFacebook}
                  cssClass="facebook-login ripple-effect"
                />

                <style>
                  {
                    ".google-login{width:225px !important;margin:0;padding:0}\
                    .facebook-login{width:225px !important;margin:0;padding:0;margin-top:0}"
                  }
                </style>

                <GoogleLogin
                  // className="google-login ripple-effect"
                  clientId={process.env.REACT_APP_GMAIL_CLIENT_ID}
                  buttonText="Log in with Google"
                  onSuccess={handleGoogleLogin}
                  onFailure={handleGoogleLogin}
                  cookiePolicy={"single_host_origin"}
                  render={renderProps => (
                    <button
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}
                      className="google-login ripple-effect"
                    >
                      <i className="icon-brand-google-plus-g"></i> Log In via
                      Google+
                    </button>
                  )}
                />

                {/* <button className="google-login ripple-effect">
                  <i className="icon-brand-google-plus-g" /> Log In via Google+
                </button> */}
              </div>
              <div className="social-login-separator" />
              {/* <p style={{ textAlign: "center", color: "#ccc" }}>
                Dont have an account?{" "}
                <b style={{ color: "#333", fontWeight: 500 }}>Sign Up</b>
              </p> */}
            </div>
          </div>
        </div>
      </LoadingOverlay>
    </>
  );
}
