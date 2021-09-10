import React, { useEffect, useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import { NotificationManager } from "react-notifications";
import Sidebar from "./Sidebar";
import ErrorNotifications from "./ErrorNotifications";
import { Route, useRouteMatch, useLocation } from "react-router-dom";
import RendorBody from "./RendorBody";
import Home from "../../pages/Creator/Home";
import { checkAuth, logout } from "../../_services/checkAuth";
import axios from 'axios';
import { UserContext } from "../../_hooks/UserContext";

function ClientDash(props) {
  var user;
  const { url, path } = useRouteMatch();
  const location = useLocation();
  const [Projects, setProjects] = useState([]);
  useEffect(() => {
    axios.get(process.env.REACT_APP_API_BASE_URL + "/project/get/" + localStorage.getItem("USER_ID"))
    .then(res =>{
      setProjects(res.data.result);
      console.log(res);
    })
    .catch(err =>{
      console.log(err);
    })
  }, []);

  user = checkAuth("Client");

  if (localStorage.getItem("ACCESS_TOKEN") || user) {
    // console.log(user);
    if (user && user.user_role !== "Client") {
      logout();
      window.location.href = "/";
    }

    return (
      <>
        <div>
          {/* Dashboard Container */}
          <div className="dashboard-container">
            {/* Dashboard Sidebar */}
            <Sidebar />
            {/* Dashboard Sidebar */}

            {/* Dashboard Content */}
            <div className="dashboard-content-container" data-simplebar style={{ backgroundColor: "#f1f7f9" }}>
              <div className="dashboard-content-inner">
                <ErrorNotifications />
                {/* Dashboard Headline */}
                {location.pathname !== "/client-dash" ? (
                  // <Route path={`${path}/:page`} component={RendorBody} user />

                  <Route
                    path={`${path}/:page`}
                    render={() => <RendorBody user={user} projects={Projects} />}
                  />
                ) : (
                  <Home />
                )}
              </div>
            </div>

            {/* Dashboard Content / End */}
          </div>
          {/* Dashboard Container / End */}
          {/* Wrapper / End */}
        </div>
      </>
    );
  } else {
    NotificationManager.error(
      "Login session expired, Login to continue ",
      "Error !!!"
    );
    logout();
    return <Redirect to="/" />;
  }
}

export default ClientDash;
