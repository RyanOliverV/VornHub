import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, Redirect } from "react-router-dom";
import { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { ColorModeContext, useMode } from "../theme";
import Topbar from "../scenes/global/Topbar.jsx";
import Sidebar from "../scenes/global/Sidebar.jsx";
import Dashboard from "../scenes/dashboard/index.jsx";
import LiveScores from '../scenes/livescores/index.jsx';
import LiveStats from '../scenes/livescores/stats.jsx';
import Fixtures from '../scenes/fixtures/index.jsx';
import FixtureDetails from '../scenes/fixtures/details.jsx';
import ScorePrediction from "../scenes/scoreprediction/index.jsx";
import LeagueTable from '../scenes/leaguetable/index.jsx';
import Teams from '../scenes/teams/index.jsx';
import TeamDetails from "../scenes/teams/details.jsx";
import PlayerDetails from "../scenes/players/details.jsx";
import Goalkeepers from "../scenes/players/goalkeeper.jsx";
import Defenders from "../scenes/players/defender.jsx";
import Midfielders from "../scenes/players/midfielder.jsx";
import Forwards from "../scenes/players/forward.jsx";

function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar />
          <main className="content">
            <Topbar />
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/livescores" element={<LiveScores />} />
                <Route path="/livescores/:id" element={<LiveStats />} />
                <Route path="/fixtures" element={<Fixtures />} />
                <Route path="/fixtures/:id" element={<FixtureDetails />} />
                <Route path="/predictions" element={<ScorePrediction />} />
                <Route path="/leaguetable" element={<LeagueTable />} />
                <Route path="/teams/" element={<Teams />} />
                <Route path="/teams/:id" element={<TeamDetails />} />
                <Route path="/players/:id" element={<PlayerDetails />} />
                <Route path="/players/goalkeepers" element={<Goalkeepers /> }/>
                <Route path="/players/defenders" element={<Defenders /> }/>
                <Route path="/players/midfielders" element={<Midfielders /> }/>
                <Route path="/players/forwards" element={<Forwards /> }/>
              </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
