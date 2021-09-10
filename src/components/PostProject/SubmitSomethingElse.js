import React from "react";
import { NotificationManager } from "react-notifications";
import axios from "axios";

const SubmitSomethingElse = payload => {
  let headerConfig = {
    headers: { authorization: localStorage.getItem("ACCESS_TOKEN") }
  };

  axios
    .post(
      process.env.REACT_APP_API_BASE_URL +
        "/postProject/submit_else_project_request",
      payload,
      headerConfig
    )
    .then(res => {
      if (res.data.errors.message.length) {
        NotificationManager.success(
          res.data.errors.message,
          res.data.errors.title
        );
      }

      localStorage.removeItem("POST_PROJECT");
      localStorage.removeItem("POST_PROJECT_STEP");
      localStorage.removeItem("POST_PROJECT_SOMETHING_ELSE");
      localStorage.setItem(
        "ERROR_MSG",
        "Your project request has been sent to " +
          process.env.REACT_APP_SITE_NAME +
          " cordinator."
      );
      localStorage.setItem("ERROR_CLS", "success");
      window.location = "/postProject";
    })
    .catch(error => {
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

export default SubmitSomethingElse;
