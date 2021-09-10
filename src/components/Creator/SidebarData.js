const SidebarData = {
  Start: {
    Dashboard: {
      to: "",
      icon: "icon-material-outline-dashboard",
      label: "Dashboard",
      url_name: "creator-dash"
    },
    Proposal: {
      to: "/submit_proposal",
      icon: "icon-feather-check-circle",
      label: "Submit Proposal",
      url_name: "/submit_proposal"
    },
    Projects: {
      to: "/projects",
      icon: "icon-material-outline-business-center",
      label: "Projects",
      submenu: {
        Pending: {
          to: "/pending_projects",
          icon: "icon-material-outline-business-center",
          label: "Pending Projects"
        },
        Ongoing: {
          to: "/ongoing_projects",
          icon: "icon-material-outline-business-center",
          label: "Ongoing Projects"
        },
        Completed: {
          to: "/completed_projects",
          icon: "icon-material-outline-business-center",
          label: "Completed Projects"
        }
      }
    },
    Messages: {
      to: "/messages",
      icon: "icon-material-outline-question-answer",
      label: "Messages"
    }
  },
  Account: {
    Profile: {
      to: "/profile",
      icon: "icon-material-outline-assignment",
      label: "My Profile"
    },
    Settings: {
      to: "/settings",
      icon: "icon-material-outline-settings",
      label: "Settings"
    }
  }
};

// Add
// const SidebarData = [
//   {
//     to: "",
//     icon: "icon-material-outline-dashboard",
//     label: "Dashboard",
//     url_name: "creator-dash"
//   },
//   {
//     to: "/messages",
//     icon: "icon-material-outline-question-answer",
//     label: "Messages"
//     // url_name: "message",
//     // component: <Page2 />
//   },
//   {
//     to: "/projects",
//     icon: "icon-material-outline-business-center",
//     label: "Projects"
//     // url_name: "projects",
//     // component: <Page1 />
//   },
//   {
//     to: "/profile",
//     icon: "icon-material-outline-assignment",
//     label: "My Profile"
//     // url_name: "profile",
//     // component: <Page2 />
//   },
//   {
//     to: "/settings",
//     icon: "icon-material-outline-settings",
//     label: "Settings"
//     // url_name: "settings",
//     // component: <Page1 />
//   }
//   // {
//   //   to: "/logout",
//   //   icon: "icon-material-outline-power-settings-new",
//   //   label: "Logout",
//   //   url_name: "logout"
//   // }
// ];
export default SidebarData;
