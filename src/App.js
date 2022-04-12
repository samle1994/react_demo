//import logo from "./logo.svg";
import "./App.css";
import DefaultLayout from "./components/containers/DefaultLayout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import LoadingBar from "react-redux-loading-bar";
function App() {
  return (
    <>
      <div className="position-absolute w-100" style={{ zIndex: "100" }}>
        <LoadingBar
          updateTime={100}
          className="bg-danger"
          style={{ height: "5px" }}
        />
      </div>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/*" element={<DefaultLayout />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
