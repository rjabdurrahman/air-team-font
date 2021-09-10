import React, { useEffect } from "react";
import { useForm, useStep } from "react-hooks-helper";
import Welcome from "./Welcome";
import SkillsetPricing from "./SkillsetPricing";
import WorkDetails from "./WorkDetails";
import PersonalDetails from "./PersonalDetails";
import VerificationDetails from "./VerificationDetails";
import Review from "./Review";
import axios from "axios";
import SubmitedProfile from "../../../pages/Creator/Profile/SubmitedProfile";

const steps = [
  { id: "Welcome" },
  { id: "PersonalDetails" },
  { id: "SkillsetPricing" },
  { id: "WorkDetails" },
  { id: "VerificationDetails" },
  { id: "Review" },
  { id: "SubmitedProfile" }
];

var defaultData = {
  skillsets: "",
  selected_skillsets: [],
  rate_type: "",
  selected_prices: [],
  work_mode: "",
  work_exp: [],
  projects: [],
  portfolio_link: [],
  attachments: [],
  personal_details: {
    name: "",
    profile_image: "",
    description: "",
    profile: {}
  },
  verification_Details: {
    document_type: "",
    document: {}
  }
};

// get skillsets data
axios
  .get(
    process.env.REACT_APP_API_BASE_URL +
      "/creator/profile/skillsets/" +
      localStorage.getItem("USER_ID")
  )
  .then(res => {
    if (res.data.status) {
      defaultData.skillsets = res.data.SkillSet.category.id;
      defaultData.selected_prices = res.data.SkillSet.skillset_prices;
      defaultData.rate_type = res.data.SkillSet.rate_type;
      defaultData.selected_prices.forEach(mySkills => {
        defaultData.selected_skillsets.push({
          id: mySkills.id,
          name: mySkills.skill_name
        });
      });
    }
  });

// get work Details
axios
  .get(
    process.env.REACT_APP_API_BASE_URL +
      "/creator/profile/workdetails/" +
      localStorage.getItem("USER_ID")
  )
  .then(res => {
    if (res.data.status) {
      defaultData.work_mode = res.data.workDetails.work_mode;
      defaultData.work_exp = res.data.workDetails.work_exp;
      defaultData.portfolio_link = res.data.workDetails.portfolio_link;
    }
  });

// get Project Details
axios
  .get(
    process.env.REACT_APP_API_BASE_URL +
      "/creator/profile/projectdetails/" +
      localStorage.getItem("USER_ID")
  )
  .then(res => {
    if (res.data.status) {
      defaultData.projects = res.data.projectDetails;
    }
  });

// // get Personal Details
// axios
//   .get(
//     process.env.REACT_APP_API_BASE_URL +
//       "/creator/profile/personaldetails/" +
//       localStorage.getItem("USER_ID")
//   )
//   .then(res => {
//     if (res.data.status) {
//       defaultData.personal_details = res.data.personalDetails[0];
//       defaultData.personal_details = {
//         name: res.data.personalDetails[0].name,
//         description: res.data.personalDetails[0].description,
//         profile: res.data.personalDetails[0].profile_image
//       };
//     }
//   });

// get verification details
axios
  .get(
    process.env.REACT_APP_API_BASE_URL +
      "/creator/profile/verificationdetails/" +
      localStorage.getItem("USER_ID")
  )
  .then(res => {
    if (res.data.status) {
      defaultData.verification_Details = res.data.verificationDetails[0];
    }
  });

const Profile = ({ images }) => {
  // console.log("defaultData ", defaultData);

  const [formData, setForm] = useForm(defaultData);
  const { step, navigation } = useStep({
    initialStep: 0,
    steps
  });
  var { id } = step;

  const props = {
    formData,
    setForm,
    navigation
  };

  // console.log("id", id);

  switch (id) {
    case "Welcome":
      return <Welcome {...props} />;
    case "SkillsetPricing":
      return <SkillsetPricing {...props} />;
    case "WorkDetails":
      return <WorkDetails {...props} />;
    case "PersonalDetails":
      return <PersonalDetails {...props} />;
    case "VerificationDetails":
      return <VerificationDetails {...props} />;
    case "Review":
      return <Review {...props} />;
    case "SubmitedProfile":
      return <SubmitedProfile {...props} />;

    default:
      return null;
  }
};

export default Profile;
