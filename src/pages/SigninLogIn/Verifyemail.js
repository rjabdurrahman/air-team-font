import React, { useState, useRef } from "react";
// import { CSSTransition } from "react-transition-group";
import axios from "axios";
import LoadingOverlay from "react-loading-overlay";

import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";

// export default function Verifyemail({ props }) {
const Verifyemail = props => {
  const [loader, setLoader] = useState(false);
  const [state, setState] = useState(props.state);

  const resentLink = () => {
    setLoader(true);
    // setState({ email: "rajendra827@gmail.com" });
    // alert(state.email);
    if (state.email.length) {
      const payload = {
        email: state.email
      };
      axios
        .post(
          process.env.REACT_APP_API_BASE_URL + "/users/resend_verify_email",
          payload
        )
        .then(res => {
          setLoader(false);
          if (res.data.status) {
            NotificationManager.success(
              "Verification mail has been sent to your email.",
              "Success!!!"
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
      //alert("Error !!!, Invalid email, Please try again");

      NotificationManager.success(
        "Error !!!",
        "Invalid email, Please try again"
      );
      //   setShowEmailMdl(false);
      //   setShow(false);
    }
  };

  return (
    <>
      {/* <p
        style={{
          textAlign: "center",
          color: "#ccc",
          marginTop: "30px"
        }}
      >
        Didn't receive link?
        <b
          onClick={openModal}
          style={{ color: "#333", fontWeight: 500, cursor: "pointer" }}
        >
          Resend Link
        </b>
      </p> */}
      <LoadingOverlay active={loader} spinner text="Loading...">
        <NotificationContainer />
        <div className="popup-tabs-container">
          {/* Tab */}
          <div className="popup-tab-content" id="tab1">
            {/* Welcome Text */}
            <div className="welcome-text">
              <h3
                className="notification success"
                style={{ background: "none", padding: "0", boxShadow: "none" }}
              >
                <i className="icon-material-outline-check-circle"></i> Email
                Verification
              </h3>
              {/* <span style={{ lineHeight: "25px", marginBottom: "30px" }}></span> */}
              <span style={{ lineHeight: "25px", marginBottom: "30px" }}>
                We have sent you a Verification link on your email ID, Check
                your inbox and follow instructions to verify email.
              </span>
            </div>
            {/* Button */}

            {/* <button
              className="button full-width button-sliding-icon ripple-effect margin-top-10"
              type="submit"
              form="login-form"
            >
              Verify Email{" "}
              <i className="icon-material-outline-arrow-right-alt" />
            </button> */}

            <p
              style={{
                textAlign: "center",
                color: "#ccc",
                marginTop: "30px"
              }}
            >
              Didn't receive link?{" "}
              <b
                onClick={resentLink}
                style={{
                  color: "#333",
                  fontWeight: 500,
                  cursor: "pointer"
                }}
              >
                Resend Link
              </b>
            </p>
            <div
              className="social-login-separator"
              style={{ marginTop: "20px" }}
            />
          </div>
        </div>
      </LoadingOverlay>
    </>
  );
};

export default Verifyemail;
