import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Welcome from "./Components/Welcome";
import { useState } from "react";
function App() {
  const [userName, setUserName] = useState(localStorage.getItem("userName"));
  if (!userName) {
    return <Welcome setUserName={setUserName} />;
  }
  return (
    <>
      <Navbar />

      <Routes></Routes>
    </>
  );
}

export default App;
