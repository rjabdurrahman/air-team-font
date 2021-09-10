import React, { useState, useEffect, useRef } from "react";
import ItemForm from "./ItemForm";
import axios from "axios";
import ReactTooltip from "react-tooltip";
import Modal from "../../utils/Modal";
import LoadingOverlay from "react-loading-overlay";
import { NotificationManager } from "react-notifications";
import submitSomethingElse from "./SubmitSomethingElse";
import { Multiselect } from "multiselect-react-dropdown";

//function Step2(props) {
const Step2 = ({ setForm, formData, navigation }) => {
  const [errors, setErrors] = useState({});
  const [loader, setLoader] = useState(true);

  const { category_id } = formData;
  const { previous, next } = navigation;
  // var Categories = formData.master.categories;
  const [Categories, setCategories] = useState({});
  const [SubCategories, setSubCategories] = useState({});

  // Something Else Modal
  const modalSomethingRef = useRef();
  const [modalInputs, setModalInputs] = useState({
    title: "",
    description: "",
  });

  const submitSomeoneRequest = () => {
    if (modalInputs.title === "") {
      setErrors({ title: "Job title is required." });
    } else if (modalInputs.description === "") {
      setErrors({ description: "Job description is required." });
    } else {
      setErrors({ title: "", description: "" });
      setLoader(true);
      if (localStorage.getItem("ACCESS_TOKEN")) {
        submitSomethingElse(modalInputs);
        alert("here");
      } else {
        setLoader(false);

        localStorage.setItem(
          "POST_PROJECT_SOMETHING_ELSE",
          JSON.stringify(modalInputs)
        );

        NotificationManager.info(
          "Please login to post your request.",
          "Post Project !!!"
        );
        var loginModal = document.getElementById("loginID");
        loginModal.click();
      }

      console.log("modalInputs", modalInputs);
    }
  };

  const openSomething = () => {
    modalSomethingRef.current.open();
  };

  const closeSomething = () => {
    modalSomethingRef.current.close();
  };

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_BASE_URL + "/maincategory/all")
      .then((res) => {
        if (res.data.status) {
          var categories = {};
          res.data.result.forEach((element) => {
            categories[element._id] = element.name;
          });
          setCategories(categories);
          formData.master.categories = categories;
        }
      })
      .catch((error) => {});

    // get all subcateories

    axios
      .get(process.env.REACT_APP_API_BASE_URL + "/sub_cat_parent_wise")
      .then((res) => {
        var categories = {};
        res.data.result.forEach((element) => {
          categories[element.id] = {
            id: element.id,
            name: element.name,
            parent_id: element.parent_id,
          };
        });
        setSubCategories(categories);
      });

    setLoader(false);
  }, []);

  const checkValidation = () => {
    if (category_id == "") {
      setErrors({
        category_id: "Please select category of what you are looking for.",
      });
    } else {
      localStorage.setItem("POST_PROJECT", JSON.stringify(formData));
      localStorage.setItem("POST_PROJECT_STEP", "step2");
      next();
    }
  };

  const handleChange = (selectedOption) => {
    setMoreSkills(selectedOption);
    formData.more_skillsets = selectedOption;
    // formData.more_skillsets = moreSkills;
    createCheckbox(formData.more_skillsets);
  };

  // useEffect(() => {
  //   console.log("Categories", Categories);
  //   console.log("setSubCategories", SubCategories);
  // }, [SubCategories]);

  return (
    <>
      {/* Category Boxes */}
      <LoadingOverlay active={loader} spinner text="Loading...">
        <div className="section " style={{ margin: "100px auto" }}>
          <div className="container">
            <div className="col-md-8 offset-md-2">
              <div className="section-headline margin-bottom-15">
                {/* <h3>Project Type?</h3> */}
                <h2>
                  <b>Project Type</b>
                </h2>
                <p>
                  Select the project type from the option below. this will help
                  us to fetch you the best possible skill set match
                </p>
                {Categories.length > 0 ? (
                  <Multiselect
                    options={Categories} // Options to display in the dropdown
                    // selectedValues={more_skillsets} // Preselected value to persist in dropdown
                    onSelect={handleChange} // Function will trigger on select event
                    onRemove={handleChange} // Function will trigger on remove event
                    displayValue="name" // Property name to display in the dropdown options
                    style={{ chips: { background: "#54c4c3" } }}
                    placeholder={`Search for skillset related to '${formData.master.categories[category_id]}'`}
                  />
                ) : (
                  <></>
                )}
              </div>
              {/* Category Boxes Container */}
              <div id={"postChkRdo"}>
                <div className="row">
                  {Object.entries(Categories).map(([value, name]) => (
                    <div className="col-md-4 col-sm-6" key={`${value}`}>
                      <input
                        type="radio"
                        id={value}
                        name="category_id"
                        value={value}
                        checked={category_id === value}
                        onChange={setForm}
                      />
                      <label className="postChkRdo" htmlFor={value}>
                        {name}
                        <i
                          className="icon-line-awesome-info info-icon"
                          data-for="main"
                          data-iscapture="true"
                          data-tip
                          data-for={`tooltip_${value}`}
                        ></i>
                      </label>
                      <ReactTooltip
                        place="right"
                        id={`tooltip_${value}`}
                        aria-haspopup="true"
                        role="example"
                      >
                        <ul>
                          {Object.entries(SubCategories).map((subCat) => {
                            if (subCat[1].parent_id == value) {
                              return (
                                <li key={subCat[1].id}>{subCat[1].name}</li>
                              );
                            }
                          })}
                        </ul>
                      </ReactTooltip>
                    </div>
                  ))}
                </div>
              </div>
              <div className="categories-container">
                {/*-----------------------------------------------*/}

                <div style={{ marginTop: "20px", padding: "0px 0px" }}>
                  <span className="freelancer-detail-item">
                    <a onClick={openSomething}>looking for something else? </a>
                  </span>
                  <div className="notification error  notification1 form-error">
                    {errors.category_id}
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

                {/*-----------------------------------------------*/}
              </div>
            </div>
          </div>
        </div>
      </LoadingOverlay>
      {/* Category Boxes / End */}

      <Modal ref={modalSomethingRef}>
        <LoadingOverlay active={loader} spinner text="Loading...">
          <div className="section">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div
                    className="section-headline  margin-bottom-15"
                    style={{ paddingRight: "0" }}
                  >
                    <h4>
                      Tell us what you're looking for and we'll get in touch
                    </h4>
                  </div>
                  <div className="submit-field">
                    <h5>Job Title</h5>
                    <input
                      type="text"
                      placeholder="Enter job title..."
                      name="title"
                      value={modalInputs.title}
                      onChange={(e) => {
                        setModalInputs({
                          ...modalInputs,
                          [e.target.name]: e.target.value,
                        });
                      }}
                    />

                    <div
                      className="notification error  notification1 form-error"
                      style={{ margin: "0 15px !important" }}
                    >
                      {errors.title}
                    </div>
                  </div>
                  <div className="submit-field">
                    <h5>Description</h5>
                    <textarea
                      placeholder="Describe your requirements..."
                      name="description"
                      value={modalInputs.description}
                      onChange={(e) => {
                        setModalInputs({
                          ...modalInputs,
                          [e.target.name]: e.target.value,
                        });
                      }}
                    />
                    <div
                      className="notification error  notification1 form-error"
                      style={{ margin: "0 15px !important" }}
                    >
                      {errors.description}
                    </div>
                  </div>
                  <a
                    // href="#"
                    style={{
                      width: "100%",
                      textAlign: "center",
                      color: "#fff",
                    }}
                    className="button ripple-effect"
                    onClick={submitSomeoneRequest}
                  >
                    Submit &amp; Finish{" "}
                    <i className="icon-material-outline-check" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </LoadingOverlay>
      </Modal>
    </>
  );
};

export default Step2;
