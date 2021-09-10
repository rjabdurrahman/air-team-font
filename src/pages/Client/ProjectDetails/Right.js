import React ,{ useState, useEffect} from "react";
import axios from "axios";
import { Container, Row, Col, Button, ProgressBar } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import ErrorNotifications from "../../../utils/ErrorNotifications";
// import Left from "./Left";


function Right(props) {
  const [ProjectDetails, setProjectDetails] = useState({});

  useEffect(()=>{
    axios.get(process.env.REACT_APP_API_BASE_URL + "/project/details/" + props.project._id)
    .then(res =>{
      setProjectDetails(res.data.result[0]);
      console.log("status: ", res.data.result[0].status);
    })
  },[]);


  return (
    <div
      className="dashboard-content-container dashboard-content-container-new"
      data-simplebar

    >
      <div className="dashboard-content-inner" style={{ backgroundColor: "#f1f7f9" }}>
        <div className="dashboard-inner">
          <Container>
            <ErrorNotifications />
            <Row>
              {(()=>{
                if(ProjectDetails.status == "Assigned"){
                  console.log("status: ", ProjectDetails)
                  return(
                    <Col lg={6} xs={12} className="shadow-sm p-3 mb-5 bg-white rounded">
                    <div className=" fun-fact-new" data-fun-fact-color="#36bd78">
                      <Row >
                        <Col lg={2} xs={6}  >
                          <span> <i className="icon-feather-user" style={{ fontSize: "64px", color: "#daeced" }} /></span>
                        </Col>
                        <Col lg={10}>
                          <div className="fun-fact-text">
                            <span style={{ color: "#2e3a59" }}>
                              Meet {ProjectDetails.expert_details.name}, your Account Director for the project
                            </span>
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <p style={{ color: "grey", fontSize: "16px" }}>
                            The Air Teams Account director will assist you throught the project and ensure that you
                            will quality work delivered on time.
                          </p>
                        </Col>
                      </Row>
                    </div>
                  </Col>
                  )
                }
                else{
                  return(
                    <Col lg={6} xs={12} className="shadow-sm p-3 mb-5 bg-white rounded">
                    <div className=" fun-fact-new" data-fun-fact-color="#36bd78">
                      <Row>
                        <Col lg={2} xs={6}>
                          <span> <i className="icon-feather-user" style={{ fontSize: "64px", color: "#daeced" }} /></span>
                        </Col>
                        <Col lg={10}>
                          <div className="fun-fact-text">
                            <span style={{ color: "#2e3a59" }}>
                              We are assigning an Account Director to you right away.
                            </span>
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <p style={{ color: "grey", fontSize: "16px" }}>
                            He/she will be the point of contact between you and the creative team
                            and will be responsible for delivering quality work on time
                          </p>
                        </Col>
                      </Row>
                    </div>
                  </Col>
                  )
                }
              })()}
              <Col lg={6} xs={12} className="shadow-sm p-3 mb-5 bg-white rounded">
                <div className=" fun-fact-new" data-fun-fact-color="#b81b7f" >
                  <div className="fun-fact-text fun-fact-new1">
                    <span style={{ color: "#2e3a59" }}>You have successfully completed your project brief.
                      You will receive suitable proposals shortly.
                    </span>
                  </div>
                  <div className="fun-fact-progress">
                    <ProgressBar id="file" now={100} />
                    <span>100% Completed</span>
                  </div>
                  <div className="fun-fact-button">
                    <Button class="btn"
                      style={{
                        backgroundColor: "#5dbbc7",
                        color: "white",
                        fontSize: "13px",
                        border: "none"
                      }}>
                      Proceed
                    </Button>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
        <div className="dashboard-inner">
          <Container style={{ paddingTop: "10%" }}>
            <Row className="justify-content-center">
              <Col lg={1} xs={5}>
                <i className="icon-feather-clock" style={{ fontSize: "76px", color: "#daeced", verticalAlign: "middle" }} />
              </Col>
            </Row>
            <Row className="justify-content-center">
              <Col lg={5} xs={12} >
                <span ><p style={{ color: "#2e3a59", fontWeight: "bold", textAlign: "center", fontSize: "20px" }}>
                  Your proposal/s will appear here</p></span>
              </Col>
            </Row>
            <Row className="justify-content-center">
              <Col lg={5} xs={12}>
                <span><p style={{ fontWeight: "500", color: "#2dbdc9", fontSize: "18px", textAlign: "center" }}>
                  It usually takes around 48 hours</p></span>
              </Col>
            </Row>
          </Container>
        </div>
        <div className="dashboard-inner">
          <Container style={{ paddingTop: "10%" }}>
            <Row>
              <Col lg={4} xs={10}>
                <div className="card bg-dark text-white">
                  <img className="card-img" src="/images/home_image_8.png" alt="Card Image" style={{ borderRadius: "4px", opacity: "0.66" }} />
                  <div className="card-img-overlay">
                    <h5 className="card-title"
                      style={{
                        position: "absolute",
                        bottom: "0",
                        fontSize: "22px",
                        fontWeight: "bold",
                        letterSpacing: "0.5px",
                        color: "white",
                        paddingBottom:"5%"
                      }}>
                      How a web design project typically works ?
                    </h5>
                    <p className="card-text"
                      style={{
                        position: "absolute",
                        bottom: "0",
                        fontSize: "12px",
                        fontWeight: "normal",
                        letterSpacing: "1.36px",
                        color: "white"
                      }}>
                      UI/UX DESIGN | 2 MINS
                    </p>
                  </div>
                </div>
              </Col>
              <Col lg={4} xs={10}>
                <div className="card bg-dark text-white">
                  <img className="card-img" src="/images/home_image_8.png" alt="Card Image" style={{ borderRadius: "4px", opacity: "0.66" }} />
                  <div className="card-img-overlay">
                    <h5 className="card-title"
                      style={{
                        position: "absolute",
                        bottom: "0",
                        fontSize: "22px",
                        fontWeight: "bold",
                        letterSpacing: "0.5px",
                        color: "white",
                        paddingBottom:"5%"
                      }}>
                      How a web design project typically works ?
                    </h5>
                    <p className="card-text"
                      style={{
                        position: "absolute",
                        bottom: "0",
                        fontSize: "12px",
                        fontWeight: "normal",
                        letterSpacing: "1.36px",
                        color: "white"
                      }}>
                      UI/UX DESIGN | 2 MINS
                    </p>
                  </div>
                </div>
              </Col>
              <Col lg={4} xs={10}>
                <div className="card bg-dark text-white">
                  <img className="card-img" src="/images/home_image_8.png" alt="Card Image" style={{ borderRadius: "4px", opacity: "0.66" }} />
                  <div className="card-img-overlay">
                    <h5 className="card-title"
                      style={{
                        position: "absolute",
                        bottom: "0",
                        fontSize: "22px",
                        fontWeight: "bold",
                        letterSpacing: "0.5px",
                        color: "white",
                        paddingBottom:"5%"
                      }}>
                      How a web design project typically works ?
                    </h5>
                    <p className="card-text"
                      style={{
                        position: "absolute",
                        bottom: "0",
                        fontSize: "12px",
                        fontWeight: "normal",
                        letterSpacing: "1.36px",
                        color: "white"
                      }}>
                      UI/UX DESIGN | 2 MINS
                    </p>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </div>
  );
}

export default Right;
