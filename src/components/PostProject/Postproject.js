import React, { useEffect } from "react";
import { useForm, useStep } from "react-hooks-helper";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import Step5 from "./Step5";
import Step6 from "./Step6";
import Step7 from "./Step7";
import Step8 from "./Step8";

import "./style.css";

const steps = [
  { id: "Step1" },
  { id: "Step2" },
  // { id: "Step3" },
  { id: "Step4" },
  { id: "Step5" },
  // { id: "Step6" },
  // { id: "Step7" },
  { id: "Step8" }
];

// var categories = {};

var defaultData = {
  master: {
    // categories: categories,
    categories: {
      1: "Digital Marketing",
      2: "Graphic Design",
      3: "Music & Audio",
      4: "Programming & development",
      5: "Video & Animation",
      6: "Content Writing"
    },
    projectTypes: {
      1: "Single Creator",
      2: "Team Of Creator",
      3: "I'm Not sure yet."
    },
    skillsets: {
      1: {
        1: "1:skillsets",
        2: "2:skillsets",
        3: "3:skillsets"
      },
      2: {
        5: "5:skillsets",
        6: "6:skillsets",
        7: "7:skillsets"
      },
      3: {
        8: "5:skillsets",
        9: "9:skillsets",
        10: "10:skillsets"
      }
    },
    industries: [
      [0, "Industry 1"],
      [1, "Industry 2"],
      [2, "Industry 3"],
      [3, "Industry 4"],
      [4, "Industry 5"],
      [5, "Industry 6"],
      [6, "Industry 7"]
    ],
    timeline: {
      1: "< 1 Month",
      2: "1-3 Months",
      3: "3-6 Months",
      4: "6-12 Months",
      5: "Custom Dates"
    },
    budgets: {
      1: "Small project ($750-$1,500)",
      2: "Medium project ($1,500-$3,000)",
      3: "Large project ($3,000+)",
      4: "I'm not sure yet"
    },
    otherProjectOptions: [
      { id: 1, name: "App" },
      { id: 2, name: "Social Media Creatives" },
      { id: 3, name: "Digital Advertising" }
    ]
  },
  category_id: "",
  other_project: {},
  skillsets: {},
  more_skillsets: "",
  industry_id: "",
  selectedIndustry: { id: "", label: "", value: "" },
  project_title: "",
  project_description: "",
  project_type: "",
  timeline: "",
  from_date: "",
  to_date: "",
  budget: "",
  categories: [],
  subCategories: [],
  supportingDoc: [],
  referenceDoc: [],
  switchChecked: [],
  teamSuggestion: []
};

if (localStorage.getItem("POST_PROJECT")) {
  defaultData = JSON.parse(localStorage.getItem("POST_PROJECT"));
}

// console.log(defaultData);
const Postproject = ({ images }) => {
  const [formData, setForm] = useForm(defaultData);
  const { step, navigation } = useStep({ initialStep: 0, steps });
  const { id } = step;

  const props = { formData, setForm, navigation };

  switch (id) {
    case "Step1":
      return (<>
        <Step1 {...props} />
        <Step2 {...props} />
      </>);
    case "Step2":
      return <Step2 {...props} />;
    case "Step3":
      return <Step3 {...props} />;
    case "Step4":
      return <Step4 {...props} />;
    case "Step5":
      return <Step5 {...props} />;
    case "Step6":
      return <Step6 {...props} />;
    case "Step7":
      return <Step7 {...props} />;
    case "Step8":
      return <Step8 {...props} />;
    default:
      return null;
  }
};

export default Postproject;
