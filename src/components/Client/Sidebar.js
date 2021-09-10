import React from "react";
import SidebarData from "./SidebarData";
import { Link, useRouteMatch } from "react-router-dom";

//css import
import "./style.css";
function Sidebar(props) {
  // const routeResult = useRoutes(routes);
  const { url, path } = useRouteMatch();
  let pathname = window.location.pathname;

  const logout = () => {
    localStorage.removeItem("ACCESS_TOKEN");
    localStorage.removeItem("REFRESH_TOKEN");
    localStorage.removeItem("USER_ID");
    window.location = "/";
  };

  return (
    <>
      {/* Dashboard Sidebar */}
      <div className="dashboard-sidebar">
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
            <div className="dashboard-nav">
              <div className="dashboard-nav-inner">
                {Object.entries(SidebarData).map((MainMenu, mainkey) => {
                  return (
                    <ul>
                      {Object.entries(MainMenu[1]).map((menu, key) => {
                        var current = url + menu[1].to;
                        // console.log("menu[1].submenu", menu[1]);
                        return (
                          <li
                            key={menu[0]}
                            className={pathname == current ? "dashboard-select-bg" : ""}
                          >
                            {menu[1].submenu ? (
                              <Link to={`#`} >
                                <i className={menu[1].icon}/>
                                {menu[1].label}
                              </Link>
                            ) : (
                              <Link className="dashboard-sidebar-hover" to={`${url}${menu[1].to}`} style={{paddingTop:"5%", paddingBottom:"5%"}}>
                                <i className={menu[1].icon} 
                                style={{fontSize:"25px", color:"#2e3a59", fontWeight:"bold"}}/>
                                <span style={{fontSize:"16px", color:"#2e3a59", fontWeight:"500"}}>
                                  {menu[1].label}</span>
                              </Link>
                            )}

                            {menu[1].submenu ? (
                              <ul>
                                {Object.entries(menu[1].submenu).map(
                                  (submenu, subkey) => {  
                                    return (
                                      <li key={submenu[0] + subkey}>
                                        <Link to={`${url}${submenu[1].to}`}>
                                          {submenu[1].label}
                                        </Link>
                                      </li>
                                    );
                                  }
                                )}
                              </ul>
                            ) : (
                              <></>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  );
                  // console.log("menu", menu, key);
                })}
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

export default Sidebar;
