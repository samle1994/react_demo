import React from "react";
import PropTypes from "prop-types";
import Validators from "./../helpers/propTypeValidators";

const Input = (props) => {
  const {
    inputRef,
    id,
    type,
    label,
    labelSize,
    required,
    frmField,
    err,
    errMessage,
    ...others
  } = props;
  const classSize = `col-sm-${labelSize ? labelSize : 3} col-form-label`;
  const classInput = `form-control ${err ? "is-invalid" : ""}`;
  const htmlrequired = `${required ? "*" : ""}`;
  return (
    <div className="row mb-3">
      <label htmlFor={id} className={classSize}>
        {label} <span className="text-danger">{htmlrequired}</span>
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
            type={type}
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

Input.propTypes = {
  type: PropTypes.oneOf(["text", "url", "email", "number", "password"]),
  inputRef: PropTypes.object,
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  label: PropTypes.string.isRequired,
  labelSize: Validators.numberBetween(1, 12),
  required: PropTypes.bool,
  frmField: PropTypes.object,
  err: PropTypes.string,
  errMessage: PropTypes.string,
};

export default Input;
