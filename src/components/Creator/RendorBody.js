import React, { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import SidebarData from "./SidebarData";
import jwt_decode from "jwt-decode";

// import Profile from "./profile/Profile";
import SubmitedProfile from "../../pages/Creator/Profile/SubmitedProfile";
import Page1 from "./Test/Page1";
import Page2 from "./Test/Page2";
import Profile from "./Profile/Profile";
import axios from "axios";
import Messages from "../../pages/Creator/Messages";
import Settings from "../../pages/Creator/Settings";
import SubmitProposal from "../../pages/Creator/SubmitProposal";
import NotificationManager from "react-notifications/lib/NotificationManager";

import { UserContext } from "../../_hooks/UserContext";

function RendorBody(props) {
  const { page } = useParams();
  const logged_user = useContext(UserContext);
  const [user, setUser] = useState({});

  useEffect(() => {
    if (logged_user.user) setUser(logged_user.user);
  }, [logged_user]);

  useEffect(() => {
    if (Object.entries(user).length > 0 && user._id != undefined) {
      axios
        .get(process.env.REACT_APP_API_BASE_URL + "/users/" + user._id)
        .then(res => {
          setUser(res.data);
        })
        .catch(error => {
          alert("Logout User");
        });
    }
  });

  var decoded = jwt_decode(localStorage.getItem("ACCESS_TOKEN"));

  // console.log("user.profile_status", user.profile_status.is_profile_verified);
  var data = {
    messages: { component: <Messages user={props.user} /> },
    submit_proposal: { component: <SubmitProposal user={props.user} /> },
    profile: { component: <Profile user={props.user} /> },
    projects: { component: <Page2 user={props.user} /> },
    ongoing_projects: { component: <h1>Ongoing Projects</h1> },
    pending_projects: { component: <h1>pending Projects</h1> },
    completed_projects: { component: <h1>Completed Projects</h1> },
    settings: { component: <Settings user={props.user} /> }
  };

  // if (decoded.profile_status.is_profile_verified == 0 && page != "profile")
  if (
    Object.entries(user).length > 0 &&
    user.profile_status.is_profile_verified == 0 &&
    page != "profile"
  ) {
    NotificationManager.error(
      "Please complete and verify your profile to continue",
      "Error !!!"
    );
    return <div>{data["profile"].component}</div>;
  } else {
    return <div>{data[page].component}</div>;
  }
}

export default RendorBody;
