import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function NavBar({ setPopUp }) {
  const navigate = useNavigate();

  const manageLogOut = () => {
    // const response = fetch("/logout", { method: "POST" });
    window.localStorage.setItem("token", "");
    window.localStorage.removeItem("token");

    navigate("/");
  };

  const isLoggedIn = !!window.localStorage.getItem("token");

  const navBar = [
    { name: "Home", link: "/home" },
    { name: "EMS", link: "/ems" },
    { name: "Contact Me", link: "/contactMe" },
  ];
  return (
    <nav
      className="navbar navbar-expand-lg navbar-light bg-light"
      style={{
        background: `linear-gradient(150deg, #ecedee, transparent 30%),
        linear-gradient(225deg, #fff0be, #fbdce7, #e2fae1, powderblue)`,
      }}
    >
      <Link className="navbar-brand" to="/home">
        My World
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav" onClick={() => console.log("setPopUp")}>
          {navBar?.map((item) => (
            <li className="nav-item active">
              <Link
                to={isLoggedIn && item?.link}
                onClick={() => {
                  !isLoggedIn && setPopUp(true);
                }}
                className="nav-link"
              >
                {item?.name}
              </Link>
            </li>
          ))}

          {/* <li className="nav-item">
            <Link className="nav-link" to="/ems">
              EMS
            </Link>
          </li> */}
          {/* <li className="nav-item">
            <Link className="nav-link" to="/contactMe">
              Contact Me
            </Link>
          </li> */}
        </ul>
        <ul>
          {/* <li className="nav-item">
            {" "}
            <h6>
              Time:{date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()}
            </h6>
          </li> */}

          {/* <h6>
            Date: {date.getHours()} : {date.getMinutes()} : {date.getSeconds()}{" "}
            : {date.getMilliseconds()}
          </h6> */}
        </ul>
        {isLoggedIn ? (
          <button
            className="btn btn-outline-success my-2 my-sm-0"
            onClick={() => {
              manageLogOut();
            }}
          >
            Log Out
          </button>
        ) : (
          <button
            className="btn btn-outline-success my-2 my-sm-0"
            onClick={() => {
              navigate("/");
            }}
          >
            Log In
          </button>
        )}
      </div>
    </nav>
  );
}
