import React from "react";
import PageNotFound from "./PageNotFound";
import Interests from "./interests";
import EMS from "./EMS";
import HomePage from "./HomePage";
import { Route, Routes } from "react-router-dom";
import NavBar from "./NavBar";
import ContactMe from "./contactMe";
export default function DefaultPage({ setPopUp }) {
  return (
    <>
      {window.location.pathname !== "/" && <NavBar setPopUp={setPopUp} />}
      <Routes>
        {" "}
        <Route path="/home" element={<HomePage />} />
        <Route path="/ems" element={<EMS />} />
        <Route path="/contactMe" element={<ContactMe />} />
        <Route path="/interests" element={<Interests />} />
        {/* <Route path="*" element={<PageNotFound />} /> Interests*/}
      </Routes>{" "}
    </>
  );
}
