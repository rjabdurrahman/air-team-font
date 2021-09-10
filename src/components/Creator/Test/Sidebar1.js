import React from "react";
import './style.css';
import { Link, Route, useRouteMatch } from "react-router-dom";
import { Container, Row, Col, Button, ProgressBar } from "react-bootstrap";

function Sidebar1(props) {
  // const routeResult = useRoutes(routes);
  const { url, path } = useRouteMatch();

  return (
    <>
      {/* Dashboard Sidebar */}
      <div className="dashboard-sidebar dashboard-sidebar-new col-lg-4 ">
        <div className="dashboard-sidebar-inner" data-simplebar>
          <div className="dashboard-nav-container">
            {/* Responsive Navigation Trigger */}
            <a href="#" className="dashboard-responsive-nav-trigger">
              <span className="hamburger hamburger--collapse">
                <span className="hamburger-box">
                  <span className="hamburger-inner" />
                </span>
              </span>
              <span className="trigger-title">Dashboard Navigation</span>
            </a>
            {/* Navigation */}
            <div className="dashboard-nav dashboard-nav1">
              <div className="dashboard-nav-inner">

                <ul data-submenu-title="">
                    <li class="nav-dashboard">
                        <Link>
                        <div class="circle">
                        </div>
                       <br></br>
                        <span>Main Website Revamp</span>
                        <p>website creation</p>
                        </Link>
                      </li>
                </ul>
               
                <div class=" fun-fact-new-sidebar">
                 <strong>Proposed Milestone</strong>
               <Row>
                 <div className=" col-lg-2 col-sm-1 date-block">
                <div className="margin-block">
                 <span>15</span><br></br>
                <small>Sep</small>
                </div>
                <div className="margin-block">
                <div class="v3"></div>
                </div >
                <div className="margin-block">
                <span>22</span><br></br>
                <small>Sep</small>
                </div>
                <div className="margin-block">
                <div class="v3"></div>
                </div>
                <span>31</span><br></br>
                <small>Sep</small>
                </div>
                <div className=" col-lg-10 col-sm-10 responsive-block  ">
                <div className=" fun-fact-new-block block-bottom">
                  <Row>
                  <div className=" col-lg-8 col-sm-8 line-head">
                     <strong>Milestone 1</strong><br></br>
                     <small><strong> Web App User Flow Design</strong><br></br>Loren Ipsum</small>
                    </div>
                    <div className=" col-lg-3 col-sm-3 line-head">
                     <strong>$6000</strong><br></br>
                     <small>Deleverable</small>
                     <div className="fun-fact-icon-new">
                        <i className="icon-material-outline-gavel" />
                      </div>
                    </div>
                    </Row>
                    
                </div>
                <div className=" fun-fact-new-block block-bottom">
                <Row>
                  <div className=" col-lg-8 col-sm-8 line-head">
                     <strong>Milestone 1</strong><br></br>
                     <small><strong> Web App User Flow Design</strong><br></br>Loren Ipsum</small>
                    </div>
                    <div className=" col-lg-3 col-sm-3 line-head">
                     <strong>$6000</strong><br></br>
                     <small>Deleverable</small>
                     <div className="fun-fact-icon-new">
                        <i className="icon-material-outline-gavel" />
                      </div>
                    </div>
                    </Row>
                    
                </div>
                <div className=" fun-fact-new-block block-bottom">
                <Row>
                  <div className=" col-lg-8 col-sm-8 line-head">
                     <strong>Milestone 1</strong><br></br>
                     <small><strong> Web App User Flow Design</strong><br></br>Loren Ipsum</small>
                    </div>
                    <div className=" col-lg-3 col-sm-3 line-head">
                     <strong>$6000</strong><br></br>
                     <small>Deleverable</small>
                     <div className="fun-fact-icon-new">
                        <i className="icon-material-outline-gavel" />
                      </div>
                    </div>
                    </Row>
                    
                </div>
                
                </div>
                
                
                
                 </Row>
                 <div class="dark-button1">
                <button type="button" class="btn btn-outline-dark">Reject</button>
                    <button type="button" class="btn btn-dark">Inactive Chat</button>
                    </div>

              </div>
               
              </div>
            </div>
            {/* Navigation / End */}
          </div>
        </div>
      </div>
      {/* Dashboard Sidebar / End */}

      {/* <div className="py-10">{element}</div> */}
      {/* {routeResult} */}
    </>
  );
}

export default Sidebar1;
