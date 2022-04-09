import React from "react";

const Inputs = (props) => {
  const { id, frmField, err, errMessage, ...others } = props;
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

export default Inputs;
