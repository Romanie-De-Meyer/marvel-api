import React from "react";
import NavBar from "../navbar";
import "./index.css";

export default function Header() {
  return (
    <div className="header">
      <NavBar />
      <span id="title">marvel</span>
    </div>
  );
}
