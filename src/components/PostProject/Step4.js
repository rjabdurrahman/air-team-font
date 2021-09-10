import React, { useState, useEffect, useRef } from "react";

import ItemForm from "./ItemForm";
import axios from "axios";
import "./style.css";
import Modal from "../../utils/Modal";
import Breadcrumb from "./Breadcrumb";
import Select from "react-select";

const customStyles = {
  menu: (provided, state) => ({
    background: "#f5f9fa",
    color: "#3a3a3c"
  })
};

const Step4 = ({ setForm, formData, navigation }) => {
  const [errors, setErrors] = useState({});
  const { industry_id, project_title, selectedIndustry } = formData;
  const { previous, next } = navigation;
  const [industries, setIndustries] = useState([]);
  const masterTimeline = formData.master.timeline;
  const { timeline, from_date, to_date } = formData;
  const [industry, setIndustry] = useState(formData.selectedIndustry);

  const mdlConfidentiality = useRef();

  const openConfMdl = () => {
    if (mdlConfidentiality.current != undefined)
      mdlConfidentiality.current.open();
  };

  const closeConfMdl = () => {
    if (mdlConfidentiality.current != undefined)
      mdlConfidentiality.current.close();
  };
  // const IndustryOptions = formData.master.industries;

  // Timeline details
  var customDate = "";
  if (formData.timeline == 5)
    customDate = (
      <table>
        <tr>
          <td>
            <input
              type="date"
              id="from_date"
              name="from_date"
              value={from_date}
              onChange={setForm}
              className="form-control"
            />
          </td>
          <td width="50" align="center">
            <b> To </b>
          </td>
          <td>
            {" "}
            <input
              type="date"
              id="to_date"
              name="to_date"
              value={to_date}
              onChange={setForm}
              className="form-control"
            />
          </td>
        </tr>
      </table>

      // <div
      //   className="col-xl-12  col-md-12  col-sm-12 col-xs-12"
      //   style={{
      //     marginTop: "20px",
      //     borderTop: "1px solid rgb(204, 204, 204)",
      //     padding: "20px 20px 15px"
      //   }}
      // >
      //   <div className="row" style={{ textAlign: "center" }}>
      //     <div className="col-md-5">
      //       <label>Select Start Date</label>

      //       <ItemForm
      //         id={`from_date`}
      //         name="from_date"
      //         value={from_date}
      //         onChange={setForm}
      //         type="date"
      //       />
      //       <div className="notification error  notification1 form-error">
      //         {errors.from_date}
      //       </div>
      //     </div>
      //     <div className="col-md-2">
      //       {" "}
      //       <span style={{ padding: "35px 25px" }}>To</span>{" "}
      //     </div>
      //     <div className="col-md-5">
      //       <label>Select End Date</label>

      //       <ItemForm
      //         id={`to_date`}
      //         name="to_date"
      //         value={to_date}
      //         onChange={setForm}
      //         type="date"
      //       />
      //       <div className="notification error  notification1 form-error">
      //         {errors.to_date}
      //       </div>
      //     </div>
      //   </div>
      // </div>
    );

  useEffect(() => {
    // get insustry data
    axios
      .get(process.env.REACT_APP_API_BASE_URL + "/industry/all")
      .then(indData => {
        if (indData.data.status) {
          var indData = indData.data.result.map(({ _id, name }) => ({
            id: _id,
            label: name,
            value: _id
          }));
          setIndustries(indData);
        }
      });

    // Open Confidentiality modal
    openConfMdl();
  }, []);

  useEffect(() => {
    // console.log("industries", industries);
    // console.log("IndustryOptions", IndustryOptions);
    formData.master.industries = industries;
  }, [industries]);

  const checkValidation = () => {
    if (industry_id == "") {
      setErrors({
        industry_id: "Please select industry.",
        error: "All fields are required."
      });
    } else if (project_title == "") {
      setErrors({
        project_title: "Please enter project title.",
        error: "All fields are required."
      });
    } else if (timeline == "") {
      setErrors({ timeline: "Please select timeline of your project." });
    } else if (timeline == 5 && from_date == "") {
      setErrors({ from_date: "Please select starting date." });
    } else if (timeline == 5 && to_date == "") {
      setErrors({ to_date: "Please select end date." });
    } else {
      setErrors({
        project_title: "",
        industry_id: "",
        project_description: "",
        error: ""
      });

      console.log("formData", formData);
      localStorage.setItem("POST_PROJECT", JSON.stringify(formData));
      localStorage.setItem("POST_PROJECT_STEP", "step4");
      next();
    }
  };

  const handleSelectChange = selectedOption => {
    formData.industry_id = selectedOption.value;
    formData.selectedIndustry = selectedOption;
    setIndustry(selectedOption);
    // console.log(`Option selected:`, selectedOption);
  };

  console.log("formData", formData);
  // console.log("masterTimeline", masterTimeline);
  localStorage.setItem("POST_PROJECT", JSON.stringify(formData));
  return (
    <>
      <style>
        {
          "\
          .modal-box { max-width: 358px !important;text-align:center;cursor:pointer}\
        "
        }
      </style>

      <Breadcrumb navigation={navigation} currentTab="step4" />

      {/* Category Boxes */}
      <div className="section" style={{ margin: "100px auto" }}>
        <div className="container">
          <div className="col-sm-12 col-xl-10 col-md-10 offset-md-1 offset-xl-1">
            {/* Industry Type */}
            <div className="categories-container margin-top-5 padding-top-5 margin-bottom-5">
              <h5>
                <b>Industry </b>
                <p style={{ lineHeight: "15px" }}>
                  <small>
                    Tell us about the industry related to your project. we will
                    get you connected with individuals/teams with suitable
                    expertise from the same industry background.
                  </small>
                </p>
              </h5>
            </div>

            <Select
              value={industry}
              options={industries}
              onChange={handleSelectChange}
              styles={customStyles}
              placeholder={`Type to search`}
            />

            {/* <select name="industry_id" value={industry_id} onChange={setForm}>
              <option value="">Select ...</option>
              {industries.map((ind, index) => {
                return (
                  <option key={ind.id} value={ind.id}>
                    {ind.name}
                  </option>
                );
              })}
            </select> */}
            <div className="notification error  notification1 form-error">
              {errors.industry_id}
            </div>
            {/* Project title */}
            <div className="section-headline margin-top-5 padding-top-15 margin-bottom-5">
              <h5>
                <b>Project Title</b>
                <p style={{ lineHeight: "15px" }}>
                  <small>
                    You can use the following format to create a project title:
                    - Company name_Project name_01
                  </small>
                </p>{" "}
              </h5>
            </div>
            <ItemForm
              label={"Project Title"}
              id={`projectTitle`}
              name="project_title"
              value={project_title}
              onChange={setForm}
              type="text"
              placeholder="Enter your project title here"
            />
            <div className="notification error  notification1 form-error">
              {errors.project_title}
            </div>
            {/* Project Timeline */}
            <div className="categories-container margin-top-5 padding-top-15 margin-bottom-5">
              <h5>
                <b>Project Timeline</b>

                <p style={{ lineHeight: "15px" }}>
                  <small>
                    It helps us understand for now long the chosen talent will
                    be dedicated to your project and how much time we need to
                    allocated to it before we commit our time and resources to
                    the next client.
                  </small>
                </p>
              </h5>

              <section className="timeline_checkbox">
                {Object.entries(masterTimeline).map(([value, name], index) => (
                  <ItemForm
                    key={`timeLines${value}`}
                    label={name}
                    id={`timeLines${value}`}
                    name="timeline"
                    value={value}
                    checked={timeline === value}
                    onChange={setForm}
                    type="radio"
                    imgName={value}
                  />
                ))}
              </section>
            </div>
            {/* Display Custom Date  */}
            {customDate}
            {/* Display Custom Date  */}
            <div className="notification error  notification1 form-error">
              {errors.error}
            </div>

            <div
              className="submit-field margin-top-35"
              style={{ textAlign: "right" }}
            >
              <div className="margin-top-20">
                <a onClick={previous} className="CancelBtn">
                  Previous
                </a>{" "}
                <a className="SubmitBtn" onClick={checkValidation}>
                  Next
                </a>
              </div>
            </div>
            {/*-----------------------------------------------*/}
          </div>
        </div>
      </div>

      <Modal ref={mdlConfidentiality}>
        <i
          className="icon-line-awesome-close"
          onClick={closeConfMdl}
          style={{ float: "right", color: "#666", fontWeight: 600 }}
        ></i>
        <div
          className="categories-container margin-bottom-15 margin-top-50"
          style={{ display: "block" }}
        >
          <img src="images/icons/shield.png" />

          <h5
            className="margin-top-10"
            style={{ fontWeight: 600, lineHeight: 1.45, fontSize: "22px" }}
          >
            Confidentiality
          </h5>
          <p
            style={{ fontSize: "14px", lineHeight: 1.43, fontWeight: "normal" }}
          >
            We understand privacy is important to you and maintaining the
            confidentiality of your data is our priority. Rest assured none of
            the project details entered will be saved until you log in to your
            Air Teams account. Once you log in, Your project details will remain
            confidential and secure on our servers.
          </p>

          <a
            className="margin-top-15 margin-bottom-15"
            href=""
            style={{
              display: "block",
              color: "#2dbdc9",
              textDecoration: "underline",
              lineHeight: "1.78",
              fontWeight: 500
            }}
          >
            Visit Privacy Page
          </a>

          <button
            className="button ripple-effect margin-top-10"
            style={{ width: "100%", fontSize: "16px", fontWeight: "600" }}
            onClick={closeConfMdl}
          >
            Got It
          </button>
        </div>
      </Modal>
    </>
  );
};

export default Step4;
