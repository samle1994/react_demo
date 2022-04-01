import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const MajorEdit = () => {
  const [id, setid] = useState("0");

  useEffect(function () {
    const lastindex = window.location.href.lastIndexOf("/");
    setid(window.location.href.substring(lastindex + 1));
  }, []);

  const navigate = useNavigate();

  const Back = () => {
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
                  {id == 0 ? "News" : "Edit"} Major
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
                  onClick={Back}
                >
                  Back
                </button>
                <button type="button" className="btn btn-primary">
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
