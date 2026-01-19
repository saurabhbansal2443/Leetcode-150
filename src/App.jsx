import React from "react";
import StudentForm from "./Component/StudentForm";
import Questions from "./Component/Questions";
import Navbar from "./Component/Navbar";
const App = () => {
  return (
    <div className=" bg-[#0a0a0c]">
      <Navbar />
      <StudentForm />
      <Questions />
    </div>
  );
};

export default App;
