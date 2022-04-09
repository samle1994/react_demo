import React, { useState, useEffect } from "react";
import instructorService from "./../../services/instructorService";
import Input from "./../Input";
import { Button, Modal, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import Checkbox from "./../Checkbox";
import Inputs from "./Inputs";
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
      code: "",
      gender: 1,
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
    },
    validationSchema: Yup.object({
      id: Yup.number().required(),
      code: Yup.string()
        .min(5, "Nhập tối thiểu 5 ký tự")
        .required("Bắt buộc nhập"),
      firstName: Yup.string().required("Bắt buộc nhập"),
      lastName: Yup.string().required("Bắt buộc nhập"),
      phone: Yup.number()
        .typeError("Không phải số")
        .min(6, "Nhập tối thiểu 6 số")
        .required("Bắt buộc nhập"),
      email: Yup.string().email("Định dạng email"),
    }),
    onSubmit: (values) => {
      handleFormSubmit(values);
    },
  });

  const [show, setshowModal] = useState(false);

  const handleShow = () => setshowModal(true);
  const handleClose = () => setshowModal(false);

  const [showdelete, setshowdeleteModal] = useState(false);
  const [iddel, setid] = useState();

  const handleShowdelete = (e, id) => {
    e.preventDefault();
    setid(id);
    setshowdeleteModal(true);
  };
  const handledeleteClose = () => setshowdeleteModal(false);

  const handleFormSubmit = (data) => {
    if (data.id === 0) {
      instructorService.add(data).then((res) => {
        console.log(res);
        if (res.errorCode === 0) {
          loadData();
          handleClose();
          toast.success("Thêm mới thành công");
        } else {
          toast.warning(res.message);
        }
      });
    } else {
      instructorService.update(data.id, data).then((res) => {
        if (res.errorCode === 0) {
          loadData();
          handleClose();
          toast.success("Cập nhật thành công");
        } else {
          toast.warning(res.message);
        }
      });
    }
  };

  const showModalHandler = (e, id) => {
    e.preventDefault();
    if (id > 0) {
      instructorService.get(id).then((res) => {
        formik.setValues(res.data);
        handleShow();
      });
    } else {
      formik.resetForm();
      handleShow();
    }
  };

  const deleteHandler = () => {
    instructorService.remove(iddel).then((res) => {
      if (res.errorCode === 0) {
        loadData();
        handledeleteClose();
        toast.success("Xoá thành công");
      } else {
        handledeleteClose();
        toast.warning(res.message);
      }
    });
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
                  onClick={showModalHandler}
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
                        {instructor.gender === 1 ? (
                          <i className="bi bi-gender-male"></i>
                        ) : (
                          <i className="bi bi-gender-female"></i>
                        )}
                      </td>
                      <td>{instructor.phone}</td>
                      <td>{instructor.email}</td>
                      <td>
                        <a
                          href="/"
                          onClick={(e) => showModalHandler(e, instructor.id)}
                        >
                          <i className="bi-pencil-square text-primary"></i>
                        </a>
                        <a
                          href="/"
                          onClick={(e) => handleShowdelete(e, instructor.id)}
                        >
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
            {formik.values.id === 0 ? "News" : "Edit"} Instructor
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Input
            id="instructorid"
            label="Instructor ID"
            type="text"
            required
            autoComplete="off"
            frmField={formik.getFieldProps("code")}
            err={formik.touched.code && formik.errors.code}
            errMessage={formik.errors.code}
          />
          <div className="row mb-3 d-flex align-items-center">
            <label className="col-sm-3 col-form-label">
              Full name <span className="text-danger">*</span>
            </label>
            <div className="col-sm">
              <div className="row">
                <div className="col-sm-6">
                  <Inputs
                    id="firstname"
                    type="text"
                    placeholder="First name"
                    autoComplete="off"
                    frmField={formik.getFieldProps("firstName")}
                    err={formik.touched.firstName && formik.errors.firstName}
                    errMessage={formik.errors.firstName}
                  />
                </div>
                <div className="col-sm-6">
                  <Inputs
                    id="lastname"
                    type="text"
                    placeholder="Last name"
                    autoComplete="off"
                    frmField={formik.getFieldProps("lastName")}
                    err={formik.touched.lastName && formik.errors.lastName}
                    errMessage={formik.errors.lastName}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="row mb-3 d-flex align-items-center">
            <label className="col-sm-3 col-form-label">
              Gender <span className="text-danger">*</span>
            </label>
            <div className="col-sm">
              <Checkbox
                type="radio"
                id="male"
                label="Male"
                defaultChecked
                frmField={formik.getFieldProps("gender")}
              />
              <Checkbox
                type="radio"
                id="female"
                label="Female"
                frmField={formik.getFieldProps("gender")}
              />
            </div>
          </div>
          <Input
            id="phone"
            label="Phone"
            type="text"
            required
            placeholder="Phone number"
            autoComplete="off"
            frmField={formik.getFieldProps("phone")}
            err={formik.touched.phone && formik.errors.phone}
            errMessage={formik.errors.phone}
          />
          <Input
            id="email"
            label="Email"
            type="text"
            placeholder="Email address"
            autoComplete="off"
            frmField={formik.getFieldProps("email")}
            err={formik.touched.email && formik.errors.email}
            errMessage={formik.errors.email}
          />
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
      <Modal
        show={showdelete}
        onHide={handledeleteClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Thông báo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>Bạn có chắc chắn xoá ?</div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handledeleteClose}>
            Huỷ bỏ
          </Button>
          <Button variant="primary" onClick={deleteHandler}>
            Đồng ý
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Instructor;
