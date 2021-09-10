import React, { useRef, useEffect, useState } from "react";
import { Container, Row, Col, Button, ProgressBar } from "react-bootstrap";
import { Link } from "react-router-dom";
import AcceptProposal from "../Client/ProjectProposal/AcceptProposal";

import Modal from "../../utils/Modal";

const Left = ({ project, proposal, loader }) => {
  // console.log("project", project);
  // console.log("proposal", proposal);

  const mdlAcceptProposal = useRef();
  return (
    <>
      <div className="dashboard-sidebar dashboard-sidebar-new col-lg-4 ">
        <div className="dashboard-sidebar-inner" data-simplebar>
          <div className="dashboard-nav-container">
            {/* Responsive Navigation Trigger */}
            <a className="dashboard-responsive-nav-trigger">
              <span className="hamburger hamburger--collapse">
                <span className="hamburger-box">
                  <span className="hamburger-inner" />
                </span>
              </span>
              <span style={{ color: "#fff" }} className="trigger-title">
                {project.project_title}
              </span>
            </a>
            {/* Navigation */}
            <div className="dashboard-nav dashboard-nav1">
              <div className="dashboard-nav-inner">
                <ul data-submenu-title="">
                  <li class="nav-dashboard">
                    <Link style={{ textDecoration: "none" }}>
                      <div class="circle"></div>
                      <br></br>
                      <span>{project.project_title}</span>
                      <p>{project.industry.name}</p>
                    </Link>
                  </li>
                </ul>

                <div class=" fun-fact-new-sidebar">
                  <strong>Proposed Milestone</strong>
                  <Row>
                    {proposal.milestone.map((milestone, MIndex) => {
                      var mDate = new Date(milestone.date);
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
                      return (
                        <>
                          <div className=" col-lg-12 col-sm-12 responsive-block  ">
                            <div className=" fun-fact-new-block block-bottom">
                              <Row>
                                <div className=" col-lg-1 col-sm-1 date-block">
                                  <div className="margin-block">
                                    <span>{mDate.getDay()}</span>
                                    <br></br>
                                    <small>{months[mDate.getMonth()]}</small>
                                  </div>
                                </div>
                                <div
                                  className=" col-lg-7 col-sm-8 line-head"
                                  style={{ paddingTop: "7px" }}
                                >
                                  <strong>Milestone {MIndex + 1}</strong>
                                  <br></br>
                                  <small>
                                    <strong> {milestone.name}</strong>
                                  </small>
                                </div>
                                <div
                                  className=" col-lg-4 col-sm-3 line-head"
                                  style={{
                                    paddingTop: "7px",
                                    textAlign: "right"
                                  }}
                                >
                                  <strong> &#8377; {milestone.price} /-</strong>
                                  {/* <br />
                                <div className="fun-fact-icon-new">
                                  <i className="icon-material-outline-gavel" />
                                </div> */}
                                </div>
                              </Row>
                            </div>
                          </div>
                        </>
                      );
                    })}
                  </Row>
                  <div class="dark-button1">
                    <Row>
                      <Col lg={6} md={6} xs={12}>
                        <button
                          type="button"
                          class="button gray btn-outline-dark"
                          style={{ width: "100%" }}
                        >
                          Reject
                        </button>
                      </Col>
                      <Col lg={6} md={6} xs={12}>
                        <button
                          type="button"
                          class="button ripple-effect button-sliding-icon"
                          onClick={e => {
                            mdlAcceptProposal.current.open();
                          }}
                          style={{ width: "100%" }}
                        >
                          Accept
                          <i className="icon-feather-check"></i>
                        </button>
                      </Col>
                    </Row>
                  </div>
                </div>
              </div>
            </div>
            {/* Navigation / End */}
          </div>
        </div>
      </div>

      <Modal ref={mdlAcceptProposal}>
        <AcceptProposal
          proposal={proposal}
          project={project}
          mdlAcceptProposal={mdlAcceptProposal}
        />
      </Modal>
    </>
  );
};

export default Left;
