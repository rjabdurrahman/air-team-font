import React from "react";
import CreatorDash from "../CreatorDash";
import { Link, Route, useRouteMatch } from "react-router-dom";
import { Container, Row, Col, Button, ProgressBar } from "react-bootstrap";


function page47(props) {
    return (
        <>
          {/* Dashboard Content ================================================== */}
    
          <div className="dashboard-container">
          <div
              className="dashboard-content-container dashboard-content-container-new"
              data-simplebar
            >
             <div className="">
          <div className="dashboard-inner">
          <div className="">
              <Container>
                <Row>
                  <Col lg={8} xs={12}>
                
                 </Col>
              <Col lg={4} xs={12}>
                    <div className=" dashboard-new-block ">
                    <div className=" title1 border-bottom block-bottom">
                     <strong>Order Summary</strong>
                        </div>
                     <div className=" border-bottom block-bottom">
                   <ul>
                    <li class="">
                       
                        <div class="circle">
                        </div>
                       <br></br>
                        <span><strong>Main Website Revamp</strong></span><br></br>
                        <small>website creation</small>
                      
                      </li>
                </ul>
                <div className=" title1">
                <Container>
                <Row>
                <Col lg={6} xs={6}>
                <span><strong>Project cost</strong></span><br></br>
                <span><strong>+7% Gst</strong></span>
                </Col>
                <Col lg={6} xs={6}>
                <div class="align-right">
                <span><strong>$2000</strong></span><br></br>
                <span><strong>$1400</strong></span>
                </div>
                </Col>
                </Row>
                </Container>
                </div>
                </div>
                <div className=" border-bottom">
                   <ul data-submenu-title="">
                    <li class="nav-dashboard">
                        <Link>
                        <span>Current Payable</span>
                        </Link>
                      </li>
                </ul>
                <div className=" title1">
                <Container>
                <Row>
                <Col lg={6} xs={6}>
                <span><strong>Project Advance</strong></span><br></br>
                    <small>10% of total gst</small>
                </Col>
                <Col lg={6} xs={6}>
                <div class="align-right">
                <span><strong>$2000</strong></span>
                </div>
                </Col>
              
                <Col lg={6} xs={6}>
                <span><strong>Taxes</strong></span>
                </Col>
                <Col lg={6} xs={6}>
                <div class="align-right">
                <span><strong>140</strong></span>
               </div>
                </Col>
                </Row>
                </Container>
                </div>
                </div>
                <div className="">
                <div className=" title1">
                <Container>
                <Row>
                <Col lg={6} xs={6}>
                <span><strong>Total Payable</strong></span>
                </Col>
                <Col lg={6} xs={6}>
                <div class="align-right">
                <span><strong>2140</strong></span>
                </div>
                </Col>
                </Row>
                </Container>
                </div>
                <div className=" title1">
                <div class="dark-button">
                    <button type="button" class="btn btn-dark">View Profile</button>
                </div> 
                <div class="dark-button1">
                    <button type="button" class="btn btn-dark"><small>Talk to your<br></br>Air 
                    team cordinator
                    </small></button>
                    </div>
                </div>
                    
                </div>
                </div>
              

                  </Col>
                </Row>
              </Container>
              </div>
            
              </div>

              </div>
              </div>
              </div>
             
             
             </>
  );
}
    export default page47;