import React from "react";

const ItemTextareaForm = ({
  label,
  children,
  type = "text",
  id = "",
  placeholder = "",
  ...otherProps
}) => (
  <>
    <textarea {...otherProps} placeholder={placeholder} />
  </>
);

export default ItemTextareaForm;
