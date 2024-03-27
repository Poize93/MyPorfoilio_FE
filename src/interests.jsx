import React from "react";
import { Box, Typography } from "@mui/material";
import { myReads } from "./dummyData";

export default function Interests() {
  return (
    <Box className="d-flex flex-wrap p-4">
      {myReads?.map((item) => (
        <Box style={{ width: "200px", margin: "20px" }}>
          <img
            src={item?.image}
            alt={item?.name}
            style={{ maxWidth: "80%", height: "250px" }}
          />
          <Typography>{item?.name}</Typography>
          <Typography>-{item?.By}</Typography>
          <Typography>Read in : {item?.year}</Typography>
        </Box>
      ))}
    </Box>
  );
}
