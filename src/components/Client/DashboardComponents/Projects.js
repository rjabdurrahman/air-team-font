import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import LoadingOverlay from "react-loading-overlay";
import { NotificationManager } from "react-notifications";
import { UserContext } from "../../../_hooks/UserContext";
import './projectNav.css'
import { date } from "yup";
const Projects = (props) => {

    const [Tabs, setTabs] = useState("ongoing");
    const Projects = props.projects;
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return (
        <div className="container">
            <div className="row">
                <div className="col-md">
                    <p className="dashboard-main-heading">
                        Projects
                    </p>
                    <p className="dashboard-small-text" style={{ paddingTop: "2%" }}>
                        Check out the progress of all your projects here.
                    </p>
                </div>
            </div>
            <div className="row" style={{ borderBottom: "1px solid #daeced", paddingTop: "5%" }}>
                <div className="col-md col-sm">
                    <li className="list-view">
                        <a className="cool-link">Ongoing</a>
                    </li>
                    <li className="list-view">
                        <a className="cool-link">Completed</a>
                    </li>
                </div>
            </div>
            <div className="row" style={{ paddingTop: "2%" }}>
                <div className="col-md">
                    <div className="input-group" style={{ border: "1px solid #daeced" }}>
                        <div className="input-group-prepend">
                            <button className="btn searchbarButton" type="button" style={{ paddingLeft: "10px" }}>
                                <i className="icon-material-outline-search"></i>
                            </button>
                        </div>
                        <input type="text" className="form-control searchbar" placeholder="Search your networks" />
                    </div>
                </div>
            </div>
            <div className="row" style={{ paddingTop: "2%" }}>
                <div className="col-md">
                    {
                        Projects.map((project, idx) => {
                            console.log("Project proposals", project.accepted_proposal[0]);
                            return (
                                <div className="row" style={{ paddingTop: "2%" }}>
                                    <div className="col-md">
                                        <div className="shadow-sm p-4 rounded"
                                            style={{ backgroundColor: "white", border: "1.5px solid #daeced" }}>
                                            <div className="row">
                                                <div className="col-md-5" style={{ borderRight: "2px solid #daeced" }}>
                                                    <p className="projectbox-heading">{project.project_title}</p>
                                                    <p className="projectbox-id">{project._id}</p>
                                                </div>
                                                {(() => {
                                                    if (project.status === "onGoing") {
                                                        return (project.accepted_proposal[0].proposal_id.milestone.map((milestone, idx) => {
                                                            if (milestone.status === "onGoing") {
                                                                var date = new Date(milestone.date);
                                                                return (
                                                                    <>
                                                                        <div className="col-md" style={{ borderRight: "2px solid #daeced" }}>
                                                                            <p className="projectbox-smallheading">
                                                                                Milestone
                                                                            </p>
                                                                            <p className="projectbox-heading">
                                                                                {(idx + 1 < 9) ? ("0" + (idx + 1)) : (idx + 1)}/
                                                                                {(project.accepted_proposal[0].proposal_id.milestone.length < 9) ?
                                                                                    ("0" + project.accepted_proposal[0].proposal_id.milestone.length) :
                                                                                    project.accepted_proposal[0].proposal_id.milestone.length}
                                                                            </p>
                                                                        </div>
                                                                        <div className="col-md" style={{ borderRight: "2px solid #daeced" }}>
                                                                            <p className="projectbox-smallheading">
                                                                                Due Date
                                                                            </p>
                                                                            <p className="projectbox-heading">
                                                                                {date.getDate() + " " +
                                                                                    months[date.getMonth()] + ", " +
                                                                                    date.getFullYear()}
                                                                            </p>
                                                                        </div>
                                                                        <div className="col-md">
                                                                            <button
                                                                                className="button"
                                                                                style={{ width: "100%" }}
                                                                            >
                                                                                View Project
                                                                            </button>
                                                                        </div>
                                                                    </>
                                                                )
                                                            }
                                                        })
                                                        )
                                                    }
                                                    else {
                                                        return (
                                                            <>
                                                                <div className="col-md" style={{ borderRight: "2px solid #daeced" }}>
                                                                    <p className="projectbox-smallheading">
                                                                        Milestone
                                                                    </p>
                                                                    <p className="projectbox-heading">
                                                                        -
                                                                    </p>
                                                                </div>
                                                                <div className="col-md" style={{ borderRight: "2px solid #daeced" }}>
                                                                    <p className="projectbox-smallheading">
                                                                        Due Date
                                                                    </p>
                                                                    <p className="projectbox-heading">
                                                                        -
                                                                    </p>
                                                                </div>
                                                                <div className="col-md">
                                                                            <button
                                                                                className="button"
                                                                                style={{ width: "100%" }}
                                                                            >
                                                                                View Proposals
                                                                            </button>
                                                                        </div>
                                                            </>
                                                        )
                                                    }
                                                })()}


                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );
}

export default Projects;
