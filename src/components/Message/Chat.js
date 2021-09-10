import React, { useState, useEffect } from "react";

import Left from "../../pages/Chat/Left";
import Right from "../../pages/Chat/Chat";
import axios from "axios";
import LoadingOverlay from "react-loading-overlay";
import { NotificationManager } from "react-notifications";

function Chat(props) {
  var [loader, setLoader] = useState(false);
  const message_id = props.match.params.message_id;
  const [messages, setMessages] = useState([]);
  const [project, setProject] = useState({});
  const [proposal, setProposal] = useState({});

  const Loader = val => {
    setLoader(val);
  };

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_BASE_URL + "/messages/chat/" + message_id)
      .then(res => {
        // console.log("res.data", res.data);
        if (res.data.status) {
          setMessages(res.data.message);
          setProject(res.data.message.project);
          setProposal(res.data.message.proposal);
          setLoader(false);
        }
      })
      .catch(error => {
        setLoader(false);
        if (error.response != "undefined" && error.response) {
          if (error.response.data.errors.message.length) {
            NotificationManager.error(
              error.response.data.errors.message,
              error.response.data.errors.title
            );
          }
        }
      });
  }, []);

  // alert(objecyproject.length);
  if (
    Object.entries(project).length > 0 &&
    Object.entries(proposal).length > 0
  ) {
    return (
      <LoadingOverlay active={loader} spinner text="Loading...">
        <div className="dashboard-container">
          <Left project={project} proposal={proposal} loader={Loader} />
          <Right project={project} curr_messages={messages} loader={Loader} />
        </div>
      </LoadingOverlay>
    );
  } else {
    return (
      <>
        <p>Here</p>
      </>
    );
  }
}

export default Chat;
