import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import LoadingOverlay from "react-loading-overlay";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";

import Fixmodal from "../../utils/Fixmodal";
import SubmitProject from "../../components/PostProject/SubmitProject";

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
    company_type: "",
    company_size: ""
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
    openCompanyModal();
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
    } else if (companyInput.company_type === "") {
      setErrors({ company_type: "Company type is required." });
    } else if (companyInput.company_size === "") {
      setErrors({ company_size: "Company size is required." });
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
          company_type: companyInput.company_type,
          company_size: companyInput.company_size
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
            alert();
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
      <LoadingOverlay active={loader} spinner text="Verifing Email...">
        <NotificationContainer />
        {verifyStatus}
      </LoadingOverlay>
      <Fixmodal ref={modalCompanyRef}>
        <div
          className="notification success no-shadow"
          style={{ paddingLeft: "20px" }}
        >
          <p>
            <i className="icon-material-outline-check-circle"></i> Your email{" "}
            <b>{userDetails.email}</b> has been verified!
          </p>
        </div>
        <LoadingOverlay active={loader} spinner text="Verifing Email...">
          <div className="welcome-text">
            <h3>Share your company details</h3>
            <span>
              Information about your company will help find the best suited
              talent for all your projects. This will only take a minute.{" "}
            </span>
          </div>

          <div className="submit-field">
            <input
              type="text"
              className="with-border"
              placeholder="Company name"
              name="name"
              value={companyInput.name}
              onChange={e => {
                setCompanyInput({ ...companyInput, ["name"]: e.target.value });
              }}
            />
            <div className="notification error  notification1 form-error">
              {errors.name}
            </div>
          </div>

          <div className="submit-field">
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
              <option>Select Industry Type</option>
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
            <select
              className="with-border"
              name="company_type"
              value={companyInput.company_type}
              onChange={e => {
                setCompanyInput({
                  ...companyInput,
                  ["company_type"]: e.target.value
                });
              }}
            >
              <option> Company Type</option>
              <option value="Private Company">Private Company</option>
              <option value="One Person Company">One Person Company</option>
              <option value="Public Company">Public Company</option>
              <option value="Foreign Company">Foreign Company</option>
            </select>
            <div className="notification error  notification1 form-error">
              {errors.company_type}
            </div>
          </div>

          <div className="submit-field">
            <select
              className="with-border"
              name="company_size"
              value={companyInput.company_size}
              onChange={e => {
                setCompanyInput({
                  ...companyInput,
                  ["company_size"]: e.target.value
                });
              }}
            >
              <option>Company Size</option>
              <option value="0 to 10">0 to 10</option>
              <option value="10 to 50">10 to 50</option>
              <option value="50 to 100">50 to 100</option>
              <option value="100+">100+</option>
            </select>
            <div className="notification error  notification1 form-error">
              {errors.company_size}
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
        </LoadingOverlay>
      </Fixmodal>
    </>
  );
}

export default VerifyEmailToken;
