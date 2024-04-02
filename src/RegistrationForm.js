import React, { useState } from "react";
import { Typography, TextField, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { hostName } from "./dummyData";
import { useDispatch, useSelector } from "react-redux";
import { RegistrationActionTypes, LogInTypes } from "./Redux/action";

function RegistrationForm({ setLoggedInAccountStatus, setPopUp }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const Registrations = useSelector((state) => state?.Registrations);
  const LogIn = useSelector((state) => state.LogInDetails);

  console.log(
    LogIn,
    "LogInLogIn",
    useSelector((state) => state)
  );

  // const storeTokenInLS = useData();

  // const url = window.location;
  // const parsedUrl = new URL(url);

  // const hostName = ["localhost:8080", "poizerahul.netlify.app"]?.includes(
  //   parsedUrl?.host
  // )
  //   ? process.env.REACT_APP_HOST_NAME_LIVE
  //   : process.env.REACT_APP_HOST_NAME_LOCAL;

  // console.log(
  //   ["localhost:8080", "poizerahul.netlify.app"]?.includes(parsedUrl?.host),
  //   "temp",
  //   parsedUrl?.host
  // );

  console.log(hostName, "hostName in registration page");

  const [registrationDetails, setRegistrationDetails] = useState({
    Name: "",
    Email: "",
    Password: "",
    Phone: "",
  });

  const [registrationStatus, setRegistrationStatus] = useState(true);

  const registerFunction = async () => {
    await dispatch({
      type: RegistrationActionTypes.REGISTRATION,
      payload: registrationDetails,
    });
    if (Registrations?.data?.status === 200) {
      await window.localStorage.setItem("token", Registrations?.data?.Token);
      await setLoggedInAccountStatus(true);
      (await !!Registrations?.data?.Token) && navigate("/home");
    }
  };

  const loginFunction = async () => {
    // const fetchFunction = async () => {
    //   const loggingIn = fetch(`${hostName}/login`, {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({
    //       Email: registrationDetails?.Email,
    //       Password: registrationDetails?.Password,
    //     }),
    //   });

    //   loggingIn.then((res) =>
    //     res.json().then((out) => {
    //       window.localStorage.setItem("token", out?.Token);
    //       setLoggedInAccountStatus(true);
    //       !!out?.Token && navigate("/home");
    //     })
    //   );
    // };
    try {
      await dispatch({
        type: LogInTypes?.LOGIN,
        payload: {
          Email: registrationDetails?.Email,
          Password: registrationDetails?.Password,
        },
      });

      console.log(LogIn, "RegistratwwionsRegistrations");
      if (LogIn?.data?.status === 200) {
        await window.localStorage.setItem("token", LogIn?.data?.Token);
        await setLoggedInAccountStatus(true);
        (await !!LogIn?.data?.Token) && navigate("/home");
      }
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
      {!!Registrations?.loading || !!LogIn?.loading ? (
        <h3>Loading...</h3>
      ) : (
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
            onClick={() =>
              registrationStatus ? registerFunction() : loginFunction()
            }
            className="m-2"
          >
            {" "}
            {registrationStatus ? "Register" : "Log In"}
          </Button>
          <Button
            variant="contained"
            className="m-2"
            onClick={() => navigate("/home")}
          >
            Explore
          </Button>
        </Box>
      )}
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
