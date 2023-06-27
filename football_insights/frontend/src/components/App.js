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
import Fixtures from '../scenes/fixtures/index.jsx';
import ScorePrediction from "../scenes/scoreprediction/index.jsx";
import LeagueTable from '../scenes/leaguetable/index.jsx';
import TeamStats from '../scenes/teams/index.jsx';
import TeamDetails from "../scenes/teams/stats.jsx";
import PlayerStats from '../scenes/players/index.jsx';

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
                <Route path="/fixtures" element={<Fixtures />} />
                <Route path="/predictions" element={<ScorePrediction />} />
                <Route path="/leaguetable" element={<LeagueTable />} />
                <Route path="/teams/" element={<TeamStats />} />
                <Route path="/teams/:id" element={<TeamDetails />} />
                <Route path="/players" element={<PlayerStats /> }/>
              </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
