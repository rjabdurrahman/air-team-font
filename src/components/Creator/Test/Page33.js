import React from "react";
import Sidebar from "./Sidebar";
import CreatorDash from "../CreatorDash";
import { Container, Row, Col, Button, ProgressBar } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

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
                  <Col lg={6} xs={12}>
                    <div
                      className=" fun-fact-new"
                      data-fun-fact-color="#36bd78"
                    >
                      <div className="fun-fact-text">
                        <span>
                          An Air Teams coordinator will be assigned to you
                          shortly
                        </span>
                        <p>
                          Your coordinator will help you through every step of
                          project completion, from proposal to final payments.
                        </p>
                      </div>
                    </div>
                  </Col>
                  <Col lg={6} xs={12}>
                    <div
                      className=" fun-fact-new"
                      data-fun-fact-color="#b81b7f"
                    >
                      <div className="fun-fact-text fun-fact-new1">
                        <span>
                          Completed your brief and get better proposal
                        </span>
                      </div>
                      <div className="fun-fact-progress">
                        <ProgressBar id="file" variant="dark" now={60} />
                        <span>60% Completed</span>
                      </div>
                      <div className="fun-fact-button">
                        <Button variant="dark" class="btn btn-dark">
                          Proceed
                        </Button>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Container>
            </div>
            <div className="dashboard-inner">
              <Container>
                <Row>
                  <Col></Col>
                  <Col lg={5} xs={12}>
                    <div className=" fun-fact-center">
                      <div className="fun-fact-icon"></div>
                      <div className="fun-fact-text">
                        <p>Your Proposal will appear here</p>
                        <span>5h 50m left</span>
                      </div>
                    </div>
                  </Col>
                  <Col></Col>
                </Row>
              </Container>
            </div>

            <div className="dashboard-inner">
              <div className="fun-fact-text">
                <strong>
                  Meanwhile, here's a few things that may intrest you
                </strong>
              </div>
            </div>
            <div className="dashboard-inner">
              <Container>
                <Row>
                  <Col lg={4} xs={12}>
                    <div className=" fun-fact-new">
                      <div className="fun-fact-icon-new">
                        <i className="icon-material-outline-gavel" />
                      </div>
                      <div className="fun-fact-blank"></div>
                      <div className="fun-fact-text">
                        <strong>
                          How a web design project typically works?
                        </strong>
                      </div>
                    </div>
                  </Col>
                  <Col lg={4} xs={12}>
                    <div className=" fun-fact-new">
                      <div className="fun-fact-icon-new">
                        <i className="icon-material-outline-gavel" />
                      </div>
                      <div className="fun-fact-blank"></div>
                      <div className="fun-fact-text">
                        <strong>We redesigned uber's payment experience</strong>
                      </div>
                    </div>
                  </Col>
                  <Col lg={4} xs={12}>
                    <div className=" fun-fact-new">
                      <div className="fun-fact-icon-new">
                        <i className="icon-material-outline-gavel" />
                      </div>
                      <div className="fun-fact-blank"></div>
                      <div className="fun-fact-text">
                        <strong>We redesigned uber's payment experience</strong>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Container>
            </div>
          </div>
        </div>
      </div>
      {/* Dashboard Content / End */}
    </>
  );
}

export default page33;
