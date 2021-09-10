import React, { useState, useEffect } from "react";
import Left from "../../pages/Client/ProjectLeft";
import Right from "../../pages/Client/ProjectProposal/Right";
import axios from "axios";
import LoadingOverlay from "react-loading-overlay";
import { NotificationManager } from "react-notifications";
import { useHistory, Redirect } from "react-router-dom";

function ProjectProposals(props) {
  let history = useHistory();

  var [loader, setLoader] = useState(false);
  const project_id = props.match.params.id;
  const [project, setProject] = useState([]);
  const [proposal, setProposal] = useState([]);

  const Loader = val => {
    setLoader(val);
  };

  useEffect(() => {
    // axios
    //   .get(
    //     process.env.REACT_APP_API_BASE_URL + "/project/details/" + project_id
    //   )
    //   .then(res => {
    //     if (res.data.status) {
    //       setProject(res.data.result[0]);
    //       setLoader(false);
    //     }
    //   })
    //   .catch(error => {
    //     setLoader(false);
    //     if (error.response != "undefined" && error.response) {
    //       if (error.response.data.errors.message.length) {
    //         NotificationManager.error(
    //           error.response.data.errors.message,
    //           error.response.data.errors.title
    //         );
    //       }
    //     }
    //   });

    axios
      .get(
        process.env.REACT_APP_API_BASE_URL +
          "/projects/curated_proposals/" +
          project_id
      )
      .then(res => {
        if (res.data.status) {
          setProject(res.data.result.project_id);
          setProposal(res.data.result.proposals);
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

          // return <Redirect to="/client-dash/received_proposals"  />;
          history.push("/client-dash/received_proposals");
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
          <Left project={project} Loader={Loader} />
          <Right
            project={project}
            proposals={proposal}
            project_id={project_id}
            Loader={Loader}
          />
        </div>
      </LoadingOverlay>
    );
  } else {
    return <></>;
  }
}

export default ProjectProposals;
