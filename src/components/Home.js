import React from "react";

function Home(props) {
  return (
    <div>
      {/* Intro Banner
================================================== */}
      {/* add class "disable-gradient" to enable consistent background overlay */}
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
                    Find On-demand teams for all your business needs.
                  </strong>
                  <br />
                  <span style={{ fontSize: "16px", fontWeight: 300 }}>
                    Work Wih our reliable teams of professionals and get timely,
                    desirable results.
                  </span>
                </h3>
                <button
                  style={{ marginTop: "105px" }}
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
              <ul className="intro-stats " style={{ color: "#fff" }}>
                <li>
                  <div className="col-md-2">Logo Design</div>
                </li>
                <li>
                  <div className="col-md-2">Landing Pages</div>
                </li>
                <li>
                  <div className="col-md-2">Website Creation</div>
                </li>
                <li>
                  <div className="col-md-2">eBooks</div>
                </li>
                <li>
                  <div className="col-md-2">Product Packaging</div>
                </li>
                <li>
                  <div className="col-md-2">Case Studies</div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* Features Cities */}
      <div className="section margin-top-65 margin-bottom-65">
        <div className="container">
          <div className="row">
            {/* Section Headline */}
            <div className="col-xl-12">
              <div className="section-headline centered margin-top-0 margin-bottom-45">
                <h3>A team for every brief</h3>
                <p style={{ fontSize: "16px" }}>
                  Work with solo experts or our terms of professionals and find
                  customised solutions to your unique business requirements.
                </p>
              </div>
            </div>
            <div className="col-xl-5 col-md-6 offset-xl-1">
              {/* Photo Box */}
              <a href="jobs-list-layout-1.html" className="photo-box">
                <div className="photo-box-content">
                  <h3>I need solo expert</h3>
                  <p>
                    Choose to work with the expert best suited to your project
                    requirements
                  </p>
                </div>
              </a>
            </div>
            <div className="col-xl-5 col-md-6">
              {/* Photo Box */}
              <a
                href="jobs-list-layout-full-page-map.html"
                className="photo-box"
              >
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
      {/* Content
================================================== */}
      <div id="titlebar" className=" intro-banner margin-bottom-0">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h2 style={{ color: "#fff", textAlign: "center" }}>
                From finding tailored teams to ensuring timely completion of the
                project, your designated Air Teams Coordinator is with you every
                step of the way.
              </h2>
            </div>
          </div>
        </div>
      </div>
      {/* Recent Blog Posts */}
      <div className="intro-banner intro-banner padding-top-0 padding-bottom-60 full-width-carousel-fix">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="blog-carousel">
                <a
                  href="pages-blog-post.html"
                  className="blog-compact-item-container"
                >
                  <div className="blog-compact-item">
                    <img src="/images/converted/light-users.jpg" alt="" />
                    <div className="blog-compact-item-content">
                      <h3>Customised Proposal</h3>
                      <p>
                        Get tailor-made proposals best suited to your specific
                        requirements from our Air Team Coordinator
                      </p>
                    </div>
                  </div>
                </a>
                <a
                  href="pages-blog-post.html"
                  className="blog-compact-item-container"
                >
                  <div className="blog-compact-item">
                    <img src="/images/converted/light-users.jpg" alt="" />
                    <div className="blog-compact-item-content">
                      <h3>Comprehensive Management</h3>
                      <p>
                        Let our Air Teams Coordinator track the progress of your
                        projects and ensure uninterrupted, seamless completion
                      </p>
                    </div>
                  </div>
                </a>
                <a
                  href="pages-blog-post.html"
                  className="blog-compact-item-container"
                >
                  <div className="blog-compact-item">
                    <img src="/images/converted/light-users.jpg" alt="" />
                    <div className="blog-compact-item-content">
                      <h3>Grievance Redressal</h3>
                      <p>
                        Receive timely help from our Air Teams coordinator on
                        any issues you may face during your project completion
                        journey
                      </p>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Recent Blog Posts / End */}
      {/* Content
================================================== */}
      {/* Category Boxes */}
      <div className="section margin-top-65">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="section-headline centered margin-bottom-15">
                <h3 style={{ fontWeight: 300 }}>How it works</h3>
              </div>
              {/* Tabs Container */}
              <div className="tabs">
                <div className="tabs-header" style={{ background: "none" }}>
                  <ul>
                    <li className="active">
                      <a href="#tab-1" data-tab-id={1}>
                        For Client
                      </a>
                    </li>
                    <li>
                      <a href="#tab-2" data-tab-id={2}>
                        For Freelancer
                      </a>
                    </li>
                  </ul>
                  <div className="tab-hover" />
                </div>
                {/* Tab Content */}
                <div className="tabs-content">
                  <div className="tab active" data-tab-id={1}>
                    <div className="row">
                      <div className="col-xl-6 col-md-6">
                        <div className="numbered color">
                          <ol>
                            <li>
                              <h3 style={{ fontWeight: 600 }}>
                                Post a brief for free
                              </h3>
                              <p>
                                Describe your project and we will connect you
                                with top talent
                              </p>
                            </li>
                            <li>
                              <h3 style={{ fontWeight: 600 }}>
                                Select the best proposal
                              </h3>
                              <p>
                                Go ahead with the proposal with the best
                                suitable milestones
                              </p>
                            </li>
                            <li>
                              <h3 style={{ fontWeight: 600 }}>
                                Kickstart project and collaborate on chat
                              </h3>
                              <p>
                                Discuss, collaborate and give your feedback on
                                chat
                              </p>
                            </li>
                            <li>
                              <h3 style={{ fontWeight: 600 }}>Pay Securely</h3>
                              <p>
                                Pay only on approving and receiving milestone
                                deliverables
                              </p>
                            </li>
                          </ol>
                        </div>
                      </div>
                      <div
                        className="col-xl-6 col-md-6"
                        style={{
                          borderRadius: "4px",
                          boxShadow: "0 0 25px rgb(0 0 0 / 10%)",
                          display: "flex",
                          backgroundImage:
                            'url("images/converted/EmptyState.png")',
                          backgroundRepeat: "no-repeat",
                          backgroundSize: "cover",
                          backgroundPosition: "top center"
                        }}
                      ></div>
                    </div>
                    {/* row end*/}
                  </div>
                  <div className="tab" data-tab-id={2}>
                    <div className="row">
                      <div className="col-xl-6 col-md-6">
                        <div className="numbered color">
                          <ol>
                            <li>
                              <h3 style={{ fontWeight: 600 }}>
                                1 Post a brief for free
                              </h3>
                              <p>
                                Describe your project and we will connect you
                                with top talent
                              </p>
                            </li>
                            <li>
                              <h3 style={{ fontWeight: 600 }}>
                                2 Select the best proposal
                              </h3>
                              <p>
                                Go ahead with the proposal with the best
                                suitable milestones
                              </p>
                            </li>
                            <li>
                              <h3 style={{ fontWeight: 600 }}>
                                Kickstart project and collaborate on chat
                              </h3>
                              <p>
                                Discuss, collaborate and give your feedback on
                                chat
                              </p>
                            </li>
                            <li>
                              <h3 style={{ fontWeight: 600 }}>Pay Securely</h3>
                              <p>
                                Pay only on approving and receiving milestone
                                deliverables
                              </p>
                            </li>
                          </ol>
                        </div>
                      </div>
                      <div
                        className="col-xl-6 col-md-6"
                        style={{
                          borderRadius: "4px",
                          boxShadow: "0 0 25px rgb(0 0 0 / 10%)",
                          display: "flex",
                          backgroundImage:
                            'url("images/converted/EmptyState.png")',
                          backgroundRepeat: "no-repeat !important",
                          backgroundSize: "cover !important",
                          backgroundPosition: "top center !important"
                        }}
                      ></div>
                    </div>
                    {/* row end*/}
                  </div>
                </div>
              </div>
              {/* Tabs Container / End */}
            </div>
          </div>
        </div>
      </div>
      {/* Category Boxes / End */}
    </div>
  );
}

export default Home;
