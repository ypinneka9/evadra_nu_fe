import React, { useState, useEffect } from "react";
import { Body } from "./components/Body";
import { Header } from "./components/Header";
import "./App.css";

function App() {
  const [admin, setAdmin] = useState(false);

  const adminObj = {
    admin: admin,
    setAdmin: setAdmin,
  };

  return (
    <>
      <div>
        <Header adminObj={adminObj} />
        <Body adminObj={adminObj} />
      </div>
    </>
  );
}

export default App;
