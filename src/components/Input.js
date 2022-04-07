import React from "react";

const Input = (props) => {
  const {
    inputRef,
    id,
    label,
    labelSize,
    frmField,
    err,
    errMessage,
    ...others
  } = props;
  const classSize = `col-sm-${labelSize ? labelSize : 3} col-form-label`;
  const classInput = `form-control ${err ? "is-invalid" : ""}`;
  return (
    <div className="row mb-3">
      <label htmlFor={id} className={classSize}>
        {label}
      </label>
      <div className="col-sm">
        {others["rows"] ? (
          <textarea
            className={classInput}
            id={id}
            label={label}
            {...others}
            {...frmField}
          ></textarea>
        ) : (
          <input
            className={classInput}
            autoComplete="off"
            ref={inputRef}
            id={id}
            label={label}
            {...others}
            {...frmField}
          />
        )}
        {err ? <div className="invalid-feedback">{errMessage}</div> : ""}
      </div>
    </div>
  );
};

export default Input;
