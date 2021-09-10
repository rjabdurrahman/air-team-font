import React, { useState } from "react";
import LoadingOverlay from "react-loading-overlay";
import NotificationManager from "react-notifications/lib/NotificationManager";
import { useDropzone } from "react-dropzone";
import validator from "validator";
import axios from "axios";

// Preview Stype
const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16
};

const thumb = {
  display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: 75,
  height: 75,
  padding: 4,
  boxSizing: "border-box"
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden"
};

const img = {
  display: "block",
  width: "100%",
  height: "100%"
};

const VerificationDetails = ({ setForm, formData, navigation }) => {
  const [errors, setErrors] = useState({});
  const [loader, setLoader] = useState(false);
  const { previous, next } = navigation;

  const [verification_Details, setVD] = useState(formData.verification_Details);

  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    multiple: false,
    onDrop: acceptedFiles => {
      setFiles(
        acceptedFiles.map(file =>
          Object.assign(file, {
            preview: URL.createObjectURL(file)
          })
        )
      );
    }
  });

  console.log("formData.personal_details", formData.personal_details);

  const thumbs = files.map(file => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img src={file.preview} style={img} />
      </div>
    </div>
  ));

  const saveProceed = () => {
    if (
      verification_Details.document_type === undefined ||
      verification_Details.document_type === ""
    ) {
      setErrors({
        document_type: "Please select type of document you are uploading."
      });
    } else if (files.length <= 0) {
      setErrors({ files: "Please select your document." });
    } else {
      setErrors({ files: "", document_type: "" });
      setLoader(true);

      var saveData = {
        document_type: verification_Details.document_type
      };
      const data = new FormData();
      for (var x = 0; x < files.length; x++) {
        data.append("file", files[x]);
        saveData.files = files[x];
      }
      data.append("document_type", verification_Details.document_type);

      formData.verification_Details = saveData;

      const headerConfig = {
        headers: { authorization: localStorage.getItem("ACCESS_TOKEN") }
      };

      axios
        .post(
          process.env.REACT_APP_API_BASE_URL +
            "/creator/profile/verificationdetails",
          data,
          headerConfig
        )
        .then(res => {
          setLoader(false);
          if (res.data.status) {
            NotificationManager.success(
              "Verification details has been saved successfully",
              "Successfull !!!"
            );
            // console.log("res.data", res.data);
            setVD({ document: res.data.verifyData.document });
            formData.verification_Details = verification_Details;
            formData.verification_Details.document =
              res.data.verifyData.document;

            console.log(
              "formData.verification_Details",
              formData.verification_Details
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
  // console.log("verification_Details", verification_Details);

  return (
    <LoadingOverlay active={loader} spinner text="Loading...">
      <div
        className="section"
        style={{ marginTop: "30px", marginBottom: "50px" }}
      >
        <div className="container">
          <div className="row">
            <div className="col-xl-8 col-md-8 offset-md-2">
              <div className="section-headline  margin-bottom-15 margin-top-15 ">
                <h3>Upload any of these documents for verification?</h3>
                <p>
                  This will help us know your authenticity and ensure healthy
                  collaboration through the projects you take up on{" "}
                  <b>{process.env.REACT_APP_SITE_NAME}</b>
                </p>
              </div>
              <div
                className="notification error  notification1 form-error"
                style={{ margin: "0 15px !important" }}
              >
                {errors.document_type}
              </div>
              <div id="postChkRdo">
                <div className="row">
                  <div className="col-md-4 col-sm-4">
                    <input
                      type="radio"
                      id="documentTypeAadhar"
                      name="documentType"
                      checked={
                        verification_Details.document_type === "Aadhar Card"
                      }
                      value="Aadhar Card"
                      onChange={e => {
                        setVD({
                          ...verification_Details,
                          document_type: e.target.value
                        });
                      }}
                    />
                    <label
                      className="postChkRdo"
                      htmlFor="documentTypeAadhar"
                      style={{ height: "50px" }}
                    >
                      Aadhar Card
                    </label>
                  </div>
                  {/* Col-md-4 */}
                  <div className="col-md-4 col-sm-4">
                    <input
                      type="radio"
                      name="documentType"
                      id="documentTypeVoter"
                      checked={
                        verification_Details.document_type === "Voter ID"
                      }
                      value="Voter ID"
                      onChange={e => {
                        setVD({
                          ...verification_Details,
                          document_type: e.target.value
                        });
                      }}
                    />
                    <label
                      className="postChkRdo"
                      htmlFor="documentTypeVoter"
                      style={{ height: "50px" }}
                    >
                      Voter ID
                    </label>
                  </div>
                  {/* Col-md-4 */}
                  <div className="col-md-4 col-sm-4">
                    <input
                      type="radio"
                      name="documentType"
                      id="documentTypePan"
                      checked={
                        verification_Details.document_type === "Pan Card"
                      }
                      value="Pan Card"
                      onChange={e => {
                        setVD({
                          ...verification_Details,
                          document_type: e.target.value
                        });
                      }}
                    />
                    <label
                      className="postChkRdo"
                      htmlFor="documentTypePan"
                      style={{ height: "50px" }}
                    >
                      Pan Card
                    </label>
                  </div>
                  {/* Col-md-4 */}
                </div>
              </div>

              <div {...getRootProps({ className: "dropzone" })}>
                <input {...getInputProps()} />

                {Object.entries(verification_Details.document).length > 0 ? (
                  <div
                    style={{
                      textAlign: "center",
                      padding: "50px",
                      border: "2px dashed #ccc",
                      borderRadius: "5px",
                      position: "relative",
                      overflow: "hidden"
                    }}
                  >
                    <img
                      style={{
                        opacity: "0.4",
                        position: "absolute",
                        left: "0",
                        top: "0",
                        width: "100%",
                        height: "100%"
                      }}
                      src={
                        process.env.REACT_APP_API_BASE_URL +
                        "/" +
                        verification_Details.document.path
                      }
                    ></img>
                    <p
                      style={{
                        color: "#fff",
                        background: "#000",
                        borderRadius: "5px",
                        padding: "50px"
                      }}
                    >
                      Drop file here or <b>Browse</b>
                    </p>
                  </div>
                ) : (
                  <p
                    style={{
                      textAlign: "center",
                      padding: "50px",
                      border: "2px dashed #ccc",
                      borderRadius: "5px"
                    }}
                  >
                    Drop file here or <b>Browse</b> <br />
                    <small>(Supported files: JPEG, PNG, Upto 1MB each )</small>
                  </p>
                )}
              </div>

              <aside style={thumbsContainer}>{thumbs}</aside>

              <div
                className="notification error  notification1 form-error"
                style={{ margin: "0 15px !important" }}
              >
                {errors.files}
              </div>

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
    </LoadingOverlay>
  );
};

export default VerificationDetails;
