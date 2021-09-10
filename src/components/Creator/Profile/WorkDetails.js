import React, { useEffect, useState, useRef } from "react";
import Fixmodal from "../../../utils/Fixmodal";
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

const WorkDetails = ({ setForm, formData, navigation }) => {
  const { previous, next } = navigation;
  const [errors, setErrors] = useState({});
  const [loader, setLoader] = useState(false);

  const modalWorksExp = useRef();
  const modalProjects = useRef();

  const [work_mode, setWork_mode] = useState(formData.work_mode);

  const [work_exp, setWork_exp] = useState(formData.work_exp);
  const [projects, setProjects] = useState(formData.projects);
  const [current_projects, setCurrentProjects] = useState({});

  // Portfolio Link
  const [portfolio_link, setPortfolio_link] = useState(formData.portfolio_link);
  const [current_plink, setCurrentPLing] = useState("");

  // Attachments
  const [attachments, setAttachments] = useState(formData.attachments);
  const [current_attachments, setCurrentAttachments] = useState({});

  const [currentWorkExp, setCurrentWorkPrice] = useState({});

  const openExpModal = () => {
    modalWorksExp.current.open();
  };
  const closeExpModal = () => {
    modalWorksExp.current.close();
  };

  const saveExperience = () => {
    if (
      currentWorkExp.company_name == undefined ||
      currentWorkExp.company_name == ""
    ) {
      setErrors({
        company_name: "Company name is required."
      });
    } else if (
      currentWorkExp.designation == undefined ||
      currentWorkExp.designation == ""
    ) {
      setErrors({
        designation: "Designation is required."
      });
    } else if (
      currentWorkExp.start_date == undefined ||
      currentWorkExp.start_date == ""
    ) {
      setErrors({
        start_date: "Start date name is required."
      });
    } else if (
      currentWorkExp.end_date == undefined ||
      currentWorkExp.end_date == ""
    ) {
      setErrors({
        end_date: "End date name is required."
      });
    } else if (
      currentWorkExp.location == undefined ||
      currentWorkExp.location == ""
    ) {
      setErrors({
        end_date: "End date name is required."
      });
    } else {
      setErrors({
        start_date: "",
        end_date: "",
        company_name: "",
        designation: "",
        location: ""
      });

      formData.work_exp.push(currentWorkExp);
      setWork_exp(formData.work_exp);
      setCurrentWorkPrice({});
      modalWorksExp.current.close();

      //   console.log("work_exp : ", work_exp);
      //   console.log("formData.work_exp : ", formData.work_exp);
    }
  };
  // console.log(currentWorkExp);

  const removeWorkSkill = index => {
    // alert(index);
    //   console.log(work_exp[index]);
    work_exp.splice(index, 1);
    formData.work_exp = work_exp;
    setWork_exp(formData.work_exp);
  };

  // File Upload Code start

  const openPrjModal = () => {
    modalProjects.current.open();
  };

  const closeProjectModal = () => {
    setCurrentProjects({});
    modalProjects.current.close();
  };

  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    maxFiles: 5,
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

  const thumbs = files.map(file => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img src={file.preview} style={img} />
      </div>
    </div>
  ));

  const saveProject = () => {
    setLoader(true);
    if (current_projects.title == undefined || current_projects.title == "") {
      setErrors({
        title: "Project title is required."
      });
    } else if (
      current_projects.description == undefined ||
      current_projects.description == ""
    ) {
      setErrors({
        description: "project description is required."
      });
    } else {
      setErrors({
        description: "",
        title: ""
      });

      const data = new FormData();
      for (var x = 0; x < files.length; x++) {
        data.append("file", files[x]);
      }
      data.append("title", current_projects.title);
      data.append("description", current_projects.description);

      const headerConfig = {
        headers: { authorization: localStorage.getItem("ACCESS_TOKEN") }
      };

      axios
        .post(
          process.env.REACT_APP_API_BASE_URL +
            "/creator/profile/projectdetails",
          data,
          headerConfig
        )
        .then(res => {
          setLoader(false);
          //   console.log(res.data);
          if (res.data.status) {
            NotificationManager.success(
              "Proejct details has been saved",
              "Successfull !!!"
            );
            // close model here
            formData.projects.push(res.data.files);
            setProjects(formData.projects);
            setCurrentProjects({});
            setFiles([]);
            modalProjects.current.close();
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

  var embedLink;

  // Add embed Link
  const addEmbedLink = () => {
    console.log("current_plink ", current_plink);
    if (current_plink == undefined || current_plink == "") {
      setErrors({
        current_plink: "Embed url is required."
      });
    } else if (!validator.isURL(current_plink)) {
      setErrors({
        current_plink: "Invalid embed url."
      });
    } else {
      setErrors({
        current_plink: ""
      });

      formData.portfolio_link.push(current_plink);
      setPortfolio_link(formData.portfolio_link);
      setCurrentPLing("");
    }
  };

  // Remove selected Embed link
  const removeEmbedLink = index => {
    portfolio_link.splice(index, 1);
    formData.portfolio_link = portfolio_link;
    setPortfolio_link(formData.portfolio_link);
    NotificationManager.success(
      "Portfolio link has been removed",
      "Success !!!"
    );
  };

  const saveProceed = () => {
    if (validator.isEmpty(work_mode)) {
      setErrors({ full_work_mode: "Please select primary mode of work." });
    } else if (work_exp.length <= 0) {
      setErrors({
        full_work_exp: "Add atleast one work experience."
      });
    } else if (portfolio_link.length <= 0) {
      setErrors({
        full_portfolio_link: "Add atleast one portfolio link."
      });
    } else {
      setErrors({
        full_work_mode: "",
        full_work_exp: "",
        full_portfolio_link: ""
      });

      setLoader(true);
      var payload = {
        work_mode: work_mode,
        work_exp: work_exp,
        portfolio_link: portfolio_link
      };

      let headerConfig = {
        headers: { authorization: localStorage.getItem("ACCESS_TOKEN") }
      };
      axios
        .post(
          process.env.REACT_APP_API_BASE_URL + "/creator/profile/workdetails",
          payload,
          headerConfig
        )
        .then(res => {
          setLoader(false);
          if (res.data.status) {
            NotificationManager.success(
              "Work details has been saved.",
              "Successfull !!!"
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

      // console.log("payload", payload);
    }
  };
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
                  <h3>What's your primary mode of work?</h3>
                </div>
                <div id="postChkRdo">
                  <div className="row">
                    <div className="col-md-4 col-sm-6">
                      <input
                        type="radio"
                        name="work_mode"
                        value="Full Time"
                        id="work_mode_full"
                        checked={work_mode === "Full Time"}
                        onChange={e => {
                          formData.work_mode = "Full Time";
                          setWork_mode("Full Time");
                        }}
                      />
                      <label className="postChkRdo" htmlFor="work_mode_full">
                        Full Time Freelancer
                      </label>
                    </div>

                    {/* Col-md-4 */}
                    <div className="col-md-4 col-sm-6">
                      <input
                        type="radio"
                        name="work_mode"
                        value="Part Time"
                        id="work_mode_part"
                        checked={work_mode === "Part Time"}
                        onChange={e => {
                          formData.work_mode = "Part Time";
                          setWork_mode("Part Time");
                        }}
                      />
                      <label className="postChkRdo" htmlFor="work_mode_part">
                        Part Time Freelancer
                      </label>
                    </div>

                    <div
                      className="notification error  notification1 form-error"
                      style={{ margin: "0 15px !important" }}
                    >
                      {errors.full_work_mode}
                    </div>
                    {/* Col-md-4 */}
                  </div>
                  {/* row */}
                </div>
                {/* postChkRdo */}
                <div className="section-headline  margin-bottom-15 margin-top-15 ">
                  <h3>Add work experience?</h3>
                </div>

                <div
                  className="notification error  notification1 form-error"
                  style={{ margin: "0 15px !important" }}
                >
                  {errors.full_work_exp}
                </div>

                {/* added work experience rajendra  */}
                {work_exp.length > 0 ? (
                  <div className="col-xl-12" style={{ padding: "0" }}>
                    <div
                      className="dashboard-box margin-top-0 no-shadow"
                      style={{ background: "none" }}
                    >
                      <div className="content">
                        <ul className="dashboard-box-list">
                          {work_exp.map((work, index) => {
                            var start_date = new Date(work.start_date);
                            var months = [
                              "Jan",
                              "Feb",
                              "Mar",
                              "Apr",
                              "May",
                              "Jun",
                              "Jul",
                              "Aug",
                              "Sept",
                              "Oct",
                              "Nov",
                              "Dec"
                            ];

                            var end_date = new Date(work.end_date);
                            var printEndDate = "";
                            var todaysDate = new Date();
                            if (
                              end_date.setHours(0, 0, 0, 0) ==
                              todaysDate.setHours(0, 0, 0, 0)
                            ) {
                              printEndDate = "Present";
                            } else {
                              printEndDate =
                                months[end_date.getMonth()] +
                                " " +
                                end_date.getFullYear();
                            }
                            //   alert(printEndDate);

                            return (
                              <li
                                style={{
                                  padding: "10px",
                                  margin: "10px 0",
                                  background: "#fff",
                                  borderRadius: "5px"
                                }}
                              >
                                {/* Job Listing */}
                                <div className="job-listing">
                                  {/* Job Listing Details */}
                                  <div className="job-listing-details">
                                    {/* Details */}
                                    <div className="job-listing-description">
                                      <h3 className="job-listing-title">
                                        <a>{work.company_name}</a>
                                      </h3>
                                      {/* Job Listing Footer */}
                                      <div className="job-listing-footer">
                                        <ul>
                                          <li
                                            style={{
                                              textTransform: "capitalize"
                                            }}
                                          >
                                            {work.designation}, {work.location}{" "}
                                            |{" "}
                                            {months[start_date.getMonth()] +
                                              " " +
                                              start_date.getFullYear()}{" "}
                                            - {printEndDate}
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                {/* Buttons */}
                                <div className="buttons-to-right">
                                  <a
                                    className="button red ripple-effect ico"
                                    onClick={() => removeWorkSkill(index)}
                                  >
                                    <i
                                      className="icon-line-awesome-close"
                                      style={{
                                        color: "#fff"
                                      }}
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
                  <></>
                )}

                {/* added work experience rajendra */}
                <a
                  onClick={openExpModal}
                  className="button ripple-effect"
                  style={{ color: "#fff" }}
                >
                  Add Experience <i className="icon-feather-plus" />
                </a>

                <div className="section-headline  margin-bottom-15 margin-top-15 ">
                  <h3>Add Projects You have worked on?</h3>
                </div>

                {/* File Upload Code start */}

                {projects.length > 0 ? (
                  projects.map((project, index) => {
                    return (
                      <div
                        className="Projects-portfolio attachment-box ripple-effect"
                        style={{ paddingBottom: "0px", display: "block" }}
                      >
                        {project.uploaded_files.length > 0 ? (
                          project.uploaded_files.map((img, imgIndex) => {
                            return (
                              <div className="outer">
                                <div className="inner">
                                  <img
                                    src={
                                      process.env.REACT_APP_API_BASE_URL +
                                      "/" +
                                      img.path
                                    }
                                  />
                                </div>
                              </div>
                            );
                          })
                        ) : (
                          <></>
                        )}

                        <div className="col-md-12 section-headline  margin-bottom-15 margin-top-15 ">
                          <h5>{project.project_title}</h5>
                          <p style={{ marginBottom: "0px" }}>
                            {project.description}
                          </p>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <></>
                )}

                <a
                  onClick={openPrjModal}
                  className="button ripple-effect"
                  style={{ color: "#fff" }}
                >
                  Add New Project <i className="icon-feather-plus" />
                </a>
                {/* File Upload Code end  */}

                <div className="section-headline  margin-bottom-15 margin-top-15 ">
                  <h3>Showcase your portfolio?</h3>
                  <p style={{ margin: "15px 0" }}>
                    Link the account showcasing your work
                  </p>
                </div>

                <div
                  className="notification error  notification1 form-error"
                  style={{ margin: "0 15px !important" }}
                >
                  {errors.full_portfolio_link}
                </div>

                {portfolio_link.length > 0 ? (
                  <div className="content margin-bottom-25">
                    <ul className="dashboard-box-list">
                      {portfolio_link.map((link, index) => {
                        return (
                          <li
                            style={{ padding: "5px 20px", background: "#fff" }}
                          >
                            <span
                              className="notification-icon"
                              style={{ background: "none" }}
                            >
                              <i className="icon-feather-link-2" />
                            </span>
                            <span className="notification-text">{link}</span>

                            <div className="buttons-to-right single-right-button">
                              <a
                                onClick={e => {
                                  removeEmbedLink(index);
                                }}
                                className="ico"
                                style={{ color: "red" }}
                              >
                                <i className="icon-line-awesome-close" />
                              </a>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ) : (
                  <></>
                )}

                {/* Embed link */}
                <div
                  className="row"
                  style={{
                    padding: "10px",
                    paddingBottom: "0",
                    margin: "0",
                    background: "#efefef"
                  }}
                >
                  <div className="col-md-9">
                    <div className="input-with-icon-left">
                      <i className="icon-feather-link-2" />
                      <input
                        type="url"
                        className="input-text with-border"
                        placeholder="Portfolio Link"
                        name="designation"
                        value={current_plink}
                        onChange={e => {
                          setCurrentPLing(e.target.value);
                        }}
                      />
                    </div>

                    <div
                      className="notification error  notification1 form-error"
                      style={{ margin: "0 15px !important" }}
                    >
                      {errors.current_plink}
                    </div>
                  </div>
                  <div className="col-md-3">
                    <a
                      className="button dark ripple-effect"
                      style={{
                        width: "100%",
                        textAlign: "center",
                        color: "#fff"
                      }}
                      onClick={addEmbedLink}
                    >
                      <i className="icon-feather-plus" /> Add
                    </a>
                  </div>
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
      <Fixmodal ref={modalWorksExp}>
        <div className="categories-container">
          <div className="section-headline">
            <h3>New Work Experience</h3>
          </div>
          <div className="col-md-12 margin-top-15 ">
            <div className="row">
              <div className="col-xl-6">
                <div class="submit-field">
                  <h5>Company</h5>
                  <div className="input-with-icon">
                    <input
                      className="with-border"
                      type="text"
                      placeholder="Company Name"
                      name="company_name"
                      value={currentWorkExp.company_name}
                      onChange={e => {
                        setCurrentWorkPrice({
                          ...currentWorkExp,
                          company_name: e.target.value
                        });
                      }}
                    />
                    <i className="currency">
                      <i
                        className="icon-material-outline-text-fields"
                        style={{ marginRight: "-15px" }}
                      />
                    </i>
                  </div>

                  <div
                    className="notification error  notification1 form-error"
                    style={{ margin: "0 15px !important" }}
                  >
                    {errors.company_name}
                  </div>
                </div>
              </div>
              <div className="col-xl-6">
                <div class="submit-field">
                  <h5>Designation</h5>
                  <div className="input-with-icon">
                    <input
                      className="with-border"
                      type="text"
                      placeholder="Designation"
                      name="designation"
                      value={currentWorkExp.designation}
                      onChange={e => {
                        setCurrentWorkPrice({
                          ...currentWorkExp,
                          designation: e.target.value
                        });
                      }}
                    />
                    <i className="currency">
                      <i
                        className="icon-feather-user"
                        style={{ marginRight: "-15px" }}
                      />
                    </i>
                  </div>
                  <div
                    className="notification error  notification1 form-error"
                    style={{ margin: "0 15px !important" }}
                  >
                    {errors.designation}
                  </div>
                </div>
              </div>

              <div className="col-xl-6">
                <div class="submit-field">
                  <h5>Start Date</h5>
                  <input
                    type="date"
                    className="with-border"
                    name="start_date"
                    value={currentWorkExp.start_date}
                    onChange={e => {
                      setCurrentWorkPrice({
                        ...currentWorkExp,
                        start_date: e.target.value
                      });
                    }}
                  />

                  <div
                    className="notification error  notification1 form-error"
                    style={{ margin: "0 15px !important" }}
                  >
                    {errors.start_date}
                  </div>
                </div>
              </div>

              <div className="col-xl-6">
                <div class="submit-field">
                  <h5>End Date</h5>
                  <input
                    type="date"
                    className="with-border"
                    name="end_date"
                    value={currentWorkExp.end_date}
                    onChange={e => {
                      setCurrentWorkPrice({
                        ...currentWorkExp,
                        end_date: e.target.value
                      });
                    }}
                  />
                  <div
                    className="notification error  notification1 form-error"
                    style={{ margin: "0 15px !important" }}
                  >
                    {errors.end_date}
                  </div>
                </div>
              </div>

              <div className="col-xl-12">
                <div class="submit-field">
                  <h5>Location</h5>
                  <div className="input-with-icon">
                    <div id="autocomplete-container">
                      <input
                        id="autocomplete-input"
                        className="with-border"
                        type="text"
                        placeholder="Enter Location"
                        name="location"
                        value={currentWorkExp.location}
                        onChange={e => {
                          setCurrentWorkPrice({
                            ...currentWorkExp,
                            location: e.target.value
                          });
                        }}
                      />
                      <div
                        className="notification error  notification1 form-error"
                        style={{ margin: "0 15px !important" }}
                      >
                        {errors.location}
                      </div>
                    </div>
                    <i className="icon-material-outline-location-on" />
                  </div>
                </div>
              </div>

              <div className="col-xl-12">
                <a
                  className="button ripple-effect"
                  style={{ marginRight: "15px", color: "#fff" }}
                  onClick={saveExperience}
                >
                  Save Experience <i className="icon-material-outline-check" />
                </a>

                <a
                  onClick={closeExpModal}
                  className="button gray ripple-effect"
                >
                  close <i className="icon-line-awesome-close" />
                </a>
              </div>
            </div>
          </div>
        </div>
        {/*categories-container */}
      </Fixmodal>

      <Fixmodal ref={modalProjects}>
        <LoadingOverlay active={loader} spinner text="Saving...">
          <section className="container">
            <div {...getRootProps({ className: "dropzone" })}>
              <input {...getInputProps()} />
              <p
                style={{
                  textAlign: "center",
                  padding: "50px",
                  border: "2px dashed #ccc",
                  borderRadius: "5px"
                }}
              >
                Drop your image here or <b>Browse</b>
                <br />
                <small>(Supports JPEG, JPG, PNG)</small>
              </p>
            </div>
            <aside style={thumbsContainer}>{thumbs}</aside>

            {/* <Dropzone multiple onDrop={onImageDrop}>
            <p>Drop images or click to select a file to upload</p>
          </Dropzone> */}

            <div className="submit-field" style={{ marginBottom: "15px" }}>
              <h5 style={{ marginBottom: "0" }}>Title of the project</h5>
              <input
                type="text"
                class="with-border"
                name="title"
                value={current_projects.title}
                onChange={e => {
                  setCurrentProjects({
                    ...current_projects,
                    title: e.target.value
                  });
                }}
              />
            </div>

            <div className="submit-field" style={{ marginBottom: "15px" }}>
              <h5 style={{ marginBottom: "0" }}>Description</h5>
              <textarea
                cols="30"
                rows="2"
                class="with-border"
                name="description"
                value={current_projects.description}
                onChange={e => {
                  setCurrentProjects({
                    ...current_projects,
                    description: e.target.value
                  });
                }}
              ></textarea>
            </div>

            <a
              className="button ripple-effect"
              style={{ marginRight: "10px", color: "#fff" }}
              onClick={saveProject}
            >
              Save Project <i className="icon-feather-plus"></i>
            </a>

            <a
              onClick={closeProjectModal}
              className="button gray ripple-effect"
            >
              Close <i className="icon-line-awesome-close"></i>
            </a>
          </section>
        </LoadingOverlay>
      </Fixmodal>
    </>
  );
};

export default WorkDetails;
