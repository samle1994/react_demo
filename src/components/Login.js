// imrse
import React, { useState, useEffect } from "react";
import Input from "./Input";
import userService from "../services/userService";
import { useNavigate } from "react-router-dom";

//sfc
const Login = (props) => {
  //usf
  const [message, setmessage] = useState("");
  const usernameRef = React.useRef();
  const passwordRef = React.useRef();
  const navigate=useNavigate();
  const formsubmit = (e) => {
    e.preventDefault();
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;
    
    userService.login(username,password).then((result)=>{
      //console.log(res.data.errorCode);
      if (result.data.errorCode===0) {
        navigate('/');
      } else {
        setmessage(result.data.message);
      }
    });
  };

  // uef
  useEffect(() => {
    usernameRef.current.focus();
  }, []);
  return (
    <div className="container h-100">
      <div className="row justify-content-center h-100 align-items-center">
        <div className="col-sm-8 col-lg-5">
          <div className="card bg-primary">
            <div className="card-header text-white">
              <h4 className="card-title mb-0">
                <i className="bi-grid-3x3-gap-fill"></i> Login
              </h4>
            </div>
            <div className="card-body bg-white rounded-bottom">
              <p className="text-danger text-center">{message}</p>
              <form onSubmit={formsubmit}>
                <Input
                  inputRef={usernameRef}
                  id="inputEmail3"
                  label="Username"
                  type="text"
                />
                <Input
                  inputRef={passwordRef}
                  id="inputEmail4"
                  label="Password"
                  type="password"
                />
                <div className="row">
                  <div className="offset-sm-3 col-auto">
                    <button type="submit" className="btn btn-primary">
                      Sign in
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
