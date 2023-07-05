import React, { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  useTheme,
} from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { tokens } from "../../theme";

const LeagueTable = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // State variables
  const [standings, setStandings] = useState([]); // Holds the standings data
  const [sortConfig, setSortConfig] = useState({
    // Holds the sorting configuration
    key: "position",
    direction: "asc",
  });
  const [selectedSeason, setSelectedSeason] = useState("21646"); // Holds the selected season ID

  // Fetch data when the selected season changes
  useEffect(() => {
    fetchData(selectedSeason);
  }, [selectedSeason]);

  // Fetches the standings data based on the selected season
  const fetchData = async (season) => {
    try {
      const currentDate = new Date();
      const startDate = new Date("2023-08-11"); // Start date of the Premier League season

      if (season === "21646" && currentDate >= startDate) {
        // Fetch live standings if the selected season is the current season and the Premier League has started
        const response = await fetch("/api/live-standings/");
        const data = await response.json();
        setStandings(data);
      } else if (season) {
        // Fetch standings for a specific season
        const response = await fetch(`/api/standings/${season}`);
        const data = await response.json();
        setStandings(data);
      } else {
        // If no season is selected, set the standings to an empty array
        setStandings([]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Handles sorting of the table based on the clicked column
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // Handles the change event of the season select dropdown
  const handleSeasonChange = (event) => {
    const selectedSeason = event.target.value;
    setSelectedSeason(selectedSeason);
  };

  // Sorts the standings data based on the sortConfig
  const sortedStandings = [...standings].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });

  return (
    <Box m="20px 70px 70px">
      {/* Season select dropdown */}
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="season-select-label">Season</InputLabel>
        <Select
          labelId="season-label"
          id="season_select"
          value={selectedSeason}
          label="Season_Select"
          onChange={handleSeasonChange}
        >
          <MenuItem value="21646">2023/24</MenuItem>
          <MenuItem value="19734">2022/23</MenuItem>
          <MenuItem value="18378">2021/22</MenuItem>
        </Select>
      </FormControl>

      <Box style={{ height: "80vh", overflow: "auto" }}>
        <TableContainer component={Paper}>
          <Table style={{ background: colors.primary[400] }}>
            <TableHead>
              <TableRow>
                <TableCell>
                  {/* Position column header */}
                  <TableSortLabel
                    active={sortConfig.key === "position"}
                    direction={
                      sortConfig.key === "position"
                        ? sortConfig.direction
                        : "asc"
                    }
                    onClick={() => handleSort("position")}
                  >
                    Position
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  {/* Team column header */}
                  <TableSortLabel
                    active={sortConfig.key === "team"}
                    direction={
                      sortConfig.key === "team" ? sortConfig.direction : "asc"
                    }
                    onClick={() => handleSort("team")}
                  >
                    Team
                  </TableSortLabel>
                </TableCell>
                <TableCell>Played</TableCell>
                <TableCell>
                  {/* Won column header */}
                  <TableSortLabel
                    active={sortConfig.key === "won"}
                    direction={
                      sortConfig.key === "won" ? sortConfig.direction : "asc"
                    }
                    onClick={() => handleSort("won_value")}
                  >
                    Won
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  {/* Drawn column header */}
                  <TableSortLabel
                    active={sortConfig.key === "drawn"}
                    direction={
                      sortConfig.key === "drawn" ? sortConfig.direction : "asc"
                    }
                    onClick={() => handleSort("drawn_value")}
                  >
                    Drawn
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  {/* Lost column header */}
                  <TableSortLabel
                    active={sortConfig.key === "lost"}
                    direction={
                      sortConfig.key === "lost" ? sortConfig.direction : "asc"
                    }
                    onClick={() => handleSort("lost_value")}
                  >
                    Lost
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  {/* Goals For column header */}
                  <TableSortLabel
                    active={sortConfig.key === "goalsFor"}
                    direction={
                      sortConfig.key === "goalsFor"
                        ? sortConfig.direction
                        : "asc"
                    }
                    onClick={() => handleSort("gf_value")}
                  >
                    GF
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  {/* Goals Against column header */}
                  <TableSortLabel
                    active={sortConfig.key === "goalsAgainst"}
                    direction={
                      sortConfig.key === "goalsAgainst"
                        ? sortConfig.direction
                        : "asc"
                    }
                    onClick={() => handleSort("ga_value")}
                  >
                    GA
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  {/* Goal Difference column header */}
                  <TableSortLabel
                    active={sortConfig.key === "goalDifference"}
                    direction={
                      sortConfig.key === "goalDifference"
                        ? sortConfig.direction
                        : "asc"
                    }
                    onClick={() => handleSort("gd_value")}
                  >
                    GD
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  {/* Points column header */}
                  <TableSortLabel
                    active={sortConfig.key === "points"}
                    direction={
                      sortConfig.key === "points" ? sortConfig.direction : "asc"
                    }
                    onClick={() => handleSort("points")}
                  >
                    Points
                  </TableSortLabel>
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {/* Render each team's data */}
              {sortedStandings.map((team) => (
                <TableRow key={team.id}>
                  <TableCell>{team.position}</TableCell>
                  <TableCell style={{ display: "flex", alignItems: "center" }}>
                    {/* Team logo and name */}
                    <img
                      src={team.logo}
                      style={{ marginRight: "10px", maxWidth: "40px" }}
                      alt="Team Logo"
                    />
                    {team.team}
                  </TableCell>
                  {/* League Table values */}
                  <TableCell>{team.played_value}</TableCell>
                  <TableCell>{team.won_value}</TableCell>
                  <TableCell>{team.drawn_value}</TableCell>
                  <TableCell>{team.lost_value}</TableCell>
                  <TableCell>{team.gf_value}</TableCell>
                  <TableCell>{team.ga_value}</TableCell>
                  <TableCell>{team.gd_value}</TableCell>
                  <TableCell>{team.points}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default LeagueTable;
