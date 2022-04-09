import React from "react";

const Checkbox = (props) => {
  const { type, id, label, err, ...others } = props;

  return (
    <>
      <div className="form-check form-check-inline">
        <input
          className="form-check-input"
          type={type}
          id={id}
          label={label}
          {...others}
        />
        <label className="form-check-label" htmlFor={id}>
          {label}
        </label>
      </div>
    </>
  );
};

export default Checkbox;
