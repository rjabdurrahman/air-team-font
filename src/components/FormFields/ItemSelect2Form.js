import React from "react";
import Select from "react-select";

const ItemSelect2Form = ({ label, options, name, ...others }) => (
  <>
    <Select options={options} name="more_skillsets" {...others} />
  </>
);

export default ItemSelect2Form;
