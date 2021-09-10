import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import LoadingOverlay from "react-loading-overlay";
import { NotificationManager } from "react-notifications";
import Rating from "react-rating";
import Modal from "../../../utils/Modal";
import ViewProposal from "./ViewProposal";
import ProjectproposalModal from "./ProjectProposalModal";


function Right(props) {
  // console.log("props.proposals", props.proposals);
  const [loader, setLoader] = useState(false);
  const [user, setUser] = useState(props.project.user_id);
  const [ProjectDetails, setProjectDetails] = useState(props.project);
  const [Proposals, setProposals] = useState([props.proposals]);
  const [currentProposal, setCurrentProposal] = useState({});
  const [index, setIndex] = useState({});
  const [Industry, setIndustry] = useState({});
  const mdlViewProposal = useRef();

  const viewProposal = (proposal, industry, index) => {
    proposal.index = index;
    console.log(proposal);
    setCurrentProposal(proposal);
    // setIndex(index);
    mdlViewProposal.current.open();
  };

  useEffect(() => {
      axios.get(process.env.REACT_APP_API_BASE_URL12 + "/industry/" + ProjectDetails.industry)
      .then(res => {
        if (res.data.result) {
          setIndustry(res.data.result);
        }
        else {
          NotificationManager.error(
            "Error please try again",
            "Error"
          )
        }
      })
      .catch(err => {
        NotificationManager.error(
          "Error fetching details please try again",
          "Error"
        );
        console.log(err);
      });
  },[])

  return (
    <>
      <style>
        {
          "\
          .modal-box{\
                padding: 0 !important;\
                max-width:75%!important;\
            }\
        "
        }
      </style>
      <div
        className="dashboard-content-container dashboard-content-container-new"
        data-simplebar
      >
        <div className="dashboard-content-inner">
          <div className="dashboard-inner" >
            <Container  >
              <Row>
                <Col lg={10} xs={12}>
                  <h2 style={{ color: "#2e3a59", fontWeight: "bold" }}>Proposal/s for Your Project.</h2>
                  <p style={{ color: "#3a3a3c", fontSize: "16px" }}>Based on your project brief, here is proposal for you with details
                    of the scope of work, team that will work on it, the delivery timeline
                    and the commercials.</p>
                </Col>
              </Row>
            </Container>
          </div>
          <div className="dashboard-inner">
            {
              Proposals.map((proposal, idx) => {
                return (
                  <Container style={{ paddingBottom: "2%" }}>
                    <Row>
                      <Col lg={10} xs={12} className="shadow-sm p-5 mb-5 bg-white rounded">
                        <Row >
                          <Col lg={10} xs={12} style={{ paddingBottom: "2%" }}>
                            <h4 style={{ color: "#2e3a59", fontWeight: "bold", fontSize: "22px" }}> Overview of the brief</h4>
                          </Col>
                        </Row>
                        <Row>
                          <Col lg={4} xs={6}>
                            <p style={{ color: "#2e3a59", fontSize: "18px", fontWeight: "bold" }}>Project Title</p>
                            <p style={{ color: "#3a3a3c", fontSize: "16px" }}>{ProjectDetails.project_title}</p>
                          </Col>
                          <Col lg={4} xs={6}>
                            <p style={{ color: "#2e3a59", fontSize: "18px", fontWeight: "bold" }}>Project Type</p>
                            {ProjectDetails.category.map((category, idx) => {
                              return (<p style={{ color: "#3a3a3c", fontSize: "16px" }}>
                                {category.name}
                              </p>)
                            })}
                          </Col>
                          <Col lg={4} xs={6}>
                            <p style={{ color: "#2e3a59", fontSize: "18px", fontWeight: "bold" }}>Industry</p>
                            <p style={{ color: "#3a3a3c", fontSize: "16px" }}>
                              {Industry.name}
                            </p>
                          </Col>
                        </Row>
                        <Row style={{ paddingTop: "2%" }}>
                          <Col lg={10} xs={12}>
                            <p style={{ color: "#2e3a59", fontSize: "18px", fontWeight: "bold" }}>Project Description</p>
                            <p style={{ color: "#3a3a3c", fontSize: "16px" }}>
                              {ProjectDetails.project_description}
                            </p>
                          </Col>
                        </Row>
                        <Row style={{ paddingTop: "2%" }}>
                          <Col lg={10} xs={12}>
                            <span className="freelancer-detail-item margin-top-30">
                              <a
                                style={{ color: "#2dbdc9", cursor: "pointer", fontSize: "14px", fontWeight: "500" }}
                              >
                                view full scope of work
                              </a>
                            </span>
                          </Col>
                        </Row>
                        <Row style={{ paddingTop: "2%" }}>
                          <Col lg={10} xs={12}>
                            <h4 style={{ color: "#2e3a59", fontWeight: "bold", fontSize: "22px" }}>Team Roles</h4>
                          </Col>
                        </Row>
                        <Row style={{ paddingTop: "2%" }}>
                          <Col lg={"auto"} xs={12} className="shadow-sm p-2 mb-2 rounded"
                            style={{
                              background: "#f5f9fa",
                              border: "1.5px solid #daeced",
                              height: "auto"
                            }}>
                            <Row>
                              <Col lg={3} xs={2} className="float-left">
                                <img src="/images/user-avatar-small-01.jpg" className="rounded-circle" />
                              </Col>
                              <Col lg={4} xs={4}>
                                <p style={{ color: "#2e3a59", fontSize: "14px", fontWeight: "bold" }}>
                                  {proposal[idx].user_id.name}
                                </p>
                                <p style={{ color: "#a5a5a6", fontSize: "14px" }}>
                                  {proposal[idx].user_id.skills.category.name}
                                </p>
                              </Col>
                              <Col lg={3} xs={6} className="align-right" >
                                <i className="icon-material-outline-star" style={{ fontSize: "11px", color: "#ffb92a" }}>
                                  <span style={{ fontSize: "14px" }}>{proposal[idx].user_id.rating}</span>
                                </i>
                                <p style={{ color: "#a5a5a6", fontSize: "14px" }}>
                                  Exp: 2yrs
                                </p>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                        <Row style={{ paddingTop: "2%" }}>
                          <Col lg={10} xs={12}>
                            <h4 style={{ color: "#2e3a59", fontWeight: "bold", fontSize: "22px" }}>Deadlines and Commercials</h4>
                          </Col>
                        </Row>
                        <Row style={{ paddingTop: "2%" }}>
                          <Col lg={4} xs={12} className="shadow-sm p-3 mb-2 rounded"
                            style={{
                              background: "#f5f9fa",
                              border: "1.5px solid #daeced",
                              height: "auto"
                            }}>
                              <Row>
                              <Col lg={3} xs={4}>
                                <p style={{ fontSize: "46px", fontWeight: "bold", color: "#2dbdc9" }}>
                                {(() => {
                                    if (proposal[idx].milestone.length < 10) {
                                      return (
                                        <>0{proposal[idx].milestone.length}</>
                                      )
                                    }
                                    else {
                                      return (
                                        <>{proposal[idx].milestone.length}</>
                                      )
                                    }
                                  })()}
                                </p>
                              </Col>
                              <Col lg="auto" xs={8}>
                                <p style={{ color: "#2e3a59", fontSize: "18px", fontWeight: "bold" }}>
                                  Deliverables
                                </p>
                                <p style={{ color: "#a5a5a6", fontSize: "12px" }}>
                                  Mentioned in scope of work
                                </p>
                              </Col>
                          </Row>
                          </Col>
                          <Col lg={4} xs={12} className="shadow-sm p-3 mb-2 rounded"
                            style={{
                              background: "#f5f9fa",
                              border: "1.5px solid #daeced",
                              height: "auto"
                            }}>
                            <Row >
                              <Col lg={3} xs={4} >
                                <p style={{ fontSize: "46px", fontWeight: "bold", color: "#2dbdc9" }}>
                                  {(() => {
                                    if (proposal[idx].days.length < 10) {
                                      return (
                                        <>0{proposal[idx].days}</>
                                      )
                                    }
                                    else {
                                      return (
                                        <>{proposal[idx].days}</>
                                      )
                                    }
                                  })()}
                                </p>
                              </Col>
                              <Col lg="auto" xs={8}>
                                <p style={{ color: "#2e3a59", fontSize: "18px", fontWeight: "bold" }}>
                                  Days (+/- 4 days)
                                </p>
                                <p style={{ color: "#a5a5a6", fontSize: "12px" }}>
                                  Duration of Project
                                </p>
                              </Col>
                            </Row>
                          </Col>
                          <Col lg={4} xs={12} className="shadow-sm p-3 mb-2 rounded"
                            style={{
                              background: "#f5f9fa",
                              border: "1.5px solid #daeced",
                              height: "auto"
                            }}>
                            <Row >
                              <Col lg="auto" xs={12}>
                                <p style={{ fontSize: "46px", fontWeight: "bold", color: "#2dbdc9" }}>
                                  {proposal[idx].price}
                                </p>
                              </Col>
                              <Col lg={5} xs={8}>
                                <p style={{ color: "#2e3a59", fontSize: "18px", fontWeight: "bold" }}>
                                  Quote
                                </p>
                                <p style={{ color: "#a5a5a6", fontSize: "12px" }}>
                                  Non Negotiable
                                </p>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                        <Row style={{ paddingTop: "2%" }}>
                          <Col lg={12} xs={12}>
                            <button type="button" class="btn btn-lg btn-block"
                            onClick={() => {
                              viewProposal(proposal[idx], Industry,index + 1);}}
                              style={{ backgroundColor: "#001626", color: "#ffffff", textAlign: "center" }}>
                              View Proposal</button>
                          </Col>
                        </Row>
                        <Row style={{ paddingTop: "2%" }}>
                          <Col lg={12} xs={12}>
                            <button type="button" class="btn btn-lg btn-block"
                              style={{
                                backgroundColor: "#fffff", color: "#001626",
                                textAlign: "center", border: "2px solid #001626"
                              }}>
                              Download Full proposal</button>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Container>
                  )
              })
            }
          </div>
        </div>
      </div>
      <Modal ref={mdlViewProposal}>
        <ProjectproposalModal proposal={currentProposal} projectDetails={ProjectDetails} industry={Industry} />
      </Modal>
    </>
  );
}

export default Right;
