import React from "react";
import PropTypes from "prop-types";
const Inputs = (props) => {
  const { id, type, frmField, err, errMessage, ...others } = props;
  const classInput = `form-control ${err ? "is-invalid" : ""}`;
  return (
    <>
      {others["rows"] ? (
        <textarea
          className={classInput}
          id={id}
          {...others}
          {...frmField}
        ></textarea>
      ) : (
        <input
          className={classInput}
          autoComplete="off"
          id={id}
          {...others}
          {...frmField}
        />
      )}
      {err ? <div className="invalid-feedback">{errMessage}</div> : ""}
    </>
  );
};

Inputs.propTypes = {
  type: PropTypes.oneOf(["text", "url", "email", "number", "password"]),
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  frmField: PropTypes.object,
  err: PropTypes.string,
  errMessage: PropTypes.string,
};

export default Inputs;
