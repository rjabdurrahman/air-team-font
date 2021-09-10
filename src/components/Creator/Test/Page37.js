import React from "react";
import Sidebar from "./Sidebar";
import CreatorDash from "../CreatorDash";
import { Container, Row, Col, Button, ProgressBar } from "react-bootstrap";


function page33(props) {
  return (
    <>
      {/* Dashboard Content ================================================== */}

      <div className="dashboard-container">
        <Sidebar />
        <div
          className="dashboard-content-container dashboard-content-container-new"
          data-simplebar
        >
          <div className="dashboard-content-inner">
          <div className="dashboard-inner">
              <Container>
                <Row>
                  <Col lg={9} xs={12}>
                    <div
                      className=" fun-fact-heading"
                    >
                      <div className="fun-fact-head">
                        <h2>
                          Hey Jatin! Here's a proposal for you
                        </h2>
                        <small>
                          Meet the especially curated team of talented professionals
                          that we belive is best suited for your project requirments.
                        </small>
                      </div>
                    </div>
                  </Col>
                  <Col lg={3} xs={12}>
                    <div
                      className=" fun-fact-heading-new"
                    >
                      <div className="fun-fact-head">
                        <strong>
                          Completed your brief
                        </strong>
                      </div>
                      <div className="fun-fact-progress">
                        <span>60% Completed</span>
                        <ProgressBar id="file" variant="dark" now={60} />
                      </div>
                    </div>
                  </Col>
                </Row>
              </Container>
            </div>
            
            <div className="dashboard-inner-background">
            <div className="dashboard-inner">
              <div className="fun-fact-text">
                <strong>
                  Meet the Team
                </strong>
              </div>
            </div>
            <div className="dashboard-inner">
              <Container>
                <Row>
                  
                  <Col lg={4} xs={12}>
                    <div className=" fun-fact-new-heading">
                    <div className=" add1">
                        <div className=" row">
                            <div className=" col-lg-2">
                            <div class="circle-new-head">
                              <i class="icon-feather-user"></i>
                            </div>
                            </div>
                            <div className=" col-lg-6 line-head">
                            <span>Anjali Bagla</span><br></br>
                            <small>Web Developer</small>
                              </div>
                              <div className=" col-lg-4 line-head">
                               <bold>*</bold><small>4.8</small><br></br>
                               <small>Exp 2Yrs</small>
                              </div>
                          </div>
                    </div>
                    <div className=" add2">
                    <small>Projects</small>
                    <div className=" container">
                        <div className=" row">
                            <div className=" col-lg-4 head2"> 
                            </div>
                            <div className=" col-lg-4 head2">
                              </div>
                              <div className=" col-lg-4 head2">
                              </div>
                          </div>
                    </div>
                    </div>
                    
                    </div>
                    
                  </Col>
                  <Col lg={4} xs={12}>
                    <div className=" fun-fact-new-heading">
                    <div className=" add1">
                        <div className=" row">
                            <div className=" col-lg-2">
                            <div class="circle-new-head">
                              <i class="icon-feather-user"></i>
                            </div>
                            </div>
                            <div className=" col-lg-6 line-head">
                            <span>Anjali Bagla</span><br></br>
                            <small>Web Developer</small>
                              </div>
                              <div className=" col-lg-4 line-head">
                               <small>*4.8</small><br></br>
                               <small>Exp 2Yrs</small>
                              </div>
                          </div>
                    </div>
                    <div className=" add2">
                    <small>Projects</small>
                    <div className=" container">
                        <div className=" row">
                            <div className=" col-lg-4 head2"> 
                            </div>
                            <div className=" col-lg-4 head2">
                              </div>
                              <div className=" col-lg-4 head2">
                              </div>
                          </div>
                          </div>
                    </div>
                    
                    </div>
                    
                  </Col>
                  <Col lg={4} xs={12}>
                    <div className=" fun-fact-new-heading">
                    <div className=" add1">
                        <div className=" row">
                            <div className=" col-lg-2">
                            <div class="circle-new-head">
                              <i class="icon-feather-user"></i>
                            </div>
                            </div>
                            <div className=" col-lg-6 line-head">
                            <span>Anjali Bagla</span><br></br>
                            <small>Web Developer</small>
                              </div>
                              <div className=" col-lg-4 line-head">
                               <small>*4.8</small><br></br>
                               <small>Exp 2Yrs</small>
                              </div>
                          </div>
                    </div>
                    <div className=" add2">
                    <small>Projects</small>
                    <div className=" container">
                        <div className=" row">
                            <div className=" col-lg-4 head2"> 
                            </div>
                            <div className=" col-lg-4 head2">
                              </div>
                              <div className=" col-lg-4 head2">
                              </div>
                          </div>
                          </div>
                    </div>
                    
                    </div>
                    
                  </Col>
                </Row>
              </Container>
            </div>
            <div className="dashboard-inner">
              <div className="fun-fact-text">
                <strong>
                 Proposal Overview
                </strong>
              </div>
            </div>
            <div className="dashboard-inner-white">
            <div className="dashboard-inner">

              <Container>
              <span>Milestones:</span>
                <Row>
                
                  <Col lg={4} xs={12}>
                  <div className=" add3">
                        <div className=" row">
                        <div className=" col-lg-3 line-head">
                            <span>15</span><br></br>
                            <small>Sep</small>
                          </div>
                            <div className=" col-lg-8 line-head">
                            <span>Web App User Flow Design</span><br></br>
                            <small>Milestone 1</small>
                              </div>
                          </div>
                    </div>
                    <div class="v2"></div>
                    <div className=" add3">
                        <div className=" row">
                        <div className=" col-lg-3 line-head">
                            <span>15</span><br></br>
                            <small>Sep</small>
                          </div>
                            <div className=" col-lg-8 line-head">
                            <span>Prototype</span><br></br>
                            <small>Milestone 1</small>
                              </div>
                          </div>
                    </div>
                    <div class="v2"></div>
                    <div className=" add3">
                        <div className=" row">
                        <div className=" col-lg-3 line-head">
                            <span>15</span><br></br>
                            <small>Sep</small>
                          </div>
                            <div className=" col-lg-8 line-head">
                            <span>Animations and Transitiosns</span><br></br>
                            <small>Milestone 1</small>
                              </div>
                          </div>
                    </div>
                  
                  </Col>

                  <Col lg={3} xs={12}>
                  <div className="block1">
                      <div className="fun-fact-icon-block">
                        <i className="icon-material-outline-money" />
                      </div>
                      <div className="fun-fact-text">
                        <strong>$2000</strong> <small>+7% Gst</small><br></br>
                        <small>Project Quote</small>
                      </div>
                    </div>
                  </Col>
                  <Col lg={3} xs={12}>
                  <div className="block1">
                      <div className="fun-fact-icon-block">
                        <i className="icon-material-outline-alarm" />
                      </div>
                      
                      <div className="fun-fact-text">
                        <strong>16 Days</strong><br></br>
                        <small>Total Duration</small>
                      </div>
                    </div>
                  </Col>
                  <Col lg={2} xs={12}>
                  <div class="btn-bottom">
                    <button type="button" class="btn btn-dark">View Proposal</button>
                    </div>
                   </Col>
                </Row>
              </Container>
            </div>
            </div>
          
            </div>

          
          </div>
        </div>
      </div>
      {/* Dashboard Content / End */}
    </>
  );
}

export default page33;
