import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import majorService from "./../../services/majorService";
import { Button, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { Formik } from "formik";
import * as Yup from "yup";
function Major() {
  const navigate = useNavigate();

  const [majors, setmajors] = useState([]);

  const loadData = () => {
    majorService.list().then((res) => setmajors(res.data));
  };

  // const showEditPage = (e, id) => {
  //   e.preventDefault();
  //   return navigate(`/major/${id}`);
  // };
  useEffect(() => {
    loadData();
  }, []);

  const [show, setshowModal] = useState(false);

  const handleShow = () => setshowModal(true);
  const handleClose = () => setshowModal(false);

  const handelDelete = (e, id) => {
    e.preventDefault();
    console.log(id);
    majorService.remove(id).then((res) => {
      if (res.errorCode === 0) {
        loadData();
        toast.success("Xoá thành công");
      } else {
        toast.success("Xoá thất bại");
      }
    });
  };
  const [major, setmajor] = useState({ id: 0, name: "" });

  const handelChange = (e) => {
    const newData = { ...major };
    newData[e.target.name] = e.target.value;
    setmajor(newData);
  };

  const showModalHandler = (e, id) => {
    if (e) e.preventDefault();
    if (id > 0) {
      majorService.get(id).then((res) => {
        setmajor(res.data);
        handleShow();
      });
    } else {
      setmajor({ id: 0, name: "" });
      handleShow();
    }
  };

  const handelSave = () => {
    if (major.id === 0) {
      majorService.add(major).then((res) => {
        if (res.errorCode === 0) {
          loadData();
          handleClose();
          toast.success("Thêm mới thành công");
        }
      });
    } else {
      majorService.update(major.id, major).then((res) => {
        if (res.errorCode === 0) {
          loadData();
          handleClose();
          toast.success("Cập nhật thành công");
        }
      });
    }
  };

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Required"),
      lastName: Yup.string()
        .max(20, "Must be 20 characters or less")
        .required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{major.id === 0 ? "News" : "Edit"} Major</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            className="form-control"
            name="name"
            onChange={(e) => handelChange(e)}
            defaultValue={major.name}
            id="txtMajor"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handelSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="container mt-4">
        <div className="card border-primary bt-5">
          <div className="card-header">
            <div className="row">
              <div className="col">
                <h3 className="card-title">
                  Major <small className="text-muted">list</small>
                </h3>
              </div>
              <div className="col-auto">
                <button
                  type="button"
                  className="btn btn-primary"
                  variant="primary"
                  onClick={(e) => showModalHandler(e, 0)}
                >
                  <i className="bi-plus-lg"></i> Add
                </button>
              </div>
            </div>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-bordered border-primary table-hover table-striped">
                <thead>
                  <tr className="table-primary border-primary">
                    <th style={{ width: "50px" }}>#</th>
                    <th>Major Name</th>
                    <th style={{ width: "80px" }}></th>
                  </tr>
                </thead>
                <tbody>
                  {majors.map((major, idx) => (
                    <tr key={major.id}>
                      <td>{idx + 1}</td>
                      <td>{major.name}</td>
                      <td>
                        <a
                          href="/"
                          onClick={(e) => showModalHandler(e, major.id)}
                        >
                          <i className="bi-pencil-square text-primary"></i>
                        </a>
                        <a href="/" onClick={(e) => handelDelete(e, major.id)}>
                          <i className="bi-trash text-danger"></i>
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="editModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                New Major
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group row">
                  <label htmlFor="txtMajor" className="col-sm-3 col-form-label">
                    Major name
                  </label>
                  <div className="col-sm-9">
                    <input type="text" className="form-control" id="txtMajor" />
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Major;
