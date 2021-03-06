import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import majorService from "./../../services/majorService";
import { Button, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import Input from "./../Input";
import { useTranslation } from "react-i18next";
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
  //const [major, setmajor] = useState({ id: 0, name: "" });

  // const handelChange = (e) => {
  //   const newData = { ...major };
  //   newData[e.target.name] = e.target.value;
  //   setmajor(newData);
  // };

  // const handelSave = () => {
  //   if (major.id === 0) {
  //     majorService.add(major).then((res) => {
  //       if (res.errorCode === 0) {
  //         loadData();
  //         handleClose();
  //         toast.success("Thêm mới thành công");
  //       }
  //     });
  //   } else {
  //     majorService.update(major.id, major).then((res) => {
  //       if (res.errorCode === 0) {
  //         loadData();
  //         handleClose();
  //         toast.success("Cập nhật thành công");
  //       }
  //     });
  //   }
  // };

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
  const [isloading, setisloading] = useState(false);

  const handleFormSubmit = (data) => {
    setisloading(true);
    //console.log(data);
    if (data.id === 0) {
      majorService.add(data).then((res) => {
        setisloading(false);
        if (res.errorCode === 0) {
          loadData();
          handleClose();
          toast.success("Thêm mới thành công");
        }
      });
    } else {
      majorService.update(data.id, data).then((res) => {
        setisloading(false);
        if (res.errorCode === 0) {
          loadData();
          handleClose();
          toast.success("Cập nhật thành công");
        }
      });
    }
  };
  const showModalHandler = (e, id) => {
    if (e) e.preventDefault();
    if (id > 0) {
      majorService.get(id).then((res) => {
        formik.setValues(res.data);
        handleShow();
      });
    } else {
      formik.resetForm();
      handleShow();
    }
  };
  const { t } = useTranslation();
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {formik.values.id === 0 ? t("news") : t("edit")} {t("major")}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <Input
              id="txtMajor"
              label={t("majorname")}
              type="text"
              frmField={formik.getFieldProps("name")}
              err={formik.touched.name && formik.errors.name}
              errMessage={formik.errors.name}
            />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            disabled={!formik.dirty || !formik.isValid || isloading}
            onClick={formik.handleSubmit}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="container mt-4">
        <div className="card border-primary bt-5">
          <div className="card-header">
            <div className="row">
              <div className="col">
                <h3 className="card-title">{t("majorlist")}</h3>
              </div>
              <div className="col-auto">
                <button
                  type="button"
                  className="btn btn-primary"
                  variant="primary"
                  onClick={(e) => showModalHandler(e, 0)}
                >
                  <i className="bi-plus-lg"></i> {t("add")}
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
                    <th>{t("majorname")}</th>
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
    </>
  );
}

export default Major;
