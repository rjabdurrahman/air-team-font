import React, { useState } from "react";
import ItemForm from "./ItemForm";

const Step5 = ({ setForm, formData, navigation }) => {
  const [errors, setErrors] = useState({});
  const { project_type } = formData;
  const { previous, next } = navigation;
  const masterProjectType = formData.master.projectTypes;

  const checkValidation = () => {
    if (project_type == "") {
      setErrors({ project_type: "Please select resource you required." });
    } else {
      setErrors({ project_type: "" });

      localStorage.setItem("POST_PROJECT", JSON.stringify(formData));
      localStorage.setItem("POST_PROJECT_STEP", "step5");
      next();
    }
  };

  return (
    <>
      <div className="section" style={{ margin: "100px auto" }}>
        <div className="container">
          <div className="col-xl-12">
            <div className="col-xl-12 categories-container">
              <div className="col-md-2"></div>
              <div className="col-md-10">
                <div className="section-headline margin-top-5 padding-top-5 margin-bottom-5">
                  <h4>How many people are required ?</h4>
                </div>
                <p>
                  Build your input with preadded keywords and border Keywords{" "}
                  <br /> input with preadded keywords.
                </p>
              </div>
            </div>

            <div className="categories-container">
              <div className="col-md-8 offset-md-2">
                <section>
                  <section>
                    {Object.entries(masterProjectType).map(([value, name]) => (
                      <ItemForm
                        key={`projectTypes${value}`}
                        label={name}
                        id={`projectTypes${value}`}
                        name="project_type"
                        value={value}
                        checked={project_type === value}
                        onChange={setForm}
                        type="radio"
                      />
                    ))}
                  </section>
                </section>
              </div>

              <div
                className="col-md-8 offset-md-2"
                style={{ marginTop: "20px", padding: "0px 20px" }}
              >
                <div className="notification error  notification1 form-error">
                  {errors.project_type}
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
      </div>
    </>
  );
};

export default Step5;
