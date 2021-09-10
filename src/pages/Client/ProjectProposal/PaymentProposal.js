import React, { useState, useEffect ,useContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import LoadingOverlay from "react-loading-overlay";
import { NotificationManager } from "react-notifications";
import { UserContext } from "../../../_hooks/UserContext";
import ProjectProposals from "../../../components/Client/ProjectProposals";
import { Accordion, Card, Button, Collapse } from "react-bootstrap";

const PaymentProposal = ({ proposal, navigation }) => {
    const { next } = navigation;
    const [Proposal, setProposal] = useState(proposal.proposal);
    const logged_user = useContext(UserContext);
    const [Errors, setErrors] = useState({});
    const history = useHistory();
    const [Loader, setLoader] = useState(false);
    const [open, setOpen] = useState(false);
    const [TermsCheck, setTermsCheck] = useState(false);
    const month = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEPT", "OCT", "NOV", "DEC"];

    const handleCheckboxInput = (e) => {
        console.log(e.target.checked);
        setTermsCheck(e.target.checked);
    }
    return (
        <div style={{ width: "100%", height: "calc(100vh - 82px)" }}>
            <div style={{ borderBottom: "2px solid #daeced" }}>
                <div className="container">
                    <div className="row" style={{ paddingTop: "5%" }}>
                        <div className="col-md-8">
                            <p className="payment-main-heading">Let's start!</p>
                        </div>
                    </div>
                    <div className="row" style={{ paddingTop: "5%" }}>
                        <div className="col-md">
                            <p className="payment-small-text">
                                Now that you have decided to go ahead with an Air Teams proposal,
                                let's start with the first step.  This will include releasing a PO and making
                                the initial advance payment.
                            </p>
                        </div>
                    </div>
                    <div className="row" style={{ paddingTop: "6%" }}>
                        <div className="col-md-8">
                            <p className="payment-sub-heading">
                                Your selected
                            </p>
                        </div>
                    </div>
                    <div className="row" style={{ paddingTop: "2%" }}>
                        <div className="col-md-4">
                            <div className="shadow-sm p-2 rounded"
                                style={{ backgroundColor: "#f5f9fa", border: "1.5px solid #daeced" }}>
                                <div className="row" style={{ paddingTop: "2%" }}>
                                    <div className="col-md-4" style={{ paddingTop: "2%" }}>
                                        <p className="shadowbox-blue-numbers">
                                            03
                                        </p>
                                    </div>
                                    <div className="col-md">
                                        <p className="payment-sub-heading">
                                            Deliverables
                                        </p>
                                        <p className="shadowbox-small-text">
                                            Mentioned in ‘Scope of Work’
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="shadow-sm p-2 rounded"
                                style={{ backgroundColor: "#f5f9fa", border: "1.5px solid #daeced" }}>
                                <div className="row" style={{ paddingTop: "2%" }}>
                                    <div className="col-md-4" style={{ paddingTop: "2%" }}>
                                        <p className="shadowbox-blue-numbers">
                                            {Proposal.days}
                                        </p>
                                    </div>
                                    <div className="col-md">
                                        <p className="payment-sub-heading">
                                            Days (+/- 4 days)
                                        </p>
                                        <p className="shadowbox-small-text">
                                            Duration of Project
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="shadow-sm p-2 rounded"
                                style={{ backgroundColor: "#f5f9fa", border: "1.5px solid #daeced" }}>
                                <div className="row" style={{ paddingTop: "2%" }}>
                                    <div className="col-md" style={{ paddingTop: "2%" }}>
                                        <p className="shadowbox-blue-numbers" style={{ fontSize: "5vh" }}>
                                            &#8377;{Proposal.price}
                                        </p>
                                    </div>
                                    <div className="col-md">
                                        <p className="payment-sub-heading">
                                            Quote
                                        </p>
                                        <p className="shadowbox-small-text">
                                            Non Negotiable
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row" style={{ paddingTop: "2%" }}>
                        <div className="col-md">
                            <p className="payment-sub-heading">Upload a Purchase Order
                                <span style={{ color: "#ffb92a", fontSize: "18px", fontWeight: "bold" }}>
                                    (Please note, the purchase order must be updated within 15 days
                                    of accepting the brief)
                                </span>
                            </p>
                            <p>
                                <span style={{ fontSize: "16px", color: "#3a3a3c", fontWeight: "normal" }}>
                                    Upload supporting files (Doc., PDF., JPEG, PPT formats only. Not more than 10 MB)
                                </span>
                            </p>
                            <label class="custom-file-upload margin-bottom-20 margin-top-20"
                                style={{ color: "#2dbdc9", fontWeight: "500", fontSize: "14px" }}>
                                <input
                                    type="file"
                                    multiple
                                />
                                <i class="icon-feather-plus-circle" style={{ fontWeight: "bold" }}></i> Upload Documents
                            </label>
                        </div>
                    </div>
                    <div className="row" style={{ paddingTop: "2%" }}>
                        <div className="col-md">
                            <>
                                <div className="clearfix"
                                    onClick={() => setOpen(!open)}
                                    aria-controls="example-collapse-text"
                                    aria-expanded={open}
                                    style={{ width: "100%", borderBottom: "1px solid #daeced", cursor: "pointer" }}
                                >
                                    <p className="payment-sub-heading float-left">View Milestone and Cost Break up</p>
                                    {(() => {
                                        console.log("inside function of printing +-")
                                        if (open === false) {
                                            return (
                                                <span>
                                                    <i className="icon-feather-plus float-right" style={{ fontWeight: "bold", color: "#2dbdc9" }} />
                                                </span>
                                            )
                                        }
                                        else {
                                            return (
                                                <span>
                                                    <i className="icon-feather-minus float-right" style={{ fontWeight: "bold", color: "#2dbdc9" }} />
                                                </span>
                                            )
                                        }
                                    })()}
                                </div>
                                <Collapse in={open}>

                                    <div id="example-collapse-text">
                                        {
                                            Proposal.milestone.map((milestone, idx) => {
                                                var date = new Date(milestone.date);
                                                return (
                                                    <div className="row" style={{ paddingTop: "2%" }}>
                                                        <div className="col-md">
                                                            <div className="shadow-sm p-4 rounded"
                                                                style={{ backgroundColor: "#f5f9fa", border: "1.5px solid #daeced" }}>
                                                                <div className="row">
                                                                    <div className="col-md-2" style={{ borderRight: "1.5px solid #daeced" }}>
                                                                        <p className="shadowbox-blue-numbers" style={{ textAlign: "center" }}>
                                                                            {date.getDate()} <br />
                                                                            <span style={{ fontSize: "13px", color: "#2e3a59", letterSpacing: "2.1px" }}>
                                                                                {month[date.getMonth()]}
                                                                            </span>
                                                                        </p>
                                                                    </div>
                                                                    <div className="col-md-6" style={{ borderRight: "1.5px solid #daeced" }}>
                                                                        <p className="payment-sub-heading">
                                                                            Milestone {idx + 1}  |  {milestone.name}
                                                                        </p>
                                                                        <p className="payment-small-text">
                                                                            Here comes the description of the milestones
                                                                        </p>
                                                                    </div>
                                                                    <div className="col-md-2" style={{ borderRight: "1.5px solid #daeced", textAlign: "center" }}>
                                                                        <p>
                                                                            <span style={{ fontSize: "20px", color: "#2e3a59", fontWeight: "bold" }}>
                                                                                Payment
                                                                            </span>
                                                                        </p>
                                                                        <p style={{ paddingTop: "2%" }}>
                                                                            <span style={{ fontSize: "5vh", color: "#2e3a59", fontWeight: "900" }}>
                                                                                &#8377;{milestone.price}
                                                                            </span>
                                                                        </p>
                                                                    </div>
                                                                    <div className="col-md-2" style={{ textAlign: "center" }}>
                                                                        <p>
                                                                            <span style={{ fontSize: "20px", color: "#2e3a59", fontWeight: "bold" }}>
                                                                                Format
                                                                            </span>
                                                                        </p>
                                                                        <i className="icon-feather-file" style={{ fontSize: "50px", color: "#2e3a59" }}></i>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </Collapse>
                            </>
                        </div>
                    </div>
                    <div className="row" style={{ paddingTop: "2%" }}>
                        <div className="col-md">
                            <p>
                                <span style={{ color: "#3a3a3c", fontSize: "16px", letterSpacing: "0.21px" }}>
                                    Terms & Conditions
                                </span>
                            </p>
                        </div>
                    </div>
                    <div className="row" style={{ paddingTop: "2%" }}>
                        <div className="col-md">
                            <div class="d-flex flex-row bd-highlight mb-3">
                                <div class="p-3 bd-highlight">
                                    <i className="icon-feather-edit"
                                        style={{ color: "#2dbdc9", fontSize: "35px", fontWeight: "bold" }}>
                                    </i>
                                </div>
                                <div class="p-2 bd-highlight">
                                    <p className="payment-sub-heading">
                                        3 Interations fireEvent
                                    </p>
                                    <p className="payment-small-text">After the third round of iterations, every
                                        additional request for rework will be charged. Please refer
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row" style={{ paddingTop: "2%" }}>
                        <div className="col-md">
                            <div class="d-flex flex-row bd-highlight mb-3">
                                <div class="p-3 bd-highlight">
                                    <i className="icon-line-awesome-copyright"
                                        style={{ color: "#2dbdc9", fontSize: "35px", fontWeight: "bold" }}>
                                    </i>
                                </div>
                                <div class="p-2 bd-highlight">
                                    <p className="payment-sub-heading">
                                        Copyright protected
                                    </p>
                                    <p className="payment-small-text">All work in progress/rejected content
                                        will remain the sole property of The Air Teams.
                                        Any use of such material without a written permission will be
                                        considered a breach of contract.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row" style={{ paddingTop: "2%" }}>
                        <div className="col-md">
                            <div class="d-flex flex-row bd-highlight mb-3">
                                <div class="p-3 bd-highlight">
                                    <i className="icon-line-awesome-ban"
                                        style={{ color: "#2dbdc9", fontSize: "35px", fontWeight: "bold" }}>
                                    </i>
                                </div>
                                <div class="p-2 bd-highlight">
                                    <p className="payment-sub-heading">
                                        Cancellation fee applicable
                                    </p>
                                    <p className="payment-small-text">If the project is stopped after commencement,
                                        either the 50% advance or a percentage of it will be retained as
                                        Cancellation Fee, depending on the amount of work already done.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md">
                            <div class="d-flex flex-row bd-highlight mb-3">
                                <div class="p-2 bd-highlight">
                                    <input type="checkbox" onChange={(e) => { handleCheckboxInput(e) }}></input>
                                </div>
                                <div class="p-2 bd-highlight">
                                    <span style={{ color: "#3a3a3c", fontSize: "14px", letterSpacing: "0.19px" }}>
                                        I agree to the
                                        <a style={{ textDecoration: "underline" }}>
                                            Terms and conditions
                                        </a>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row" style={{ paddingTop: "2%", paddingBottom: "2%" }}>
                    <div className="col-md align-left">
                        <p>
                            <span style={{ color: "#3a3a3c", fontWeight: "bold", fontSize: "14px" }}>
                                Your money is safe!
                            </span>
                        </p>
                        <p className="shadowbox-small-text" style={{ fontSize: "14px" }}>
                            We assure full refund in case of any discrepancy unfair to you. Read &nbsp;
                            <a style={{ color: "#3a3a3c", textDecoration: "underline" }}>payment policy.</a>
                        </p>
                    </div>
                    <div className="col-md align-right">
                        <button
                            id = "AcceptProposalButton"
                            disabled = {!TermsCheck}
                            style={{
                                width: "25vh",
                                textAlign: "center",
                                color: "#fff",
                                backgroundColor:"#001626",
                                fontWeight:"bold" 
                            }}
                            onClick={next}
                            className="button">
                            Close Commericials
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PaymentProposal;
