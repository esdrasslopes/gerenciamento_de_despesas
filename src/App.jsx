import { Outlet } from "react-router-dom";

import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import NavBar from "./components/NavBar";

import Footer from "./components/Footer";

import "./App.css";

function App() {
  return (
    <div className="app">
      <ToastContainer />
      <NavBar />
      <div className="container">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default App;
