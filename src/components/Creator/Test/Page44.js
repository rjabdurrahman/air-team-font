import React from "react";
import Sidebar1 from "./Sidebar1";
import CreatorDash from "../CreatorDash";
import { Container, Row, Col, Button, ProgressBar } from "react-bootstrap";

function page44(props) {
  return (
    <>
      {/* Dashboard Content ================================================== */}

      <div className="dashboard-container">
        <Sidebar1 />
        <div
          className="dashboard-content-container col-lg-8 dashboard-new-block"
          data-simplebar
        >
          <div class="mesgs">
            <div className="top-dashboard">
              <Row>
                <Col lg={6} xs={12}>
                  <div className=" fun-fact-heading active-block">
                    <div className="fun-fact-head">
                      <span>Proposal 1</span>
                      <br></br>
                      <small>Meet the especially</small>
                    </div>
                  </div>
                </Col>
                <Col lg={3} xs={12}>
                  <div className=" fun-fact-heading block2">
                    <div className="fun-fact-head">
                      <span>Proposal 2</span>
                      <br></br>
                      <small></small>
                    </div>
                  </div>
                </Col>
                <Col lg={3} xs={12}>
                  <div className=" fun-fact-heading block2">
                    <div className="fun-fact-head">
                      <span>Proposal 3</span>
                      <br></br>
                      <small></small>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
            <div class="msg_history">
              <div class="msg_history1">
                <Container>
                  <Row>
                    <div className="chat-date">
                      <small>15 september</small>
                      <br></br>
                    </div>
                    <div className="chat-date">
                      <small>Chat Initiated</small>
                    </div>
                  </Row>
                </Container>

                <div class="incoming_msg">
                  <div class="incoming_msg_img">
                    <span>PG</span>
                  </div>
                  <div class="incoming_msg">
                    <div class="incoming_msg_img">
                      <span>PG</span>
                    </div>
                    <div class="received_msg">
                      <div class="received_withd_msg">
                        <p>
                          Test which is a new approach to have all solutions{" "}
                          <span class="time_date"> 11:01 AM </span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="outgoing_msg">
                    <div class="sent_msg">
                      <p>
                        Test which is a new approach to have all solutions{" "}
                        <span class="time_date"> 11:01 AM </span>
                      </p>
                    </div>
                  </div>
                  <div class="outgoing_msg">
                    <div class="sent_msg">
                      <p>
                        Test which is a new approach to have all solutions{" "}
                        <span class="time_date"> 11:01 AM </span>
                      </p>
                    </div>
                  </div>
                  <div class="outgoing_msg">
                    <div class="sent_msg">
                      <p>
                        Test which is a new approach to have all solutions{" "}
                        <span class="time_date"> 11:01 AM </span>
                      </p>
                    </div>
                  </div>
                  <div class="incoming_msg">
                    <div class="incoming_msg_img">
                      <span>PG</span>
                    </div>
                    <div class="received_msg">
                      <div class="received_withd_msg">
                        <p>
                          Test which is a new approach to have all solutions{" "}
                          <span class="time_date"> 11:01 AM </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="incoming_msg">
                  <div class="incoming_msg_img">
                    <span>PG</span>
                  </div>
                  <div class="received_msg">
                    <div class="received_withd_msg">
                      <p>
                        Test which is a new approach to have all solutions{" "}
                        <span class="time_date"> 11:01 AM </span>
                      </p>
                    </div>
                  </div>
                </div>
                <div class="incoming_msg">
                  <div class="incoming_msg_img">
                    <span>PG</span>
                  </div>
                  <div class="received_msg">
                    <div class="received_withd_msg">
                      <p>
                        Test which is a new approach to have all solutions{" "}
                        <span class="time_date"> 11:01 AM </span>
                      </p>
                    </div>
                  </div>
                </div>
                <div class="incoming_msg">
                  <div class="incoming_msg_img">
                    <span>PG</span>
                  </div>
                  <div class="received_msg">
                    <div class="received_withd_msg">
                      <p>
                        Test which is a new approach to have all solutions{" "}
                        <span class="time_date"> 11:01 AM </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="type_msg">
              <div class="input_msg_write">
                <input
                  type="text"
                  class="write_msg"
                  placeholder="Type a message"
                />
                <button class="msg_send_btn" type="button">
                  <i class="icon-feather-upload"></i>
                  <i class="icon-feather-mic"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default page44;
