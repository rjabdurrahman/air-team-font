import React from "react";
import { Redirect, Route } from "react-router-dom";
import { NotificationManager } from "react-notifications";
import jwt_decode from "jwt-decode";
import axios from "axios";

var userDecodedData;
function PrivateRoute({ children, ...rest }) {
  if (localStorage.getItem("ACCESS_TOKEN")) {
    let headerConfig = {
      headers: { authorization: localStorage.getItem("ACCESS_TOKEN") }
    };
    axios
      .post(
        process.env.REACT_APP_API_BASE_URL + "auth/validateUser",
        {},
        headerConfig
      )
      .then(res => {
        if (res.data.status) {
          userDecodedData = jwt_decode(localStorage.getItem("ACCESS_TOKEN"));
        } else {
          // console.log("else");
          // localStorage.removeItem("ACCESS_TOKEN");
          // localStorage.removeItem("USER_ID");
          // localStorage.removeItem("REFRESH_TOKEN");
          // localStorage.removeItem("POST_PROJECT_STEP");
          // localStorage.removeItem("POST_PROJECT");
          // window.location.href("/");
        }
      })
      .catch(error => {
        console.log("error", error);
        // localStorage.removeItem("ACCESS_TOKEN");
        // localStorage.removeItem("USER_ID");
        // localStorage.removeItem("REFRESH_TOKEN");
        // localStorage.removeItem("POST_PROJECT_STEP");
        // localStorage.removeItem("POST_PROJECT");
        // window.location.href("/");
      });
  }

  userDecodedData = jwt_decode(localStorage.getItem("ACCESS_TOKEN"));
  // console.log("userDecodedData", userDecodedData);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        localStorage.getItem("ACCESS_TOKEN") &&
        userDecodedData !== undefined &&
        userDecodedData.user_role === "Creator"
          ? children
          : (NotificationManager.error(
              "q Invalid Login, Please login again to continue.",
              "Error !!!"
            ),
            (
              <Redirect
                to={{
                  pathname: "/",
                  state: { from: location }
                }}
              />
            ))
      }
    />
  );
}

export default PrivateRoute;
