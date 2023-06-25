import React from "react";
import {BrowserRouter as Router, Routes, Route, Link, Redirect} from "react-router-dom";
import RoomJoin from "./RoomJoin";
import CreateRoom from "./CreateRoom";

function Home() {
  return (
    <Router>
      <Routes>
        <Route path="/join" element={<RoomJoin />} />
        <Route path="/create" element={<CreateRoom />} />
        <Route path="/" element={<p> This is the Home Page </p>} />
      </Routes>
    </Router>
  );
}

export default Home;
