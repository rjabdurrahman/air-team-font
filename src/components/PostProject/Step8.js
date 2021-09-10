import React, { useState, useEffect } from "react";
import LoadingOverlay from "react-loading-overlay";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";
import { json } from "body-parser";

import SubmitProject from "./SubmitProject";
import axios from "axios";
import Breadcrumb from "./Breadcrumb";

const selectedDocDisp = documents => {
  // console.log("documents", documents);
  if (documents.length > 0) {
    return (
      <div className="margin-bottom-10">
        {documents.map((file, idx) => {
          if (file[1].name !== undefined) {
            return (
              <span
                key={idx}
                style={{
                  background: "rgba(93, 187, 199, 0.06)",
                  border: "solid 1px #2dbdc9",
                  borderRadius: "6px",
                  fontWeight: "500",
                  padding: "12px 12px 11px 8px",
                  color: "#001626",
                  fontSize: "14px",
                  lineHeight: 1.79,
                  marginRight: "10px",
                  textTransform: "capitalize",
                  height: "48px",
                  display: "inline-block",
                  marginTop: "5px"
                }}
              >
                <i className="icon-line-awesome-file"></i> {`${file[1].name}`}
              </span>
            );
          } else {
            return <></>;
          }
        })}
      </div>
    );
  } else return <></>;
};

const Step8 = ({ setForm, formData, navigation }) => {
  const [loader, setLoader] = useState(false);

  const { previous, go } = navigation;
  const [MasterSkillsets, setMasterSkillsets] = useState({});

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_BASE_URL + "/skill/all")
      .then(res => {
        if (res.data.status) {
          var categories = {};
          res.data.result.forEach(element => {
            categories[element._id] = element.name;
          });
          setMasterSkillsets(categories);
        }
      })
      .catch(error => {});
  }, []);

  // useEffect(() => {
  //   console.log(MasterSkillsets);
  // }, [MasterSkillsets]);

  const postProject = () => {
    setLoader(true);
    if (localStorage.getItem("ACCESS_TOKEN")) {
      console.log(formData);
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

  console.log("formData", formData);

  return (
    <>
      <Breadcrumb navigation={navigation} currentTab="step8" />
      <LoadingOverlay active={loader} spinner text="Posting your project ...">
        <NotificationContainer />
        <div className="section ProjectBrief" style={{ margin: "100px auto" }}>
          <div className="container">
            <div className="col-sm-12 col-xl-10 col-md-10 offset-md-1 offset-xl-1">
              <div className="categories-container" style={{ padding: "10px" }}>
                <div className="">
                  <div className="category-box-content">
                    <h5
                      style={{
                        color: "#2dbdc9",
                        fontSize: "18px",
                        fontWeight: 500
                      }}
                    >
                      Project Type
                    </h5>

                    {/* project type */}
                    {formData.categories.map((cat, idx) => {
                      // console.log("cat", cat);
                      return (
                        <div
                          key={idx}
                          className="margin-bottom-10 margin-top-20"
                        >
                          <h6
                            style={{
                              color: "#2e3a59",
                              fontSize: "20px",
                              margin: 0,
                              fontWeight: 600
                            }}
                          >
                            {cat.name}
                          </h6>
                          {formData.subCategories.length > 0 ? (
                            <>
                              {formData.subCategories.map((subCat, sIdx) => {
                                // console.log("subCat", subCat);
                                var subCatIndex = formData.master.subCategories.findIndex(
                                  sub => sub.id === subCat
                                );

                                if (
                                  formData.master.subCategories[subCatIndex]
                                    .parent_id === cat._id
                                ) {
                                  return (
                                    <div
                                      style={{
                                        fontSize: "14px",
                                        background: "#daeced",
                                        border: "solid 1px #dcecee",
                                        borderRadius: "6px",
                                        color: "#001626",
                                        textAlign: "justify",
                                        lineHeight: "1.56",
                                        marginRight: "10px",
                                        padding: "8px 20px",
                                        display: "inline-block",
                                        marginTop: "5px"
                                      }}
                                    >
                                      {
                                        formData.master.subCategories[
                                          subCatIndex
                                        ].name
                                      }
                                    </div>
                                  );
                                }
                              })}
                            </>
                          ) : (
                            <></>
                          )}
                        </div>
                      );
                    })}
                    {/* project type */}
                  </div>
                </div>
              </div>
              <div className="categories-container margin-top-25 margin-bottom-10">
                <div className="col-md-4 category-box-content">
                  <h5
                    style={{
                      color: "#2dbdc9",
                      fontSize: "18px",
                      fontWeight: 500
                    }}
                  >
                    Industry
                  </h5>
                  <h6 style={{ margin: 0, fontWeight: 600, fontSize: "20px" }}>
                    {formData.selectedIndustry.label}
                  </h6>
                </div>
                <div className="col-md-4 category-box-content">
                  <h5
                    style={{
                      color: "#2dbdc9",
                      fontSize: "18px",
                      fontWeight: 500
                    }}
                  >
                    Project Timeline
                  </h5>

                  <h6 style={{ margin: 0, fontWeight: 600, fontSize: "20px" }}>
                    {formData.timeline == 5 ? (
                      <>
                        <span>
                          {formData.from_date} <b> To </b> {formData.to_date}
                        </span>
                      </>
                    ) : (
                      <>{formData.master.timeline[formData.timeline]}</>
                    )}
                  </h6>
                </div>
              </div>

              <div className="categories-container margin-top-45">
                <div className="col-md-12 category-box-content">
                  <h5
                    style={{
                      color: "#2dbdc9",
                      fontSize: "18px",
                      fontWeight: 500
                    }}
                  >
                    Project Title
                  </h5>

                  <h6 style={{ margin: 0, fontWeight: 600, fontSize: "20px" }}>
                    {formData.project_title}
                  </h6>
                </div>
              </div>

              <div className="categories-container margin-top-45">
                <div className="col-md-12 category-box-content">
                  <h5
                    style={{
                      color: "#2dbdc9",
                      fontSize: "18px",
                      fontWeight: 500
                    }}
                  >
                    Description
                  </h5>
                  <h6 style={{ margin: 0, fontWeight: 600, fontSize: "20px" }}>
                    {formData.project_description}
                  </h6>
                </div>
              </div>

              {formData.supportingDoc.length > 0 ? (
                <div className="categories-container margin-top-45">
                  <div className="col-md-12 category-box-content">
                    <h5
                      style={{
                        color: "#2dbdc9",
                        fontSize: "18px",
                        fontWeight: 500
                      }}
                    >
                      Supporting Documents
                    </h5>

                    {selectedDocDisp(formData.supportingDoc)}
                  </div>
                </div>
              ) : (
                <></>
              )}

              {formData.referenceDoc.length > 0 ? (
                <div className="categories-container margin-top-45">
                  <div className="col-md-12 category-box-content">
                    <h5
                      style={{
                        color: "#2dbdc9",
                        fontSize: "18px",
                        fontWeight: 500
                      }}
                    >
                      Reference Documents
                    </h5>

                    {selectedDocDisp(formData.referenceDoc)}
                  </div>
                </div>
              ) : (
                <></>
              )}

              {/* <div className="col-xl-12 categories-container margin-top-15 margin-bottom-15">
                <div className="col-md-2" />
                <a
                  href="javascript:"
                  className="col-md-8 button  ripple-effect button-sliding-icon"
                  onClick={postProject}
                >
                  Finish and Submit <i className="icon-feather-check" />
                </a>
              </div> */}

              <div
                className="submit-field margin-top-35"
                style={{ textAlign: "right" }}
              >
                <div className="margin-top-20">
                  <a onClick={previous} className="CancelBtn">
                    Previous
                  </a>{" "}
                  <a className="SubmitBtn" onClick={postProject}>
                    Submit
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LoadingOverlay>
    </>
  );
};

export default Step8;
