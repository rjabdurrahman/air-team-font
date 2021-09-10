import React, { useState } from "react";
import { NotificationManager } from "react-notifications";
import axios from "axios";

const SubmitProject = (payload) => {
  var token = localStorage.getItem("ACCESS_TOKEN");

  if (payload.token != undefined) {
    token = payload.token;
  }

  let headerConfig = {
    headers: {
      authorization: token,
    },
  };

  var payload = payload.formData;

  console.log("payload", payload);

  // main category
  var category = [];
  payload.categories.forEach((element, idx) => {
    category.push({ id: element._id, name: element.name });
  });

  // sub category
  var sub_category = [];
  var subCategories = payload.subCategories;
  if (subCategories.length > 0) {
    subCategories.forEach((subCat, idx) => {
      var subCatIndex = payload.master.subCategories.findIndex(
        (sub) => sub.id === subCat
      );
      if (subCatIndex > -1)
        sub_category.push(payload.master.subCategories[subCatIndex]);
    });
  }

  var newPayload = {
    category: category,
    sub_category: sub_category,
    industry: payload.industry_id,
    project_title: payload.project_title,
    project_description: payload.project_description,
    timeline: payload.master.timeline[payload.timeline],
  };

  if (payload.timeline == "Custom Dates") {
    newPayload.from_date = payload.from_date;
    newPayload.to_date = payload.to_date;
  }

  // console.log("supportingDoc", payload.supportingDoc);
  // const data = new FormData();
  // for (var x = 0; x < payload.supportingDoc.length; x++) {
  //   // payload.supportingDoc[x].file_type = "supporting_doc";
  //   var new_file = payload.supportingDoc[x];
  //   new_file.file_type = "supporting_doc";
  //   console.log("new_file", new_file);
  //   data.append(`file`, new_file);
  // }

  axios
    .post(
      process.env.REACT_APP_API_BASE_URL + "/postProject",
      newPayload,
      headerConfig
    )
    .then((res) => {
      if (res.data.errors.message.length) {
        NotificationManager.success(
          res.data.errors.message,
          res.data.errors.title
        );
      }
      if (payload.supportingDoc.length > 0) {
        //-------------------------------------------//
        // Upload Code start
        //-------------------------------------------//
        // const data = new FormData();
        // for (var x = 0; x < payload.supportingDoc.length; x++) {
        //   var new_file = payload.supportingDoc[x];
        //   new_file.file_type = "supporting_doc";
        //   data.append(`file`, new_file);
        // }
      }

      // return false;
      localStorage.removeItem("POST_PROJECT");
      localStorage.removeItem("POST_PROJECT_STEP");
      localStorage.setItem(
        "ERROR_MSG",
        "Your project has been sent to " +
          process.env.REACT_APP_SITE_NAME +
          " cordinator."
      );
      localStorage.setItem("ERROR_CLS", "success");
      if (localStorage.getItem("ACCESS_TOKEN"))
        window.location = "/clientdash/project/" + res.data.id;
      // console.log("res.data.id", res.data.id);
      else {
        window.location = "/";
      }
    })
    .catch((error) => {
      // setLoader(false);
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

export default SubmitProject;
