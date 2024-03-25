import "./App.css";
import RegistrationForm from "./RegistrationForm";
import DefaultPage from "./DefaultPages";
import { Route, Routes, useNavigate, Link } from "react-router-dom";
import React, { useState } from "react";
import { Modal, Box, Typography } from "@mui/material";

function App() {
  const navigate = useNavigate();

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    backgroundColor: "#ffff",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const [loggedInAccountStatus, setLoggedInAccountStatus] = useState(false);

  console.log(localStorage.getItem("token"), "kkkkkkkkkk");

  console.log(window.location.pathname === "/", "reee");

  const [popUp, setPopUp] = useState(false);

  return (
    <div className="App">
      <Modal
        open={popUp}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="d-flex flex-column align-center">
          <Typography
            sx={{ textAlign: "center" }}
            id="modal-modal-title"
            variant="h6"
            component="h2"
          >
            For visiting full features Login/SignIn
          </Typography>
          {/* <Typography class="m-auto" id="modal-modal-description"></Typography> */}
          <Typography
            sx={{
              textAlign: " center",
              color: "red",
              fontWeight: "bold",
              cursor: "pointer",
            }}
            onClick={() => setPopUp(false)}
          >
            Cancel
          </Typography>
        </Box>
      </Modal>

      <div
        style={{
          background: `linear-gradient(150deg, #ecedee, transparent 30%),
        linear-gradient(330deg, rgb(210, 206, 242), transparent 30%),
        linear-gradient(225deg, #fff0be, #fbdce7, #e2fae1, powderblue)`,
          minHeight: "100vh",
        }}
      >
        <Routes>
          <Route
            exact
            path="/"
            element={
              <RegistrationForm
                setLoggedInAccountStatus={setLoggedInAccountStatus}
              />
            }
          />
        </Routes>
        <DefaultPage setPopUp={setPopUp} />
      </div>
    </div>
  );
}

export default App;
