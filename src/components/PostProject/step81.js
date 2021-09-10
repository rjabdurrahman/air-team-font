import React, { useState, useEffect } from "react";
import LoadingOverlay from "react-loading-overlay";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import { json } from "body-parser";

import SubmitProject from "./SubmitProject";
import axios from "axios";

const Step8 = ({ setForm, formData, navigation }) => {
  const [loader, setLoader] = useState(false);
  const { go } = navigation;
  const [MasterSkillsets, setMasterSkillsets] = useState({});

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_BASE_URL + "/skill/all")
      .then((res) => {
        if (res.data.status) {
          var categories = {};
          res.data.result.forEach((element) => {
            categories[element._id] = element.name;
          });
          setMasterSkillsets(categories);
        }
      })
      .catch((error) => {});
  }, []);

  // useEffect(() => {
  //   console.log(MasterSkillsets);
  // }, [MasterSkillsets]);

  const postProject = () => {
    setLoader(true);
    if (localStorage.getItem("ACCESS_TOKEN")) {
      // console.log(formData);
      var payload = { formData };
      SubmitProject(payload);
      // send submit request here
    } else {
      setLoader(false);
      NotificationManager.error(
        "Please login to post your project.",
        "Post Project !!!"
      );
      var loginModal = document.getElementById("loginID");
      loginModal.click();
    }
  };

  return (
    <>
      <LoadingOverlay active={loader} spinner text="Posting your project ...">
        <NotificationContainer />
        <div className="section ProjectBrief" style={{ margin: "100px auto" }}>
          <div className="container">
            <div className="col-xl-8 offset-md-2">
              <div className="categories-container">
                <div className="col-md-8 offset-md-2">
                  <div className="section-headline">
                    <h2>
                      <b>Brief Summary</b>
                    </h2>
                  </div>
                  <div className="category-box-content">
                    <p>Category</p>
                    <h3>{formData.master.categories[formData.category_id]}</h3>
                  </div>
                  <div className="category-box-content margin-top-15">
                    <p>SkillSets</p>
                    <h3>
                      {Object.entries(MasterSkillsets).length > 0 ? (
                        Object.entries(formData.skillsets).map(
                          ([SelectedId]) => (
                            // console.log("SelectedId", SelectedId),
                            <mark
                              className="color"
                              style={{ marginRight: "5px" }}
                            >
                              {MasterSkillsets[SelectedId]}{" "}
                            </mark>
                          )
                        )
                      ) : (
                        <></>
                      )}
                    </h3>
                  </div>
                </div>
              </div>
              <div className="categories-container margin-top-15">
                <div className="col-md-3 offset-md-2 category-box-content">
                  <p>Industry</p>
                  <h3>
                    {
                      formData.master.industries[
                        formData.master.industries.findIndex(
                          (ind) => ind.id === formData.industry_id
                        )
                      ].name
                    }
                  </h3>
                </div>
                <div className="col-md-4 category-box-content">
                  <p>Name</p>
                  <h3>{formData.project_title}</h3>
                </div>
                <div className="col-md-1">
                  <a
                    href="javascript:"
                    data-tippy-placement="top"
                    data-tippy
                    data-original-title="Edit"
                    onClick={() => go("Step4")}
                  >
                    <i className="icon-feather-edit" />
                    Edit
                  </a>
                </div>
              </div>
              <div className="categories-container margin-top-15">
                <div className="col-md-8 offset-md-2 category-box-content">
                  <p>Description</p>
                  <h3>{formData.project_description}</h3>
                </div>
              </div>
              <div className="categories-container margin-top-15">
                <div className="col-md-8 offset-md-2">
                  <div className="category-box-content">
                    <p>Resourcing Requirements</p>
                    <h3>
                      {formData.master.projectTypes[formData.project_type]}
                    </h3>
                  </div>
                  <div className="category-box-content">
                    <p>Timeline</p>
                    <h3>
                      {formData.timeline == 5 ? (
                        <>
                          <span>
                            <b>{formData.from_date}</b> To{" "}
                            <b>{formData.to_date}</b>
                          </span>
                        </>
                      ) : (
                        <>{formData.master.timeline[formData.timeline]}</>
                      )}
                    </h3>
                  </div>
                  <div className="category-box-content">
                    <p>Budget</p>
                    <h3>{formData.master.budgets[formData.budget]}</h3>
                  </div>
                </div>
              </div>
              <div className="col-xl-12 categories-container margin-top-15 margin-bottom-15">
                <div className="col-md-2" />
                <a
                  href="javascript:"
                  className="col-md-8 button  ripple-effect button-sliding-icon"
                  onClick={postProject}
                >
                  Finish and Submit <i className="icon-feather-check" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </LoadingOverlay>
    </>
  );
};

export default Step8;
