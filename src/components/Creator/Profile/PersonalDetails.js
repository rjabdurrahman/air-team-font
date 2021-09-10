import React, { useState, useEffect } from "react";
import LoadingOverlay from "react-loading-overlay";
import { useDropzone } from "react-dropzone";
import NotificationManager from "react-notifications/lib/NotificationManager";
import validator from "validator";
import axios from "axios";

// Preview Stype
const thumbsContainer = {
  display: "inline-block",
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

const PersonalDetails = ({ setForm, formData, navigation }) => {
  const { previous, next } = navigation;

  const [errors, setErrors] = useState({});
  const [loader, setLoader] = useState(false);
  const [personal_details, setPersonalDetails] = useState(
    formData.personal_details
  );

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

  useEffect(() => {
    // get Personal Details
    axios
      .get(
        process.env.REACT_APP_API_BASE_URL +
          "/creator/profile/personaldetails/" +
          localStorage.getItem("USER_ID")
      )
      .then(res => {
        if (res.data.status) {
          // defaultData.personal_details = res.data.personalDetails[0];
          setPersonalDetails({
            name: res.data.personalDetails[0].name,
            description: res.data.personalDetails[0].description,
            profile: res.data.personalDetails[0].profile_image
          });
        }
      });
  }, []);

  const thumbs = files.map(file => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img src={file.preview} style={img} />
      </div>
    </div>
  ));

  const saveProceed = () => {
    if (validator.isEmpty(personal_details.name)) {
      setErrors({ name: "Please select primary mode of work." });
    } else if (validator.isEmpty(personal_details.description)) {
      setErrors({ description: "Please describe yourself." });
    } else if (files.length <= 0) {
      setErrors({ files: "Please select your profile photo." });
    } else {
      setLoader(true);
      setErrors({ description: "", name: "", files: "" });

      var saveData = {
        name: personal_details.name,
        description: personal_details.description
      };

      const data = new FormData();
      for (var x = 0; x < files.length; x++) {
        data.append("file", files[x]);
        saveData.files = files[x];
      }
      data.append("name", personal_details.name);
      data.append("description", personal_details.description);

      formData.personal_details = saveData;

      const headerConfig = {
        headers: { authorization: localStorage.getItem("ACCESS_TOKEN") }
      };

      axios
        .post(
          process.env.REACT_APP_API_BASE_URL +
            "/creator/profile/personaldetails",
          data,
          headerConfig
        )
        .then(res => {
          setLoader(false);
          if (res.data.status) {
            NotificationManager.success(
              "Personal details has been saved successfully",
              "Successfull !!!"
            );

            setPersonalDetails({ profile: res.data.imageData.profile_image });
            formData.personal_details = personal_details;
            formData.personal_details.profile =
              res.data.imageData.profile_image;
            next();

            // console.log(res.data.imageData.profile_image);
            // console.log("personal_details", personal_details);
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

      // console.log("data", data);
    }
    // console.log("personal_details ", personal_details);
    // console.log("files ", files);
  };

  // console.log("personal_details ", personal_details);
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
                <div className="section-headline  margin-bottom-15 margin-top-15 ">
                  <h3>What is your name?</h3>
                </div>
                <input
                  placeholder="Your Name"
                  name="name"
                  value={personal_details.name}
                  onChange={e => {
                    setPersonalDetails({
                      ...personal_details,
                      name: e.target.value
                    });
                  }}
                />

                <div
                  className="notification error  notification1 form-error"
                  style={{ margin: "0 15px !important" }}
                >
                  {errors.name}
                </div>

                <div className="section-headline  margin-bottom-25 margin-top-25 ">
                  <h3>Let's put a face to that name</h3>
                </div>

                <div {...getRootProps({ className: "dropzone" })}>
                  <input {...getInputProps()} />
                  {Object.entries(personal_details.profile).length > 0 ? (
                    <div
                      style={{
                        textAlign: "center",
                        padding: "50px",
                        border: "2px dashed #ccc",
                        borderRadius: "5px",
                        display: "inline-block",
                        maxWidth: "250px",
                        width: "50 %",
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
                          personal_details.profile.path
                        }
                      ></img>
                      <p
                        style={{
                          color: "#fff",
                          background: "#000",
                          borderRadius: "5px"
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
                        borderRadius: "5px",
                        display: "inline-block",
                        maxWidth: "250px",
                        width: "50 %",
                        position: "relative",
                        overflow: "hidden"
                      }}
                    >
                      Drop file here or <b>Browse</b>
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

                <div className="section-headline  margin-bottom-15 margin-top-15 ">
                  <h3>Tell us more about yourself</h3>
                  <p>
                    Start with bit of yourself and then tell us about your work
                    experince and what sets you apart, This is crucial in the
                    selection process.
                  </p>
                </div>
                <textarea
                  row={2}
                  placeholder="Start describing yourself..."
                  name="name"
                  value={personal_details.description}
                  onChange={e => {
                    setPersonalDetails({
                      ...personal_details,
                      description: e.target.value
                    });
                  }}
                />

                <div
                  className="notification error  notification1 form-error"
                  style={{ margin: "0 15px !important" }}
                >
                  {errors.description}
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
    </>
  );
};

export default PersonalDetails;
