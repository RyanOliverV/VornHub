import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, Redirect } from "react-router-dom";
import { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { ColorModeContext, useMode } from "../theme";
import Topbar from "../scenes/global/Topbar.jsx";
import Sidebar from "../scenes/global/Sidebar.jsx";
import Dashboard from "../scenes/dashboard/index.jsx";
// import Livescores from '../scenes/livescores/index.jsx';
// import Fixtures from '../scenes/fixtures/index.jsx';
// import LeagueTable from '../scenes/leaguetable/index.jsx';
// import TeamStats from '../scenes/teamstats/index.jsx';
// import PlayerStats from '../scenes/playerstats/index.jsx';

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
            <Router>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                {/* <Route path="/livescores" element={<Livescores />} /> */}
                {/* <Route path="/fixtures" element={<Fixtures />} /> */}
                {/* <Route path="/leaguetable" element={<LeagueTable />} /> */}
                {/* <Route path="/teamstats" element={<TeamStats />} /> */}
                {/* <Route path="/playerstats" element={<PlayerStats />} /> */}
              </Routes>
            </Router>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
