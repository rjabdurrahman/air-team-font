import React from "react";

const ItemForm = ({
  label,
  children,
  type = "text",
  id = "",
  placeholder,
  ...otherProps
}) => (
  <>
    {type === "text" || type === "date" ? (
      <>
        <input type={type} {...otherProps} placeholder={placeholder} />
      </>
    ) : (
      <>
        {/* <div className="col-md-4">
          <input type={type} id={id} {...otherProps} />
          <label htmlFor={id}>{label}</label>
        </div> */}

        <div className="col-md-4 col-sm-6">
          <input type={type} {...otherProps} id={id} />
          <label className="postChkRdo" htmlFor={id}>
            {label}
          </label>
        </div>
      </>
    )}
  </>
);

export default ItemForm;
