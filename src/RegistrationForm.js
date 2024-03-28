import React, { useState } from "react";
import { Typography, TextField, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useData } from "./contextFolder/localData";

function RegistrationForm({ setLoggedInAccountStatus, setPopUp }) {
  const navigate = useNavigate();
  const storeTokenInLS = useData();

  const isLocalActive = true;
  const hostName =
    !window.location.hostname?.includes("localhost") && isLocalActive
      ? process.env.REACT_APP_HOST_NAME_LOCAL
      : process.env.REACT_APP_HOST_NAME_LIVE;

  console.log(window.location, "hhhhhhhhhhh");

  const [registrationDetails, setRegistrationDetails] = useState({
    Name: "",
    Email: "",
    Password: "",
    Phone: "",
  });

  const [registrationStatus, setRegistrationStatus] = useState(true);

  const registerFunction = () => {
    const fetchFunction = async () => {
      const response = await fetch(`${hostName}/registration`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registrationDetails),
      });

      response.json().then((res) => {
        window.localStorage.setItem("token", res?.Token);
        setLoggedInAccountStatus(true);
        !!res?.Token && navigate("/home");
      });
    };
    try {
      fetchFunction();
    } catch (err) {}
  };

  // const [loggedInDetails, setLoggedInDetails] = useState({});

  const loginFunction = () => {
    const fetchFunction = async () => {
      const loggingIn = fetch(`${hostName}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Email: registrationDetails?.Email,
          Password: registrationDetails?.Password,
        }),
      });

      loggingIn.then((res) =>
        res.json().then((out) => {
          window.localStorage.setItem("token", out?.Token);
          setLoggedInAccountStatus(true);
          !!out?.Token && navigate("/home");
        })
      );
    };
    try {
      fetchFunction();
    } catch (err) {
      console.error(err);
    }
  };

  const typeFunction = (type) => {
    return (
      (type === "Password" && "password") ||
      (type === "Phone" && "number") ||
      ""
    );
  };

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "Center",
        height: "100vh",
        justifyContent: "Center",
        // backgroundColor: "red",
      }}
    >
      <Typography style={{ fontSize: "34px" }}>
        {registrationStatus ? "Registration Page" : "Login Page"}
      </Typography>
      <Box style={{ display: "flex", flexDirection: "column" }}>
        {(registrationStatus
          ? ["Name", "Email", "Password", "Phone"]
          : ["Email", "Password"]
        )?.map((item) => (
          <>
            <TextField
              id={item}
              label={item}
              required
              type={typeFunction(item)}
              variant="outlined"
              style={{ margin: "10px" }}
              value={registrationDetails[item]}
              onChange={(e) =>
                setRegistrationDetails({
                  ...registrationDetails,
                  [item]: e.target.value,
                })
              }
            />
            {item === "Email" && !isValidEmail(registrationDetails[item]) && (
              <Typography sx={{ fontSize: "12px", color: "red" }}>
                Enter Valid Email Address
              </Typography>
            )}
          </>
        ))}
      </Box>
      <Box>
        <Button
          disabled={
            registrationStatus
              ? registrationDetails?.Name &&
                registrationDetails?.Email &&
                registrationDetails?.Password &&
                registrationDetails?.Phone &&
                isValidEmail(registrationDetails?.Email)
                ? false
                : true
              : registrationDetails?.Email &&
                registrationDetails?.Password &&
                isValidEmail(registrationDetails?.Email)
              ? false
              : true
          }
          variant="contained"
          type="submit"
          onClick={registrationStatus ? registerFunction : loginFunction}
          className="m-2"
        >
          {" "}
          {registrationStatus ? "Sign In" : "Log In"}
        </Button>
        <Button
          variant="contained"
          className="m-2"
          onClick={() => navigate("/home")}
        >
          Explore
        </Button>
      </Box>
      <Button
        onClick={() => {
          setRegistrationStatus(!registrationStatus);
        }}
      >
        {!registrationStatus ? "New Registeration" : "Already Signed In?"}
      </Button>{" "}
      <Typography>
        Note: Use Explore Option to Explore the Home Page without Login
      </Typography>
    </div>
  );
}

export default RegistrationForm;
