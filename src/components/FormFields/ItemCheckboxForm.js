import React from "react";

const ItemCheckboxForm = ({
  label,
  children,
  type = "text",
  id = "",
  placeholder,
  ...otherProps
}) => (
  <>
    <input type="checkbox" id={id} {...otherProps} />
    <label className="whatever" htmlFor={id}>
      {label}
    </label>
  </>
);

export default ItemCheckboxForm;
