import React from "react";
import {
  TextField,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
  Typography,
} from "@mui/material";

export default function EMS() {
  const [employeeDetails, setEmployeeDetails] = React.useState({
    name: "",
    email: "",
    position: "",
    department: "",
    salary: "",
  });
  const employees = ["name", "email", "position", "department", "salary"];
  const [employeeList, setEmployeeList] = React.useState([]);
  const [editEmployeeID, setEditEmployeeID] = React.useState("");
  const refereshDetails = () => {
    setEmployeeDetails({
      name: "",
      email: "",
      position: "",
      department: "",
      salary: "",
    });
  };

  console.log(editEmployeeID, employeeList, "fffffffffff");
  const addEmployee = async () => {
    try {
      const response = await fetch("http://localhost:3001/addEmployee", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(employeeDetails),
      });
      console.log("Response:", response);
      response.status === 200 && getAllEmployee();
      // await getAllEmployeeList();
    } catch (err) {
      console.log(err);
    }
    refereshDetails();
  };

  React.useEffect(() => {
    getAllEmployee();
  }, []);

  const getAllEmployee = async () => {
    try {
      const response = await fetch("http://localhost:3001/allEmployee");
      response.json().then((result) => setEmployeeList(result.reverse()));
    } catch (err) {
      console.log(err);
    }
  };

  const handleButton = async (button, employee) => {
    if (button === "Edit") {
      setEditEmployeeID(employee?._id);
      const response = await fetch(
        `http://localhost:3001/getEmployee/${employee?._id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      response.json().then((result) => setEmployeeDetails(result[0]));
      console.log(response, "responseresponse123");
    } else {
      const response = await fetch(
        `http://localhost:3001/deleteEmployee/${employee?._id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      await response
        .json()
        .then((res) => res?.status === 200 && getAllEmployee());
      console.log(response, "Delete Response");
    }
  };

  const editEmployee = async () => {
    const response = await fetch(
      `http://localhost:3001/updateEmployee/${editEmployeeID}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(employeeDetails),
      }
    );

    await response.json().then((result) => !!result?._id && getAllEmployee());
    await refereshDetails();

    // await getAllEmployeeList();
  };

  const typeFunction = (type) => {
    return type === "salary" ? "number" : "";
  };

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  return (
    <>
      <Box
        style={{
          maxWidth: "60%",
          margin: "auto",
        }}
      >
        <h1>Employee Management System</h1>
        {!!editEmployeeID && (
          <h6>
            Updating Details of{" "}
            <span style={{ fontWeight: "bold", fontSize: "18px" }}>
              "{employeeDetails?.name?.toUpperCase()}"
            </span>{" "}
          </h6>
        )}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "Center",
            alignContent: "center",
          }}
        >
          {employees?.map((item) => (
            <>
              <TextField
                id={item}
                label={item.toUpperCase()}
                variant="outlined"
                name={item}
                required
                type={typeFunction(item)}
                value={employeeDetails[item]}
                style={{ width: "60%", margin: "10px auto" }}
                onChange={(e) => {
                  setEmployeeDetails({
                    ...employeeDetails,
                    [item]: e.target.value,
                  });
                }}
              />{" "}
              {item === "email" && !isValidEmail(employeeDetails[item]) && (
                <Typography
                  style={{
                    fontSize: "12px",
                    color: "red",
                    textAlign: "center",
                  }}
                >
                  Enter Valid EmailID
                </Typography>
              )}
            </>
          ))}

          {!!editEmployeeID ? (
            <Box className="d-flex">
              {" "}
              <Button
                variant="contained"
                disabled={
                  employeeDetails?.department &&
                  employeeDetails?.email &&
                  employeeDetails?.name &&
                  employeeDetails?.position &&
                  employeeDetails?.salary &&
                  isValidEmail(employeeDetails?.email)
                    ? false
                    : true
                }
                onClick={editEmployee}
                style={{ width: "20%", margin: "auto" }}
              >
                Update Employee
              </Button>{" "}
              <Button
                variant="contained"
                onClick={() => {
                  setEditEmployeeID("");
                  refereshDetails();
                }}
                style={{ width: "20%", margin: "auto" }}
              >
                Cancel Update
              </Button>
            </Box>
          ) : (
            <Button
              variant="contained"
              disabled={
                employeeDetails?.department &&
                employeeDetails?.email &&
                employeeDetails?.name &&
                employeeDetails?.position &&
                employeeDetails?.salary &&
                isValidEmail(employeeDetails?.email)
                  ? false
                  : true
              }
              onClick={addEmployee}
              style={{ width: "20%", margin: "auto" }}
            >
              Add Employee
            </Button>
          )}

          {!!employeeList?.length && (
            <div>
              <Table>
                <TableHead>
                  <TableRow>
                    {[
                      "name",
                      "email",
                      "position",
                      "department",
                      "salary",
                      "Actions",
                    ]?.map((item) => (
                      <TableCell sx={{ fontWeight: "bold" }}>
                        {item?.toLocaleUpperCase()}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {employeeList?.map((item) => (
                    <TableRow
                      style={{
                        border:
                          item?._id === editEmployeeID ? "2px black solid" : "",
                      }}
                    >
                      <TableCell>{item?.name}</TableCell>{" "}
                      <TableCell>{item?.email}</TableCell>{" "}
                      <TableCell>{item?.position}</TableCell>{" "}
                      <TableCell>{item?.department}</TableCell>{" "}
                      <TableCell>{item?.salary}</TableCell>{" "}
                      <TableCell>
                        {["Edit", "Delete"]?.map((btnName) => (
                          <Button onClick={() => handleButton(btnName, item)}>
                            {btnName}
                          </Button>
                        ))}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </Box>
    </>
  );
}
