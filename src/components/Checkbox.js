import React from "react";

const Checkbox = (props) => {
  const { type, id, label, frmField, err, errMessage, ...others } = props;

  return (
    <>
      <div className="form-check form-check-inline">
        <input
          className="form-check-input"
          type={type}
          id={id}
          label={label}
          {...others}
          {...frmField}
        />
        <label className="form-check-label" htmlFor={id}>
          {label}
        </label>
      </div>
      {err ? <div className="invalid-feedback">{errMessage}</div> : ""}
    </>
  );
};

export default Checkbox;
