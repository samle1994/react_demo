import React, { useState, useEffect } from "react";
import studentService from "./../../services/studentService";
import Input from "./../Input";
import { Button, Modal, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import Checkbox from "./../Checkbox";
import Inputs from "./Inputs";
import Major from "./Major";
import majorService from "./../../services/majorService";
const Instructor = () => {
  const [students, setstudents] = useState([]);

  const loadData = () => {
    studentService.list().then((res) => {
      //console.log(res.data);
      setstudents(res.data);
    });
  };
  useEffect(() => {
    loadData();
  }, []);

  const formik = useFormik({
    initialValues: {
      id: 0,
      stuId: "",
      gender: 0,
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      majorId: "",
    },
    validationSchema: Yup.object({
      id: Yup.number().required(),
      stuId: Yup.string()
        .min(5, "Nhập tối thiểu 5 ký tự")
        .required("Bắt buộc nhập"),
      firstName: Yup.string().required("Bắt buộc nhập"),
      lastName: Yup.string().required("Bắt buộc nhập"),
      phone: Yup.number()
        .typeError("Không phải số")
        .min(6, "Nhập tối thiểu 6 số")
        .required("Bắt buộc nhập"),
      email: Yup.string().email("Định dạng email"),
      majorId: Yup.number().required("Bắt buộc nhập"),
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

  const [majors, setmajors] = useState([]);

  const loadDataMajor = () => {
    majorService.list().then((res) => {
      //console.log(res.data);
      setmajors(res.data);
    });
  };

  const handleFormSubmit = (data) => {
    //console.log(data);
    if (data.id === 0) {
      studentService.add(data).then((res) => {
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
      studentService.update(data.id, data).then((res) => {
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
      studentService.get(id).then((res) => {
        formik.setValues(res.data);
        handleShow();
      });
      loadDataMajor();
    } else {
      formik.resetForm();
      loadDataMajor();
      handleShow();
    }
  };

  const deleteHandler = () => {
    studentService.remove(iddel).then((res) => {
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

  const handleChangeGender = (e) => {
    formik.setFieldValue("gender", Number(e.target.value).valueOf());
    //console.log(e.target.value);
  };
  const handleChangeSelect = (e) => {
    formik.setFieldValue("majorId", Number(e.target.value).valueOf());
    //console.log(e.target.value);
  };
  return (
    <>
      <div className="container mt-4">
        <div className="card border-primary bt-5">
          <div className="card-header">
            <div className="row">
              <div className="col">
                <h3 className="card-title">
                  Studens <small className="text-muted">list</small>
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
                  {students.map((student, idx) => (
                    <tr key={student.id}>
                      <td>{idx + 1}</td>
                      <td>{student.stuId}</td>
                      <td>{`${student.firstName} ${student.lastName}`}</td>
                      <td>
                        {student.gender === 1 ? (
                          <i className="bi bi-gender-male"></i>
                        ) : (
                          <i className="bi bi-gender-female"></i>
                        )}
                      </td>
                      <td>{student.phone}</td>
                      <td>{student.email}</td>
                      <td>
                        <a
                          href="/"
                          onClick={(e) => showModalHandler(e, student.id)}
                        >
                          <i className="bi-pencil-square text-primary"></i>
                        </a>
                        <a
                          href="/"
                          onClick={(e) => handleShowdelete(e, student.id)}
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
            {formik.values.id === 0 ? "News" : "Edit"} Studens
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <Input
              id="instructorid"
              label="Student ID"
              labelSize="4"
              type="text"
              required
              autoComplete="off"
              frmField={formik.getFieldProps("stuId")}
              err={formik.touched.stuId && formik.errors.stuId}
              errMessage={formik.errors.stuId}
            />
            <div className="row mb-3 d-flex align-items-center">
              <label className="col-sm-4 col-form-label">
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
              <label className="col-sm-4 col-form-label">
                Gender <span className="text-danger">*</span>
              </label>
              <div className="col-sm">
                <Checkbox
                  type="radio"
                  id="male"
                  label="Male"
                  defaultChecked
                  onClick={handleChangeGender}
                  defaultValue={0}
                  name="gender"
                />
                <Checkbox
                  type="radio"
                  id="female"
                  label="Female"
                  defaultValue={1}
                  onClick={handleChangeGender}
                  name="gender"
                />
              </div>
            </div>
            <Input
              id="phone"
              label="Phone"
              type="text"
              labelSize="4"
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
              labelSize="4"
              type="text"
              placeholder="Email address"
              autoComplete="off"
              frmField={formik.getFieldProps("email")}
              err={formik.touched.email && formik.errors.email}
              errMessage={formik.errors.email}
            />
            <div className="row mb-3 d-flex align-items-center">
              <label htmlFor="majorId" className="col-sm-4 col-form-label">
                Major ID <span className="text-danger">*</span>
              </label>
              <div className="col-sm">
                <Form.Select
                  name="majorId"
                  id="majorId"
                  aria-label="Select Major"
                  onChange={handleChangeSelect}
                >
                  <option value="">Select Major</option>
                  {majors.map((major, index) => (
                    <option key={major.id} value={major.id}>
                      {major.name}
                    </option>
                  ))}
                </Form.Select>
              </div>
            </div>
          </form>
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
