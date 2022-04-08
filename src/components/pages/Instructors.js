import React, { useState, useEffect } from "react";
import instructorService from "./../../services/instructorService";
import Input from "./../Input";
import { Button, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { useFormik, Field, Form } from "formik";
import * as Yup from "yup";
const Instructor = () => {
  const [instructors, setinstructors] = useState([]);

  const loadData = () => {
    instructorService.list().then((res) => {
      console.log(res.data);
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
                  onClick={handleShow}
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
                    <tr key={instructor.id}>
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

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {formik.values.id === 0 ? "News" : "Edit"} Major
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Input
              id="txtMajor"
              label="Intructor ID"
              type="text"
              required
              frmField={formik.getFieldProps("name")}
              err={formik.touched.name && formik.errors.name}
              errMessage={formik.errors.name}
            />
            <Input
              id="phone"
              label="Phone"
              type="text"
              required
              placeholder="Phone number"
              frmField={formik.getFieldProps("phone")}
              err={formik.touched.phone && formik.errors.phone}
              errMessage={formik.errors.phone}
            />
            <Input
              id="phone"
              label="Phone"
              type="text"
              placeholder="Email address"
              frmField={formik.getFieldProps("email")}
              err={formik.touched.email && formik.errors.email}
              errMessage={formik.errors.email}
            />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            disabled={!formik.dirty || !formik.isValid}
            onClick={formik.handleSubmit}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Instructor;
