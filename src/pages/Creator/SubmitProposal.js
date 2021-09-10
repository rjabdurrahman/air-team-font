import React, { useState, useEffect, useRef } from "react";
import LoadingOverlay from "react-loading-overlay";
import axios from "axios";
import { NotificationManager } from "react-notifications";
import validator from "validator";

import Fixmodal from "../../utils/Fixmodal";
import { FormatDate } from "../../utils/DateFormat";

var temp = [];
function SubmitProposal(props) {
  const [loader, setLoader] = useState(false);
  const [projects, setProjects] = useState({});
  const [errors, setErrors] = useState({});
  const [proposal, setProposal] = useState({});
  const [submittedProposal, setSubmittedProposal] = useState({});
  const [milestoneItems, setMilestoneItems] = useState("");
  const [milestone, setMilestone] = useState([]);
  const [currentMilestone, setCurrentMilestone] = useState({
    name: "",
    price: ""
  });

  // Submit proposal modal
  const modalSubmitProposal = useRef();

  // project details modal
  const modalProjectDetails = useRef();
  const [currentProject, setCurrentProject] = useState({});

  const openProjectDetailsMdl = curPro => {
    setCurrentProject(curPro);
    // if (currentProject) {
    if (modalProjectDetails.current != undefined)
      modalProjectDetails.current.open();
    // }
  };

  const closeProjectDetailsMdl = () => {
    setCurrentProject({});
    if (modalProjectDetails.current != undefined)
      modalProjectDetails.current.close();
  };

  const openSubmitProposalMdl = curPro => {
    setCurrentProject(curPro);

    if (modalSubmitProposal.current != undefined)
      modalSubmitProposal.current.open();
    if (modalProjectDetails.current != undefined)
      modalProjectDetails.current.close();
  };

  const closeSubmitProposalMdl = () => {
    setCurrentProject({});
    if (modalSubmitProposal.current != undefined)
      modalSubmitProposal.current.close();
  };

  useEffect(() => {
    if (props.user) {
      getInvitedProjcts();
    }
  }, [props.user]);

  const saveProposals = () => {
    if (proposal.price == undefined || proposal.price == "") {
      setErrors({ price: "Enter proposal amount." });
    } else if (proposal.days == undefined || proposal.days == "") {
      setErrors({ days: "No of days are required." });
    } else if (
      proposal.description == undefined ||
      proposal.description == ""
    ) {
      setErrors({ description: "Describe your proposal." });
    } else if (milestone.length <= 0) {
      setErrors({ milestone: "Create atleast one milestone." });
    } else {
      setErrors({});
      setLoader(true);
      proposal.milestone = milestone;
      proposal.project_id = currentProject._id;

      let headerConfig = {
        headers: { authorization: localStorage.getItem("ACCESS_TOKEN") }
      };
      axios
        .post(
          process.env.REACT_APP_API_BASE_URL + "/projects/proposal/submit",
          proposal,
          headerConfig
        )
        .then(res => {
          setLoader(false);
          if (res.data.status) {
            NotificationManager.success(
              res.data.errors.message,
              res.data.errors.title
            );
            setCurrentMilestone({});
            setMilestone([]);
            setCurrentProject({});
            setProposal({});

            closeSubmitProposalMdl();
            closeProjectDetailsMdl();
            getInvitedProjcts();
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

      // console.log("proposal", proposal);
      //   alert("all ok ");
    }
  };

  // Add embed Link
  const addMilestone = () => {
    // var today = new Date();
    // today.setHours(0, 0, 0, 0);
    // alert(today);
    // var date = new Date(currentMilestone.date);
    // date.setHours(0, 0, 0, 0);
    // alert(date);

    if (currentMilestone.name == undefined || currentMilestone.name == "") {
      setErrors({
        milestone_name: "Milestone title is required."
      });
    } else if (!validator.isNumeric(currentMilestone.price)) {
      setErrors({
        milestone_price: "Enter milestone amount."
      });
    } else if (
      currentMilestone.date == undefined ||
      currentMilestone.date == ""
    ) {
      setErrors({
        milestone_date: "Milestone date is required."
      });
    }
    // else if (validator.isAfter(currentMilestone.date, today)) {
    //   setErrors({
    //     milestone_date: "Invalid milestone date."
    //   });
    // }
    else {
      setMilestone([
        ...milestone,
        {
          name: currentMilestone.name,
          price: currentMilestone.price,
          date: currentMilestone.date
        }
      ]);
      setCurrentMilestone({ name: "", price: "", date: "" });
    }
  };

  const removeMilestone = index => {
    // alert(index);
    milestone.splice(index, 1);

    const listItems = milestone.map((mile, index) => (
      <li key={index}>{mile.name}</li>
    ));
    setMilestoneItems(listItems);

    // setMilestone(milestone);
    setMilestone(milestone);
  };
  const getInvitedProjcts = () => {
    setLoader(true);
    axios
      .get(
        process.env.REACT_APP_API_BASE_URL +
          "/projects/invited_projects/" +
          props.user.id
      )
      .then(res => {
        setLoader(false);
        if (res.data.status) {
          setProjects(res.data.result);
          if (res.data.submitted_proposal) {
            setSubmittedProposal(res.data.submitted_proposal);
          }
        } else {
          setErrors({ message: res.data.errors.message });
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
  };

  // alert(projects.length);
  if (projects.length != undefined && projects.length > 0) {
    return (
      // console.log("submittedProposal", submittedProposal),
      console.log("projects", projects),
      (
        <>
          <LoadingOverlay active={loader} spinner text="Loading...">
            <style>
              {
                "\
                    .alert-success {\
                        color: #155724 !important;\
                        background-color: #d4edda !important;\
                        border-color: #c3e6cb !important;\
                    }\
                    .alert-dismissible {\
                        padding-right: 4rem;\
                    }\
                    .alert {\
                        position: relative;\
                        padding: .75rem 1.25rem;\
                        margin-bottom: 1rem;\
                        border: 1px solid transparent;\
                        border-radius: .25rem;\
                    }\
                    .freelancer-details-list{\
                        background:#4CAF50\
                        padding: 5px 26px;\
                        display: inherit;\
                        color: #fff;\
                    }\
                    .category-box-content h3{color:#333 !important}\
                    .freelancer-details-list ul li{\
                        color: #155724;\
                        margin-bottom: 5px;\
                    }\
                    .freelancer-details-list ul li strong{\
                        color: #155724;\
                    }\
                    .modal-box{\
                            padding:30px !important;\
                            max-width:700px !important;\
                        }\
                "
              }
            </style>
            <div className="dashboard-content-container" data-simplebar>
              <div className="dashboard-content-inner" style={{ padding: 0 }}>
                <div className="row">
                  {/* Dashboard Box */}
                  <div className="col-xl-12">
                    <h3>Submit Proposals</h3>

                    {/* content */}
                    <div>
                      {projects.length > 0 ? (
                        <div className="listings-container compact-list-layout margin-top-35">
                          {projects.map((project, index) => {
                            if (project && project.project_id !== null) {
                              project = project.project_id;
                              var isProposalAlreadySubmittedIndex = -1;
                              var proposalSubmittedDate;

                              if (
                                submittedProposal.length != undefined &&
                                submittedProposal.length > 0
                              ) {
                                // console.log("submittedProposal", submittedProposal);
                                isProposalAlreadySubmittedIndex = submittedProposal.findIndex(
                                  proj => proj.project_id === project._id
                                );
                                if (isProposalAlreadySubmittedIndex > -1)
                                  proposalSubmittedDate = new Date(
                                    submittedProposal[
                                      isProposalAlreadySubmittedIndex
                                    ].createdAt
                                  );
                              }

                              // console.log("project", project);
                              const postedDate = new Date(project.createdAt);

                              return (
                                <a
                                  key={index}
                                  className="job-listing with-apply-button"
                                  style={{
                                    textDecoration: "none",
                                    padding: "10px 20px"
                                  }}
                                >
                                  {/* Job Listing Details */}
                                  <div className="job-listing-details">
                                    {/* Logo */}
                                    <div className="job-listing-company-logo">
                                      <img
                                        src="/images/company-logo-01.png"
                                        alt=""
                                      />
                                    </div>
                                    {/* Details */}
                                    <div className="job-listing-description">
                                      <h3 className="job-listing-title">
                                        {project.project_title}{" "}
                                        <small>({project.category.name})</small>
                                      </h3>
                                      {/* Job Listing Footer */}
                                      <div className="job-listing-footer">
                                        <ul>
                                          {project.skillsets != undefined &&
                                            project.skillsets.length > 0 &&
                                            project.skillsets.map(
                                              (skill, index) => {
                                                return (
                                                  <li key={index}>
                                                    <mark className="color">
                                                      {skill.name}
                                                    </mark>
                                                  </li>
                                                );
                                              }
                                            )}

                                          <li>
                                            <i className="icon-material-outline-access-time" />
                                            {postedDate.toDateString()}
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                    {isProposalAlreadySubmittedIndex > -1 ? (
                                      <>
                                        <div class="freelancer-details-list alert alert-success">
                                          <ul>
                                            <li style={{ marginBottom: "5px" }}>
                                              Rate
                                              <strong>
                                                &#8377;
                                                {
                                                  submittedProposal[
                                                    isProposalAlreadySubmittedIndex
                                                  ].price
                                                }
                                              </strong>
                                            </li>
                                            <li style={{ marginBottom: "5px" }}>
                                              Days
                                              <strong>
                                                {
                                                  submittedProposal[
                                                    isProposalAlreadySubmittedIndex
                                                  ].days
                                                }{" "}
                                                Days
                                              </strong>
                                            </li>

                                            <li style={{ marginBottom: "5px" }}>
                                              Submitted On
                                              <strong>
                                                {FormatDate(
                                                  proposalSubmittedDate
                                                )}
                                              </strong>
                                            </li>
                                          </ul>
                                          <label className="label-warning"></label>
                                        </div>
                                      </>
                                    ) : (
                                      <>
                                        <a
                                          className="button gray ripple-effect"
                                          style={{ marginRight: "5px" }}
                                          onClick={() =>
                                            openProjectDetailsMdl(project)
                                          }
                                        >
                                          <i className="icon-feather-eye"></i>
                                        </a>
                                        <a
                                          className="button ripple-effect  button-sliding-icon"
                                          style={{ color: "#fff" }}
                                          onClick={() =>
                                            openSubmitProposalMdl(project)
                                          }
                                        >
                                          Make Proposal
                                          <i className="icon-material-baseline-mail-outline"></i>
                                        </a>
                                      </>
                                    )}
                                  </div>
                                </a>
                              );
                            }
                          })}
                        </div>
                      ) : errors.message ? (
                        <div
                          className="notification error no-shadow"
                          style={{ margin: "10px 30px" }}
                        >
                          <p>{errors.message}</p>
                        </div>
                      ) : (
                        <div
                          className="notification warning no-shadow"
                          style={{ margin: "10px 30px" }}
                        >
                          Loading...
                        </div>
                      )}
                    </div>
                    {/* content */}
                  </div>
                </div>
                {/* Row / End */}
              </div>
            </div>
          </LoadingOverlay>

          <Fixmodal ref={modalProjectDetails} width="70%">
            <LoadingOverlay active={loader} spinner text="Loading...">
              {Object.keys(currentProject).length > 0 ? (
                <div>
                  <div className="categories-container">
                    <div className="section-headline" style={{ width: "100%" }}>
                      <h2 style={{ textTransform: "capitalize" }}>
                        <b>{currentProject.project_title}</b>
                      </h2>
                    </div>
                    <div
                      className="col-md-6 category-box-content"
                      style={{ paddingLeft: "0" }}
                    >
                      <p>Category</p>
                      <h3 style={{ textTransform: "capitalize" }}>
                        {currentProject.category.name}
                      </h3>
                    </div>
                    <div
                      className="col-md-6 category-box-content"
                      style={{ paddingLeft: "0" }}
                    >
                      <p>Industry</p>
                      <h3>{currentProject.industry.name}</h3>
                    </div>
                  </div>
                  <div className="categories-container margin-top-15">
                    <div
                      className="col-md-12 category-box-content"
                      style={{ paddingLeft: "0" }}
                    >
                      <p>SkillSets</p>
                      <h3>
                        {currentProject.skillsets != undefined &&
                          currentProject.skillsets > 0 &&
                          currentProject.skillsets.map((skill, index) => {
                            skill = skill.name;
                            if (currentProject.skillsets.length - 1 > index)
                              skill = skill + ", ";
                            return skill;
                          })}
                      </h3>
                    </div>
                  </div>
                  <div className="categories-container margin-top-15">
                    <div className=" category-box-content">
                      <p>Description</p>
                      <h3>{currentProject.project_description}</h3>
                    </div>
                  </div>
                  <div className="categories-container margin-top-15">
                    <div
                      className="col-md-6 category-box-content"
                      style={{ paddingLeft: "0" }}
                    >
                      <p>Resourcing Requirements</p>
                      <h3>{currentProject.project_type}</h3>
                    </div>
                    <div
                      className="col-md-6 category-box-content"
                      style={{ paddingLeft: "0" }}
                    >
                      <p>Timeline</p>
                      <h3>
                        {currentProject.timeline == "Custom Dates" ? (
                          <span>
                            <b>{currentProject.from_date}</b> To{" "}
                            <b>{currentProject.to_date}</b>
                          </span>
                        ) : (
                          currentProject.timeline
                        )}
                      </h3>
                    </div>
                  </div>
                  <div className="categories-container margin-top-15">
                    <div className="category-box-content">
                      <p>Budget</p>
                      <h3>{currentProject.budget}</h3>
                    </div>
                  </div>

                  <div className="categories-container margin-top-15">
                    <div className="col-md-6 category-box-content">
                      <a
                        style={{
                          color: "#fff",
                          width: "100%",
                          textAlign: "center"
                        }}
                        className="button ripple-effect"
                        onClick={() => openSubmitProposalMdl(currentProject)}
                      >
                        Submit Proposal
                        <i className="icon-material-baseline-mail-outline"></i>
                      </a>
                    </div>
                    <div className="col-md-6 category-box-content">
                      <a
                        style={{ width: "100%", textAlign: "center" }}
                        className="button gray ripple-effect"
                        onClick={closeProjectDetailsMdl}
                      >
                        Close
                      </a>
                    </div>
                  </div>
                </div>
              ) : (
                <></>
              )}
            </LoadingOverlay>
          </Fixmodal>

          <Fixmodal ref={modalSubmitProposal}>
            <LoadingOverlay active={loader} spinner text="Loading...">
              {currentProject ? (
                <div className="categories-container">
                  <div
                    className="section-headline"
                    style={{ width: "100%", paddingRight: 0 }}
                  >
                    <h2 style={{ textTransform: "capitalize" }}>
                      <b>{currentProject.project_title}</b>
                    </h2>
                  </div>

                  <div className="col-md-6 ">
                    <p>Proposal Amount</p>
                    <div className="input-with-icon-left">
                      <i className="icon-line-awesome-inr" />
                      <input
                        type="number"
                        className="input-text with-border"
                        placeholder="Enter amount"
                        style={{ paddingRight: 0 }}
                        name="price"
                        value={proposal.price}
                        onChange={e => {
                          setProposal({
                            ...proposal,
                            price: e.target.value
                          });
                        }}
                      />
                    </div>
                    <div
                      className="notification error  notification1 form-error"
                      style={{ margin: "0 15px !important" }}
                    >
                      {errors.price}
                    </div>
                  </div>

                  <div className="col-md-6 " style={{ paddingLeft: "0" }}>
                    <p>Delivery in</p>
                    <div className="input-with-icon">
                      <input
                        className="with-border"
                        type="number"
                        placeholder="No of Days"
                        style={{ paddingRight: 0 }}
                        name="days"
                        value={proposal.days}
                        onChange={e => {
                          setProposal({
                            ...proposal,
                            days: e.target.value
                          });
                        }}
                      />
                      <i
                        className="currency"
                        style={{ borderLeft: "1px solid #ccc" }}
                      >
                        {" "}
                        &nbsp;&nbsp; Days
                      </i>
                    </div>

                    <div
                      className="notification error  notification1 form-error"
                      style={{ margin: "0 15px !important" }}
                    >
                      {errors.days}
                    </div>
                  </div>

                  <div className="col-md-12 margin-bottom-15px">
                    <p>Describe your proposal</p>
                    <textarea
                      className="with-border"
                      name="days"
                      value={proposal.description}
                      onChange={e => {
                        setProposal({
                          ...proposal,
                          description: e.target.value
                        });
                      }}
                    ></textarea>

                    <div
                      className="notification error  notification1 form-error"
                      style={{ margin: "0 15px !important" }}
                    >
                      {errors.description}
                    </div>
                  </div>

                  <div className="col-md-12 margin-top-15">
                    <p>Suggest milestone payments</p>

                    {/* Milestone details */}
                    {milestone.length > 0 ? (
                      <div className="content">
                        <ul className="dashboard-box-list">
                          {milestone.map((mile, index) => {
                            return (
                              <li
                                key={index}
                                style={{
                                  padding: "15px 5px",
                                  background: "#f8f8f8"
                                }}
                              >
                                <span className="notification-text">
                                  {index + 1}) <b>&#8377; {mile.price}</b>{" "}
                                  <small>({mile.date})</small> : {mile.name}
                                </span>
                                <div className="buttons-to-right single-right-button">
                                  <a
                                    className="ico"
                                    style={{ color: "red" }}
                                    onClick={() => removeMilestone(index)}
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

                    {/* Milestone Details */}

                    <table>
                      <tr>
                        <td width="60%">
                          <input
                            placeholder="Milestone request for"
                            className="with-border"
                            name="name"
                            value={currentMilestone.name}
                            onChange={e => {
                              setCurrentMilestone({
                                ...currentMilestone,
                                name: e.target.value
                              });
                            }}
                          />
                        </td>
                        <td width="10%">
                          <input
                            placeholder="Milestone request for"
                            className="with-border"
                            name="date"
                            type="date"
                            value={currentMilestone.date}
                            onChange={e => {
                              setCurrentMilestone({
                                ...currentMilestone,
                                date: e.target.value
                              });
                            }}
                          />
                        </td>
                        <td width="30%">
                          <div className="input-with-icon-left">
                            <i className="icon-line-awesome-inr" />
                            <input
                              type="number"
                              className="input-text with-border"
                              style={{
                                paddingRight: 0,
                                marginBottom: 0,
                                paddingLeft: "40px",
                                textAlign: "center"
                              }}
                              name="price"
                              defaultChecked="0"
                              value={currentMilestone.price}
                              onChange={e => {
                                setCurrentMilestone({
                                  ...currentMilestone,
                                  price: e.target.value
                                });
                              }}
                            />
                          </div>
                        </td>
                        <td width="10%">
                          <a
                            className="button dark "
                            style={{ marginTop: "5px", padding: "8px 10px" }}
                            onClick={addMilestone}
                          >
                            <i className="icon-feather-plus" />
                          </a>
                        </td>
                      </tr>
                    </table>

                    <div
                      className="notification error  notification1 form-error"
                      style={{ margin: "0 15px !important" }}
                    >
                      {errors.milestone} {errors.milestone_name}{" "}
                      {errors.milestone_price} {errors.milestone_date}
                    </div>
                  </div>
                </div>
              ) : (
                <></>
              )}
              <div className="categories-container margin-top-15">
                <div className="col-md-6 category-box-content">
                  <a
                    style={{
                      color: "#fff",
                      width: "100%",
                      textAlign: "center"
                    }}
                    className="button ripple-effect"
                    onClick={saveProposals}
                  >
                    Submit Proposal
                    <i className="icon-material-baseline-mail-outline"></i>
                  </a>
                </div>
                <div className="col-md-6 category-box-content">
                  <a
                    style={{ width: "100%", textAlign: "center" }}
                    className="button gray ripple-effect"
                    onClick={closeSubmitProposalMdl}
                  >
                    Close
                  </a>
                </div>
              </div>
            </LoadingOverlay>
          </Fixmodal>
        </>
      )
    );
  } else {
    return (
      <div
        className="notification error no-shadow"
        style={{
          padding: "25px",
          textAlign: "center"
        }}
      >
        <i
          className="icon-line-awesome-exclamation-circle"
          style={{ fontSize: "120px" }}
        ></i>
        <p>You are not invited to submit any proposal.</p>
      </div>
    );
  }
}

export default SubmitProposal;

const printMilestones = milestones => {
  milestones.map((milestone, index) => {
    return <>{milestone.name}</>;
  });
};

// function printMilestones(milestones) {
//   return <li>{props.message}</li>;
// }
