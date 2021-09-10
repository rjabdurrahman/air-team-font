import React, { useEffect, useState, useRef } from "react";
import ItemForm from "./ItemForm";
import Modal from "../../utils/Modal";
import Breadcrumb from "./Breadcrumb";

const selectedDocDisp = (documents, removeSupportingDoc) => {
  // console.log("documents", documents);
  if (documents.length > 0) {
    return (
      <div className="margin-bottom-25 margin-bottom-25">
        {documents.map((file, idx) => {
          if (file[1].name !== undefined) {
            return (
              <span
                key={idx}
                style={{
                  background: "rgba(93, 187, 199, 0.06)",
                  border: "solid 1px #2dbdc9",
                  borderRadius: "6px",
                  fontWeight: "500",
                  padding: "12px 12px 11px 8px",
                  color: "#001626",
                  fontSize: "14px",
                  lineHeight: 1.79,
                  marginRight: "10px",
                  textTransform: "capitalize",
                  height: "48px",
                  display: "inline-block",
                  marginTop: "5px"
                }}
              >
                <i className="icon-line-awesome-file"></i> {`${file[1].name}`}
                {/* <i
                className="icon-line-awesome-times-circle-o"
                style={{
                  marginLeft: "10px",
                  fontWeight: "600",
                }}
                onClick={(e) => removeSupportingDoc(idx)}
              ></i> */}
              </span>
            );
          } else {
            return <></>;
          }
        })}
      </div>
    );
  } else return <></>;
};

const Step5 = ({ setForm, formData, navigation }) => {
  const [errors, setErrors] = useState({});
  const { project_type } = formData;
  const { previous, next } = navigation;
  // const masterProjectType = formData.master.projectTypes;
  const [projectDesc, setProjectDesc] = useState(formData.project_description);

  const [supportingDoc, setSupportingDoc] = useState(formData.supportingDoc);
  const [referenceDoc, setReferenceDoc] = useState(formData.referenceDoc);
  // const [referenceDoc1, setReferenceDoc1] = useState();
  const [dispSupportDoc, setDispSupportDoc] = useState();
  const [dispRefDoc, setDispRefDoc] = useState();

  const mdlFindOutMore = useRef();

  const openFindModel = () => {
    if (mdlFindOutMore.current != undefined) mdlFindOutMore.current.open(); // sign In
  };

  const closeFindModel = () => {
    if (mdlFindOutMore.current != undefined) mdlFindOutMore.current.close(); // sign In
  };

  const checkValidation = () => {
    if (projectDesc == "") {
      setErrors({ description: "Please write your project description." });
    } else {
      setErrors({ description: "" });

      formData.project_description = projectDesc;

      if (supportingDoc !== undefined && supportingDoc.length > 0)
        formData.supportingDoc = supportingDoc;
      if (referenceDoc !== undefined && referenceDoc.length > 0)
        formData.referenceDoc = referenceDoc;

      // formData.referenceDoc1 = referenceDoc1;
      // console.log("supportingDocLength", supportingDoc.length);
      // console.log("referenceDocLength", referenceDoc.length);
      // console.log("formData", formData);
      localStorage.setItem("POST_PROJECT", JSON.stringify(formData));
      localStorage.setItem("POST_PROJECT_STEP", "step7");
      next();
    }
  };

  // const handleSupportDocChange = (e) => {
  //   // console.log("e.target.files", e.target.files);
  //   setSupportingDoc(Object.entries(e.target.files));
  // };

  const removeSupportingDoc = idx => {
    var temp = supportingDoc;
    temp.splice(idx, 1);
    setSupportingDoc(temp);
  };

  const removeReferenceDoc = idx => {
    var temp = referenceDoc;
    temp.splice(0, 1);
    setReferenceDoc(temp);
  };

  // console.log("supportingDoc", supportingDoc);

  useEffect(() => {
    if (supportingDoc !== undefined && supportingDoc.length > 0)
      setDispSupportDoc(selectedDocDisp(supportingDoc), removeSupportingDoc);
  }, [supportingDoc]);

  useEffect(() => {
    if (referenceDoc !== undefined && referenceDoc.length > 0)
      setDispRefDoc(selectedDocDisp(referenceDoc), removeSupportingDoc);
  }, [referenceDoc]);

  return (
    <>
      <style>
        {
          "\
          .modal-box { width: 358px !important;}\
          ul li::marker {color:#59c6d5;width:7px;height:7px}\
          ul li{color:#607d8b;line-height:1.56;margin-bottom:10px}\
        "
        }
      </style>

      <Breadcrumb navigation={navigation} currentTab="step5" />

      <div className="section" style={{ margin: "100px auto" }}>
        <div className="container">
          <div className="col-sm-12 col-xl-10 col-md-10 offset-md-1 offset-xl-1">
            {/* Description */}
            <div className="categories-container margin-top-5 padding-top-5 margin-bottom-30">
              <h5 style={{ fontSize: "28px", lineHeight: 1.14 }}>
                <b>Describe your project or upload project brief</b>
                <p
                  style={{
                    lineHeight: "1.56",
                    fontSize: "16px",
                    fontWeight: "normal",
                    textAlign: "justify"
                  }}
                >
                  <small>
                    Looking for some useful tips to help you write en effective
                    project description/brief ?{" "}
                    <a
                      style={{
                        color: "#ffb92a",
                        display: "inline-block",
                        cursor: "pointer"
                      }}
                      onClick={openFindModel}
                    >
                      Find our more
                    </a>
                  </small>
                </p>
              </h5>

              <textarea
                placeholder="Write your project description here."
                name="description"
                value={projectDesc}
                onChange={e => setProjectDesc(e.target.value)}
              />
              <div
                className="notification error  notification1 form-error"
                style={{ margin: "0 15px !important" }}
              >
                {errors.description}
              </div>
            </div>
            {/* Description */}

            {/* Supporting Document */}
            <div className="categories-container margin-top-15 padding-top-5 ">
              <h5
                style={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  lineHeight: 1.39,
                  display: "block",
                  width: "100%"
                }}
              >
                Upload supporting documents
              </h5>
              <p
                style={{
                  fontSize: "16px",
                  color: "#3a3a3c",
                  lineHeight: 1.38,
                  textAlign: "justify"
                }}
              >
                <small>
                  You can upload any supporting document that can help us
                  understand your project and its needs better.
                  <br />
                  <b>
                    (Formats: Doc., PDF., JPEG, PPT formats only. Not more than
                    10 MB)
                  </b>
                </small>
              </p>
            </div>

            <div className="">
              <label class="custom-file-upload margin-bottom-20">
                <input
                  type="file"
                  multiple
                  onChange={e =>
                    setSupportingDoc(Object.entries(e.target.files))
                  }
                />
                <i class="icon-feather-plus-circle"></i> Upload Documents
              </label>

              {dispSupportDoc}
            </div>

            {/* Supporting Document */}

            {/* Reference document */}
            <div className="categories-container margin-top-15 padding-top-5 ">
              <h5
                style={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  lineHeight: 1.39,
                  display: "block",
                  width: "100%"
                }}
              >
                Upload References
              </h5>
              <p
                style={{
                  fontSize: "16px",
                  color: "#3a3a3c",
                  lineHeight: 1.38,
                  textAlign: "justify"
                }}
              >
                <small>
                  References can include visuals/designs that relate to your
                  project and help in our understanding of it.
                  <br />
                  <b>
                    (Formats: Doc., PDF., JPEG, PPT formats only. Not more than
                    10 MB)
                  </b>
                </small>
              </p>
            </div>

            <div>
              <label class="custom-file-upload margin-bottom-20">
                <input
                  type="file"
                  onChange={e =>
                    setReferenceDoc(Object.entries(e.target.files))
                  }
                  multiple
                />
                <i class="icon-feather-plus-circle"></i> Upload References
              </label>
            </div>

            {dispRefDoc}

            {/* Reference document */}

            {/* Buttons */}
            <div
              style={{
                marginTop: "20px",
                // padding: "0px 20px",
                textAlign: "left"
              }}
            >
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
            {/* Buttons */}
          </div>
        </div>
      </div>

      <Modal ref={mdlFindOutMore}>
        <div
          className="section-headline  margin-bottom-5"
          style={{
            padding: "0",
            textAlign: "right",
            width: "100%",
            cursor: "pointer"
          }}
        >
          <i className="icon-line-awesome-close" onClick={closeFindModel}></i>
        </div>
        <div className="categories-container margin-bottom-15 margin-top-15">
          <h5
            style={{
              color: "#263238",
              fontSize: "18px",
              fontWeight: "bold",
              lineHeight: 1.1
            }}
          >
            <b>Things a good bried should include</b>
          </h5>
          <ul
            style={{
              fontSize: "14px",
              color: "#666",
              paddingLeft: "20px",
              color: "#607d8b"
            }}
          >
            <li>A short description about your product/brand</li>
            <li>
              A brief overview of the project's background and objectives.
            </li>
            <li>Key challenges that the project aims to resolve</li>
            <li>Target audience for the project</li>
            <li>Chief competitors of the product/brand.</li>
            <li>Primary message to communicate.</li>
          </ul>

          <button
            className="button ripple-effect"
            style={{ width: "100%", fontSize: "16px", fontWeight: "600" }}
            onClick={closeFindModel}
          >
            Got It
          </button>
        </div>
      </Modal>
    </>
  );
};

export default Step5;
