import React from "react";
import PrivateRoute from "../utils/PrivateRoute";
import CreatorRoute from "./CreatorRoute";

import { BrowserRouter, Route, Switch } from "react-router-dom";

import NewHome from "../pages/Home/NewHome";
import Home from "../components/Home";

// import NewHome from "../pages/Home/NewHome";
import About from "../pages/Static/About";
import Sercices from "../pages/Static/Services";
import HowItWorks from "../pages/Static/HowItWorks";

// Verify and forgot password
import VerifyEmailToken from "../pages/SigninLogIn/VerifyEmailToken";
import ResetPassword from "../pages/SigninLogIn/ResetPassword";
import Postproject from "../components/PostProject/Postproject";
import PageNotFound from "../pages/PageNotFound";

// Creators
import CreatorDash from "../components/Creator/CreatorDash";
import Page33 from "../components/Creator/Test/Page33";
import Page34 from "../components/Creator/Test/Page34";
import Page35 from "../components/Creator/Test/Page35";
import Page42 from "../components/Creator/Test/Page42";
import Page43 from "../components/Creator/Test/Page43";
import Page45 from "../components/Creator/Test/Page45";
import Page38 from "../components/Creator/Test/Page38";
import Page44 from "../components/Creator/Test/Page44";
import Page47 from "../components/Creator/Test/Page47";

// Clients
import ClientDash from "../components/Client/ClientDash";
import ProjectDetails from "../components/Client/ProjectDetails";
import ProjectProposals from "../components/Client/ProjectProposals";
import ProjectProposalModal from "../pages/Client/ProjectProposal/ProjectProposalModal";
import Chat from "../components/Message/Chat";

function MainRoutes(props) {
  return (
    <Switch>
      {/* Homepage */}
      {/* Static pages */}
      <Route exact path="/" component={NewHome} />
      <Route exact path="/oldHome" component={Home} />
      <Route exact path="/about" component={About} />
      <Route exact path="/services" component={Sercices} />
      <Route exact path="/how-it-works" component={HowItWorks} />

      <Route path="/verifyUserEmail" component={VerifyEmailToken} />
      <Route path="/resetPassword" component={ResetPassword} />
      <Route path="/postProject" component={Postproject} />
      <Route path="/Page33" component={Page33} />
      <Route path="/Page34" component={Page34} />
      <Route path="/Page35" component={Page35} />
      <Route path="/Page42" component={Page42} />
      <Route path="/Page43" component={Page43} />
      <Route path="/Page45" component={Page45} />
      <Route path="/Page38" component={Page38} />
      <Route path="/Page44" component={Page44} />
      <Route path="/Page47" component={Page47} />

      {/* Creator Private Route */}
      <CreatorRoute path="/creator-dash" component={CreatorDash} />

      {/* Client Private Route */}
      <CreatorRoute path="/client-dash" component={ClientDash} />
      <CreatorRoute path="/clientdash/project/:id" component={ProjectDetails} />
      <CreatorRoute
        path="/client/project-proposals/project/:id"
        component={ProjectProposals}
      />
      <CreatorRoute
        path="/client/project-proposal/project/:id"
        component = {ProjectProposalModal} 
        />
      <CreatorRoute path="/client/chat/:message_id" component={Chat} />

      <Route component={PageNotFound} />
    </Switch>
  );
}

export default MainRoutes;
