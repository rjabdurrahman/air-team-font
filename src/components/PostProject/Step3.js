import React, { useState, useEffect } from "react";
import ItemForm from "./ItemForm";
import Select from "react-select";
import ItemSelect2Form from "./ItemSelect2Form";
import { Multiselect } from "multiselect-react-dropdown";
import ItemCheckboxForm from "./ItemCheckboxForm";
import axios from "axios";
import "./style.css";

var Masterskills;

const Checkbox = ({ name, label, checked = false, onChange }) => {
  // console.log("Checkbox: ", name, checked);

  return (
    <div className="col-md-4 col-sm-6">
      <input
        type="checkbox"
        name={name}
        id={name}
        onChange={onChange}
        checked={checked}
        value={name}
      />
      <label className="postChkRdo" htmlFor={name}>
        {label}
      </label>
    </div>
  );
};

const Step3 = ({ setForm, formData, navigation }) => {
  const [errors, setErrors] = useState({});
  const [moreSkills, setMoreSkills] = useState();
  const [checkedItemsValues, setCheckedItemsValues] = useState([]); //plain object as state

  const { category_id, skillsets, more_skillsets } = formData;
  const { previous, next } = navigation;
  // const MasterSkillsets = formData.master.skillsets[category_id];
  const [MasterSkillsets, setMasterSkillsets] = useState([]);
  const [MoreOptions, setMoreOptions] = useState([]);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_BASE_URL + "/skill/all")
      .then((res) => {
        if (res.data.status) {
          var categories = [];
          var moreCategories = [];
          var i = 0;
          res.data.result.forEach((element) => {
            if (i > 2) {
              // find more skillsets are already selected
              if (
                more_skillsets.length > 0 &&
                JSON.stringify(more_skillsets).indexOf(element._id) > -1
              ) {
                categories.push({ id: element._id, name: element.name });
              } else {
                moreCategories.push({ id: element._id, name: element.name });
              }
            } else {
              categories.push({ id: element._id, name: element.name });
            }
            i = i + 1;
          });
          if (more_skillsets.length > 0) {
          }

          // console.log("moreCategories", moreCategories);
          setMasterSkillsets(categories);
          setMoreOptions(moreCategories);
        }
      })
      .catch((error) => {});
  }, []);

  const checkValidation = () => {
    if (Object.keys(checkedItems).length <= 0) {
      setErrors({
        skillsets: "Please select required skillssets.",
      });
    } else {
      setErrors({
        skillsets: "",
      });

      localStorage.setItem("POST_PROJECT", JSON.stringify(formData));
      localStorage.setItem("POST_PROJECT_STEP", "step3");
      next();
    }
  };

  // var skillsets;
  // const handleMasterChange = e => {
  //   if (SelectedSkillS.indexOf(e.target.value) == -1) {
  //     console.log("checked");
  //     SelectedSkillS.push(e.target.value);
  //     setSelectedSkillS(SelectedSkillS);
  //   } else {
  //     console.log("not checked");
  //     SelectedSkillS.splice(SelectedSkillS.indexOf(e.target.value), 1);
  //     setSelectedSkillS(SelectedSkillS);
  //   }
  //   console.log("SelectedSkillS", SelectedSkillS);
  //   formData.skillsets = SelectedSkillS;
  // };
  // more_skillsets
  const handleChange = (selectedOption) => {
    setMoreSkills(selectedOption);
    formData.more_skillsets = selectedOption;
    // formData.more_skillsets = moreSkills;
    createCheckbox(formData.more_skillsets);
  };

  const [checkedItems, setCheckedItems] = useState(formData.skillsets);

  const handleSkillChange = (event) => {
    setCheckedItems({
      ...checkedItems,
      [event.target.name]: event.target.checked,
    });
  };

  // create new checkbox
  const createCheckbox = (selectedOption) => {
    if (selectedOption.length > 0) {
      MasterSkillsets.push(selectedOption[selectedOption.length - 1]);
      setMasterSkillsets(MasterSkillsets);
    }
    console.log("selectedOption.length", selectedOption.length);
    console.log("selectedOption", selectedOption);
    console.log("Masterskills", MasterSkillsets);
    // setMasterSkillsets({
    //   ...MasterSkillsets,
    //   [selectedOption.id]: selectedOption.name
    // });
  };

  useEffect(() => {
    formData.skillsets = checkedItems;
  }, [checkedItems]);

  // console.log("MoreOptions1 : ", MoreOptions);
  return (
    <>
      <div
        className="section PostProjectStep3"
        style={{ margin: "100px auto" }}
      >
        <div className="container">
          <div className="col-md-8 offset-md-2">
            <div className="section-headline margin-bottom-15">
              <h2>
                <b>Select the required Skillssets</b>
              </h2>
              <p>
                Build your project brief in a few simple steps. Our experts will
                get to work and find you the best talent.
              </p>
              {MoreOptions.length > 0 ? (
                <Multiselect
                  options={MoreOptions} // Options to display in the dropdown
                  selectedValues={more_skillsets} // Preselected value to persist in dropdown
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
            <div id="postChkRdo">
              <div className="row">
                {Object.entries(MasterSkillsets)
                  .slice(0, 6)
                  .map(([index, skills]) => (
                    // console.log("value", value, skills),
                    <Checkbox
                      key={`skillsetsIDs${skills.id}`}
                      name={skills.id}
                      id={skills.id}
                      checked={checkedItems[skills.id]}
                      onChange={handleSkillChange}
                      label={skills.name}
                    />
                  ))}
                {/* {createCheckbox} */}
              </div>
            </div>
            <div className="notification error  notification1 form-error">
              {errors.skillsets}
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

export default Step3;
