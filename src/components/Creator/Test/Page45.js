import React from "react";
import CreatorDash from "../CreatorDash";
import { Container, Row, Col, Button, ProgressBar } from "react-bootstrap";


function page45(props) {
    return (
        <>
          {/* Dashboard Content ================================================== */}
    
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
                  <Col lg={12} xs={12}>
                    <div
                      className=" fun-fact-heading"
                    >
                      <div className="fun-fact-head margin-head">
                        <h2>
                          <strong>You are about to Join the workspace from main website Revamp</strong>
                        </h2>
                        <small>You are about to Join the workspace</small>
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
                  <div className=" add1 ">
                     <span>Proposal 1</span>
                    </div>
                    <div className=" add1 margin-head">
                    <Row>
                    <div className=" col-lg-1">
                            <div class="circle-new-head1">
                              <i class="icon-feather-user"></i>
                            </div>
                    </div>
                    <div className=" col-lg-3 line-head">
                            <span>Anjali Bagla</span><br></br>
                            <small>Web Developer</small>
                    </div>
                    <div className=" col-lg-2 line-head">
                               <span>$2000</span><br></br>
                               <small>Expert Quote</small>
                     </div>
                     <div className=" col-lg-2 line-head">
                               <span>16 Days</span><br></br>
                               <small>Total Diratuon</small>
                     </div>
                     <div className=" col-lg-2 line-head">
                               <span>3</span><br></br>
                               <small>Milestones</small>
                     </div>
                     <div className=" col-lg-2 line-head">
                               <span>28 Sep</span><br></br>
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
              <small>A few point to ensure</small>
              </div>
                <Row>  
                  <div className=" col-lg-12">
                      <div className="margin-head">
                      <div className="icon">
                     <i class="icon-feather-user"></i>
                     </div>
                            <strong>No Circumvention</strong><br></br>
                            <small>Loren Ispum</small>
                     </div>
                     <div className="margin-head">
                      <div className="icon">
                     <i class="icon-feather-user"></i>
                     </div>
                            <strong>No Circumvention</strong><br></br>
                            <small>Loren Ispum</small>
                     </div>
                     <div className="margin-head">
                      <div className="icon">
                     <i class="icon-feather-user"></i>
                     </div>
                            <strong>No Circumvention</strong><br></br>
                            <small>Loren Ispum</small>
                     </div>
                     <div className="margin-head"> 
                     <div>
                      <input type="checkbox" id="check" name="terms" value="terms"/>
                      <label for="vehicle1" class="lable_margin">I agree to the <underline>Terms & Conditions</underline></label>
                      </div>
                          
                     </div>
                </div>
                
                </Row>
              </Container>

              <div className="border-top padding-head">
              <Container>
                <Row>
                <Col lg={10} xs={12}>
                    <div
                      className=" fun-fact-heading"
                    >
                      <div className="fun-fact-head margin-head">
                   
                          <strong>Your Money is safe</strong><br></br>
                        
                        <small>We assure full refund in case of any discerpancy to you. Read <underline>Payment policy</underline></small>
                      </div>
                    </div>
                  </Col>
                  <Col lg={2} xs={12}>
                  <div class="dark-button">
                    <button type="button" class="btn btn-dark">Pay Now</button>
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
             
             </>
  );
}
    export default page45;