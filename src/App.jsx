import React from "react";
import { Routes, Route } from "react-router-dom";
import StudentForm from "./Component/StudentForm";
import Questions from "./Component/Questions";
import TopicWiseSolutions from "./Component/TopicWiseSolutions";
import HundredDaysChallenge from "./Component/HundredDaysChallenge";
import YoutubeSeries from "./Component/YoutubeSeries";
import Navbar from "./Component/Navbar";

const App = () => {
  return (
    <div className=" bg-[#0a0a0c]">
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <StudentForm />
              <Questions />
            </>
          }
        />
        <Route path="/topics" element={<TopicWiseSolutions />} />
        <Route path="/100days" element={<HundredDaysChallenge />} />
        <Route path="/youtube" element={<YoutubeSeries />} />
      </Routes>
    </div>
  );
};

export default App;
