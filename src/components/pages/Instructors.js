import React, { useState, useEffect } from "react";
import instructorService from "./../../services/instructorService";
import Input from "./../Input";
import { Button, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
const Instructor = () => {
  const [instructors, setinstructors] = useState([]);

  const loadData = () => {
    instructorService.list().then((res) => {
      //console.log(res.data);
      setinstructors(res.data);
    });
  };
  useEffect(() => {
    loadData();
  }, []);

  const formik = useFormik({
    initialValues: {
      id: 0,
      name: "",
    },
    validationSchema: Yup.object({
      id: Yup.number().required(),
      name: Yup.string().min(5, "Nhập tối thiểu 5 ký tự").required("Required"),
    }),
    onSubmit: (values) => {
      handleFormSubmit(values);
    },
  });

  const [show, setshowModal] = useState(false);

  const handleShow = () => setshowModal(true);
  const handleClose = () => setshowModal(false);

  const handleFormSubmit = (data) => {
    console.log(data);
    if (data.id === 0) {
      instructorService.add(data).then((res) => {
        if (res.errorCode === 0) {
          loadData();
          handleClose();
          toast.success("Thêm mới thành công");
        }
      });
    } else {
      instructorService.update(data.id, data).then((res) => {
        if (res.errorCode === 0) {
          loadData();
          handleClose();
          toast.success("Cập nhật thành công");
        }
      });
    }
  };

  return (
    <>
      <div className="container mt-4">
        <div className="card border-primary bt-5">
          <div className="card-header">
            <div className="row">
              <div className="col">
                <h3 className="card-title">
                  Instructor <small className="text-muted">list</small>
                </h3>
              </div>
              <div className="col-auto">
                <button
                  type="button"
                  className="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#editModal"
                >
                  <i className="bi-plus-lg"></i> Add
                </button>
              </div>
            </div>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="text-center table table-bordered border-primary table-hover table-striped">
                <thead>
                  <tr className="table-primary border-primary">
                    <th style={{ width: "50px" }}>STT</th>
                    <th>Instructor Id</th>
                    <th>Full Name</th>
                    <th>Gender</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th style={{ width: "80px" }}></th>
                  </tr>
                </thead>
                <tbody>
                  {instructors.map((instructor, idx) => (
                    <tr>
                      <td>{idx + 1}</td>
                      <td>{instructor.code}</td>
                      <td>{`${instructor.firstName} ${instructor.lastName}`}</td>
                      <td>
                        <i className="bi bi-gender-female"></i>
                      </td>
                      <td>{instructor.phone}</td>
                      <td>{instructor.email}</td>
                      <td>
                        <a href="/">
                          <i className="bi-pencil-square text-primary"></i>
                        </a>
                        <a href="/">
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
                New Student
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
                  <Input
                    id="txtMajor"
                    label="Major Name"
                    type="text"
                    frmField={formik.getFieldProps("name")}
                    err={formik.touched.name && formik.errors.name}
                    errMessage={formik.errors.name}
                  />
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
};

export default Instructor;
