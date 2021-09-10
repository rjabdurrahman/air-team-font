import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import LoadingOverlay from "react-loading-overlay";
import { NotificationManager } from "react-notifications";
import submitSomethingElse from "./SubmitSomethingElse";
import { Multiselect } from "multiselect-react-dropdown";
import classNames from "classnames";

import Breadcrumb from "./Breadcrumb";
import "./style.css";

const displaySubCategories = (
  category,
  SubCategories,
  handleChangeSub,
  selectedSubCategories,
  handleSwitchChange,
  switchChecked
) => {
  // console.log("SubCategories", SubCategories);

  return (
    <>
      {category.map((cat, idx) => {
        // console.log("cat", cat);

        // console.log(`cat._id${cat._id}`, switchChecked);
        var isSelected = switchChecked.indexOf(cat._id) > -1 ? true : false;
        // console.log("isSelected", isSelected);
        return (
          <div
            key={idx}
            className="category-box-content margin-top-25  margin-bottom-25"
          >
            <h5
              style={{
                fontSize: "24px",
                color: "#2e3a59",
                fontWeight: "bold",
                marginBottom: "15px"
              }}
            >
              {cat.name}
            </h5>
            <div>
              <label
                id={`lbl_${cat._id}`}
                style={{
                  margin: 0,
                  color: "#a5a5a6",
                  fontWeight: "bold",
                  fontSize: "16px",
                  marginBottom: "15px"
                }}
                className={classNames({ lblSelected: isSelected })}
              >
                A team suggested based on my brief{" "}
              </label>

              <div style={{ display: "inline-block" }}>
                <label
                  className="switch"
                  style={{
                    display: "block",
                    marginLeft: "10px",
                    marginTop: "-17px"
                  }}
                >
                  <input
                    type="checkbox"
                    className="mainCatswitch"
                    value={cat._id}
                    onChange={() => handleSwitchChange(cat._id)}
                    defaultChecked={isSelected}
                  />
                  <span className="switch-button"></span>
                </label>
              </div>
            </div>

            <div
              id={`mainCat_${cat._id}`}
              className={"row " + (isSelected ? "disabled" : " ")}
              style={{ margin: 0, padding: 0 }}
            // disabled={isSelected === true ? "disabled" : ""}
            >
              {SubCategories.length > 0 &&
                SubCategories.map((subCat, sIdx) => {
                  if (cat._id === subCat.parent_id) {
                    return (
                      <div
                        key={sIdx}
                        className="col-md-3 col-sm-6 chk-form-group"
                        style={{
                          padding: "5px",
                          paddingLeft: "0px",

                          marginBottom: "0px"
                        }}
                      >
                        <input
                          id={subCat.id}
                          type="checkbox"
                          value={subCat.id}
                          onChange={e => handleChangeSub(e)}
                          className="myCheck"
                          defaultChecked={
                            selectedSubCategories.length > 0 &&
                              selectedSubCategories.findIndex(
                                x => x === subCat.id
                              ) > -1
                              ? true
                              : ""
                          }
                        />{" "}
                        <label htmlFor={subCat.id}>{subCat.name}</label>
                      </div>
                    );
                  }
                })}
            </div>
          </div>
        );
      })}
    </>
  );
};

//function Step2(props) {
const Step2 = ({ setForm, formData, navigation }) => {
  const multiselectRef = React.useRef(null);

  const [errors, setErrors] = useState({});
  const [loader, setLoader] = useState(true);
  const [otherProjectOptions, setOtherProjectOptions] = useState([]);

  const { category_id } = formData;
  const { previous, next } = navigation;
  // var Categories = formData.master.categories;
  const [Categories, setCategories] = useState([]);
  const [SubCategories, setSubCategories] = useState({});
  const [selectedCategories, setSelectedCategories] = useState(
    formData.categories
  );
  const [selectedSubCategories, setSelectedSubCategories] = useState(
    formData.subCategories
  );
  const [isSomething, setSomething] = useState(false);
  const [dispSubCat, setDispSubCat] = useState();
  const [otherProject, setOtherProject] = useState(formData.other_project);

  const [switchChecked, setSwitchChecked] = useState(formData.switchChecked);
  const [teamSuggestion, setTeamSuggestion] = useState(formData.teamSuggestion);

  // Something Else Modal
  const [modalInputs, setModalInputs] = useState({
    title: "",
    description: "",
    project_type: "",
    email_id: "",
    contact_no: ""
  });

  const submitSomeoneRequest = () => {
    console.log("modalInputs", modalInputs);
    if (modalInputs.project_type === "") {
      setErrors({ project_type: "Project type is required." });
      return false;
    } else if (modalInputs.description === "") {
      setErrors({ description: "Project description is required." });
      return false;
    } else if (modalInputs.email_id === "") {
      setErrors({ email_id: "Email id is required." });
      return false;
    } else {
      setErrors({ project_type: "", description: "", email_id: "" });
      setLoader(true);
      if (localStorage.getItem("ACCESS_TOKEN")) {
        submitSomethingElse(modalInputs);
        // alert("here");
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

      // console.log("modalInputs", modalInputs);
    }
  };

  useEffect(() => {
    setLoader(true);
    axios
      .get(process.env.REACT_APP_API_BASE_URL + "/maincategory/all")
      .then(res => {
        if (res.data.status) {
          setLoader(false);
          setCategories(res.data.result);
          formData.master.categories = res.data.result;
        }
      })
      .catch(e => {
        setLoader(false);
        NotificationManager.error("Unable to fetch prject type.", "Error !!!");
      });
    // .catch((error) => {});

    // get all subcateories
    setLoader(true);
    axios
      .get(process.env.REACT_APP_API_BASE_URL + "/sub_cat_parent_wise")
      .then(res => {
        setLoader(false);
        formData.master.subCategories = res.data.result;
        setSubCategories(res.data.result);
      });

    setLoader(false);

    document.getElementById("header-container").style.display = "none";
    document.getElementById("footer").style.display = "none";
    document.getElementById("wrapper").style.paddingTop = "0";

    return () => {
      document.getElementById("header-container").style.display = "";
      document.getElementById("footer").style.display = "";
      document.getElementById("wrapper").style.paddingTop = "82px";
    };
  }, []);

  const checkValidation = () => {
    // if (category_id == "") {
    // console.log("selectedCategories", selectedCategories);
    if (selectedCategories.length <= 0) {
      setErrors({
        category_id: "Please select category of what you are looking for."
      });
    } else {
      // Main category
      formData.category_id = selectedCategories;
      formData.categories = selectedCategories;
      formData.teamSuggestion = teamSuggestion;
      formData.switchChecked = switchChecked;

      // Sub category
      const subCategories = [
        ...document.querySelectorAll(".myCheck:checked")
      ].map(e => e.value);
      formData.subCategories = subCategories;
      formData.other_project = otherProject;

      localStorage.setItem("POST_PROJECT", JSON.stringify(formData));
      localStorage.setItem("POST_PROJECT_STEP", "step2");
      next();
    }
  };

  const handleChange = selectedOption => {
    // console.log("selectedOption", selectedOption);
    if (selectedOption != undefined && selectedOption.length > 0) {
      setLoader(true);
      setSelectedCategories(selectedOption);
      setDispSubCat(
        displaySubCategories(
          selectedOption,
          SubCategories,
          handleChangeSub,
          formData.subCategories,
          handleSwitchChange,
          switchChecked
        )
      );
      setLoader(false);
    }
  };

  useEffect(() => {
    if (
      SubCategories !== undefined &&
      SubCategories.length > 0 &&
      formData.categories.length > 0 &&
      formData.subCategories.length > 0
    ) {
      setDispSubCat(
        displaySubCategories(
          formData.categories,
          SubCategories,
          handleChangeSub,
          selectedSubCategories,
          handleSwitchChange,
          switchChecked
        )
      );
    }
    // }, [SubCategories, selectedSubCategories, switchChecked]);
  }, [SubCategories]);

  const handleChangeSub = event => {
    const subCategories = [
      ...document.querySelectorAll(".myCheck:checked")
    ].map(e => e.value);
    formData.subCategories = subCategories;
    setSelectedSubCategories(subCategories);
  };

  const handleModelInput = e => {
    setModalInputs({
      ...modalInputs,
      [e.target.name]: e.target.value
    });
  };

  const handleSwitchChange = cat_id => {
    // switchChecked.push({ [cat_id]: checked });

    const selectedMainCatswitch = [
      ...document.querySelectorAll(".mainCatswitch:checked")
    ].map(e => e.value);

    setTeamSuggestion(selectedMainCatswitch);
    setSwitchChecked(selectedMainCatswitch);

    const allMainCatSwitch = [
      ...document.querySelectorAll(".mainCatswitch")
    ].map(e => e.value);

    // console.log("element", element);

    // console.log("All", allMainCatSwitch);
    // console.log("selected", selectedMainCatswitch);

    allMainCatSwitch.forEach(cat_id => {
      var d = document.getElementById(`mainCat_${cat_id}`);
      let element = document.getElementById(`lbl_${cat_id}`);
      if (selectedMainCatswitch.indexOf(cat_id) > -1) {
        // element.style.color = "#2dbdc9";
        element.classList.add("lblSelected");

        d.className = " row disabled";
      } else {
        element.classList.remove("lblSelected");
        // element.style.color = "#a5a5a6";
        d.className = " row ";
      }
    });
  };

  const removeHandleSelected = item => {
    // findIndex;
    var index = selectedCategories.findIndex(cat => cat._id === item._id);
    if (index > -1) {
      var tempCategories = selectedCategories.filter(
        cat => cat._id !== item._id
      );
      setSelectedCategories(tempCategories);
    }
  };

  useEffect(() => {
    setLoader(true);
    // console.log("selectedCategories", selectedCategories);
    handleChange(selectedCategories);
    var selectedCat = [];
    selectedCategories.forEach(element => {
      selectedCat.push(element._id);
    });
    axios
      .post(
        process.env.REACT_APP_API_BASE_URL + "/other_categories_by_category_id",
        { category_id: selectedCat }
      )
      .then(res => {
        if (res.data.status) {
          setLoader(false);
          setOtherProjectOptions(res.data.result);
          formData.master.otherProjectOptions = res.data.result;
        }
      })
      .catch(e => {
        setLoader(false);
        NotificationManager.error("Unable to fetch prject type.", "Error !!!");
      });
    // .catch((error) => {});
  }, [selectedCategories]);

  const handleOtherProjectChange = selectedOtherOption => {
    selectedCategories.push(selectedOtherOption);
    setSelectedCategories(selectedCategories);
    handleChange(selectedCategories);

    var index = otherProjectOptions.findIndex(
      cat => cat._id === selectedOtherOption._id
    );
    if (index > -1) {
      otherProjectOptions.splice(index, 1);
      setOtherProjectOptions(otherProjectOptions);
    }
  };
  return (
    <div style={{ minHeight: '100vh' }}>
      {/* Category Boxes */}
      <style>
        {
          "\
          div[disabled] {\
              pointer-events: none;\
              opacity: 0.3;\
          }\
          "
        }
      </style>
      <Breadcrumb navigation={navigation} currentTab="step2" />
      <LoadingOverlay active={loader} spinner text="Loading...">
        <div className="section" style={{ margin: "100px auto" }}>
          <div className="container">
            {/* <div className="col-xl-8 col-md-8 offset-md-2"> */}
            <div className="col-sm-12 col-xl-10 col-md-10 offset-md-1 offset-xl-1">
              <div
                className="categories-container margin-bottom-15"
                style={{ paddingRight: 0 }}
              >
                {/* <h3>Project Type?</h3> */}
                <h5
                  style={{
                    fontSize: "28px",
                    fontWeight: "bold",
                    lineHeight: 1.14,
                    letterSpacing: "normal"
                  }}
                >
                  <b>Project Type</b>
                  <p
                    style={{
                      fontSize: "16px",
                      color: "#3a3a3c !important",
                      lineHeight: 1.56,
                      fontWeight: "normal",
                      textAlign: "justify"
                    }}
                  >
                    Select the project type from the option below. This will
                    help us to fetch you the best possible skill set match
                  </p>
                </h5>

                {Categories !== undefined && Categories.length > 0 ? (
                  <Multiselect
                    options={Categories} // Options to display in the dropdown
                    selectedValues={selectedCategories} // Preselected value to persist in dropdown
                    onSelect={handleChange} // Function will trigger on select event
                    onRemove={handleChange} // Function will trigger on remove event
                    displayValue="name" // Property name to display in the dropdown options
                    style={{
                      searchBox: { color: "#979797" },
                      chips: { background: "#54c4c3", display: "none" }
                    }}
                    placeholder={`Select type of project`}
                    ref={multiselectRef}
                  />
                ) : (
                  <></>
                )}

                {selectedCategories.map(chip => {
                  // console.log("chip", chip);
                  return (
                    // <span
                    //   className="chip _7ahQImyV4dj0EpcNOjnwA"
                    //   key={chip._id}
                    // >
                    //   {chip.name} 1 2{" "}
                    //   <i></i>
                    // </span>

                    <span key={'chip_' + chip.name} className="keyword">
                      <span
                        className="keyword-remove"
                        style={{ float: "right" }}
                        onClick={() => removeHandleSelected(chip)}
                      ></span>
                      <span
                        className="keyword-text"
                        style={{ marginLeft: "10px" }}
                      >
                        {chip.name}
                      </span>
                    </span>
                  );
                })}
              </div>
              {/* Category Boxes Container */}

              {/* Display Selected categories   */}
              {dispSubCat}
              {/* Display Selected categories   */}

              {/* display other project options */}
              {otherProjectOptions !== undefined &&
                otherProjectOptions.length > 0 ? (
                <div className="categories-container margin-top-25">
                  <h5
                    style={{
                      color: "#00c3c2",
                      textTransform: "uppercase",
                      fontSize: "18px",
                      color: "#2dbdc9",
                      textAlign: "justify",
                      lineHeight: 1.67,
                      letterSpacing: 1.4,
                      fontWeight: 500
                    }}
                  >
                    Other projects to choose from
                  </h5>
                  <div id={"postChkRdo"} style={{ width: "100%" }}>
                    <div className="row">
                      {otherProjectOptions.map((other, idx) => {
                        // console.log("other", other);
                        return (
                          <div
                            className="col-md-3 col-sm-6"
                            key={`${idx}`}
                            style={{ marginBottom: "10px" }}
                          >
                            <input
                              type="radio"
                              id={other._id}
                              name="other_project"
                              value={other._id}
                              // defaultChecked={
                              //   otherProject !== undefined &&
                              //   other._id === otherProject._id
                              // }
                              // onChange={e => setOtherProject(other)}
                              onChange={() => handleOtherProjectChange(other)}
                            />
                            <label
                              className="postChkRdo"
                              htmlFor={other._id}
                              style={{
                                padding: "15px",
                                fontSize: "14px",
                                height: "90px",
                                width: "175px",
                                borderRadius: "9.5px",
                                background: "#ffffff",
                                border: "solid 2px dcecee",
                                color: "#001626"
                              }}
                            >
                              {other.name}
                            </label>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ) : (
                <></>
              )}

              {/* display other project options */}

              {/* Form Buttons */}
              <div className="something-container chk-form-group">
                {/*-----------------------------------------------*/}
                <div style={{ marginTop: "20px", padding: "0px 0px" }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div>
                      <input
                        id="somethingCheck"
                        type="checkbox"
                        className="myCheck"
                        defaultChecked={false}
                        onChange={(event) => setSomething(event.target.checked)}
                      />
                      <label htmlFor="somethingCheck" style={{ marginBottom: 0, marginRight: '8px' }}></label>
                    </div>
                    <div>
                      <span className="margin-top-30"
                        style={{
                          color: "#6F87A0",
                          fontSize: "16px",
                          fontWeight: "500",
                          lineHeight: '24px',
                          cursor: "pointer"
                        }}
                      >
                        Looking for something not on the list?
                      </span>
                    </div>
                  </div>
                  {/* Something Start */}
                  {isSomething && <div className="section" style={{ marginTop: '30px' }}>
                    <div className="container">
                      <div className="row">
                        <div className="col-md-12" style={{ padding: 0 }}>
                          <div
                            className="section-headline  margin-bottom-15"
                            style={{ paddingRight: "0" }}
                          >
                            <h5
                              style={{
                                fontSize: "22px",
                                color: "#2e3a59",
                                lineHeight: 1.45
                              }}
                            >
                              Tell us about your project.
                              <p
                                style={{
                                  lineHeight: 1.43,
                                  fontSize: "16px",
                                  fontWeight: "normal",
                                  fontFamily: "Roboto",
                                  textAlign: "justify",
                                  letterSpacing: "normal"
                                }}
                              >
                                <small>
                                  Share a few details about the project you need to get
                                  done, the industry it is related to and the time frame
                                  within which you need it completed. We'll get back to
                                  you with the availiability of individuals/teams best
                                  suited to it
                                </small>
                              </p>
                            </h5>
                          </div>
                          <div className="submit-field">
                            <h5 className="air-team-h5">
                              Project Type{" "}
                              {/* <span
                className="notification error  notification1 form-error"
                style={{ margin: "0 15px !important" }}
                >
                {errors.project_type}
                </span> */}
                            </h5>
                            <input
                              type="text"
                              placeholder="Enter your project type..."
                              name="project_type"
                              value={modalInputs.project_type}
                              onChange={e => handleModelInput(e)}
                              style={{
                                color: "#3a3a3c !important",
                                fontSize: "16px",
                                background: "#f5f9fa  !important",
                                borderRadius: "4px"
                              }}
                            />

                            <div
                              className="notification error  notification1 form-error"
                              style={{ margin: "0 15px !important" }}
                            >
                              {errors.project_type}
                            </div>
                          </div>

                          <div className="submit-field">
                            <h5 className="air-team-h5">Project Description</h5>
                            <textarea
                              placeholder="What is your project all about? Give us a few basic details."
                              name="description"
                              value={modalInputs.description}
                              onChange={e => handleModelInput(e)}
                            />
                            <div
                              className="notification error  notification1 form-error"
                              style={{ margin: "0 15px !important" }}
                            >
                              {errors.description}
                            </div>
                          </div>

                          {/* email_id */}
                          <div className="submit-field">
                            <h5 className="air-team-h5">Email Id</h5>
                            <input
                              type="text"
                              placeholder="Enter your company email ID."
                              name="email_id"
                              value={modalInputs.email_id}
                              onChange={e => handleModelInput(e)}
                              style={{
                                color: "#3a3a3c",
                                fontSize: "16px",
                                background: "#f5f9fa",
                                borderRadius: "4px"
                              }}
                            />

                            <div
                              className="notification error  notification1 form-error"
                              style={{ margin: "0 15px !important" }}
                            >
                              {errors.email_id}
                            </div>
                          </div>
                          {/* email_id */}

                          {/* contact_no */}
                          <div className="submit-field">
                            <h5 className="air-team-h5">Contact Number (Optional)</h5>
                            <input
                              type="text"
                              placeholder="Enter your contact number."
                              name="contact_no"
                              value={modalInputs.contact_no}
                              onChange={e => handleModelInput(e)}
                            />

                            <div
                              className="notification error  notification1 form-error"
                              style={{ margin: "0 15px !important" }}
                            >
                              {errors.contact_no}
                            </div>
                          </div>
                          {/* contact_no */}
                        </div>
                      </div>
                    </div>
                  </div>}
                  {/* Soemthing End */}
                  <div className="notification error  notification1 form-error">
                    {errors.category_id}
                  </div>
                </div>
              </div>
              <div className="margin-top-20">
                {/* <a
                  className="button gray ripple-effect button-sliding-icon"
                  onClick={previous}
                >
                  <i className="icon-feather-arrow-left"></i> Previous
                </a>{" "} */}
                <a
                  className="SubmitBtn"
                  onClick={checkValidation}
                  style={{ color: "#fff", minWidth: "150px", float: "right" }}
                >
                  Next
                </a>
                {/*-----------------------------------------------*/}
              </div>
              {/* Form Buttons */}
            </div>
          </div>
        </div>
      </LoadingOverlay>
      {/* Category Boxes / End */}
    </div>
  );
};

export default Step2;
