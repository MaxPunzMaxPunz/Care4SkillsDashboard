import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import TestRandomSkill from "./components/TestRandomSkill.tsx";
import DataPlot from "./components/DataPlot.tsx";

function App() {
  return (
    <>
      <div className="flex">
        <TestRandomSkill />
        <DataPlot />
      </div>
    </>
  );
}

export default App;
