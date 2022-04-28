import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ActionTypes from "./../../store/actions";
import { useTranslation } from "react-i18next";

const Header = () => {
  const userInfo = useSelector((state) => state.auth.currentUser);
  //console.log(userInfo);
  const dispatch = useDispatch();
  const handleLogout = (e) => {
    e.preventDefault();
    dispatch({
      type: ActionTypes.lOGOUT_USER,
    });
  };
  const { t, i18n } = useTranslation();
  const [flag, setflag] = useState("");
  useEffect(() => {
    setflag(localStorage.getItem("lang") === "en" ? "vn" : "us");
  }, []);
  const changeLanguage = (e) => {
    e.preventDefault();
    let lang = localStorage.getItem("lang");
    lang = lang === "en" ? "vi" : "en";
    localStorage.setItem("lang", lang);
    i18n.changeLanguage(lang);
    setflag(lang === "en" ? "vn" : "us");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container">
          <Link className="navbar-brand" to="/">
            {t("appName")}
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <NavLink className="nav-link" to="/major">
                  {t("major")}
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/instructors">
                  {t("instructors")}
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/student">
                  {t("student")}
                </NavLink>
              </li>
            </ul>
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink className="nav-link" to="/">
                  {t("welcometo")} {userInfo.data.fullName}
                </NavLink>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/" onClick={handleLogout}>
                  <i className="bi-box-arrow-right"></i>
                </a>
              </li>
              <li className="nav-item">
                <a onClick={changeLanguage} className="nav-link" href="/">
                  <i className={`flag-icon flag-icon-${flag} fs-4`}></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
