import React, { useState } from "react";
import ItemForm from "./ItemForm";

const Step6 = ({ setForm, formData, navigation }) => {
  const [errors, setErrors] = useState({});

  const { timeline, from_date, to_date } = formData;
  const { previous, next } = navigation;
  const masterTimeline = formData.master.timeline;

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

  const checkValidation = () => {
    if (timeline == "") {
      setErrors({ timeline: "Please select timeline of your project." });
    } else if (timeline == 5 && from_date == "") {
      setErrors({ from_date: "Please select starting date." });
    } else if (timeline == 5 && to_date == "") {
      setErrors({ to_date: "Please select end date." });
    } else {
      localStorage.setItem("POST_PROJECT", JSON.stringify(formData));
      localStorage.setItem("POST_PROJECT_STEP", "step6");
      next();
    }
  };

  return (
    <>
      <div className="section" style={{ margin: "100px auto" }}>
        <div className="container">
          <div className="col-xl-12">
            <div
              className="col-md-10 offset-md-2"
              style={{ padding: "10px 20px" }}
            >
              <div className="section-headline margin-top-5 padding-top-5 margin-bottom-5">
                <h4>Do you have a timeline for your project ?</h4>
              </div>
              <p>
                This information helps us to create the most optimal praposal
                and look for available work
              </p>
            </div>

            {/* Category Boxes Container */}
            <div className="categories-container">
              <div className="col-md-8 offset-md-2">
                <section>
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
              className="col-md-8 offset-md-2"
              style={{ marginTop: "20px", padding: "0px 20px" }}
            >
              <div className="notification error  notification1 form-error">
                {errors.timeline}
              </div>
              <a
                className="button gray ripple-effect button-sliding-icon"
                onClick={previous}
              >
                <i className="icon-feather-arrow-left"></i> Save Draft
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
      </div>
    </>
  );
};

export default Step6;
