import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import majorService from "./../../services/majorService";
import { Button, Modal } from "react-bootstrap";

const MajorEdit = () => {
  const [major, setmajors] = useState({ id: 0, name: "" });
  const param = useParams();

  useEffect(
    function () {
      setmajors({ ...major, id: Number(param.id).valueOf() });
    },
    [param.id]
  );
  const [message, setmessage] = useState();

  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/major");
  };
  const handelChange = (e) => {
    const newData = { ...major };
    newData[e.target.name] = e.target.value;
    setmajors(newData);
  };

  useEffect(() => {
    if (param.id > 0) {
      majorService.get(param.id).then((res) => {
        setmajors(res.data);
      });
    }
  }, [param.id]);

  const handelSave = () => {
    if (major.id === 0) {
      majorService.add(major).then((res) => {
        //console.log(res);
        if (res.errorCode === 0) navigate("/major");
        else setmessage(res.message);
      });
    } else {
      majorService.update(major.id, major).then((res) => {
        //console.log(res);
        if (res.errorCode === 0) navigate("/major");
        else setmessage(res.message);
      });
    }
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
                <p className="text-danger text-center">{message}</p>
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
                        onChange={(e) => handelChange(e)}
                        className="form-control"
                        name="name"
                        defaultValue={major.name}
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
                  onClick={handelSave}
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
