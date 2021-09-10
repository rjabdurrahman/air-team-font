import Page2 from "./Test/Page2";
import Page1 from "./Test/Page1";

// Add
const Sidebar = [
  {
    to: "",
    icon: "icon-material-outline-dashboard",
    label: "Dashboard",
    url_name: "creator-dash"
  },
  {
    to: "/messages",
    icon: "icon-material-outline-question-answer",
    label: "Messages"
    // url_name: "message",
    // component: <Page2 />
  },
  {
    to: "/projects",
    icon: "icon-material-outline-business-center",
    label: "Projects"
    // url_name: "projects",
    // component: <Page1 />
  },
  {
    to: "/profile",
    icon: "icon-material-outline-assignment",
    label: "My Profile"
    // url_name: "profile",
    // component: <Page2 />
  },
  {
    to: "/settings",
    icon: "icon-material-outline-settings",
    label: "Settings"
    // url_name: "settings",
    // component: <Page1 />
  },
  {
    to: "/logout",
    icon: "icon-material-outline-power-settings-new",
    label: "Logout",
    url_name: "logout"
  }
];
export default Sidebar;
