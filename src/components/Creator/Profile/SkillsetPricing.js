import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import LoadingOverlay from "react-loading-overlay";
import ItemForm from "../../FormFields/ItemForm";
import { Multiselect } from "multiselect-react-dropdown";
import Fixmodal from "../../../utils/Fixmodal";
import NotificationManager from "react-notifications/lib/NotificationManager";

const SkillsetPricing = ({ setForm, formData, navigation }) => {
  // console.log(formData.selected_prices);
  const modalSkillsPrice = useRef();
  const [errors, setErrors] = useState({});
  const [loader, setLoader] = useState(true);
  const [masterCategories, setMasterCategories] = useState({});
  const [masterSkillsets, setMasterSkillsets] = useState([]);
  const [prices, setPrices] = useState(formData.selected_prices);
  const [currentPrice, setCurrentPrice] = useState({});

  const {
    skillsets,
    rate_type,
    selected_skillsets,
    selected_prices
  } = formData;
  const { previous, next } = navigation;

  // console.log("formData ", formData);
  useEffect(() => {
    //  axios
    //    .get(process.env.REACT_APP_API_BASE_URL + "/maincategory/all")
    //    .then(res => {
    //      if (res.data.status) {
    //        setMasterCategories(res.data.result);
    //        setLoader(false);
    //      }
    //    });

    // masterCategory
    axios
      .get(process.env.REACT_APP_API_BASE_URL + "/maincategory/all")
      .then(res => {
        if (res.data.status) {
          setMasterCategories(res.data.result);
          setLoader(false);
        }
      });

    axios.get(process.env.REACT_APP_API_BASE_URL + "/skill/all").then(res => {
      if (res.data.status) {
        var temp = [];
        Object.entries(res.data.result).map(([key, skills]) => {
          temp[key] = { id: skills._id, name: skills.name };
        });
        setMasterSkillsets(temp);
        setLoader(false);
      }
    });
  }, []);

  const handleChange = selectedOption => {
    formData.selected_skillsets = selectedOption;

    if (selectedOption.length >= 0) {
      const lastItem = selectedOption[selectedOption.length - 1];
      var temp = {
        id: lastItem.id,
        skill_name: lastItem.name,
        exp_level: "",
        price: ""
      };
      setCurrentPrice(temp);
      modalSkillsPrice.current.open();
    }
  };

  // console.log("formData.selected_skillsets", formData.selected_skillsets);
  const handleRemove = item => {
    formData.selected_skillsets = item;
    // selected_skillsets = item;
    prices.map((element, index) => {
      var isCurrentExist = item
        .map(function(x) {
          return x.id;
        })
        .indexOf(element.id);

      if (isCurrentExist == -1) {
        // console.log("slicing :", index);
        prices.splice(index, 1);
      }
    });
    setPrices(prices);
    formData.selected_prices = prices;
    // console.log("prices", prices);
  };

  const saveSkillSet = () => {
    // console.log(currentPrice.exp_level);
    if (currentPrice.exp_level == "") {
      setErrors({
        exp_level: "Please select experience level."
      });
    } else if (currentPrice.price == "") {
      setErrors({
        price: "Please enter project title."
      });
    } else {
      setErrors({ exp_level: "", price: "" });

      var isCurrentExist = prices
        .map(function(x) {
          return x.id;
        })
        .indexOf(currentPrice.id);
      // console.log("isCurrentExist : ", isCurrentExist);
      if (isCurrentExist <= -1) {
        prices.push(currentPrice);
        setPrices(prices);
      }
      formData.selected_prices = prices;
      modalSkillsPrice.current.close();
    }
  };

  const closeSkillSet = () => {
    var selectedOption = formData.selected_skillsets;
    selectedOption.splice(-1, 1);
    formData.selected_skillsets = selectedOption;
    // console.log(formData.selected_skillsets);
    // setForm(formData);
    modalSkillsPrice.current.close();
  };

  const saveProceed = () => {
    if (formData.skillsets == "") {
      setErrors({
        skillsets: "Please select your core specialization."
      });
    } else if (formData.rate_type == "") {
      setErrors({
        rate_type: "Please select How do you want to be paid for a project."
      });
    } else if (selected_prices.length <= 0) {
      setErrors({
        selected_prices: "Please specific atleast one skillsets."
      });
    } else {
      setLoader(true);
      setErrors({ skillsets: "", rate_type: "", selected_prices: "" });

      var payload = {
        skillsets: formData.skillsets,
        rate_type: formData.rate_type,
        skillset_prices: formData.selected_prices
      };

      let headerConfig = {
        headers: { authorization: localStorage.getItem("ACCESS_TOKEN") }
      };
      // console.log("payload", payload);
      axios
        .post(
          process.env.REACT_APP_API_BASE_URL + "/creator/profile/skillsets",
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
            next();
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
    }
  };
  //console.log(formData.selected_prices);

  useEffect(() => {
    console.log("masterSkillsets", masterSkillsets);
  }, [masterSkillsets]);
  return (
    <>
      <LoadingOverlay active={loader} spinner text="Loading...">
        <div
          className="section"
          style={{ marginTop: "30px", marginBottom: "50px" }}
        >
          <div className="container">
            <div className="row">
              <div className="col-xl-8 col-md-8 offset-md-2">
                <div className="section-headline  margin-bottom-15">
                  <h3>What is your core specialization?</h3>
                  <div
                    className="notification error  notification1 form-error"
                    style={{ margin: "0 15px !important" }}
                  >
                    {errors.skillsets}
                  </div>
                </div>
                <div id="postChkRdo">
                  <div className="row">
                    {/* {categories.map(cat => {
                      console.log(cat);
                    })} */}
                    {Object.entries(masterCategories).map(([key, cat]) => (
                      <ItemForm
                        key={`${cat._id}`}
                        label={cat.name}
                        id={`${cat._id}`}
                        name="skillsets"
                        value={cat._id}
                        checked={skillsets === cat._id}
                        onChange={setForm}
                        type="radio"
                      />
                    ))}

                    {/* Col-md-4 */}
                  </div>
                  {/* row */}
                </div>
                {/* postChkRdo */}
                <div className="section-headline  margin-bottom-15 margin-top-15 ">
                  <h3>How do you want to be paid for a project?</h3>
                  <div
                    className="notification error  notification1 form-error"
                    style={{ margin: "0 15px !important" }}
                  >
                    {errors.rate_type}
                  </div>
                </div>
                <div id="postChkRdo">
                  <div className="row">
                    <ItemForm
                      key={`rate_type_fixed`}
                      id={`rate_type_fixed`}
                      label={"Fixed Price"}
                      name="rate_type"
                      value="Fixed Price"
                      checked={rate_type === "Fixed Price"}
                      onChange={setForm}
                      type="radio"
                    />

                    <ItemForm
                      key={`rate_type_hourly`}
                      id={`rate_type_hourly`}
                      label={"Hourly"}
                      name="rate_type"
                      value="Hourly"
                      checked={rate_type === "Hourly"}
                      onChange={setForm}
                      type="radio"
                    />

                    {/* Col-md-4 */}
                  </div>
                  {/* row */}
                </div>
                {/* postChkRdo */}
                <div className="section-headline  margin-bottom-15 margin-top-15">
                  <h3>Select and price your specific skillsets?</h3>
                  <p>
                    Let us know about the specific skills you offer services and
                    how you charge your work.
                  </p>
                  <div
                    className="notification error  notification1 form-error"
                    style={{ margin: "0 15px !important" }}
                  >
                    {errors.selected_prices}
                  </div>
                </div>
                <Multiselect
                  options={masterSkillsets} // Options to display in the dropdown
                  selectedValues={formData.selected_skillsets} // Preselected value to persist in dropdown
                  onSelect={handleChange} // Function will trigger on select event
                  onRemove={handleRemove} // Function will trigger on remove event
                  displayValue="name" // Property name to display in the dropdown options
                  style={{ chips: { background: "#54c4c3" } }}
                  placeholder={`Search for more skillset`}
                />

                {/* {alert(prices.length)} */}
                {prices.length > 0 ? (
                  <div className="col-xl-12">
                    <div className="dashboard-box margin-top-0">
                      <div className="content">
                        <ul className="dashboard-box-list">
                          {prices.map((price, index) => {
                            return (
                              <li>
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
                                {/* Buttons */}
                                <div className="buttons-to-right">
                                  <a className="button red ripple-effect ico">
                                    <i
                                      className="icon-line-awesome-close"
                                      style={{ color: "#fff" }}
                                    />
                                  </a>
                                </div>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div
                      className="notification warning no-shadow"
                      style={{ padding: "50px 25px" }}
                    >
                      <p>Please select price of your specific skillsets</p>
                    </div>
                  </div>
                )}

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
                    Save & Proceed <i className="icon-feather-arrow-right"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Skills and price modal */}
        <Fixmodal ref={modalSkillsPrice}>
          <div className="categories-container">
            <div className="section-headline">
              <h3>{currentPrice.skill_name}</h3>
            </div>
            <div className="category-box-content margin-top-15 ">
              <p>Select Experience Level</p>
              <div id="postChkRdo">
                <div className="row">
                  <div className="col-md-4 col-sm-6">
                    <input
                      type="radio"
                      name="exp_level"
                      value="Entry Level"
                      id="exp_level_1"
                      onClick={e => {
                        currentPrice.exp_level = "Entry Level";
                        setCurrentPrice(currentPrice);
                      }}
                    />
                    <label
                      className="postChkRdo"
                      htmlFor="exp_level_1"
                      style={{ height: "50px", padding: " 0" }}
                    >
                      Entry Level
                    </label>
                  </div>
                  <div className="col-md-4 col-sm-6">
                    <input
                      type="radio"
                      name="exp_level"
                      value="Intermidiate"
                      id="exp_level_2"
                      onClick={e => {
                        currentPrice.exp_level = "Intermidiate";
                        setCurrentPrice(currentPrice);
                      }}
                    />
                    <label
                      className="postChkRdo"
                      htmlFor="exp_level_2"
                      style={{ height: "50px", padding: " 0" }}
                    >
                      Intermidiate
                    </label>
                  </div>
                  <div className="col-md-4 col-sm-6">
                    <input
                      type="radio"
                      name="exp_level"
                      value="Expert"
                      id="exp_level_3"
                      onClick={e => {
                        currentPrice.exp_level = "Expert";
                        setCurrentPrice(currentPrice);
                      }}
                    />
                    <label
                      className="postChkRdo"
                      htmlFor="exp_level_3"
                      style={{ height: "50px", padding: " 0" }}
                    >
                      Expert
                    </label>
                  </div>
                  <div
                    className="notification error  notification1 form-error"
                    style={{ margin: "0 15px !important" }}
                  >
                    {errors.exp_level}
                  </div>
                </div>
                {/* row */}
              </div>
            </div>
            <div className="category-box-content margin-top-25 col-md-12 col-sm-12">
              <p style={{ marginLeft: "-15px" }}>Enter the minimum price</p>
              <div className="row">
                <div className="input-with-icon-left">
                  <i className="icon-line-awesome-money" />
                  <input
                    type="number"
                    className="input-text with-border"
                    name="price"
                    id="price"
                    placeholder="Enter price amount"
                    value={currentPrice.price}
                    onChange={e => {
                      setCurrentPrice({
                        ...currentPrice,
                        price: e.target.value
                      });
                    }}
                  />
                </div>

                <div
                  className="notification error  notification1 form-error"
                  style={{ margin: "0 15px !important", width: "100%" }}
                >
                  {errors.price}
                </div>
              </div>
              {/*row*/}
            </div>
            {/*category-box-content*/}
            <div className="category-box-content margin-top-25 col-md-12 col-sm-12">
              <div className="row">
                <a
                  onClick={saveSkillSet}
                  className="button ripple-effect button-sliding-icon"
                  style={{ marginRight: "10px", color: "#fff" }}
                >
                  Save Skills <i className="icon-feather-check"></i>
                </a>{" "}
                <a
                  onClick={closeSkillSet}
                  className="button gray ripple-effect button-sliding-icon"
                >
                  Close <i className="icon-line-awesome-close"></i>
                </a>
              </div>
            </div>
            {/*category-box-content*/}
          </div>
        </Fixmodal>
        {/* Skills and price modal */}
      </LoadingOverlay>
    </>
  );
};

export default SkillsetPricing;
