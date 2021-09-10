import React from "react";
import "react-notifications/lib/notifications.css";
import "./App.css";

import MainRoutes from "./utils/MainRoutes";

import Header from "./components/Header";
import Footer from "./components/Footer";

import { BrowserRouter as Router } from "react-router-dom";
import { NotificationContainer } from "react-notifications";

import { UserContext } from "./_hooks/UserContext";
import useFindUser from "./_hooks/useFindUser";

function App() {
  const { user, setUser } = useFindUser();
  // console.log("user in app", user);
  return (
    <Router>
      <UserContext.Provider value={{ user, setUser }}>
        <div id="wrapper">
          <NotificationContainer />
          <Header />
          <MainRoutes />
          <Footer />
        </div>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
