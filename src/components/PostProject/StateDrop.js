import React from "react";

const StateDrop = ({ label, options, ...others }) => (
  <>
    <select {...others}>
      <option key={"99999999"}>Select...</option>
      {options.map(([value, name]) => (
        <option key={value} value={value}>
          {name}
        </option>
      ))}
    </select>
  </>
);

export default StateDrop;
