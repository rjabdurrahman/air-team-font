import React from "react";
import ReactTooltip from "react-tooltip";

const ItemForm = ({
  label,
  children,
  type = "text",
  id = "",
  placeholder,
  imgName = "1",
  ...otherProps
}) => (
  <>
    {type === "text" || type === "date" ? (
      <>
        <input
          className="form-control"
          type={type}
          {...otherProps}
          placeholder={placeholder}
          style={{ color: "#3a3a3c !important" }}
        />
      </>
    ) : (
      <>
        <div
          className="col-md-4 col-sm-6 col-xs-6"
          style={{ marginLeft: 0, paddingLeft: 0 }}
        >
          <input type={type} id={id} {...otherProps} />

          <label
            htmlFor={id}
            style={{
              color: "#001626",
              fontSize: "13px",
              fontWeight: "bold"
            }}
          >
            <img
              src={`./images/icons/${imgName}month.png`}
              width="10px"
              style={{
                width: "43px",
                padding: "5px",
                border: "solid 0.5px #a5a5a6",
                borderRadius: "3.8px",
                display: "block",
                margin: "0 auto",
                marginBottom: "10px"
              }}
            />
            {label}
          </label>
        </div>
      </>
    )}
  </>
);

export default ItemForm;
