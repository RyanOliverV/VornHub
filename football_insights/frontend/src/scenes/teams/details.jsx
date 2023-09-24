import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  Tabs,
  Tab,
  Box,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  useTheme,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/system";
import { tokens } from "../../theme";
import Header from "../../components/Header.jsx";

const TeamDetails = () => {
  const { id } = useParams();
  const [team, setTeams] = useState([]);
  const [squad, setSquad] = useState([]); // Add squad state
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [activeTab, setActiveTab] = useState(0);
  const [isLoading, setIsLoading] = useState(true); // Add loading indicator state

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/teams/" + id);
      const data = await response.json();
      setTeams(data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/squads/" + id);
      const data = await response.json();

      data.sort((playerA, playerB) => playerB.minutes_played - playerA.minutes_played);

      setSquad(data);
    };

    fetchData();
  }, []);

  const getColorForResult = (result) => {
    if (result === "W") {
      return "#8cf58c"; // For "W", use green color
    } else if (result === "D") {
      return "#fdab3d"; // For "D", use orange color
    } else if (result === "L") {
      return "#fd3030"; // For "L", use red color
    } else {
      return "black"; // Default to black color for any other result
    }
  };

  const HoverTableRow = styled(TableRow)(({ theme }) => ({
    "&:hover": {
      backgroundColor: theme.palette.primary.light,
      cursor: "pointer",
    },
  }));

  return (
    <Box
      m="20px 70px"
      height="80vh"
      display="flex"
      style={{ overflow: "auto", display: "flex", justifyContent: "center" }}
    >
      <Header
        title="Team Statistics"
        subtitle="View statistics for the selected team"
      />
      <Box style={{ width: "100%", maxWidth: 1200 }}>
        <Box
          marginTop="100px"
          height="20vh"
          display="flex"
          justifyContent="center"
        >
          <Grid marginTop={3} container spacing={1}>
            <Grid item xs={6} container alignItems="center">
              {/* Team 1 Logo */}
              <Grid item xs={12} sm={4} md={3} container justify="center">
                <img
                  src={team.logo}
                  alt="Team 1 Logo"
                  style={{ width: "80%", height: "auto" }}
                />
              </Grid>

              {/* Team 1 Name and Country */}
              <Grid
                item
                xs={12}
                sm={8}
                md={9}
                container
                direction="column"
                alignItems="left"
              >
                <Typography variant="body1" color={colors.grey[100]}>
                  {team.country}
                </Typography>
                <Typography variant="h5">{team.name}</Typography>
              </Grid>

              {team && team.form && (
                <Grid
                  item
                  xs={12}
                  marginTop={1}
                  container
                  spacing={1}
                  alignItems="center"
                >
                  <Grid item marginRight={8}>
                    <Typography variant="h6" color={colors.grey[100]}>
                      Last 5 Results
                    </Typography>
                  </Grid>
                  {team.form.map((result, index) => (
                    <Typography
                      key={index}
                      variant="body1"
                      fontWeight={500}
                      style={{
                        color: getColorForResult(result),
                        marginRight: "2px", // Add some right margin for spacing
                      }}
                    >
                      {result}
                    </Typography>
                  ))}
                </Grid>
              )}
            </Grid>

            <Grid item xs={6} container alignItems="center">
              {/* Team Info */}
              <Grid
                item
                xs={12}
                sm={8}
                md={9}
                container
                direction="column"
                alignItems="left"
              >
                <Typography variant="h6" color={colors.grey[100]}>
                  Founded: {team.founded}
                </Typography>
                <Typography variant="h6" color={colors.grey[100]}>
                  Stadium: {team.stadium_name}
                </Typography>
                <Typography variant="h6" color={colors.grey[100]}>
                  Manager: {team.manager}
                </Typography>
                <Typography variant="h6" color={colors.grey[100]}>
                  Highest Rated Player: {team.highest_rated}
                </Typography>
              </Grid>
            </Grid>
            {/* Add Tabs */}
            <Grid item xs={12} marginTop={5}></Grid>

            {/* Add Tab Panels */}
            <Grid item xs={12}>
              <Typography variant="h5" color={colors.grey[100]}>
                Season Overview{" "}
              </Typography>
              <TableContainer>
                {/* Head To Head Table */}
                <Table
                  sx={{
                    bgcolor: colors.primary[400],
                    marginTop: "30px",
                    width: "80%",
                  }}
                >
                  <TableHead>
                    <TableRow>
                      <TableCell align="left">Statistics</TableCell>
                      <TableCell align="left">Overall</TableCell>
                      <TableCell align="left">Home</TableCell>
                      <TableCell align="left">Away</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell align="left">
                        <Typography variant="h6" color={colors.grey[100]}>
                          Matches Played
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography variant="h6" color={colors.grey[100]}>
                          {team.matches_played}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography variant="h6" color={colors.grey[100]}>
                          {team.matches_played_home}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography variant="h6" color={colors.grey[100]}>
                          {team.matches_played_away}
                        </Typography>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="left">
                        <Typography variant="h6" color={colors.grey[100]}>
                          Wins
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography variant="h6" color={colors.grey[100]}>
                          {team.wins}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography variant="h6" color={colors.grey[100]}>
                          {team.wins_home}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography variant="h6" color={colors.grey[100]}>
                          {team.wins_away}
                        </Typography>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="left">
                        <Typography variant="h6" color={colors.grey[100]}>
                          Draws
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography variant="h6" color={colors.grey[100]}>
                          {team.draws}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography variant="h6" color={colors.grey[100]}>
                          {team.draws_home}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography variant="h6" color={colors.grey[100]}>
                          {team.draws_away}
                        </Typography>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="left">
                        <Typography variant="h6" color={colors.grey[100]}>
                          Losses
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography variant="h6" color={colors.grey[100]}>
                          {team.losses}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography variant="h6" color={colors.grey[100]}>
                          {team.losses_home}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography variant="h6" color={colors.grey[100]}>
                          {team.losses_away}
                        </Typography>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="left">
                        <Typography variant="h6" color={colors.grey[100]}>
                          Goals Scored
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography variant="h6" color={colors.grey[100]}>
                          {team.goals}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography variant="h6" color={colors.grey[100]}>
                          {team.goals_home}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography variant="h6" color={colors.grey[100]}>
                          {team.goals_away}
                        </Typography>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="left">
                        <Typography variant="h6" color={colors.grey[100]}>
                          Goals Conceded
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography variant="h6" color={colors.grey[100]}>
                          {team.goals_conceded}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography variant="h6" color={colors.grey[100]}>
                          {team.goals_conceded_home}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography variant="h6" color={colors.grey[100]}>
                          {team.goals_conceded_away}
                        </Typography>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="left">
                        <Typography variant="h6" color={colors.grey[100]}>
                          Cleansheets
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography variant="h6" color={colors.grey[100]}>
                          {team.cleansheets}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography variant="h6" color={colors.grey[100]}>
                          {team.cleansheets_home}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography variant="h6" color={colors.grey[100]}>
                          {team.cleansheets_away}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
              <Typography variant="h5" color={colors.grey[100]} marginTop={10}>
                Attacking and Defensive Phases{" "}
              </Typography>
              <Box display="flex" width="80%" marginTop={3}>
                <TableContainer>
                  <Table
                    sx={{
                      bgcolor: colors.primary[400],
                      width: "90%",
                    }}
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell align="left">Attacking Stats</TableCell>
                        <TableCell align="left">Overall</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell align="left">
                          <Typography variant="h6" color={colors.grey[100]}>
                            Scored Per Game
                          </Typography>
                        </TableCell>
                        <TableCell align="left">
                          <Typography variant="h6" color={colors.grey[100]}>
                            {team.scored_per_game}
                          </Typography>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell align="left">
                          <Typography variant="h6" color={colors.grey[100]}>
                            Scored Over 0.5
                          </Typography>
                        </TableCell>
                        <TableCell align="left">
                          <Typography variant="h6" color={colors.grey[100]}>
                            {team.scored_over_0_5}%
                          </Typography>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell align="left">
                          <Typography variant="h6" color={colors.grey[100]}>
                            Scored Over 1.5
                          </Typography>
                        </TableCell>
                        <TableCell align="left">
                          <Typography variant="h6" color={colors.grey[100]}>
                            {team.scored_over_1_5}%
                          </Typography>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell align="left">
                          <Typography variant="h6" color={colors.grey[100]}>
                            Scored Over 2.5
                          </Typography>
                        </TableCell>
                        <TableCell align="left">
                          <Typography variant="h6" color={colors.grey[100]}>
                            {team.scored_over_2_5}%
                          </Typography>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell align="left">
                          <Typography variant="h6" color={colors.grey[100]}>
                            Scored In Both Halves
                          </Typography>
                        </TableCell>
                        <TableCell align="left">
                          <Typography variant="h6" color={colors.grey[100]}>
                            {parseFloat(team.scored_both_halves).toFixed(2)}%
                          </Typography>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell align="left">
                          <Typography variant="h6" color={colors.grey[100]}>
                            First Team To Score
                          </Typography>
                        </TableCell>
                        <TableCell align="left">
                          <Typography variant="h6" color={colors.grey[100]}>
                            {team.scored_first}%
                          </Typography>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell align="left">
                          <Typography variant="h6" color={colors.grey[100]}>
                            Failed To Score
                          </Typography>
                        </TableCell>
                        <TableCell align="left">
                          <Typography variant="h6" color={colors.grey[100]}>
                            {team.failed_to_score_percentage}%
                          </Typography>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell align="left">
                          <Typography variant="h6" color={colors.grey[100]}>
                            Penalties_Conversion_Rate
                          </Typography>
                        </TableCell>
                        <TableCell align="left">
                          <Typography variant="h6" color={colors.grey[100]}>
                            {parseFloat(team.penalties_percentage).toFixed(2)}%
                          </Typography>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
                <TableContainer>
                  <Table
                    sx={{
                      bgcolor: colors.primary[400],
                      marginLeft: "10%",
                      width: "90%",
                    }}
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell align="left">Defensive Stats</TableCell>
                        <TableCell align="left">Overall</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell align="left">
                          <Typography variant="h6" color={colors.grey[100]}>
                            Conceded Per Game
                          </Typography>
                        </TableCell>
                        <TableCell align="left">
                          <Typography variant="h6" color={colors.grey[100]}>
                            {team.conceded_per_game}
                          </Typography>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell align="left">
                          <Typography variant="h6" color={colors.grey[100]}>
                            Cleansheet %
                          </Typography>
                        </TableCell>
                        <TableCell align="left">
                          <Typography variant="h6" color={colors.grey[100]}>
                            {team.cleansheets_percentage}%
                          </Typography>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell align="left">
                          <Typography variant="h6" color={colors.grey[100]}>
                            Tackles Per Game
                          </Typography>
                        </TableCell>
                        <TableCell align="left">
                          <Typography variant="h6" color={colors.grey[100]}>
                            {team.tackles_per_game}
                          </Typography>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell align="left">
                          <Typography variant="h6" color={colors.grey[100]}>
                            Fouls Per Game
                          </Typography>
                        </TableCell>
                        <TableCell align="left">
                          <Typography variant="h6" color={colors.grey[100]}>
                            {team.fouls_per_game}
                          </Typography>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell align="left">
                          <Typography variant="h6" color={colors.grey[100]}>
                            Conceded Before HT %
                          </Typography>
                        </TableCell>
                        <TableCell align="left">
                          <Typography variant="h6" color={colors.grey[100]}>
                            {parseFloat(team.conceded_before_HT).toFixed(2)}%
                          </Typography>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell align="left">
                          <Typography variant="h6" color={colors.grey[100]}>
                            Concede After HT %
                          </Typography>
                        </TableCell>
                        <TableCell align="left">
                          <Typography variant="h6" color={colors.grey[100]}>
                            {parseFloat(team.conceded_after_HT).toFixed(2)}%
                          </Typography>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell align="left">
                          <Typography variant="h6" color={colors.grey[100]}>
                            First Team To Concede %
                          </Typography>
                        </TableCell>
                        <TableCell align="left">
                          <Typography variant="h6" color={colors.grey[100]}>
                            {team.first_to_concede}%
                          </Typography>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell align="left">
                          <Typography variant="h6" color={colors.grey[100]}>
                            Yellow Cards Per Game
                          </Typography>
                        </TableCell>
                        <TableCell align="left">
                          <Typography variant="h6" color={colors.grey[100]}>
                            {team.yellow_per_game}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
              <Typography variant="h5" color={colors.grey[100]} marginTop={10}>
                Squad Stats
              </Typography>
              <TableContainer>
                {/* Head To Head Table */}
                <Table
                  sx={{
                    bgcolor: colors.primary[400],
                    marginTop: "30px",
                    width: "80%",
                  }}
                >
                  <TableHead>
                    <TableRow>
                      <TableCell align="left">Players</TableCell>
                      <TableCell align="left">Age</TableCell>
                      <TableCell align="left">Appearances</TableCell>
                      <TableCell align="left">Minutes Played</TableCell>
                      <TableCell align="left">Goals</TableCell>
                      <TableCell align="left">Assists</TableCell>
                      <TableCell align="left">Pass %</TableCell>
                      <TableCell align="left">Key Passes</TableCell>
                      <TableCell align="left">Interceptions</TableCell>
                      <TableCell align="left">Tackles</TableCell>
                      <TableCell align="left">Clearances</TableCell>
                      <TableCell align="left">Yellow Cards</TableCell>
                      <TableCell align="left">Red Cards</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {squad.map((player, index) => (
                      <HoverTableRow
                        key={player.id}
                        to={`/players/${player.id}`}
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        <TableCell>
                          <Link
                            to={`/players/${player.id}`}
                            style={{ textDecoration: "none", color: "inherit" }}
                          >
                            {player.name}
                          </Link>
                        </TableCell>
                        <TableCell>
                          <Link
                            to={`/players/${player.id}`}
                            style={{ textDecoration: "none", color: "inherit" }}
                          >
                            {player.age}
                          </Link>
                        </TableCell>
                        <TableCell>
                          <Link
                            to={`/players/${player.id}`}
                            style={{ textDecoration: "none", color: "inherit" }}
                          >
                            {player.appearances || 0}
                          </Link>
                        </TableCell>
                        <TableCell>
                          <Link
                            to={`/players/${player.id}`}
                            style={{ textDecoration: "none", color: "inherit" }}
                          >
                            {player.minutes_played || 0}
                          </Link>
                        </TableCell>
                        <TableCell>
                          <Link
                            to={`/players/${player.id}`}
                            style={{ textDecoration: "none", color: "inherit" }}
                          >
                            {player.goals || 0}
                          </Link>
                        </TableCell>
                        <TableCell>
                          <Link
                            to={`/players/${player.id}`}
                            style={{ textDecoration: "none", color: "inherit" }}
                          >
                            {player.assists || 0}
                          </Link>
                        </TableCell>
                        <TableCell>
                          <Link
                            to={`/players/${player.id}`}
                            style={{ textDecoration: "none", color: "inherit" }}
                          >
                            {player.pass_percentage || 0}%
                          </Link>
                        </TableCell>
                        <TableCell>
                          <Link
                            to={`/players/${player.id}`}
                            style={{ textDecoration: "none", color: "inherit" }}
                          >
                            {player.key_passes || 0}
                          </Link>
                        </TableCell>
                        <TableCell>
                          <Link
                            to={`/players/${player.id}`}
                            style={{ textDecoration: "none", color: "inherit" }}
                          >
                            {player.interceptions || 0}
                          </Link>
                        </TableCell>
                        <TableCell>
                          <Link
                            to={`/players/${player.id}`}
                            style={{ textDecoration: "none", color: "inherit" }}
                          >
                            {player.tackles || 0}
                          </Link>
                        </TableCell>
                        <TableCell>
                          <Link
                            to={`/players/${player.id}`}
                            style={{ textDecoration: "none", color: "inherit" }}
                          >
                            {player.clearances || 0}
                          </Link>
                        </TableCell>
                        <TableCell>
                          <Link
                            to={`/players/${player.id}`}
                            style={{ textDecoration: "none", color: "inherit" }}
                          >
                            {player.yellow_cards || 0}
                          </Link>
                        </TableCell>
                        <TableCell>
                          <Link
                            to={`/players/${player.id}`}
                            style={{ textDecoration: "none", color: "inherit" }}
                          >
                            {player.red_cards || 0}
                          </Link>
                        </TableCell>
                      </HoverTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default TeamDetails;
