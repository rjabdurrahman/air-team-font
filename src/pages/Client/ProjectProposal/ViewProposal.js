import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import LoadingOverlay from "react-loading-overlay";
import { NotificationManager } from "react-notifications";
import { UserContext } from "../../../_hooks/UserContext";

var about_us;
const ViewProposal = ({ proposal, navigation }) => {
  
  const { next } = navigation;
  const logged_user = useContext(UserContext);
  const [user, setUser] = useState(logged_user.user);
  const [Errors, setErrors] = useState({});
  const [loader, setLoader] = useState(false);
  const history = useHistory();
  const [ProjectDetails, setProjectDetail] = useState(proposal.projectDetails);
  const [proposals, setProposal] = useState(proposal.proposal);
  const [Industry, setIndustry] = useState(proposal.industry);


  return (
    <>
      <LoadingOverlay active={loader} spinner text="Loading...">
        <div style={{ width: "100%", height: "calc(100vh - 82px)" }}>
          <div className="container">
            <div className="row" style={{ paddingBottom: "5%", paddingTop: "5%" }}>
              <div className="col-md-8">
                <p>
                  <span style={{ color: "#2e3a59", fontWeight: "bold", fontSize: "40px" }}>Project Proposal</span>
                </p>
                <span style={{ color: "#a5a5a6", fontSize: "20px", paddingTop: "2%" }}>
                  {ProjectDetails.project_title}
                </span>
              </div>
              <div className="col-md align-right">
                <button type="button" className="btn" style={{ backgroundColor: "#2dbdc9", color: "white" }}>
                  Download Proposal
                </button>
              </div>
            </div>
          </div>
          <div style={{
            backgroundColor: "#daeced",
            paddingTop: "5%",
            paddingBottom: "5%",
          }}>
            <div className="container">
              <div className="row" style={{ paddingBottom: "5%" }}>
                <div className="col-md">
                  <p>
                    <span style={{ color: "#001626", fontWeight: "bold", fontSize: "24px" }}>
                      Overview of the brief</span>
                  </p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-4">
                  <p>
                    <span style={{ color: "#001626", fontSize: "18px", fontWeight: "bold" }}>Project Title</span>
                  </p>
                  <p>
                    <p style={{ color: "#001626", fontSize: "16px" }}>{ProjectDetails.project_title}</p>
                  </p>
                </div>
                <div className="col-md-4">
                  <p>
                    <span style={{ color: "#001626", fontSize: "18px", fontWeight: "bold" }}>Project Type</span>
                  </p>
                  {ProjectDetails.category.map((category, idx) => {
                    return (
                      <p>
                        <span style={{ color: "#3a3a3c", fontSize: "16px" }}>
                          {category.name}
                        </span>
                      </p>
                    )
                  })}
                </div>
                <div className="col-md-4">
                  <p>
                    <span style={{ color: "#001626", fontSize: "18px", fontWeight: "bold" }}>Industry</span>
                  </p>
                  <p>
                    <span style={{ color: "#001626", fontSize: "16px" }}>{Industry.name}</span>
                  </p>
                </div>
              </div>
              <div className="row" style={{ paddingTop: "5%" }}>
                <div className="col-md-4">
                  <p>
                    <span style={{ color: "#001626", fontSize: "18px", fontWeight: "bold" }}>Project Brief</span>
                  </p>
                  <p>
                    <span style={{ color: "#001626", fontSize: "16px" }}>{ProjectDetails.project_description}</span>
                  </p>
                </div>
              </div>
              <div className="row" style={{ paddingTop: "5%" }}>
                <div className="col-md-4">
                  <p>
                    <span style={{ color: "#001626", fontSize: "18px", fontWeight: "bold" }}>Skill sets:</span>
                  </p>

                  {
                    ProjectDetails.sub_category.map((skill, idx) => {
                      return (<p><span style={{ color: "#001626", fontSize: "16px" }}>{skill.name}</span></p>)
                    })
                  }
                </div>
                <div className="col-md-4">
                  <p>
                    <span style={{ color: "#001626", fontSize: "18px", fontWeight: "bold" }}>Project Timeline:</span>
                  </p>
                  <p>
                    <span style={{ color: "#001626", fontSize: "16px" }}>{ProjectDetails.timeline}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div style={{ backgroundColor: "#f5f9fa", paddingTop: "5%", paddingBottom: "5%" }}>
            <div className="container">
              <div className="row">
                <div className="col-md-8">
                  <p style={{ color: "#2e3a59", fontWeight: "bold", fontSize: "24px" }}>Scope of Work</p>
                </div>
              </div>
              <div style={{ paddingTop: "5%" }}>
                <div className="row" className="shadow-sm p-1 mb-1 bg-white rounded" >
                  <div className="col-md-8"  >
                    <ul className="ul-style-view-proposal" style={{ paddingTop: "5px" }}>
                      <li className="list-style-view-proposal" >
                        Hello this is testing scope of work
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="row" className="shadow-sm p-1 mb-1 bg-white rounded">
                  <div className="col-md-8" >
                    <ul className="ul-style-view-proposal" style={{ paddingTop: "5px" }}>
                      <li className="list-style-view-proposal" >
                        Hello this is testing scope of work
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="row" className="shadow-sm p-1 mb-1 bg-white rounded">
                  <div className="col-md-8" >
                    <ul className="ul-style-view-proposal" style={{ paddingTop: "5px" }}>
                      <li className="list-style-view-proposal" >
                        Hello this is testing scope of work
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container" style={{ paddingBottom: "5%" }}>
            <div className="row" style={{ paddingTop: "5%" }}>
              <div className="col-md-8">
                <p style={{ color: "#2e3a59", fontWeight: "bold", fontSize: "24px" }}>Team roles</p>
              </div>
            </div>
            <div className="row" style={{ paddingTop: "5%" }}>
              <img src="/images/user-avatar-small-01.jpg" className="rounded-circle" style={{ width: "50px", height: "50px" }} />
              <div className="col-md">
                <p style={{ color: "#2e3a59", fontWeight: "bold", fontSize: "16px", lineHeight: "1" }}>
                  {proposals.user_id.name}
                  <br></br>
                  <span style={{ color: "#a5a5a6", fontSize: "12px", fontWeight: "normal" }}>
                    {proposals.user_id.skills.category.name}</span>
                  <p>
                    <span style={{ color: "#a5a5a6", fontSize: "12px", fontWeight: "normal" }}>
                      Experience 2 yrs &nbsp;|&nbsp;
                      <i className="icon-material-outline-star" style={{ fontSize: "11px", color: "#ffb92a" }}>
                        <span style={{ fontSize: "14px" }}>{proposals.user_id.rating}
                        </span>
                      </i>
                    </span>
                  </p>
                </p>
              </div>
              <div className="col-md" style={{ borderLeft: "2px solid #daeced" }}>
                <p style={{ color: "#2e3a59", fontWeight: "bold", fontSize: "16px" }}>Skillsets</p>
                <p style={{ color: "#a5a5a6", fontSize: "12px" }}>
                  {
                    proposals.user_id.skills.skillset_prices.map((skillset_price, idx) => {
                      return (
                        skillset_price.id.category.map((cat, idx) => {
                          if (idx === skillset_price.id.category.length - 1) {
                            return (cat.name)
                          }
                          else {
                            return (cat.name) + ", "
                          }
                        })
                      )
                    })
                  }
                </p>
              </div>
              <div className="col-md align-right">
                <button type="button" className="btn" style={{ backgroundColor: "#001626", color: "white" }}>
                  View Profile
                </button>
              </div>
            </div>
            <div className="row">
              <div className="col-md-8">
                <p style={{ color: "#2e3a59", fontWeight: "bold", fontSize: "18px" }}>Projects</p>
              </div>
            </div>
            <div className="row">
              <div className="col-md">
                <img className="img-thumbnail" src="/images/home_image_3.png" />
              </div>
              <div className="col-md">
                <img className="img-thumbnail" src="/images/home_image_3.png" />
              </div>
              <div className="col-md">
                <img className="img-thumbnail" src="/images/home_image_3.png" />
              </div>
            </div>
          </div>
          <div style={{ paddingTop: "5%", backgroundColor: "#001626", paddingBottom: "5%" }}>
            <div className="container">
              <div className="row" style={{ paddingBottom: "5%" }}>
                <div className="col-md-8">
                  <span style={{ fontSize: "22px", fontWeight: "bold", color: "#f5f9fa" }}>
                    Deadlines and Commercials
                  </span>
                </div>
              </div>
              <div className="row">
                <div className="col-md-4">
                  <div className="shadow-sm p-4 rounded"
                    style={{ backgroundColor: "#2e3a59", color: "white" }}>
                    <div className="row">
                      <div className="col-md-4" style={{ paddingTop: "2%" }}>
                        <p>
                          <span style={{ fontSize: "46px", fontWeight: "bold", color: "white" }}>
                            06
                          </span>
                        </p>
                      </div>
                      <div className="col-md">
                        <p>
                          <span
                            style={{ fontSize: "18px", fontWeight: "bold", color: "white", lineHeight: "1" }}>
                            Deliverables
                          </span>
                        </p>
                        <span
                          style={{ fontSize: "12px", fontWeight: "normal", color: "white" }}>
                          Mentioned in ‘Scope of Work’
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="shadow-sm p-4 rounded"
                    style={{ backgroundColor: "#2e3a59", color: "white" }}>
                    <div className="row">
                      <div className="col-md-4" style={{ paddingTop: "2%" }}>
                        <p>
                          <span style={{ fontSize: "46px", fontWeight: "bold", color: "white" }}>
                            {proposals.days}
                          </span>
                        </p>
                      </div>
                      <div className="col-md">
                        <p>
                          <span
                            style={{ fontSize: "18px", fontWeight: "bold", color: "white", lineHeight: "1" }}>
                            Days (+/- 4 days)
                          </span>
                        </p>
                        <span
                          style={{ fontSize: "12px", fontWeight: "normal", color: "white" }}>
                          Duration of Project
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="shadow-sm p-4 rounded"
                    style={{ backgroundColor: "#2e3a59", color: "white" }}>
                    <div className="row">
                      <div className="col-md" style={{ paddingTop: "2%" }}>
                        <p>
                          <span style={{ fontSize: "5vh", fontWeight: "bold", color: "white" }}>
                            &#8377;{proposals.price}
                          </span>
                        </p>
                      </div>
                      <div className="col-md">
                        <p>
                          <span
                            style={{ fontSize: "18px", fontWeight: "bold", color: "white", lineHeight: "1" }}>
                            Quote
                          </span>
                        </p>
                        <span
                          style={{ fontSize: "12px", fontWeight: "normal", color: "white" }}>
                          Non Negotiable
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row" style={{ paddingTop: "5%" }}>
                <div className="col-md-8">
                  <span style={{ fontSize: "22px", fontWeight: "bold", color: "#f5f9fa" }}>
                    Terms of Payment:
                  </span>
                </div>
              </div>
              <div className="row">
                <div className="col-md">
                  <p>
                    <span
                      style={{ fontSize: "16px", fontWeight: "normal", color: "white", lineHeight: "1" }}>
                      50% Advance on the first milestone as defined in the scope of work.<br />
                      Up to 3 iterations per milestone will be accepted. Charges applicable post that.
                    </span>
                  </p>
                  <p>
                    <span style={{ color: "#2dbdc9" }}>
                      Note:<br />
                    </span>
                    <span
                      style={{ fontSize: "16px", fontWeight: "normal", color: "white", lineHeight: "1" }}>
                      1) In case of project related travel, all expenses towards travel and stay to be borne by the client.<br />
                      2) Any other expenses incurred and not included above will be charged separately and billed on actuals.
                    </span>
                  </p>
                </div>
              </div>
              <div className="row justify-content-end" style={{ paddingTop: "5%" }}>
                <div className="col-md-4 align-right" style={{lineHeight:"1"}}>
                  <span className="freelancer-detail-item">
                    <a style={{ color: "#ffb92a", cursor: "pointer", fontSize: "14px", fontWeight: "500" }}>
                      Have Questions ?
                    </a>
                  </span><br/>
                  <span className="freelancer-detail-item">
                    <a style={{ color: "#ffb92a", cursor: "pointer", fontSize: "14px", fontWeight: "500" }}>
                      Speak to your AirTeams AD ?
                    </a>
                  </span>
                </div>
                <div className="col-md-4 align-right">
                  <a
                    style={{ width: "18vh", backgroundColor: "white", color: "#2dbdc9", textAlign: "center" }}
                    className="button">
                    Reject
                  </a>
                  &nbsp;&nbsp;&nbsp;
                  <a
                    style={{
                      width: "18vh",
                      textAlign: "center",
                      color: "#fff",
                      
                    }}
                    onClick={next}
                    className="button">
                    Accept
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LoadingOverlay>
    </>
  );
}



{/* <LoadingOverlay active={loader} spinner text="Loading...">
        <div className="dashboard-container" style={{ maxHeight: "650px" }}>
          <div
            className="dashboard-content-container dashboard-content-container-new"
            data-simplebar
          >
            <div
              className="dashboard-content-inner"
              style={{ padding: 0, maxHeight: "600px" }}
            >
              <div className="dashboard-inner">

              </div>
              <div
                class=" fun-fact-new-block block-bottom"
                style={{ padding: "0" }}
              >
                <strong>Meet the Creator</strong>
                <Row>
                  <Col lg={4} xs={12}>
                    <div className=" line-head line-border">
                      <div className=" row">
                        <div className=" col-lg-3">
                          {proposal.user_id.profile != undefined ? (
                            <>
                              <div
                                class="circle-new-head"
                                style={{
                                  background: `url(${process.env.REACT_APP_API_BASE_URL}/${proposal.user_id.profile.profile_image.path})`,
                                  backgroundSize: "cover"
                                }}
                              ></div>
                            </>
                          ) : (
                            <>
                              <div
                                class="circle-new-head"
                                style={{
                                  color: "#efefef",
                                  paddingTop: "5px",
                                  paddingLeft: "7px"
                                }}
                              >
                                RP
                              </div>
                            </>
                          )}
                        </div>
                        <div className=" col-lg-9 line-head">
                          <strong style={{ textTransform: "capitalize" }}>
                            {proposal.user_id.name}
                          </strong>

                          <p
                            style={{
                              fontSize: "80%",
                              fontWeight: "400",
                              lineHeight: "10px"
                            }}
                          >
                            {proposal.user_id.skills.category.name}
                          </p>

                          <small>
                            {" "}
                            <Rating
                              emptySymbol="icon-material-outline-star-border"
                              fullSymbol="icon-material-outline-star"
                              initialRating={proposal.user_id.rating}
                              readonly
                            />
                          </small>
                        </div>
                      </div>
                    </div>
                  </Col>
                  {about_us != "" ? (
                    <Col lg={4} xs={12}>
                      <div className="line-head line-border">
                        <strong>About</strong>

                        <p
                          style={{
                            fontSize: "80%",
                            fontWeight: "400",
                            lineHeight: "10px"
                          }}
                        >
                          {about_us}
                        </p>
                      </div>
                    </Col>
                  ) : (
                    <></>
                  )}

                  <Col lg={4} xs={12}>
                    <div className="line-head">
                      <strong style={{ display: "block" }}>Skill Sets</strong>
                      {proposal.user_id.skills.skillset_prices.map(
                        (skill, index) => {
                          return (
                            <label
                              style={{
                                background: "rgba(42,65,232,0.07)",
                                color: "#54c4c3",
                                padding: "0px 10px",
                                border: "1px solid #efefef",
                                borderRadius: "5px",
                                marginRight: "5px",
                                fontSize: "12px",
                                marginBottom: "0px"
                              }}
                              key={index}
                            >
                              {skill.id.name}
                            </label>
                          );
                        }
                      )}
                    </div>
                  </Col>
                  {/* <Col lg={2} xs={12}>
                  <div class="dark-button">
                    <button type="button" class="btn btn-dark">
                      View Profile
                    </button>
                  </div>
                </Col> */}
//           </Row>

//           <strong>Portfolio</strong>
//           <Row>
//             {proposal.user_id.projects.map((project, pIndex) => {
//               return (
//                 <Col lg={3} xs={12}>
//                   <div
//                     class="blank-block"
//                     style={{
//                       background: `url(${process.env.REACT_APP_API_BASE_URL}/${project.uploaded_files[0].path})`,
//                       backgroundSize: "cover"
//                     }}
//                   ></div>
//                 </Col>
//               );
//             })}
//           </Row>
//         </div>
//       </div>
//     </div>
//   </div>
// </LoadingOverlay> */}
export default ViewProposal;



