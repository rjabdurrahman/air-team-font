import React, { useContext, useRef, useState } from "react";
import { Container, Row, Col, Button, ProgressBar } from "react-bootstrap";
import axios from "axios";
import LoadingOverlay from "react-loading-overlay";
import { NotificationManager } from "react-notifications";
import { UserContext } from "../../../_hooks/UserContext";
import Modal from "../../../utils/Modal";

const AcceptProposal = ({ project, proposal, mdlAcceptProposal }) => {
  const logged_user = useContext(UserContext);
  const [user] = useState(logged_user.user);
  const [errors, setErrors] = useState({});
  const [loader, setLoader] = useState(false);

  var mDate = new Date(proposal.milestone[proposal.milestone.length - 1].date);
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
  //     console.log("project", project);
  //   console.log("proposal", proposal);

  async function displayRazorpay() {
    setLoader(true);
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    // creating a new order

    const headerConfig = {
      headers: { authorization: localStorage.getItem("ACCESS_TOKEN") }
    };

    var payload = {
      project_id: project._id,
      proposal: proposal._id,
      amount: proposal.price
    };
    // console.log("payload", payload);
    const result = await axios.post(
      `${process.env.REACT_APP_API_BASE_URL}/payments/create_order`,
      payload,
      headerConfig
    );

    if (!result) {
      alert("Server error. Are you online?");
      return;
    }

    // Getting the order details back
    const { amount, id: order_id, currency } = result.data;
    var orderDetails = result.data.result;

    // console.log("orderDetails", orderDetails);

    const options = {
      key: "rzp_test_cztHyxO7Oinp7i", // Enter the Key ID generated from the Dashboard
      amount: orderDetails.amount.toString(),
      currency: orderDetails.currency,
      name: "Rajendra Patil.",
      description: project.project_title,
      image: "/images/at-logo.png",
      order_id: orderDetails.id,
      handler: async function(response) {
        // console.log("response", response);
        const data = {
          orderCreationId: orderDetails.id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature
        };

        // console.log("success data", data);

        const headerConfig = {
          headers: { authorization: localStorage.getItem("ACCESS_TOKEN") }
        };

        const result = await axios.post(
          `${process.env.REACT_APP_API_BASE_URL}/payments/verify_payment`,
          data,
          headerConfig
        );
        if (result.data.status) {
          // if payment is captured
          alert("Payment Received");
        }

        NotificationManager.success(
          result.data.errors.message,
          result.data.errors.title
        );
        // alert(result.data.msg);

        setLoader(false);
        mdlAcceptProposal.current.close();
      },

      prefill: {
        name: "Rajendra Patil",
        email: "rajendra827@gmail.com",
        contact: "9999999999"
      },
      notes: {
        address: "Bhatai niwas"
      },
      theme: {
        color: "#00c3c2"
      }
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  return (
    <LoadingOverlay active={loader} spinner text="Loading...">
      <style>
        {
          "\
                .modal-box{\
                    padding:10px !important;\
                    max-width:700px !important\
              }\
            "
        }
      </style>
      <div>
        <div>
          <div>
            <div className="dashboard-inner">
              <div className="upper-inner">
                <Container>
                  <Row>
                    <Col lg={12} xs={12}>
                      <div className=" fun-fact-heading">
                        <div className="fun-fact-head margin-head">
                          <h5>
                            You are about to Join the workspace for{" "}
                            <strong>{project.project_title}</strong>
                          </h5>
                          <small>
                            at the workplace, you can chat with creator, view
                            and receive all your deliverables. Make a payment of
                            10% of the total project cost to kickstart and
                            access the workplace.
                          </small>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Container>
                <div className="dashboard-inner">
                  <Container>
                    <small>You Selected</small>
                    <Row>
                      <Col lg={12} xs={12}>
                        {/* <div className=" add1 ">
                          <span>Proposal 1</span>
                        </div> */}
                        <div className=" add1 margin-head">
                          <Row>
                            <div className=" col-lg-1">
                              {proposal.user_id.profile != undefined ? (
                                <div
                                  class="circle-new-head1"
                                  style={{
                                    background: `url(${process.env.REACT_APP_API_BASE_URL}/${proposal.user_id.profile.profile_image.path})`,
                                    backgroundSize: "cover"
                                  }}
                                ></div>
                              ) : (
                                <></>
                              )}
                            </div>
                            <div className=" col-lg-3 line-head">
                              <span>{proposal.user_id.name}</span>
                              <br></br>
                              <small>Web Developer</small>
                            </div>
                            <div className=" col-lg-2 line-head">
                              <span>&#8377; {proposal.price} /-</span>
                              <br></br>
                              <small>Expert Quote</small>
                            </div>
                            <div className=" col-lg-2 line-head">
                              <span>{proposal.days} Day/s</span>
                              <br></br>
                              <small>Total Diratuon</small>
                            </div>
                            <div className=" col-lg-2 line-head">
                              <span>{proposal.milestone.length}</span>
                              <br></br>
                              <small>Milestones</small>
                            </div>
                            <div className=" col-lg-2 line-head">
                              <span>
                                {mDate.getDate() +
                                  " " +
                                  months[mDate.getMonth()]}
                              </span>
                              <br></br>
                              <small>Final Delivery</small>
                            </div>
                          </Row>
                        </div>
                      </Col>
                    </Row>
                  </Container>
                </div>
                <Container>
                  <div className="margin-head">
                    <small>
                      A few point to ensure a healthy and ethical collaboration:
                    </small>
                  </div>
                  <Row>
                    <div className=" col-lg-12">
                      <div className="margin-head">
                        <div className="icon">
                          <i class="icon-feather-user"></i>
                        </div>
                        <strong>No Circumvention</strong>
                        <br></br>
                        <small>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit
                        </small>
                      </div>
                      <div className="margin-head">
                        <div className="icon">
                          <i class="icon-feather-user"></i>
                        </div>

                        <strong>Copyright</strong>
                        <br></br>
                        <small>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit
                        </small>
                      </div>
                      <div className="margin-head">
                        <div className="icon">
                          <i class="icon-feather-user"></i>
                        </div>
                        <strong>Cancellation Fees</strong>
                        <br></br>
                        <small>Loren Ispum</small>
                      </div>

                      <div className="margin-head">
                        <div className="checkbox">
                          <input
                            type="checkbox"
                            id="chekcbox1"
                            defaultChecked
                          />
                          <label htmlFor="chekcbox1">
                            <span className="checkbox-icon" /> I agree to the{" "}
                            <underline>Terms & Conditions</underline>
                          </label>
                        </div>
                      </div>
                    </div>
                  </Row>
                </Container>

                <div className="border-top padding-head">
                  <Container>
                    <Row>
                      <Col lg={9} xs={12}>
                        <div className=" fun-fact-heading">
                          <div className="fun-fact-head margin-head">
                            <strong>Your Money is safe</strong>
                            <br></br>

                            <small>
                              We assure full refund in case of any discerpancy
                              to you. Read <underline>Payment policy</underline>
                            </small>
                          </div>
                        </div>
                      </Col>
                      <Col lg={3} xs={12}>
                        <div class="dark-button">
                          <button
                            type="button"
                            class="button ripple-effect button-sliding-icon"
                            style={{ width: "100%" }}
                            onClick={displayRazorpay}
                          >
                            Pay Now
                            <i className="icon-feather-check"></i>
                          </button>
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
    </LoadingOverlay>
  );
};

export default AcceptProposal;

function loadScript(src) {
  return new Promise(resolve => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}
