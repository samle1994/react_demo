import React, { Component } from "react";

class Input extends Component {
  state = {};
  render() {
    const { inputRef, id, label, labelSize, ...others } = this.props;
    const classSize = `col-sm-${labelSize ? labelSize : 3} col-form-label`;
    return (
      <div className="row mb-3">
        <label htmlFor={id} className={classSize}>
          {label}
        </label>
        <div className="col-sm">
          {others["rows"] ? (
            <textarea
              className="form-control"
              id={id}
              label={label}
              {...others}
            ></textarea>
          ) : (
            <input
              className="form-control"
              ref={inputRef}
              id={id}
              label={label}
              {...others}
            />
          )}
        </div>
      </div>
    );
  }
}

export default Input;
