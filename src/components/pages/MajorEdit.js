import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const MajorEdit = () => {
  const [major, setmajors] = useState({ id: 0, name: "" });
  const param = useParams();

  useEffect(
    function () {
      setmajors({ ...major, id: Number(param.id).valueOf() });
    },
    [param.id]
  );

  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/major");
  };
  const handleSave = () => {
    navigate("/major");
  };
  return (
    <>
      <div className="row justify-content-center mt-5">
        <div className="col-lg-6">
          <div className="container">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  {major.id === 0 ? "News" : "Edit"} Major
                </h5>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group row">
                    <label
                      htmlFor="txtMajor"
                      className="col-sm-3 col-form-label"
                    >
                      Major name
                    </label>
                    <div className="col-sm-9">
                      <input
                        type="text"
                        className="form-control"
                        id="txtMajor"
                      />
                    </div>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  onClick={handleBack}
                >
                  Back
                </button>
                <button
                  onClick={handleSave}
                  type="button"
                  className="btn btn-primary"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MajorEdit;
