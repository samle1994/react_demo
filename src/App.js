//import logo from "./logo.svg";
import "./App.css";
import DefaultLayout from "./components/containers/DefaultLayout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/*" element={<DefaultLayout />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
