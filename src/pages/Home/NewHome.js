import React, { useEffect, useRef } from "react";
import Modal from "../../utils/Modal";
import { Link } from "react-router-dom";

function NewHome(props) {
  const mdlConfidentiality = useRef();

  const openConfMdl = () => {
    if (mdlConfidentiality.current != undefined)
      mdlConfidentiality.current.open();
  };

  const closeConfMdl = () => {
    if (mdlConfidentiality.current != undefined)
      mdlConfidentiality.current.close();
  };
  return (
    <>
      <div
        className="intro-banner"
        data-background-image="images/home-background.jpg"
      >
        <div className="container">
          {/* Intro Headline */}
          <div className="row">
            <div className="col-md-8">
              <div className="banner-headline">
                <h3>
                  <strong>
                    Find On-demand teams for all your business needs
                  </strong>
                  <br />
                  <span style={{ fontSize: "16px", fontWeight: 300 }}>
                    Work Wih our reliable teams of professionals and get timely,
                    desirable results.
                  </span>
                </h3>
                <button onClick={openConfMdl}
                  style={{ marginTop: "15px" }}
                  className="button ripple-effect"
                >
                  Post a Project
                </button>
              </div>
            </div>
            <div className="col-md-4">
              <img
                style={{
                  borderRadius: "5px",
                  maxHeight: "280px",
                  width: "100%"
                }}
                src="https://lh3.googleusercontent.com/EbXw8rOdYxOGdXEFjgNP8lh-YAuUxwhOAe2jhrz3sgqvPeMac6a6tHvT35V6YMbyNvkZL4R_a2hcYBrtfUhLvhf-N2X3OB9cvH4uMw=w1064-v0"
              />
            </div>
          </div>
          {/* Stats */}
          <div className="row">
            <div className="col-md-12 margin-top-45 hide-under-992px">
              <p style={{ color: "#fff" }}>Trending Now</p>
              <ul className="intro-stats ">
                <li>
                  <span>Logo Design</span>
                </li>
                <li>
                  <span>Landing Pages</span>
                </li>
                <li>
                  <span>Website Creation</span>
                </li>
                <li>
                  <span>eBooks</span>
                </li>
                <li>
                  <span>Product Packaging</span>
                </li>
                <li>
                  <span>Case Studies</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Category Boxes */}
      <div className="section margin-top-65">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="section-headline centered margin-bottom-15">
                <h3>
                  Hire tailor-made teams for your
                  <br />
                  creative business needs
                </h3>
                <p style={{ fontSize: "16px" }}>
                  Work with the right mix of professionals and make every
                  project a success.
                </p>
              </div>
              {/* Tabs Container */}
              <div className="tabs">
                <div
                  className="tabs-header tabs-header-short"
                  style={{ background: "none" }}
                >
                  <ul>
                    <li className="active">
                      <a href="#tab-1" data-tab-id={1}>
                        Graphic Design
                      </a>
                    </li>
                    <li>
                      <a href="#tab-2" data-tab-id={2}>
                        Content Writing
                      </a>
                    </li>
                    <li>
                      <a href="#tab-2" data-tab-id={3}>
                        Music &amp; Audio
                      </a>
                    </li>
                    <li>
                      <a href="#tab-2" data-tab-id={4}>
                        Video &amp; Animation
                      </a>
                    </li>
                    <li>
                      <a href="#tab-2" data-tab-id={5}>
                        Development
                      </a>
                    </li>
                  </ul>
                  <div className="tab-hover" />
                </div>
                {/* Tab Content */}
                <div className="tabs-content">
                  <div className="tab active" data-tab-id={1}>
                    <div className="col-xl-12 col-md-12">
                      <div className="row">
                        {/* Photo Box */}
                        <div className="col-xl-4 col-md-4">
                          <a
                            href="#"
                            className="photo-box"
                            style={{ maxHeight: "280px" }}
                          >
                            <img src="images/1.png" alt="" />
                            <div style={{ padding: "10px" }}>
                              <h3 style={{ fontSize: "16px" }}>
                                {" "}
                                Team Project |{" "}
                                <small style={{ color: "#999" }}>
                                  4 Members
                                </small>
                              </h3>
                              <p style={{ fontSize: "14px", color: "#333" }}>
                                <i className="icon-material-outline-email" />{" "}
                                Graphics Designer{" "}
                                <span style={{ color: "#54c4c3" }}>
                                  +7 More
                                </span>
                              </p>
                            </div>
                          </a>
                        </div>
                        <div className="col-xl-4 col-md-4">
                          <a
                            href="#"
                            className="photo-box"
                            style={{ maxHeight: "280px" }}
                          >
                            <img src="images/1.png" alt="" />
                            <div style={{ padding: "10px" }}>
                              <h3 style={{ fontSize: "16px" }}>
                                {" "}
                                Team Project |{" "}
                                <small style={{ color: "#999" }}>
                                  4 Members
                                </small>
                              </h3>
                              <p style={{ fontSize: "14px", color: "#333" }}>
                                <i className="icon-material-outline-email" />{" "}
                                Graphics Designer{" "}
                                <span style={{ color: "#54c4c3" }}>
                                  +7 More
                                </span>
                              </p>
                            </div>
                          </a>
                        </div>
                        <div className="col-xl-4 col-md-4">
                          <a
                            href="#"
                            className="photo-box"
                            style={{ maxHeight: "280px" }}
                          >
                            <img src="images/1.png" alt="" />
                            <div style={{ padding: "10px" }}>
                              <h3 style={{ fontSize: "16px" }}>
                                {" "}
                                Team Project |{" "}
                                <small style={{ color: "#999" }}>
                                  4 Members
                                </small>
                              </h3>
                              <p style={{ fontSize: "14px", color: "#333" }}>
                                <i className="icon-material-outline-email" />{" "}
                                Graphics Designer{" "}
                                <span style={{ color: "#54c4c3" }}>
                                  +7 More
                                </span>
                              </p>
                            </div>
                          </a>
                        </div>
                      </div>
                    </div>
                    {/* row end*/}
                  </div>
                  <div className="tab" data-tab-id={2}>
                    <div className="row">
                      <div className="col-xl-6 col-md-6">
                        <div className="numbered color">
                          <h1>2</h1>
                        </div>
                      </div>
                    </div>
                    {/* row end*/}
                  </div>
                  <div className="tab" data-tab-id={3}>
                    <div className="row">
                      <div className="col-xl-6 col-md-6">
                        <div className="numbered color">
                          <h1>3</h1>
                        </div>
                      </div>
                    </div>
                    {/* row end*/}
                  </div>
                  <div className="tab" data-tab-id={4}>
                    <div className="row">
                      <div className="col-xl-6 col-md-6">
                        <div className="numbered color">
                          <h1>4</h1>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* row end*/}
                  <div className="tab" data-tab-id={5}>
                    <div className="row">
                      <div className="col-xl-6 col-md-6">
                        <div className="numbered color">
                          <h1>5</h1>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* row end*/}
                </div>
              </div>
              {/* Tabs Container / End */}
            </div>
          </div>
          <div className="section-headline centered margin-bottom-15">
            <a
              href="#"
              className="button dark ripple-effect button-sliding-icon"
              style={{ width: "153.094px" }}
            >
              Get Started <i className="icon-feather-check" />
            </a>
          </div>
        </div>
      </div>
      {/* Short Tabs / End */}

      {/* Features Cities */}
      <div
        className="section margin-top-65"
        style={{ backgroundColor: "#efefef73" }}
      >
        <div className="container">
          <div className="row margin-top-65">
            {/* Section Headline */}
            <div className="col-xl-12">
              <div className="section-headline centered margin-top-0 margin-bottom-45">
                <h3>
                  Make the choice that’s best suited
                  <br />
                  for your project
                </h3>
                <p style={{ fontSize: "16px" }}>
                  Work with solo creators or teams of professionals and find
                  customised solutions to your
                  <br />
                  unique business requirements.
                </p>
              </div>
            </div>
            <div className="col-xl-5 col-md-6 offset-xl-1">
              {/* Photo Box */}
              <a href="#" className="photo-box">
                <img src="images/1.png" alt="" />
                <div className="photo-box-content">
                  <h3> I need solo expert</h3>
                  <p>
                    Choose to work with the expert best suited to your project
                    requirements
                  </p>
                </div>
              </a>
            </div>
            <div className="col-xl-5 col-md-6">
              {/* Photo Box */}
              <a href="#l" className="photo-box">
                <img src="images/2.png" alt="" />
                <div className="photo-box-content">
                  <h3>I need a team</h3>
                  <p>
                    Work with a team of professional of diverse talents and meet
                    the varied needs of your project
                  </p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* Features Cities / End */}

      {/* Making remote work simple */}
      <div className="section " style={{ backgroundColor: "#e2f0f1" }}>
        <div className="container">
          <div className="row margin-top-65 margin-bottom-65">
            <div className="col-xl-12">
              <div className="section-headline centered margin-top-0 margin-bottom-45">
                <h3>Making remote work simple and effortless</h3>
                <p style={{ fontSize: "16px" }}>
                  Work with the best talent, coordinate with your team, and
                  manage deliverables and <br />
                  payments seamlessly.
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col-xl-4 col-md-4">
                <ul>
                  <li>
                    <strong>Post a brie </strong>
                    <p>
                      Describe your project so we can connect you with
                      professionals most suited to your needs.
                    </p>
                  </li>
                  <li>
                    <strong>Select the best proposal</strong>
                    <p>
                      Only work with solo creators or teams that present
                      proposals best tailored to your unique requirements.
                    </p>
                  </li>
                  <li>
                    <strong>Kickstart project and collaborate easily</strong>
                    <p>
                      Track the progress of your projects, receive deliverables
                      and share feedback effectively on the Dashboard.
                    </p>
                  </li>
                  <li>
                    <strong>Pay securely</strong>
                    <p>
                      Authorise payments only when you are 100% satisfied with
                      the work submitted to you
                    </p>
                  </li>
                  <a
                    href="#"
                    className="button dark ripple-effect button-sliding-icon"
                    style={{ width: "153.094px", backgroundColor: "black" }}
                  >
                    Learn More <i className="icon-feather-check" />
                  </a>
                </ul>
              </div>
              <div className="col-xl-8 col-md-8">
                <a href="/">
                  <img
                    style={{ maxWidth: "100%" }}
                    src="images/home_image_3.png"
                    alt=""
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Making remote work simple */}

      {/* The Air Teams Expert start */}

      <div
        className="section "
        style={{ padding: "65px 0", backgroundColor: "#efefef73" }}
      >
        <div className="container">
          <div className="row">
            {/* Section Headline */}
            <div className="col-xl-12">
              <div className="section-headline centered margin-top-0 margin-bottom-45">
                <h2>The Air Teams Expert</h2>
                <p style={{ fontSize: "16px" }}>
                  From handpicking teams to ensuring timely completion of the
                  project, your designated
                  <br />
                  Air Teams Expert is your trusted ally from start to finish.
                </p>
              </div>
              <div className="container">
                <div className="row">
                  <div className="col-xl-12">
                    <div className="blog-carousel">
                      <a href="#" className="blog-compact-item-container">
                        <div className="blog-compact-item">
                          <img src="images/home_image_4.png" alt="" />
                          <div className="blog-compact-item-content">
                            <h3 style={{ color: "#333" }}>
                              Customised Proposal
                            </h3>
                            <p style={{ color: "#666" }}>
                              Get tailor-made proposals for your specific
                              requirements from our Air Teams Expert.
                            </p>
                          </div>
                        </div>
                      </a>
                      <a href="#" className="blog-compact-item-container">
                        <div className="blog-compact-item">
                          <img src="images/home_image_5.png" alt="" />
                          <div className="blog-compact-item-content">
                            <h3 style={{ color: "#333" }}>
                              Comprehensive Management
                            </h3>
                            <p style={{ color: "#333" }}>
                              {" "}
                              Let our Air Teams Coordinator track the progress
                              of your projects and ensure uninterrupted,
                              seamless completion
                            </p>
                          </div>
                        </div>
                      </a>
                      <a href="#" className="blog-compact-item-container">
                        <div className="blog-compact-item">
                          <img src="images/home_image_6.png" alt="" />
                          <div className="blog-compact-item-content">
                            <h3 style={{ color: "#333" }}>
                              Grievance Redressal
                            </h3>
                            <p style={{ color: "#333" }}>
                              Receive timely help from our Air Teams coordinator
                              on any issues you may face during your project
                              completion journey
                            </p>
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* The Air Teams Expert end  */}

      {/* The Air Teams Guarantee start */}

      <div
        className="section "
        style={{
          backgroundColor: "#031422",
          padding: "65px 0",
          paddingTop: "20px"
        }}
      >
        <div className="container">
          <div className="row margin-top-65 margin-bottom-65">
            <div className="col-xl-12">
              <div className="section-headline centered margin-bottom-15">
                <h3 style={{ color: "#51b1d2" }}>The Air Teams Guarante</h3>
                <p style={{ color: "#fff", fontSize: "12px", fontWeight: 300 }}>
                  Be assured of a well-rounded experience when you work with The{" "}
                  <br />
                  Air Teams
                </p>
              </div>
              {/* Category Boxes Container */}
              <div className="categories-container">
                {/* Category Box */}
                <a href="/#" className="category-box">
                  <div className="category-box-icon">
                    <i className="icon-line-awesome-adjust" />
                  </div>
                  <div className="category-box-content">
                    <h3>Transparency</h3>
                    <p>Make informed decisions every step of the way</p>
                  </div>
                </a>
                {/* Category Box */}
                <a href="/#" className="category-box">
                  <div className="category-box-icon">
                    <i className="icon-line-awesome-folder-o" />
                  </div>
                  <div className="category-box-content">
                    <h3>Ownership</h3>
                    <p>
                      Work with a result oriented team that strives for
                      excellence.
                    </p>
                  </div>
                </a>
                {/* Category Box */}
                <a href="/#" className="category-box">
                  <div className="category-box-icon">
                    <i className="icon-line-awesome-arrows" />
                  </div>
                  <div className="category-box-content">
                    <h3>Scalability</h3>
                    <p>
                      Obtain efficient outcomes with teams that can scale as per
                      size of project or budget.
                    </p>
                  </div>
                </a>
                {/* Category Box */}
                <a href="/#" className="category-box">
                  <div className="category-box-icon">
                    <i className="icon-feather-lock" />
                  </div>
                  <div className="category-box-content">
                    <h3>Security</h3>
                    <p>
                      Make safe and secure online payments on Air Teams. Get a
                      refund easily
                    </p>
                  </div>
                </a>
              </div>
              <div className="row margin-top-65 margin-bottom-65">
                <div className="col-xl-6 col-md-6">
                  <a href="/">
                    <img
                      src="images/home_image_7.png"
                      alt=""
                      style={{ maxHeight: "350px", width: "100%" }}
                    />
                  </a>
                </div>
                <div className="col-xl-6 col-md-6">
                  <h3 style={{ color: "#51b1d2" }}>
                    <strong>
                      “Air Teams takes away the hassle of speaking to hundreds
                      of freelancers and spending time on tens of discussions.”
                    </strong>
                  </h3>
                  <br />
                  <span style={{ color: "#fff" }}>
                    “As a small business, you don’t always have access to the
                    best agencies at the right budget and so you turn to
                    freelancers. Air Teams takes away the hassle of speaking to
                    hundreds of freelancers and spending time on tens of
                    discussions. Their smart recommendations have always matched
                    me with the right professional for a range of projects,
                    saving precious business resources.”
                  </span>
                  <div className="message-avatar margin-top-25">
                    <i className="status-online" />
                    <img src="images/user-avatar-small-03.jpg" alt="" />
                    <b>Amit Taneja</b>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* The Air Teams Guarantee end */}

      {/* Success Stories on The Air Teams start */}
      <div
        className="section"
        style={{
          backgroundColor: "#efefef73",
          padding: "65px 0",
          paddingTop: "20px"
        }}
      >
        <div className="container homeSuccess-photo-box">
          <div className="row margin-top-65">
            {/* Section Headline */}
            <div className="col-xl-12">
              <div className="section-headline centered margin-top-0 margin-bottom-45">
                <h3>Success Stories on The Air Teams</h3>
                <p style={{ fontSize: "16px" }}>
                  Inspiring cases studies that went beyond the project brief.
                </p>
              </div>
            </div>
            <div className="col-xl-5 col-md-6 offset-xl-1">
              {/* Photo Box */}
              <a href="#" className="photo-box" style={{ height: "570px" }}>
                <img src="images/home_image_8.png" style={{ width: "100%" }} />
                <div className="photo-box-content">
                  <center style={{ fontSize: "12px" }}>Client</center>
                  <h3 style={{ fontSize: "18px" }}>
                    Building strong relations through an effective social media
                    strategy
                  </h3>
                  <span className="blog-post-date" style={{ fontSize: "12px" }}>
                    May 13, 2019 by{" "}
                    <label style={{ color: "#54c4c3" }}>Allison Fox</label>
                  </span>
                  <p>
                    Sed ut perspiciatis unde omnis iste natus error sit
                    voluptatem accusantium doloremque laudantium, totam rem
                    aperiam, eaque
                  </p>
                </div>
              </a>
            </div>
            <div className="col-xl-5 col-md-6">
              {/* Photo Box */}
              <a href="#l" className="photo-box" style={{ height: "570px" }}>
                <img
                  src="images/home_image_9.png"
                  alt=""
                  style={{ width: "100%" }}
                />
                <div
                  className="photo-box-content"
                  style={{ marginTop: "-75px" }}
                >
                  <center style={{ fontSize: "12px" }}>Client</center>
                  <h3 style={{ fontSize: "18px" }}>
                    Establishing brand ethos with a strong line of communication
                  </h3>
                  <span className="blog-post-date" style={{ fontSize: "12px" }}>
                    May 13, 2019 by{" "}
                    <label style={{ color: "#54c4c3" }}>Allison Fox</label>
                  </span>
                  <p>
                    Sed ut perspiciatis unde omnis iste natus error sit
                    voluptatem accusantium doloremque laudantium, totam rem
                    aperiam, eaque
                  </p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Success Stories on The Air Teams end */}

      <div className="row3 section" style={{ backgroundColor: "#5dbbc7" }}>
        <div className="container">
          <div className="row margin-top-65 margin-bottom-65">
            <div className="row">
              <div className="col-xl-5 col-md-5">
                <div className="col-xl-12">
                  <div className="section-headline centered margin-top-0 margin-bottom-45">
                    <h3 style={{ color: "#fff" }}>If you are a client</h3>
                    <p style={{ fontSize: "16px" }}>
                      Find the best talent for the job and complete projects
                      hassle-free.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-2">
                <div className="vl" />
              </div>
              <div className="col-xl-5 col-md-5">
                <div className="col-xl-12">
                  <div className="section-headline centered margin-top-0 margin-bottom-45">
                    <h3 style={{ color: "#fff" }}>If you are a creator</h3>
                    <p style={{ fontSize: "16px" }}>
                      Get opportunities that match your skill sets and earn
                      deserving rewards for your efforts.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>
        {
          "\
          .modal-box { max-width: 358px !important;text-align:center;cursor:pointer}\
        "
        }
      </style>
      <Modal ref={mdlConfidentiality}>
        <i
          className="icon-line-awesome-close"
          onClick={closeConfMdl}
          style={{ float: "right", color: "#666", fontWeight: 600 }}
        ></i>
        <div
          className="categories-container margin-bottom-15 margin-top-50"
          style={{ display: "block" }}
        >
          <img src="images/icons/shield.png" />

          <h5
            className="margin-top-10"
            style={{ fontWeight: 600, lineHeight: 1.45, fontSize: "22px" }}
          >
            Confidentiality
          </h5>
          <p
            style={{ fontSize: "14px", lineHeight: 1.43, fontWeight: "normal" }}
          >
            We understand privacy is important to you and maintaining the
            confidentiality of your data is our priority. Rest assured none of
            the project details entered will be saved until you log in to your
            Air Teams account. Once you log in, Your project details will remain
            confidential and secure on our servers.
          </p>

          <a
            className="margin-top-15 margin-bottom-15"
            href=""
            style={{
              display: "block",
              color: "#2dbdc9",
              textDecoration: "underline",
              lineHeight: "1.78",
              fontWeight: 500
            }}
          >
            Visit Privacy Page
          </a>
          <Link to="/postProject">
            <button
              className="button ripple-effect margin-top-10"
              style={{ width: "100%", fontSize: "16px", fontWeight: "600" }}
            >
              Got It
            </button>
          </Link>
        </div>
      </Modal>
    </>
  );
}

export default NewHome;
