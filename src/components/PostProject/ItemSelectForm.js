import React from "react";
// const options = [
//   { value: "1", label: "Industry 1" },
//   { value: "2", label: "Industry 2" },
//   { value: "3", label: "Industry 3" },
//   { value: "4", label: "Industry 4" },
//   { value: "5", label: "Industry 5" },
//   { value: "6", label: "Industry 6" }
// ];

const ItemSelectForm = ({ label, options, ...others }) => (
  <>
    <select {...others}>
      {options.map(([value, name]) => (
        <option value={value}>{name}</option>
      ))}
    </select>
  </>
);

export default ItemSelectForm;
