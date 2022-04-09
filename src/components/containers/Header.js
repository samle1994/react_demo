import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ActionTypes from "./../../store/actions";

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
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container">
          <Link className="navbar-brand" to="/">
            Student Management
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
                  Major
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/instructors">
                  Instructors
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/student">
                  Student
                </NavLink>
              </li>
            </ul>
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink className="nav-link" to="/">
                  Welcome to {userInfo.data.fullName}
                </NavLink>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/" onClick={handleLogout}>
                  <i className="bi-box-arrow-right"></i>
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
