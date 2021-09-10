import React, { useState, useEffect } from "react";
import Select from "react-select";
import ItemForm from "./ItemForm";
import StateDrop from "./StateDrop";
import ItemTextareaForm from "./ItemTextareaForm";
import axios from "axios";
import "./style.css";

const Step4 = ({ setForm, formData, navigation }) => {
  const [errors, setErrors] = useState({});
  const { industry_id, project_title, project_description } = formData;
  const { previous, next } = navigation;
  const [industries, setIndustries] = useState([]);
  const masterTimeline = formData.master.timeline;
  const { timeline, from_date, to_date } = formData;

  // const IndustryOptions = formData.master.industries;

  // Timeline details
  var customDate = "";
  if (formData.timeline == 5)
    customDate = (
      <div
        className="col-md-6 offset-md-3 "
        style={{
          marginTop: "20px",
          borderTop: "1px solid rgb(204, 204, 204)",
          padding: "20px 20px 15px",
        }}
      >
        <div className="row" style={{ textAlign: "center" }}>
          <div className="col-md-5">
            <label>Select Start Date</label>

            <ItemForm
              id={`from_date`}
              name="from_date"
              value={from_date}
              onChange={setForm}
              type="date"
            />
            <div className="notification error  notification1 form-error">
              {errors.from_date}
            </div>
          </div>
          <div className="col-md-2">
            {" "}
            <span style={{ padding: "35px 25px" }}>To</span>{" "}
          </div>
          <div className="col-md-5">
            <label>Select End Date</label>

            <ItemForm
              id={`to_date`}
              name="to_date"
              value={to_date}
              onChange={setForm}
              type="date"
            />
            <div className="notification error  notification1 form-error">
              {errors.to_date}
            </div>
          </div>
        </div>
      </div>
    );

  // console.log("formData", formData);
  useEffect(() => {
    // get insustry data
    axios
      .get(process.env.REACT_APP_API_BASE_URL + "/industry/all")
      .then((indData) => {
        if (indData.data.status) {
          var indData = indData.data.result.map(({ _id, name }) => ({
            id: _id,
            name,
          }));
          setIndustries(indData);
        }
      });
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
        error: "All fields are required.",
      });
    } else if (project_title == "") {
      setErrors({
        project_title: "Please enter project title.",
        error: "All fields are required.",
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
        error: "",
      });

      console.log("formData", formData);
      localStorage.setItem("POST_PROJECT", JSON.stringify(formData));
      localStorage.setItem("POST_PROJECT_STEP", "step4");
      next();
    }
  };

  // console.log("masterTimeline", masterTimeline);
  localStorage.setItem("POST_PROJECT", JSON.stringify(formData));
  return (
    <>
      {/* Category Boxes */}
      <div className="section" style={{ margin: "100px auto" }}>
        <div className="container">
          <div className="col-md-6 offset-md-3">
            <div className="categories-container margin-top-5 padding-top-5 margin-bottom-5">
              <h5>
                <b>Which industry is your project for?</b>
                <p style={{ lineHeight: "15px" }}>
                  <small>
                    Tell us about the industry related to your project. we will
                    get you connected with individuals/teams with suitable
                    expertise from the same industry background.
                  </small>
                </p>
              </h5>
            </div>

            <select name="industry_id" value={industry_id} onChange={setForm}>
              <option value="">Select ...</option>
              {industries.map((ind, index) => {
                return (
                  <option key={ind.id} value={ind.id}>
                    {ind.name}
                  </option>
                );
              })}
            </select>

            <div className="notification error  notification1 form-error">
              {errors.industry_id}
            </div>
          </div>
          <div className="col-md-6 offset-md-3">
            <div className="section-headline margin-top-5 padding-top-5 margin-bottom-5">
              <h5>
                <b>Project Title</b>
                <p style={{ lineHeight: "15px" }}>
                  <small>
                    You can use the following format to create a project title
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
              placeholder="Ex.website redesign"
            />
            <div className="notification error  notification1 form-error">
              {errors.project_title}
            </div>
          </div>

          <div className="col-md-6 offset-md-3">
            <div className="categories-container margin-top-5 padding-top-5 margin-bottom-5">
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
                {Object.entries(masterTimeline).map(([value, name]) => (
                  <ItemForm
                    key={`timeLines${value}`}
                    label={name}
                    id={`timeLines${value}`}
                    name="timeline"
                    value={value}
                    checked={timeline === value}
                    onChange={setForm}
                    type="radio"
                  />
                ))}
              </section>
            </div>
          </div>

          {/* Display Custom Date  */}
          {customDate}
          {/* Display Custom Date  */}

          <div
            className="col-md-6 offset-md-3"
            style={{ marginTop: "20px", padding: "0px 20px" }}
          >
            <div className="notification error  notification1 form-error">
              {errors.error}
            </div>
            <a
              className="button gray ripple-effect button-sliding-icon"
              onClick={previous}
            >
              <i className="icon-feather-arrow-left"></i> Previous
            </a>{" "}
            <a
              className="button  ripple-effect button-sliding-icon"
              onClick={checkValidation}
              style={{ color: "#fff" }}
            >
              Next <i className="icon-feather-arrow-right"></i>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Step4;
