import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import LoadingOverlay from "react-loading-overlay";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";
import validator from "validator";

import Fixmodal from "../../utils/Fixmodal";
import SubmitProject from "../../components/PostProject/SubmitProject";

import "./inputfile.css";

function VerifyEmailToken(props) {
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };
  let query = useQuery();

  const modalCompanyRef = useRef();

  const [isVerified, setIsVerified] = useState(false);
  const [loader, setLoader] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  const [errors, setErrors] = useState({});

  const [industries, setIndustries] = useState([]);
  const [companyInput, setCompanyInput] = useState({
    name: "",
    industry: "",
    website: "",
    entrepreneur: true
  });

  useEffect(() => {
    setLoader(true);
    // Update the document title using the browser API
    const token = query.get("token");
    const payload = { token: token };
    axios
      .post(process.env.REACT_APP_API_BASE_URL + "/users/verify_email", payload)
      .then(res => {
        setUserDetails({
          name: res.data.name,
          email: res.data.email,
          user_id: res.data.user_id,
          isCompany: res.data.isCompany,
          token: res.data.access_token
        });

        // if isCompany is false and Post_project data is set then submit project details
        if (
          !res.data.isCompany &&
          localStorage.getItem("POST_PROJECT") &&
          localStorage.getItem("POST_PROJECT_STEP") === "step7"
        ) {
          var formData = JSON.parse(localStorage.getItem("POST_PROJECT"));
          var payload = { formData, token: res.data.access_token };
          SubmitProject(payload);
        }
        // FETCH INDUSTRY DETAILS OF isCompany = TRUE
        axios
          .get(process.env.REACT_APP_API_BASE_URL + "/industry/all")
          .then(indData => {
            if (indData.data.status) {
              var indData = indData.data.result.map(({ _id, name }) => ({
                id: _id,
                name
              }));
              setIndustries(indData);
            }
          });

        setLoader(false);
        setIsVerified(true);
        if (res.data.errors.message.length) {
          setErrors(res.data.errors);

          NotificationManager.success(
            res.data.errors.message,
            res.data.errors.title
          );
        }
      })
      .catch(error => {
        setLoader(false);
        setIsVerified(false);
        if (error.response != "undefined" && error.response) {
          setErrors(error.response.data.errors);
          if (error.response.data.errors.message.length) {
            NotificationManager.error(
              error.response.data.errors.message,
              error.response.data.errors.title
            );
          }
        }
      });
  }, []);

  const openCompanyModal = () => {
    if (modalCompanyRef.current != undefined) modalCompanyRef.current.open(); // verify email
  };

  const closeCompanyModal = () => {
    if (modalCompanyRef.current != undefined) modalCompanyRef.current.close(); // verify email
  };

  let verifyStatus;

  if (isVerified) {
    if (userDetails.isCompany) {
      openCompanyModal();
    }
    verifyStatus = (
      <div className="container" style={{ margin: "100px auto" }}>
        <div className="row">
          <div className="col-xl-6 offset-xl-3">
            <div className="login-register-page">
              {/* Welcome Text */}
              <div className="welcome-text">
                <h3 align="center">Account Activated</h3>
              </div>
              <div style={{ textAlign: "center" }}>
                <i
                  style={{ fontSize: "150px", color: "#5f9025" }}
                  className="icon-material-outline-drafts"
                />
                <p style={{ fontSize: "26px", margin: "20px" }}>
                  Hello{" "}
                  <b style={{ textTransform: "capitalize" }}>
                    {userDetails.name}
                  </b>
                  ,
                </p>
                <div
                  className="notification success"
                  style={{ boxShadow: "none" }}
                >
                  Thank you, Your email has been verified. Your account is
                  active now, Please click below to login.
                </div>
                <button className="button ripple-effect">
                  <i className="icon-feather-log-in" /> Sign In
                </button>
              </div>
              {/* Form */}
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    verifyStatus = (
      <div className="container" style={{ margin: "50px auto" }}>
        <div className="row">
          <div className="col-xl-6 offset-xl-3">
            <div className="login-register-page">
              <div className="welcome-text">
                <h3 align="center" style={{ color: "#de5959" }}>
                  Account Email Verification.
                </h3>
              </div>
              <div style={{ textAlign: "center" }}>
                <i
                  style={{ fontSize: "150px", color: "#ff0000" }}
                  className="icon-material-outline-drafts"
                />
                <div
                  className="notification error"
                  style={{ boxShadow: "none" }}
                >
                  {errors.message}
                  {/* Error occurred while verifing your email. */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const SubmitCompanyDetails = () => {
    // console.log("companyInput", companyInput);

    if (companyInput.name === "") {
      setErrors({ name: "Company name is required." });
    } else if (companyInput.industry === "") {
      setErrors({ industry: "Industry type is required." });
    } else if (companyInput.website === "") {
      setErrors({ website: "Company website is required." });
    } else if (!validator.isURL(companyInput.website)) {
      setErrors({ website: "Company website is not valid." });
    } else {
      setErrors({});
      setLoader(true);
      var payload = {
        company_details: {
          name: companyInput.name,
          industry:
            industries[
              industries.findIndex(x => x.id === companyInput.industry)
            ],
          website: companyInput.website,
          entrepreneur: companyInput.entrepreneur
        }
      };

      axios
        .post(
          process.env.REACT_APP_API_BASE_URL + "/users/" + userDetails.user_id,
          payload
        )
        .then(res => {
          // console.log("res", res.data);
          // console.log("userDetails", userDetails);
          if (res.data.status) {
            NotificationManager.success(
              "Company details has been saved",
              "Thank You !"
            );

            if (
              localStorage.getItem("POST_PROJECT") &&
              localStorage.getItem("POST_PROJECT_STEP") === "step7"
            ) {
              var formData = JSON.parse(localStorage.getItem("POST_PROJECT"));
              var payload = { formData, token: userDetails.token };
              console.log("payload", payload);
              SubmitProject(payload);
            }

            setCompanyInput({});
            closeCompanyModal();
            setLoader(false);
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
    }
  };
  return (
    <>
      <style>
        {".modal-box{padding:0 !important } .submit-field{margin-bottom:10px}"}
      </style>
      <LoadingOverlay active={loader} spinner text="Verifing Email...">
        <NotificationContainer />
        {verifyStatus}
      </LoadingOverlay>
      <Fixmodal ref={modalCompanyRef}>
        <div
          className="notification success no-shadow"
          style={{
            paddingLeft: "20px",
            paddingRight: "20px",
            background: "rgba(255, 185, 42, 0.23)",
            marginTop: "0"
          }}
        >
          <p>
            <i
              className="icon-feather-check"
              style={{
                background: "#fdbd39",
                color: "#fff",
                fontSize: "16px",
                borderRadius: "50%",
                padding: "5px",
                fontWeight: 600
              }}
            ></i>{" "}
            <span style={{ color: "#2e3a59" }}>
              Your email <b>{userDetails.email}</b> has been verified!
            </span>
          </p>
        </div>
        <LoadingOverlay active={loader} spinner text="Verifing Email...">
          <div style={{ padding: "0 20px" }}>
            <div className="welcome-text">
              <h3>Share your company details</h3>
              <span>
                Information about your company will help find the best suited
                talent for all your projects. This will only take a minute.{" "}
              </span>
            </div>
            <div className="submit-field">
              <label
                style={{ color: "#2e3a59", fontSize: "14px", fontWeight: 500 }}
              >
                Logo
              </label>

              <div className="box">
                <input
                  type="file"
                  id="file-5"
                  className="inputfile inputfile-4"
                />
                <label
                  htmlFor="file-5"
                  style={{
                    background: "#2e3a59",
                    color: "#fff",
                    padding: "10px",
                    fontSize: "34px",
                    borderRadius: "50%",
                    width: "68px",
                    textAlign: "center"
                  }}
                >
                  <i className="icon-feather-download"></i>
                </label>
              </div>
            </div>
            <div className="submit-field">
              <label
                style={{ color: "#2e3a59", fontSize: "14px", fontWeight: 500 }}
              >
                Registered Company Name
              </label>
              <input
                type="text"
                className="with-border"
                placeholder="Enter your company's registered name"
                name="name"
                value={companyInput.name}
                onChange={e => {
                  setCompanyInput({
                    ...companyInput,
                    ["name"]: e.target.value
                  });
                }}
              />
              <div className="notification error  notification1 form-error">
                {errors.name}
              </div>
            </div>

            <div className="submit-field">
              <label
                style={{ color: "#2e3a59", fontSize: "14px", fontWeight: 500 }}
              >
                Website
              </label>
              <input
                type="text"
                className="with-border"
                placeholder="Enter your company's registered name"
                name="website"
                value={companyInput.website}
                onChange={e => {
                  setCompanyInput({
                    ...companyInput,
                    ["website"]: e.target.value
                  });
                }}
              />
              <div className="notification error  notification1 form-error">
                {errors.website}
              </div>
            </div>

            <div className="submit-field">
              <label
                style={{ color: "#2e3a59", fontSize: "14px", fontWeight: 500 }}
              >
                Industry
              </label>
              <select
                className="with-border"
                name="industry"
                value={companyInput.industry}
                onChange={e => {
                  setCompanyInput({
                    ...companyInput,
                    ["industry"]: e.target.value
                  });
                }}
              >
                <option>Select Industry Vertical</option>
                {industries.map((ind, index) => {
                  return (
                    <option key={ind.id} value={ind.id}>
                      {ind.name}
                    </option>
                  );
                })}
              </select>

              <div className="notification error  notification1 form-error">
                {errors.industry}
              </div>
            </div>

            <div className="submit-field">
              <label
                style={{
                  color: "#a5a5a6",
                  fontSize: "14px",
                  fontWeight: "normal"
                }}
              >
                I am an individual entrepreneur
              </label>
              <label className="switch">
                <input
                  type="checkbox"
                  className="entrepreneur"
                  defaultChecked={companyInput.entrepreneur}
                  onChange={() =>
                    setCompanyInput({
                      ...companyInput,
                      ["entrepreneur"]: !companyInput.entrepreneur
                    })
                  }
                />
                <span
                  className="switch-button"
                  style={{ marginLeft: "10px", marginTop: "-5px" }}
                />
              </label>

              <div className="notification error  notification1 form-error">
                {errors.entrepreneur}
              </div>
            </div>

            <div className="col-md-12" style={{ padding: "0" }}>
              <a
                onClick={SubmitCompanyDetails}
                className="button  ripple-effect button-sliding-icon"
                style={{ color: "#fff", width: "100%" }}
              >
                Finish
                <i class="icon-material-outline-check" />
              </a>
            </div>
          </div>
        </LoadingOverlay>
      </Fixmodal>
    </>
  );
}

export default VerifyEmailToken;
