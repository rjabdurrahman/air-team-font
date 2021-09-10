import React, { useState } from "react";
import ItemForm from "./ItemForm";

const Step7 = ({ setForm, formData, navigation }) => {
  const [errors, setErrors] = useState({});
  const { budget } = formData;
  const { previous, next } = navigation;
  const MasterBudgets = formData.master.budgets;

  const checkValidation = () => {
    if (budget == "") {
      setErrors({ budget: "Please select budget of your project." });
    } else {
      localStorage.setItem("POST_PROJECT", JSON.stringify(formData));
      localStorage.setItem("POST_PROJECT_STEP", "step7");
      next();
    }
  };

  return (
    <>
      <div className="section " style={{ margin: "100px auto" }}>
        <div className="container">
          <div className="col-xl-12">
            <div className="col-xl-12 categories-container">
              <div className="col-md-2" />
              <div className="col-md-10">
                <div className="section-headline margin-top-5 padding-top-5 margin-bottom-5">
                  <h4>Have a budget in mind ?</h4>
                </div>
                <p>
                  We want to make this process easy on your wallet but we can
                  get the best talent out there if that necessary.
                </p>
              </div>
            </div>
            <div className="categories-container">
              <div className="col-md-8 offset-md-2 budgets">
                <section>
                  {Object.entries(MasterBudgets).map(([value, name]) => (
                    <ItemForm
                      key={`budgetsIDs${value}`}
                      label={name}
                      id={`budgetsIDs${value}`}
                      name="budget"
                      value={value}
                      checked={budget === value}
                      onChange={setForm}
                      type="radio"
                    />
                  ))}
                </section>
              </div>
            </div>

            <div
              className="col-md-8 offset-md-2"
              style={{ marginTop: "20px", padding: "0px 20px" }}
            >
              <div className="notification error  notification1 form-error">
                {errors.budget}
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
      </div>
    </>
  );
};

export default Step7;
