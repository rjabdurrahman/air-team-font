import React from "react";
import { useParams } from "react-router-dom";
import jwt_decode from "jwt-decode";
import NotificationManager from "react-notifications/lib/NotificationManager";

import Pending from "../../pages/Client/Projects/Pending";
import ReceivedProposals from "../../pages/Client/Projects/ReceivedProposals";
import Messages from "../../pages/Client/Messages";
import Chat from "../../pages/Chat/Chat";
import './style.css'
// Dashboard imports 
import Projects from '../Client/DashboardComponents/Projects';


function RendorBody(props) {
  const { page } = useParams();

  console.log("props", props.user);
  // console.log("page", page);
  var data = {
    messages: { component: <Messages user={props.user} /> },
    // messages: { component: <Chat user={props.user} /> },
    profile: { component: <h3>Profile</h3> },
    projects: { component: <Projects projects={props.projects}/> },
    files : {component: <h3>Files</h3>},
    payments: {component: <h3>Payments</h3>},
    resolutions: {component: <h3>Resolutions</h3>},
    received_proposals: { component: <ReceivedProposals user={props.user} /> },
    ongoing_projects: { component: <h1>Ongoing Projects</h1> },
    pending_projects: { component: <Pending user={props.user} /> },
    completed_projects: { component: <h1>Completed Projects</h1> },
    settings: { component: <h3>Settings</h3> }
  };

  return <div>{data[page].component}</div>;
}

export default RendorBody;
