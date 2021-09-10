import React, { useState, useEffect } from "react";
import LoadingOverlay from "react-loading-overlay";
import NotificationManager from "react-notifications/lib/NotificationManager";
import validator from "validator";
import axios from "axios";
import { Redirect } from "react-router-dom";

const Review = ({ setForm, formData, navigation }) => {
  const [errors, setErrors] = useState({});
  const [loader, setLoader] = useState(false);
  const { previous, next, go } = navigation;
  const [reviewData, setReviewData] = useState({});

  var prices = formData.selected_prices;
  var work_exp = formData.work_exp;
  var projects = formData.projects;
  var portfolio_link = formData.portfolio_link;
  var personal_details = formData.personal_details;
  var verification_Details = formData.verification_Details;

  useEffect(() => {
    setLoader(true); // get skillsets
    axios
      .get(
        process.env.REACT_APP_API_BASE_URL +
          "/maincategory/" +
          formData.skillsets
      )
      .then(res => {
        if (res.data.status) {
          setReviewData({ category: res.data.result.name });
        }
      });
    setLoader(false);
  }, []);

  //   console.log("formData", formData);
  const saveProceed = () => {
    setLoader(true);
    const headerConfig = {
      headers: { authorization: localStorage.getItem("ACCESS_TOKEN") }
    };

    var payload = {
      is_profile_submitted: 1,
      is_profile_verified: 0
    };
    axios
      .post(
        process.env.REACT_APP_API_BASE_URL +
          "/creator/profile/submit_for_review",
        payload,
        headerConfig
      )
      .then(res => {
        setLoader(false);
        if (res.data.status) {
          NotificationManager.success(
            res.data.errors.message,
            res.data.errors.title
          );
          // history.push("/creator-dash/profile");
          window.location.replace(`/creator-dash/profile`);

          //browserHistory.push("/creator-dash/profile");
        }
      })
      .catch(error => {
        setLoader(false);
        if (error.response != "undefined" && error.response) {
          if (error.response.status == 404) {
            NotificationManager.error(
              "Page not found, Please try again",
              "Error !!!"
            );
          } else if (error.response.data.errors.message.length) {
            NotificationManager.error(
              error.response.data.errors.message,
              error.response.data.errors.title
            );
          }
        }
      });
  };
  return (
    <LoadingOverlay active={loader} spinner text="Profile Details...">
      <div
        className="section"
        style={{ marginTop: "30px", marginBottom: "50px" }}
      >
        <div className="container">
          <div className="row">
            <div className="col-xl-8 col-md-8 offset-md-2">
              <div className="section-headline  margin-bottom-15 margin-top-15 ">
                <h3>Review your application?</h3>
              </div>

              {/* Skill sets */}
              <div className="skillsets subdiv">
                <div className="section-headline  margin-bottom-15 margin-top-15 ">
                  <h5>Skillsets & Pricing ({reviewData.category})</h5>
                  <a
                    onClick={() => go("SkillsetPricing")}
                    href="javascript:;"
                    style={{ position: "absolute", right: "0", bottom: "0" }}
                  >
                    <i className="icon-feather-edit"></i>
                  </a>
                  {/* <a
                    href="/creator-dash"
                    className="headline-link"
                    style={{ position: "absolute", right: "0", bottom: "0" }}
                  >
                    <i className="icon-feather-edit"></i>
                  </a> */}
                </div>

                {prices.length > 0 ? (
                  <div className="col-xl-12" style={{ padding: "0" }}>
                    <div
                      className="dashboard-box margin-top-0 no-shadow"
                      style={{ background: "none" }}
                    >
                      <div className="content">
                        <ul className="dashboard-box-list">
                          {prices.map((price, index) => {
                            return (
                              <li
                                style={{
                                  padding: "10px",
                                  margin: "10px 0",
                                  background: "#fff",
                                  borderRadius: "5px"
                                }}
                              >
                                {/* Job Listing */}
                                <div className="job-listing">
                                  {/* Job Listing Details */}
                                  <div className="job-listing-details">
                                    {/* Details */}
                                    <div className="job-listing-description">
                                      <h3 className="job-listing-title">
                                        <a>{price.skill_name}</a>
                                      </h3>
                                      {/* Job Listing Footer */}
                                      <div className="job-listing-footer">
                                        <ul>
                                          <li>
                                            {price.exp_level} @{" "}
                                            <b> {price.price} /Hour </b>
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </div>
                  </div>
                ) : (
                  <></>
                )}
              </div>

              {/* Skillsets */}

              {/* Work Details */}
              <div className="workdetails subdiv">
                <div className="section-headline  margin-bottom-15 margin-top-25 ">
                  <h5>
                    Work Experience ({formData.work_mode + " Freelancer"})
                    <a
                      onClick={() => go("WorkDetails")}
                      href="javascript:;"
                      style={{ position: "absolute", right: "0", bottom: "0" }}
                    >
                      <i className="icon-feather-edit"></i>
                    </a>
                  </h5>
                </div>
                {work_exp.length > 0 ? (
                  <div className="col-xl-12" style={{ padding: "0" }}>
                    <div
                      className="dashboard-box margin-top-0 no-shadow"
                      style={{ background: "none" }}
                    >
                      <div className="content">
                        <ul className="dashboard-box-list">
                          {work_exp.map((work, index) => {
                            var start_date = new Date(work.start_date);
                            var months = [
                              "Jan",
                              "Feb",
                              "Mar",
                              "Apr",
                              "May",
                              "Jun",
                              "Jul",
                              "Aug",
                              "Sept",
                              "Oct",
                              "Nov",
                              "Dec"
                            ];

                            var end_date = new Date(work.end_date);
                            var printEndDate = "";
                            var todaysDate = new Date();
                            if (
                              end_date.setHours(0, 0, 0, 0) ==
                              todaysDate.setHours(0, 0, 0, 0)
                            ) {
                              printEndDate = "Present";
                            } else {
                              printEndDate =
                                months[end_date.getMonth()] +
                                " " +
                                end_date.getFullYear();
                            }
                            //   alert(printEndDate);

                            return (
                              <li
                                style={{
                                  padding: "10px",
                                  margin: "10px 0",
                                  background: "#fff",
                                  borderRadius: "5px"
                                }}
                              >
                                {/* Job Listing */}
                                <div className="job-listing">
                                  {/* Job Listing Details */}
                                  <div className="job-listing-details">
                                    {/* Details */}
                                    <div className="job-listing-description">
                                      <h3 className="job-listing-title">
                                        <a>{work.company_name}</a>
                                      </h3>
                                      {/* Job Listing Footer */}
                                      <div className="job-listing-footer">
                                        <ul>
                                          <li
                                            style={{
                                              textTransform: "capitalize"
                                            }}
                                          >
                                            {work.designation}, {work.location}{" "}
                                            |{" "}
                                            {months[start_date.getMonth()] +
                                              " " +
                                              start_date.getFullYear()}{" "}
                                            - {printEndDate}
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                {/* Buttons */}
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </div>
                  </div>
                ) : (
                  <></>
                )}
              </div>
              {/* Work Details */}

              {/* Projects */}
              <div className="workdetails subdiv">
                <div className="section-headline  margin-bottom-15 margin-top-25 ">
                  <h5>
                    {" "}
                    Projects Worked On
                    <a
                      onClick={() => go("WorkDetails")}
                      href="javascript:;"
                      style={{ position: "absolute", right: "0", bottom: "0" }}
                    >
                      <i className="icon-feather-edit"></i>
                    </a>
                  </h5>
                </div>

                {projects.length > 0 ? (
                  projects.map((project, index) => {
                    return (
                      <div
                        className="Projects-portfolio attachment-box ripple-effect"
                        style={{
                          paddingBottom: "0px",
                          display: "block",
                          background: "#fff"
                        }}
                      >
                        {project.uploaded_files.length > 0 ? (
                          project.uploaded_files.map((img, imgIndex) => {
                            return (
                              <div className="outer">
                                <div className="inner">
                                  <img
                                    src={
                                      process.env.REACT_APP_API_BASE_URL +
                                      "/" +
                                      img.path
                                    }
                                  />
                                </div>
                              </div>
                            );
                          })
                        ) : (
                          <></>
                        )}

                        <div className="col-md-12 section-headline  margin-bottom-15 margin-top-15 ">
                          <h5>{project.project_title}</h5>
                          <p style={{ marginBottom: "0px" }}>
                            {project.description}
                          </p>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <></>
                )}
              </div>
              {/* Projects */}

              {/* Portfolio Links */}
              <div className="workdetails subdiv">
                <div className="section-headline  margin-bottom-15 margin-top-25 ">
                  <h5>
                    Portfolio and Documents
                    <a
                      onClick={() => go("WorkDetails")}
                      href="javascript:;"
                      style={{ position: "absolute", right: "0", bottom: "0" }}
                    >
                      <i className="icon-feather-edit"></i>
                    </a>
                  </h5>
                </div>

                {portfolio_link.length > 0 ? (
                  <div className="content margin-bottom-25">
                    <ul className="dashboard-box-list">
                      {portfolio_link.map((link, index) => {
                        return (
                          <li
                            style={{ padding: "5px 20px", background: "#fff" }}
                          >
                            <span
                              className="notification-icon"
                              style={{ background: "none" }}
                            >
                              <i className="icon-feather-link-2" />
                            </span>
                            <span className="notification-text">{link}</span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ) : (
                  <></>
                )}
              </div>
              {/* Portfolio Links */}

              {/* Personal Details */}
              <div className="workdetails subdiv">
                <div className="section-headline  margin-bottom-15 margin-top-25 ">
                  <h5>
                    {" "}
                    About Me
                    <a
                      onClick={() => go("PersonalDetails")}
                      href="javascript:;"
                      style={{ position: "absolute", right: "0", bottom: "0" }}
                    >
                      <i className="icon-feather-edit"></i>
                    </a>
                  </h5>
                </div>

                <div style={{ background: "#fff" }}>
                  <div
                    className="freelancer-overview"
                    style={{ display: "table-cell", padding: "20px" }}
                  >
                    <div className="freelancer-avatar">
                      <a href="single-freelancer-profile.html">
                        <img
                          src={
                            process.env.REACT_APP_API_BASE_URL +
                            "/" +
                            personal_details.profile.path
                          }
                          alt={personal_details.name}
                        />
                      </a>
                    </div>
                  </div>
                  <div
                    className="section-headline  margin-bottom-15 margin-top-15 "
                    style={{
                      display: "table-cell",
                      width: "100%",
                      padding: "10px 0",
                      verticalAlign: "top"
                    }}
                  >
                    <h3>{personal_details.name}</h3>
                    <p>{personal_details.description}</p>
                  </div>
                </div>
              </div>
              {/* Personal Details */}

              {/* Verification Details */}
              <div className="workdetails subdiv">
                <div className="section-headline  margin-bottom-15 margin-top-25 ">
                  <h5>
                    {" "}
                    Verification
                    <a
                      onClick={() => go("VerificationDetails")}
                      href="javascript:;"
                      style={{ position: "absolute", right: "0", bottom: "0" }}
                    >
                      <i className="icon-feather-edit"></i>
                    </a>
                  </h5>
                </div>

                <div
                  className="notify-box margin-top-15"
                  style={{ background: "#fff" }}
                >
                  <div className="switch-container">
                    <span className="switch-text">
                      {verification_Details.document_type}
                    </span>

                    <img
                      src={
                        process.env.REACT_APP_API_BASE_URL +
                        "/" +
                        verification_Details.document.path
                      }
                      style={{ width: "100%", maxHeight: "250px" }}
                    />
                  </div>
                </div>
              </div>
              {/* Verification Details */}

              <div className="workdetails subdiv">
                <div className="section-headline  margin-bottom-15 margin-top-25 ">
                  <h5> Disclaimer </h5>
                </div>

                <div className="checkbox">
                  <input type="checkbox" id="chekcbox1" defaultChecked />
                  <label htmlFor="chekcbox1">
                    <span className="checkbox-icon" /> I agree to{" "}
                    {process.env.REACT_APP_SITE_NAME} creator{" "}
                    <a href="/#">terms of services</a> and{" "}
                    <a href="/#">privacy policy</a>
                  </label>
                </div>

                <div className="checkbox">
                  <input type="checkbox" id="chekcbox1" defaultChecked />
                  <label htmlFor="chekcbox1">
                    <span className="checkbox-icon" /> I would like to receive
                    application updates and other exciting news from{" "}
                    {process.env.REACT_APP_SITE_NAME} via email
                  </label>
                </div>
              </div>
              <div className="section-headline  margin-top-15">
                <a
                  className="button gray ripple-effect button-sliding-icon"
                  onClick={previous}
                >
                  <i className="icon-feather-arrow-left"></i> Previous
                </a>{" "}
                <a
                  className="button  ripple-effect button-sliding-icon"
                  onClick={saveProceed}
                  style={{ color: "#fff" }}
                >
                  Submit For Review{" "}
                  <i className="icon-material-outline-check"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LoadingOverlay>
  );
};

export default Review;
