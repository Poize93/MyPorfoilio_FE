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

  const hostName = "http://localhost:3001";

  const addEmployee = async () => {
    try {
      const response = await fetch(`${hostName}/addEmployee`, {
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
      const response = await fetch(`${hostName}/allEmployee`);
      response.json().then((result) => setEmployeeList(result.reverse()));
    } catch (err) {
      console.log(err);
    }
  };

  const handleButton = async (button, employee) => {
    if (button === "Edit") {
      setEditEmployeeID(employee?._id);
      const response = await fetch(`${hostName}/getEmployee/${employee?._id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      response.json().then((result) => setEmployeeDetails(result[0]));
      console.log(response, "responseresponse123");
    } else {
      const response = await fetch(
        `${hostName}/deleteEmployee/${employee?._id}`,
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
      `${hostName}/updateEmployee/${editEmployeeID}`,
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

  const [filterValue, setFilterValue] = React.useState("");

  console.log(filterValue, "filterValuefilterValue");

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  return (
    <>
      <Box
        style={{
          // maxWidth: "60%",
          margin: "auto 50px",
        }}
      >
        <h1>Employee Management System</h1>
        <Box className="d-flex">
          <Box
            style={{
              width: "40%",
              margin: "10px",
            }}
          >
            {!!editEmployeeID && (
              <h6>
                Updating Details of{" "}
                <span style={{ fontWeight: "bold", fontSize: "18px" }}>
                  "{employeeDetails?.name?.toUpperCase()}"
                </span>{" "}
              </h6>
            )}
            <Box className="d-flex flex-column">
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
            </Box>
          </Box>
          <Box
            style={{
              width: "60%",
              margin: "10px",
            }}
          >
            {!!employeeList?.length && (
              <div>
                <TextField
                  variant="filled"
                  size="small"
                  label="SearchBy Filter"
                  onChange={(e) => setFilterValue(e.target.value)}
                />
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
                    {employeeList
                      ?.filter(
                        (fltr) =>
                          fltr?.name
                            .toLowerCase()
                            ?.includes(filterValue.toLowerCase()) ||
                          fltr?.department
                            .toLowerCase()
                            ?.includes(filterValue.toLowerCase()) ||
                          fltr?.position
                            .toLowerCase()
                            ?.includes(filterValue.toLowerCase())
                      )
                      ?.map((item) => (
                        <TableRow
                          style={{
                            border:
                              item?._id === editEmployeeID
                                ? "2px black solid"
                                : "",
                          }}
                        >
                          <TableCell>{item?.name}</TableCell>{" "}
                          <TableCell>{item?.email}</TableCell>{" "}
                          <TableCell>{item?.position}</TableCell>{" "}
                          <TableCell>{item?.department}</TableCell>{" "}
                          <TableCell>{item?.salary}</TableCell>{" "}
                          <TableCell>
                            {["Edit", "Delete"]?.map((btnName) => (
                              <Button
                                onClick={() => handleButton(btnName, item)}
                              >
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
          </Box>
        </Box>
      </Box>
    </>
  );
}
