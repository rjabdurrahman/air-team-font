import React from "react";
import CreatorDash from "../CreatorDash";
import { Container, Row, Col, Button, ProgressBar } from "react-bootstrap";

function page43(props) {
  return (
    <>
      <div className="dashboard-container">
        <div
          className="dashboard-content-container dashboard-content-container-new"
          data-simplebar
        >
          <div className="dashboard-content-inner">
            <div className="dashboard-inner">
              <div className="upper-inner">
                <Container>
                  <Row>
                    <Col lg={8} xs={12}>
                      <div className=" fun-fact-heading">
                        <div className="fun-fact-head">
                          <h2>
                            <strong>1st Proposal</strong>
                          </h2>
                        </div>
                      </div>
                    </Col>
                    <Col lg={2} xs={12}>
                      <span>
                        <strong>$2000</strong>
                      </span>
                      <br></br>
                      <small>Expert Quote</small>
                    </Col>
                    <Col lg={2} xs={12}>
                      <span>
                        <strong>16 Days</strong>
                      </span>
                      <br></br>
                      <small>Total Duration</small>
                    </Col>
                  </Row>
                </Container>
              </div>
              <div class=" fun-fact-new-heading">
                <small>
                  <stronng>Proposed Milestone</stronng>
                </small>
                <Row>
                  <div className=" col-lg-1 col-sm-1 date-block">
                    <div className="margin-block">
                      <span>15</span>
                      <br></br>
                      <small>Sep</small>
                    </div>
                    <div className="margin-block">
                      <div class="v3"></div>
                    </div>
                    <div className="margin-block">
                      <span>22</span>
                      <br></br>
                      <small>Sep</small>
                    </div>
                    <div className="margin-block">
                      <div class="v3"></div>
                    </div>
                    <span>31</span>
                    <br></br>
                    <small>Sep</small>
                  </div>
                  <div className=" col-lg-11 col-sm-10 responsive-block  ">
                    <div className=" fun-fact-new-block block-bottom">
                      <Row>
                        <div className=" col-lg-6 col-sm-6 line-head line-border">
                          <strong>Milestone 1 Web App User Flow Design</strong>
                          <br></br>
                          <small>Loren Ipsum</small>
                        </div>
                        <div className=" col-lg-3 col-sm-3 line-head line-border">
                          <small>Deleverable Format</small>
                          <br></br>
                          <div className="fun-fact-icon-new">
                            <i className="icon-material-outline-gavel" />
                          </div>
                        </div>
                        <div className=" col-lg-3 col-sm-3 line-head">
                          <small>Fee</small>
                          <br></br>
                          <strong>$6000</strong>
                        </div>
                      </Row>
                    </div>
                    <div className=" fun-fact-new-block block-bottom">
                      <Row>
                        <div className=" col-lg-6 col-sm-6 line-head line-border">
                          <strong>Milestone 1 Web App User Flow Design</strong>
                          <br></br>
                          <small>Loren Ipsum</small>
                        </div>
                        <div className=" col-lg-3 col-sm-3 line-head line-border">
                          <small>Deleverable Format</small>
                          <br></br>
                          <div className="fun-fact-icon-new">
                            <i className="icon-material-outline-gavel" />
                            <i className="icon-material-outline-gavel" />
                          </div>
                        </div>
                        <div className=" col-lg-3 col-sm-3 line-head">
                          <small>Fee</small>
                          <br></br>
                          <strong>$10000</strong>
                        </div>
                      </Row>
                    </div>
                    <div className=" fun-fact-new-block block-bottom">
                      <Row>
                        <div className=" col-lg-6 col-sm-6 line-head line-border">
                          <strong>Milestone 1 Web App User Flow Design</strong>
                          <br></br>
                          <small>Loren Ipsum</small>
                        </div>
                        <div className=" col-lg-3 col-sm-3 line-head line-border">
                          <small>Deleverable Format</small>
                          <br></br>
                          <div className="fun-fact-icon-new">
                            <i className="icon-material-outline-gavel" />
                            <i className="icon-material-outline-gavel" />
                          </div>
                        </div>
                        <div className=" col-lg-3 col-sm-3 line-head">
                          <small>Fee</small>
                          <br></br>
                          <strong>$4000</strong>
                        </div>
                      </Row>
                    </div>
                    <div class="dark-button1">
                      <button type="button" class="btn btn-outline-dark">
                        Reject
                      </button>
                      <button type="button" class="btn btn-dark">
                        Inactive Chat
                      </button>
                    </div>
                  </div>
                </Row>
              </div>
            </div>
            <div class=" fun-fact-new-block block-bottom">
              <Container>
                <strong>Meet the Creator</strong>
                <Row>
                  <Col lg={4} xs={12}>
                    <div className=" line-head line-border">
                      <div className=" row">
                        <div className=" col-lg-2">
                          <div class="circle-new-head1">
                            <i class="icon-feather-user"></i>
                          </div>
                        </div>
                        <div className=" col-lg-10 line-head">
                          <strong>Anjali Bagla</strong>
                          <br></br>
                          <small>Web Developer</small>
                          <br></br>
                          <small>Experience 2Yrs</small> <small>*4.8</small>
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col lg={3} xs={12}>
                    <div className="line-head line-border">
                      <strong>About</strong>
                      <br></br>
                      <small>Loren Ipsum</small>
                    </div>
                  </Col>
                  <Col lg={3} xs={12}>
                    <div className="line-head">
                      <strong>Skill Sets</strong>
                      <br></br>
                      <small>Loren Ipsum</small>
                    </div>
                  </Col>
                  <Col lg={2} xs={12}>
                    <div class="dark-button">
                      <button type="button" class="btn btn-dark">
                        View Profile
                      </button>
                    </div>
                  </Col>
                </Row>
              </Container>

              <Container>
                <strong>Portfolio</strong>
                <Row>
                  <Col lg={3} xs={12}>
                    <div class="blank-block"></div>
                  </Col>
                  <Col lg={3} xs={12}>
                    <div class="blank-block"></div>
                  </Col>
                  <Col lg={3} xs={12}>
                    <div class="blank-block"></div>
                  </Col>
                  <Col lg={3} xs={12}>
                    <div class="blank-block"></div>
                  </Col>
                </Row>
              </Container>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default page43;
