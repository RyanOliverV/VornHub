import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  useTheme,
  Button,
  Tab,
} from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { tokens } from "../../theme";
import Header from "../../components/Header.jsx";

const PlayerDetails = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { id } = useParams();
  const [player, setPlayers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/players/" + id);
      const data = await response.json();
      setPlayers(data);
    };

    fetchData();
  }, []);

  // Define a mapping of position categories to their corresponding stats and table headers
  const positionStatsMapping = {
    "Centre Forward": {
      stats: [
        { label: "Total Shots", key: "totalShots" },
        { label: "Shots Blocked", key: "shotsBlocked" },
        { label: "Shots On Target", key: "shotsOnTarget" },
        { label: "Big Chances Missed", key: "bigChancesMissed" },
        { label: "Key Passes", key: "keyPasses" },
        { label: "Dribble Attempts", key: "dribbleAttempts" },
        { label: "Dribbled Past", key: "dribbledPast" },
        { label: "Dispossessed", key: "dispossessed" },
        { label: "Fouls Drawn", key: "foulsDrawn" },
        { label: "Total Duels", key: "totalDuels" },
        { label: "Duels Won", key: "duelsWon" },
        { label: "Aerials Won", key: "aerialsWon" },
        { label: "Offsides", key: "offsides" },
      ],
    },
    "Left Wing": {
      stats: [
        { label: "Total Shots", key: "totalShots" },
        { label: "Shots Blocked", key: "shotsBlocked" },
        { label: "Shots On Target", key: "shotsOnTarget" },
        { label: "Big Chances Missed", key: "bigChancesMissed" },
        { label: "Total Crosses", key: "totalCrosses" },
        { label: "Accurate Crosses", key: "accurateCrosses" },
        { label: "Key Passes", key: "keyPasses" },
        { label: "Dribble Attempts", key: "dribbleAttempts" },
        { label: "Dribbled Past", key: "dribbledPast" },
        { label: "Dispossessed", key: "dispossessed" },
        { label: "Fouls Drawn", key: "foulsDrawn" },
        { label: "Total Duels", key: "totalDuels" },
        { label: "Duels Won", key: "duelsWon" },
        { label: "Offsides", key: "offsides" },
      ],
    },
    "Right Wing": {
      stats: [
        { label: "Total Shots", key: "totalShots" },
        { label: "Shots Blocked", key: "shotsBlocked" },
        { label: "Shots On Target", key: "shotsOnTarget" },
        { label: "Big Chances Missed", key: "bigChancesMissed" },
        { label: "Total Crosses", key: "totalCrosses" },
        { label: "Accurate Crosses", key: "accurateCrosses" },
        { label: "Key Passes", key: "keyPasses" },
        { label: "Big Chances Created", key: "bigChancesCreated" },
        { label: "Dribble Attempts", key: "dribbleAttempts" },
        { label: "Dribbled Past", key: "dribbledPast" },
        { label: "Dispossessed", key: "dispossessed" },
        { label: "Fouls Drawn", key: "foulsDrawn" },
        { label: "Total Duels", key: "totalDuels" },
        { label: "Duels Won", key: "duelsWon" },
        { label: "Offsides", key: "offsides" },
      ],
    },
    "Attacking Midfield": {
      stats: [
        { label: "Passes", key: "passes" },
        { label: "Accurate Passes", key: "accuratePasses" },
        { label: "Accurate Passes %", key: "accuratePassesPercentage" },
        { label: "Key Passes", key: "keyPasses" },
        { label: "Big Chances Created", key: "bigChancesCreated" },
        { label: "Through Balls", key: "throughBalls" },
        { label: "Through Balls Won", key: "throughBallsWon" },
        { label: "Long Balls", key: "longBalls" },
        { label: "Long Balls Won", key: "longBallsWon" },
        { label: "Dribble Attempts", key: "dribbleAttempts" },
        { label: "Dribbled Past", key: "dribbledPast" },
        { label: "Dispossessed", key: "dispossessed" },
        { label: "Fouls Drawn", key: "foulsDrawn" },
        { label: "Total Duels", key: "totalDuels" },
        { label: "Duels Won", key: "duelsWon" },
        { label: "Tackles", key: "tackles" },
        { label: "Interceptions", key: "interceptions" },
      ],
    },
    "Defensive Midfield": {
      stats: [
        { label: "Passes", key: "passes" },
        { label: "Accurate Passes", key: "accuratePasses" },
        { label: "Accurate Passes %", key: "accuratePassesPercentage" },
        { label: "Key Passes", key: "keyPasses" },
        { label: "Big Chances Created", key: "bigChancesCreated" },
        { label: "Through Balls", key: "throughBalls" },
        { label: "Through Balls Won", key: "throughBallsWon" },
        { label: "Long Balls", key: "longBalls" },
        { label: "Long Balls Won", key: "longBallsWon" },
        { label: "Total Duels", key: "totalDuels" },
        { label: "Duels Won", key: "duelsWon" },
        { label: "Tackles", key: "tackles" },
        { label: "Interceptions", key: "interceptions" },
        { label: "Blocked Shots", key: "blockedShots" },
        { label: "Clearances", key: "clearances" },
        { label: "Aerials Won", key: "aerialsWon" },
        { label: "Goals Conceded", key: "goalsConceded" },
        { label: "Fouls", key: "fouls" },
      ],
    },
    "Central Midfield": {
      stats: [
        { label: "Passes", key: "passes" },
        { label: "Accurate Passes", key: "accuratePasses" },
        { label: "Accurate Passes %", key: "accuratePassesPercentage" },
        { label: "Key Passes", key: "keyPasses" },
        { label: "Big Chances Created", key: "bigChancesCreated" },
        { label: "Through Balls", key: "throughBalls" },
        { label: "Through Balls Won", key: "throughBallsWon" },
        { label: "Long Balls", key: "longBalls" },
        { label: "Long Balls Won", key: "longBallsWon" },
        { label: "Dribble Attempts", key: "dribbleAttempts" },
        { label: "Dribbled Past", key: "dribbledPast" },
        { label: "Dispossessed", key: "dispossessed" },
        { label: "Fouls Drawn", key: "foulsDrawn" },
        { label: "Total Duels", key: "totalDuels" },
        { label: "Duels Won", key: "duelsWon" },
        { label: "Tackles", key: "tackles" },
        { label: "Interceptions", key: "interceptions" },
        { label: "Blocked Shots", key: "blockedShots" },
        { label: "Clearances", key: "clearances" },
        { label: "Aerials Won", key: "aerialsWon" },
        { label: "Goals Conceded", key: "goalsConceded" },
        { label: "Fouls", key: "fouls" },
      ],
    },
    "Left Back": {
      stats: [
        { label: "Total Crosses", key: "totalCrosses" },
        { label: "Accurate Crosses", key: "accurateCrosses" },
        { label: "Key Passes", key: "keyPasses" },
        { label: "Big Chances Created", key: "bigChancesCreated" },
        { label: "Dribble Attempts", key: "dribbleAttempts" },
        { label: "Dribbled Past", key: "dribbledPast" },
        { label: "Dispossessed", key: "dispossessed" },
        { label: "Tackles", key: "tackles" },
        { label: "Interceptions", key: "interceptions" },
        { label: "Blocked Shots", key: "blockedShots" },
        { label: "Clearances", key: "clearances" },
        { label: "Aerials Won", key: "aerialsWon" },
        { label: "Goals Conceded", key: "goalsConceded" },
        { label: "Fouls", key: "fouls" },
      ],
    },
    "Right Back": {
      stats: [
        { label: "Total Crosses", key: "totalCrosses" },
        { label: "Accurate Crosses", key: "accurateCrosses" },
        { label: "Key Passes", key: "keyPasses" },
        { label: "Big Chances Created", key: "bigChancesCreated" },
        { label: "Dribble Attempts", key: "dribbleAttempts" },
        { label: "Dribbled Past", key: "dribbledPast" },
        { label: "Dispossessed", key: "dispossessed" },
        { label: "Tackles", key: "tackles" },
        { label: "Interceptions", key: "interceptions" },
        { label: "Blocked Shots", key: "blockedShots" },
        { label: "Clearances", key: "clearances" },
        { label: "Aerials Won", key: "aerialsWon" },
        { label: "Goals Conceded", key: "goalsConceded" },
        { label: "Fouls", key: "fouls" },
      ],
    },
    "Centre Back": {
      stats: [
        { label: "Passes", key: "passes" },
        { label: "Accurate Passes", key: "accuratePasses" },
        { label: "Accurate Passes %", key: "accuratePassesPercentage" },
        { label: "Long Balls", key: "longBalls" },
        { label: "Long Balls Won", key: "longBallsWon" },
        { label: "Tackles", key: "tackles" },
        { label: "Interceptions", key: "interceptions" },
        { label: "Blocked Shots", key: "blockedShots" },
        { label: "Clearances", key: "clearances" },
        { label: "Aerials Won", key: "aerialsWon" },
        { label: "Goals Conceded", key: "goalsConceded" },
        { label: "Fouls", key: "fouls" },
      ],
    },
    Goalkeeper: {
      stats: [
        { label: "Passes", key: "passes" },
        { label: "Accurate Passes", key: "accuratePasses" },
        { label: "Accurate Passes %", key: "accuratePassesPercentage" },
        { label: "Long Balls", key: "longBalls" },
        { label: "Long Balls Won", key: "longBallsWon" },
        { label: "Goals Conceded", key: "goalsConceded" },
        { label: "Errors Leading to Goal", key: "errorsToGoal" },
        { label: "Saves", key: "saves" },
        { label: "Saves Inside Box", key: "savesInsideBox" },
      ],
    },
  };

  // Define a function to render position-specific stats and headers
  const renderPositionSpecificStats = (position) => {
    if (!position || !positionStatsMapping.hasOwnProperty(position))
      return null;

    const positionData = positionStatsMapping[position];

    // Extract stats and headers from the positionData
    const stats = positionData.stats.map((stat) => (
      <TableCell key={stat.key}>{player[stat.key]}</TableCell>
    ));

    // Extract headers from the positionData
    const headers = positionData.stats.map((stat) => (
      <TableCell key={stat.key}>{stat.label}</TableCell>
    ));

    return { stats, headers };
  };

  return (
    <Box
      m="20px 70px"
      height="80vh"
      display="flex"
      style={{ overflow: "auto", display: "flex", justifyContent: "center" }}
    >
      <Header
        title="Player Statistics"
        subtitle="View statistics for the selected player"
      />
      <Box style={{ width: "100%", maxWidth: 1200 }}>
        <Box
          marginTop="100px"
          height="20vh"
          display="flex"
          justifyContent="center"
        >
          {/* Player Info */}
          <Grid marginTop={3} container spacing={1}>
            <Grid item xs={6} container alignItems="center">
              <Grid item xs={12} sm={4} md={3} container justify="center">
                <img
                  src={player.logo}
                  alt="Player Logo"
                  style={{ width: "80%", height: "auto" }}
                />
              </Grid>

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
                  {player.country}
                </Typography>
                <Typography variant="h5">{player.name}</Typography>
              </Grid>

              {/* <Grid
                  item
                  xs={12}
                  marginTop={1}
                  container
                  spacing={1}
                  alignItems="center"
                >
                  <Grid item marginRight={8}>
                    <Typography variant="h6" color={colors.grey[100]}>
                      Position:
                    </Typography>
                  </Grid>
                
                    <Typography
                      variant="body1"
                      fontWeight={500}
                      color={colors.grey[100]}
                      style={{
                        
                        marginRight: "2px", // Add some right margin for spacing
                      }}
                    >
                      {player.position}
                    </Typography>

                </Grid> */}
            </Grid>

            <Grid item xs={6} container alignItems="center">
              {/* Player Info */}
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
                  Team: {player.team}
                </Typography>
                <Typography variant="h6" color={colors.grey[100]}>
                  Position: {player.position || player.alternatePosition}
                </Typography>
                <Typography variant="h6" color={colors.grey[100]}>
                  Average Rating: {player.rating}
                </Typography>
              </Grid>
            </Grid>
            {/* Add Tabs */}
            <Grid item xs={12} marginTop={5}></Grid>

            {/* Add Tab Panels */}
            <Grid item xs={12}>
              {player.alternatePosition === "Attacker" && (
                <React.Fragment>
                  <Typography variant="h5" color={colors.grey[100]}>
                    Season Overview
                  </Typography>
                  <TableContainer>
                    <Table
                      sx={{
                        bgcolor: colors.primary[400],
                        marginTop: "30px",
                        width: "80%",
                      }}
                    >
                      <TableHead>
                        <TableRow>
                          <TableCell>Appearances</TableCell>
                          <TableCell>Minutes Played</TableCell>
                          <TableCell>Goals</TableCell>
                          <TableCell>Assists</TableCell>
                          {/* Add the table headers specific to the player's position */}
                          {/* {renderPositionSpecificStats(player.position)?.headers} */}
                          <TableCell>Yellow Cards</TableCell>
                          <TableCell>Red Cards</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell>{player.appearances || 0}</TableCell>
                          <TableCell>{player.minutes || 0}</TableCell>
                          <TableCell>{player.goals || 0}</TableCell>
                          <TableCell>{player.assists || 0}</TableCell>
                          {/* Display the position-specific stats */}
                          {/* {renderPositionSpecificStats(player.position)?.stats} */}
                          <TableCell>{player.yellows || 0}</TableCell>
                          <TableCell>{player.reds || 0}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <Typography
                    variant="h5"
                    color={colors.grey[100]}
                    marginTop={10}
                  >
                    Scoring and Chance Creation Stats
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
                            <TableCell align="left">Scoring Stats</TableCell>
                            <TableCell align="left">Per Game</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableRow>
                            <TableCell align="left">
                              <Typography variant="h6" color={colors.grey[100]}>
                                Scored
                              </Typography>
                            </TableCell>
                            <TableCell align="left">
                              <Typography variant="h6" color={colors.grey[100]}>
                                {(player.goals / player.appearances).toFixed(
                                  2
                                ) || 0}
                              </Typography>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell align="left">
                              <Typography variant="h6" color={colors.grey[100]}>
                                Shots
                              </Typography>
                            </TableCell>
                            <TableCell align="left">
                              <Typography variant="h6" color={colors.grey[100]}>
                                {(
                                  player.totalShots / player.appearances
                                ).toFixed(2) || 0}
                              </Typography>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell align="left">
                              <Typography variant="h6" color={colors.grey[100]}>
                                Shooting Accuracy %
                              </Typography>
                            </TableCell>
                            <TableCell align="left">
                              <Typography variant="h6" color={colors.grey[100]}>
                                {player.shotsOnTarget !== 0
                                  ? (
                                      (player.shotsOnTarget /
                                        player.totalShots) *
                                      100
                                    ).toFixed(2)
                                  : 0}
                                %
                              </Typography>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell align="left">
                              <Typography variant="h6" color={colors.grey[100]}>
                                Big Chances Missed
                              </Typography>
                            </TableCell>
                            <TableCell align="left">
                              <Typography variant="h6" color={colors.grey[100]}>
                                {(
                                  player.bigChancesMissed / player.appearances
                                ).toFixed(2) || 0}
                              </Typography>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell align="left">
                              <Typography variant="h6" color={colors.grey[100]}>
                                Aerials Won
                              </Typography>
                            </TableCell>
                            <TableCell align="left">
                              <Typography variant="h6" color={colors.grey[100]}>
                                {(
                                  player.aerialsWon / player.appearances
                                ).toFixed(2) || 0}
                              </Typography>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell align="left">
                              <Typography variant="h6" color={colors.grey[100]}>
                                Offsides
                              </Typography>
                            </TableCell>
                            <TableCell align="left">
                              <Typography variant="h6" color={colors.grey[100]}>
                                {(player.offsides / player.appearances).toFixed(
                                  2
                                ) || 0}
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
                            <TableCell align="left">
                              Chance Creation Stats
                            </TableCell>
                            <TableCell align="left">Per Game</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableRow>
                            <TableCell align="left">
                              <Typography variant="h6" color={colors.grey[100]}>
                                Key Passes
                              </Typography>
                            </TableCell>
                            <TableCell align="left">
                              <Typography variant="h6" color={colors.grey[100]}>
                                {(
                                  player.keyPasses / player.appearances
                                ).toFixed(2) || 0}
                              </Typography>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell align="left">
                              <Typography variant="h6" color={colors.grey[100]}>
                                Big Chances Created
                              </Typography>
                            </TableCell>
                            <TableCell align="left">
                              <Typography variant="h6" color={colors.grey[100]}>
                                {(
                                  player.bigChancesCreated / player.appearances
                                ).toFixed(2) || 0}
                              </Typography>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell align="left">
                              <Typography variant="h6" color={colors.grey[100]}>
                                Crosses
                              </Typography>
                            </TableCell>
                            <TableCell align="left">
                              <Typography variant="h6" color={colors.grey[100]}>
                                {(
                                  player.totalCrosses / player.appearances
                                ).toFixed(2) || 0}
                              </Typography>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell align="left">
                              <Typography variant="h6" color={colors.grey[100]}>
                                Crossing Accuracy %
                              </Typography>
                            </TableCell>
                            <TableCell align="left">
                              <Typography variant="h6" color={colors.grey[100]}>
                                {player.accurateCrosses !== 0
                                  ? (
                                      (player.accurateCrosses /
                                        player.totalCrosses) *
                                      100
                                    ).toFixed(2)
                                  : 0}
                                %
                              </Typography>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell align="left">
                              <Typography variant="h6" color={colors.grey[100]}>
                                Through Balls
                              </Typography>
                            </TableCell>
                            <TableCell align="left">
                              <Typography variant="h6" color={colors.grey[100]}>
                                {(
                                  player.throughBalls / player.appearances
                                ).toFixed(2) || 0}
                              </Typography>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell align="left">
                              <Typography variant="h6" color={colors.grey[100]}>
                                Through Ball Accuracy %
                              </Typography>
                            </TableCell>
                            <TableCell align="left">
                              <Typography variant="h6" color={colors.grey[100]}>
                                {player.throughBallsWon !== 0
                                  ? (
                                      (player.throughBallsWon /
                                        player.throughBalls) *
                                      100
                                    ).toFixed(2)
                                  : 0}
                              </Typography>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Box>
                  <Typography
                    variant="h5"
                    color={colors.grey[100]}
                    marginTop={10}
                  >
                    Dribbling and Passing Stats
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
                            <TableCell align="left">Dribbling Stats</TableCell>
                            <TableCell align="left">Per Game</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableRow>
                            <TableCell align="left">
                              <Typography variant="h6" color={colors.grey[100]}>
                                Dribble Attempts
                              </Typography>
                            </TableCell>
                            <TableCell align="left">
                              <Typography variant="h6" color={colors.grey[100]}>
                                {(
                                  player.dribbleAttempts / player.appearances
                                ).toFixed(2) || 0}
                              </Typography>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell align="left">
                              <Typography variant="h6" color={colors.grey[100]}>
                                Successful Dribbles
                              </Typography>
                            </TableCell>
                            <TableCell align="left">
                              <Typography variant="h6" color={colors.grey[100]}>
                                {(
                                  player.dribbledPast / player.appearances
                                ).toFixed(2) || 0}
                              </Typography>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell align="left">
                              <Typography variant="h6" color={colors.grey[100]}>
                                Dribble Success %
                              </Typography>
                            </TableCell>
                            <TableCell align="left">
                              <Typography variant="h6" color={colors.grey[100]}>
                                {player.dribbledPast !== 0
                                  ? (
                                      (player.dribbledPast /
                                        player.dribbleAttempts) *
                                      100
                                    ).toFixed(2)
                                  : 0}
                                %
                              </Typography>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell align="left">
                              <Typography variant="h6" color={colors.grey[100]}>
                                Fouls Drawn
                              </Typography>
                            </TableCell>
                            <TableCell align="left">
                              <Typography variant="h6" color={colors.grey[100]}>
                                {(
                                  player.foulsDrawn / player.appearances
                                ).toFixed(2) || 0}
                              </Typography>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell align="left">
                              <Typography variant="h6" color={colors.grey[100]}>
                                Dispossessed
                              </Typography>
                            </TableCell>
                            <TableCell align="left">
                              <Typography variant="h6" color={colors.grey[100]}>
                                {(
                                  player.dispossessed / player.appearances
                                ).toFixed(2) || 0}
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
                            <TableCell align="left">Passing Stats</TableCell>
                            <TableCell align="left">Per Game</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableRow>
                            <TableCell align="left">
                              <Typography variant="h6" color={colors.grey[100]}>
                                Passes
                              </Typography>
                            </TableCell>
                            <TableCell align="left">
                              <Typography variant="h6" color={colors.grey[100]}>
                                {(player.passes / player.appearances).toFixed(
                                  2
                                ) || 0}
                              </Typography>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell align="left">
                              <Typography variant="h6" color={colors.grey[100]}>
                                Accurate Passes
                              </Typography>
                            </TableCell>
                            <TableCell align="left">
                              <Typography variant="h6" color={colors.grey[100]}>
                                {(
                                  player.accuratePasses / player.appearances
                                ).toFixed(2) || 0}
                              </Typography>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell align="left">
                              <Typography variant="h6" color={colors.grey[100]}>
                                Accurate Passes %
                              </Typography>
                            </TableCell>
                            <TableCell align="left">
                              <Typography variant="h6" color={colors.grey[100]}>
                                {player.accuratePassesPercentage.toFixed(2) ||
                                  0}
                                %
                              </Typography>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell align="left">
                              <Typography variant="h6" color={colors.grey[100]}>
                                Long Balls
                              </Typography>
                            </TableCell>
                            <TableCell align="left">
                              <Typography variant="h6" color={colors.grey[100]}>
                                {(
                                  player.longBalls / player.appearances
                                ).toFixed(2) || 0}
                              </Typography>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell align="left">
                              <Typography variant="h6" color={colors.grey[100]}>
                                Long Ball Accuracy %
                              </Typography>
                            </TableCell>
                            <TableCell align="left">
                              <Typography variant="h6" color={colors.grey[100]}>
                                {player.longBallsWon !== 0
                                  ? (
                                      (player.longBallsWon / player.longBalls) *
                                      100
                                    ).toFixed(2)
                                  : 0}
                                %
                              </Typography>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Box>
                </React.Fragment>
              )}
              {player.alternatePosition === "Midfielder" && (
                <React.Fragment>
                  <Typography variant="h5" color={colors.grey[100]}>
                    Season Overview
                  </Typography>
                  <TableContainer>
                    <Table
                      sx={{
                        bgcolor: colors.primary[400],
                        marginTop: "30px",
                        width: "80%",
                      }}
                    >
                      <TableHead>
                        <TableRow>
                          <TableCell>Appearances</TableCell>
                          <TableCell>Minutes Played</TableCell>
                          <TableCell>Goals</TableCell>
                          <TableCell>Assists</TableCell>
                          {/* Add the table headers specific to the player's position */}
                          {/* {renderPositionSpecificStats(player.position)?.headers} */}
                          <TableCell>Yellow Cards</TableCell>
                          <TableCell>Red Cards</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell>{player.appearances || 0}</TableCell>
                          <TableCell>{player.minutes || 0}</TableCell>
                          <TableCell>{player.goals || 0}</TableCell>
                          <TableCell>{player.assists || 0}</TableCell>
                          {/* Display the position-specific stats */}
                          {/* {renderPositionSpecificStats(player.position)?.stats} */}
                          <TableCell>{player.yellows || 0}</TableCell>
                          <TableCell>{player.reds || 0}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <Typography
                    variant="h5"
                    color={colors.grey[100]}
                    marginTop={10}
                  >
                    Scoring and Chance Creation Stats
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
                            <TableCell align="left">Scoring Stats</TableCell>
                            <TableCell align="left">Per Game</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableRow>
                            <TableCell align="left">
                              <Typography variant="h6" color={colors.grey[100]}>
                                Scored
                              </Typography>
                            </TableCell>
                            <TableCell align="left">
                              <Typography variant="h6" color={colors.grey[100]}>
                                {(player.goals / player.appearances).toFixed(
                                  2
                                ) || 0}
                              </Typography>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell align="left">
                              <Typography variant="h6" color={colors.grey[100]}>
                                Shots
                              </Typography>
                            </TableCell>
                            <TableCell align="left">
                              <Typography variant="h6" color={colors.grey[100]}>
                                {(
                                  player.totalShots / player.appearances
                                ).toFixed(2) || 0}
                              </Typography>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell align="left">
                              <Typography variant="h6" color={colors.grey[100]}>
                                Shooting Accuracy %
                              </Typography>
                            </TableCell>
                            <TableCell align="left">
                              <Typography variant="h6" color={colors.grey[100]}>
                                {player.shotsOnTarget !== 0
                                  ? (
                                      (player.shotsOnTarget /
                                        player.totalShots) *
                                      100
                                    ).toFixed(2)
                                  : 0}
                                %
                              </Typography>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell align="left">
                              <Typography variant="h6" color={colors.grey[100]}>
                                Big Chances Missed
                              </Typography>
                            </TableCell>
                            <TableCell align="left">
                              <Typography variant="h6" color={colors.grey[100]}>
                                {(
                                  player.bigChancesMissed / player.appearances
                                ).toFixed(2) || 0}
                              </Typography>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell align="left">
                              <Typography variant="h6" color={colors.grey[100]}>
                                Aerials Won
                              </Typography>
                            </TableCell>
                            <TableCell align="left">
                              <Typography variant="h6" color={colors.grey[100]}>
                                {(
                                  player.aerialsWon / player.appearances
                                ).toFixed(2) || 0}
                              </Typography>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell align="left">
                              <Typography variant="h6" color={colors.grey[100]}>
                                Offsides
                              </Typography>
                            </TableCell>
                            <TableCell align="left">
                              <Typography variant="h6" color={colors.grey[100]}>
                                {(player.offsides / player.appearances).toFixed(
                                  2
                                ) || 0}
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
                            <TableCell align="left">
                              Chance Creation Stats
                            </TableCell>
                            <TableCell align="left">Per Game</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableRow>
                            <TableCell align="left">
                              <Typography variant="h6" color={colors.grey[100]}>
                                Key Passes
                              </Typography>
                            </TableCell>
                            <TableCell align="left">
                              <Typography variant="h6" color={colors.grey[100]}>
                                {(
                                  player.keyPasses / player.appearances
                                ).toFixed(2) || 0}
                              </Typography>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell align="left">
                              <Typography variant="h6" color={colors.grey[100]}>
                                Big Chances Created
                              </Typography>
                            </TableCell>
                            <TableCell align="left">
                              <Typography variant="h6" color={colors.grey[100]}>
                                {(
                                  player.bigChancesCreated / player.appearances
                                ).toFixed(2) || 0}
                              </Typography>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell align="left">
                              <Typography variant="h6" color={colors.grey[100]}>
                                Crosses
                              </Typography>
                            </TableCell>
                            <TableCell align="left">
                              <Typography variant="h6" color={colors.grey[100]}>
                                {(
                                  player.totalCrosses / player.appearances
                                ).toFixed(2) || 0}
                              </Typography>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell align="left">
                              <Typography variant="h6" color={colors.grey[100]}>
                                Crossing Accuracy %
                              </Typography>
                            </TableCell>
                            <TableCell align="left">
                              <Typography variant="h6" color={colors.grey[100]}>
                                {player.accurateCrosses !== 0
                                  ? (
                                      (player.accurateCrosses /
                                        player.totalCrosses) *
                                      100
                                    ).toFixed(2)
                                  : 0}
                                %
                              </Typography>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell align="left">
                              <Typography variant="h6" color={colors.grey[100]}>
                                Through Balls
                              </Typography>
                            </TableCell>
                            <TableCell align="left">
                              <Typography variant="h6" color={colors.grey[100]}>
                                {(
                                  player.throughBalls / player.appearances
                                ).toFixed(2) || 0}
                              </Typography>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell align="left">
                              <Typography variant="h6" color={colors.grey[100]}>
                                Through Ball Accuracy %
                              </Typography>
                            </TableCell>
                            <TableCell align="left">
                              <Typography variant="h6" color={colors.grey[100]}>
                                {player.throughBallsWon !== 0
                                  ? (
                                      (player.throughBallsWon /
                                        player.throughBalls) *
                                      100
                                    ).toFixed(2)
                                  : 0}
                              </Typography>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Box>
                  <Typography
                    variant="h5"
                    color={colors.grey[100]}
                    marginTop={10}
                  >
                    Dribbling and Passing Stats
                  </Typography>
                  <Box
                    display="flex"
                    width="80%"
                    marginTop={3}
                    marginBottom={6}
                  >
                    <TableContainer>
                      <Table
                        sx={{
                          bgcolor: colors.primary[400],
                          width: "90%",
                        }}
                      >
                        <TableHead>
                          <TableRow>
                            <TableCell align="left">Dribbling Stats</TableCell>
                            <TableCell align="left">Per Game</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableRow>
                            <TableCell align="left">
                              <Typography variant="h6" color={colors.grey[100]}>
                                Dribble Attempts
                              </Typography>
                            </TableCell>
                            <TableCell align="left">
                              <Typography variant="h6" color={colors.grey[100]}>
                                {(
                                  player.dribbleAttempts / player.appearances
                                ).toFixed(2) || 0}
                              </Typography>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell align="left">
                              <Typography variant="h6" color={colors.grey[100]}>
                                Successful Dribbles
                              </Typography>
                            </TableCell>
                            <TableCell align="left">
                              <Typography variant="h6" color={colors.grey[100]}>
                                {(
                                  player.dribbledPast / player.appearances
                                ).toFixed(2) || 0}
                              </Typography>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell align="left">
                              <Typography variant="h6" color={colors.grey[100]}>
                                Dribble Success %
                              </Typography>
                            </TableCell>
                            <TableCell align="left">
                              <Typography variant="h6" color={colors.grey[100]}>
                                {player.dribbledPast !== 0
                                  ? (
                                      (player.dribbledPast /
                                        player.dribbleAttempts) *
                                      100
                                    ).toFixed(2)
                                  : 0}
                                %
                              </Typography>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell align="left">
                              <Typography variant="h6" color={colors.grey[100]}>
                                Fouls Drawn
                              </Typography>
                            </TableCell>
                            <TableCell align="left">
                              <Typography variant="h6" color={colors.grey[100]}>
                                {(
                                  player.foulsDrawn / player.appearances
                                ).toFixed(2) || 0}
                              </Typography>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell align="left">
                              <Typography variant="h6" color={colors.grey[100]}>
                                Dispossessed
                              </Typography>
                            </TableCell>
                            <TableCell align="left">
                              <Typography variant="h6" color={colors.grey[100]}>
                                {(
                                  player.dispossessed / player.appearances
                                ).toFixed(2) || 0}
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
                            <TableCell align="left">Passing Stats</TableCell>
                            <TableCell align="left">Per Game</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableRow>
                            <TableCell align="left">
                              <Typography variant="h6" color={colors.grey[100]}>
                                Passes
                              </Typography>
                            </TableCell>
                            <TableCell align="left">
                              <Typography variant="h6" color={colors.grey[100]}>
                                {(player.passes / player.appearances).toFixed(
                                  2
                                ) || 0}
                              </Typography>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell align="left">
                              <Typography variant="h6" color={colors.grey[100]}>
                                Accurate Passes
                              </Typography>
                            </TableCell>
                            <TableCell align="left">
                              <Typography variant="h6" color={colors.grey[100]}>
                                {(
                                  player.accuratePasses / player.appearances
                                ).toFixed(2) || 0}
                              </Typography>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell align="left">
                              <Typography variant="h6" color={colors.grey[100]}>
                                Accurate Passes %
                              </Typography>
                            </TableCell>
                            <TableCell align="left">
                              <Typography variant="h6" color={colors.grey[100]}>
                                {player.accuratePassesPercentage.toFixed(2) ||
                                  0}
                                %
                              </Typography>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell align="left">
                              <Typography variant="h6" color={colors.grey[100]}>
                                Long Balls
                              </Typography>
                            </TableCell>
                            <TableCell align="left">
                              <Typography variant="h6" color={colors.grey[100]}>
                                {(
                                  player.longBalls / player.appearances
                                ).toFixed(2) || 0}
                              </Typography>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell align="left">
                              <Typography variant="h6" color={colors.grey[100]}>
                                Long Ball Accuracy %
                              </Typography>
                            </TableCell>
                            <TableCell align="left">
                              <Typography variant="h6" color={colors.grey[100]}>
                                {player.longBallsWon !== 0
                                  ? (
                                      (player.longBallsWon / player.longBalls) *
                                      100
                                    ).toFixed(2)
                                  : 0}
                                %
                              </Typography>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Box>
                  <Typography variant="h5" color={colors.grey[100]}>
                    Defending Stats Per Game
                  </Typography>
                  <TableContainer>
                    <Table
                      sx={{
                        bgcolor: colors.primary[400],
                        marginTop: "30px",
                        width: "80%",
                      }}
                    >
                      <TableHead>
                        <TableRow>
                          <TableCell>Tackles</TableCell>
                          <TableCell>Interceptions</TableCell>
                          <TableCell>Blocked Shots</TableCell>
                          <TableCell>Clearances</TableCell>
                          {/* Add the table headers specific to the player's position */}
                          {/* {renderPositionSpecificStats(player.position)?.headers} */}
                          <TableCell>Goals Conceded</TableCell>
                          <TableCell>Errors To Goal</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell>
                            {(player.tackles / player.appearances).toFixed(2) ||
                              0}
                          </TableCell>
                          <TableCell>
                            {(
                              player.interceptions / player.appearances
                            ).toFixed(2) || 0}
                          </TableCell>
                          <TableCell>
                            {(player.blockedShots / player.appearances).toFixed(
                              2
                            ) || 0}
                          </TableCell>
                          <TableCell>
                            {(player.clearances / player.appearances).toFixed(
                              2
                            ) || 0}
                          </TableCell>
                          {/* Display the position-specific stats */}
                          {/* {renderPositionSpecificStats(player.position)?.stats} */}
                          <TableCell>
                            {(
                              player.goalsConceded / player.appearances
                            ).toFixed(2) || 0}
                          </TableCell>
                          <TableCell>
                            {(player.errorsToGoal / player.appearances).toFixed(
                              2
                            ) || 0}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </React.Fragment>
              )}
              {player.alternatePosition === "Defender" && (
                <React.Fragment>
                  <Typography variant="h5" color={colors.grey[100]}>
                    Season Overview
                  </Typography>
                  <TableContainer>
                    <Table
                      sx={{
                        bgcolor: colors.primary[400],
                        marginTop: "30px",
                        width: "80%",
                      }}
                    >
                      <TableHead>
                        <TableRow>
                          <TableCell>Appearances</TableCell>
                          <TableCell>Minutes Played</TableCell>
                          <TableCell>Goals</TableCell>
                          <TableCell>Assists</TableCell>
                          {/* Add the table headers specific to the player's position */}
                          {/* {renderPositionSpecificStats(player.position)?.headers} */}
                          <TableCell>Yellow Cards</TableCell>
                          <TableCell>Red Cards</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell>{player.appearances || 0}</TableCell>
                          <TableCell>{player.minutes || 0}</TableCell>
                          <TableCell>{player.goals || 0}</TableCell>
                          <TableCell>{player.assists || 0}</TableCell>
                          {/* Display the position-specific stats */}
                          {/* {renderPositionSpecificStats(player.position)?.stats} */}
                          <TableCell>{player.yellows || 0}</TableCell>
                          <TableCell>{player.reds || 0}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <Typography
                    variant="h5"
                    color={colors.grey[100]}
                    marginTop={10}
                  >
                    Defending and Chance Creation Stats
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
                            <TableCell align="left">Defending Stats</TableCell>
                            <TableCell align="left">Per Game</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableRow>
                            <TableCell align="left">
                              <Typography variant="h6" color={colors.grey[100]}>
                                Tackles
                              </Typography>
                            </TableCell>
                            <TableCell align="left">
                              <Typography variant="h6" color={colors.grey[100]}>
                                {(player.tackles / player.appearances).toFixed(
                                  2
                                ) || 0}
                              </Typography>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell align="left">
                              <Typography variant="h6" color={colors.grey[100]}>
                                Interceptions
                              </Typography>
                            </TableCell>
                            <TableCell align="left">
                              <Typography variant="h6" color={colors.grey[100]}>
                                {(
                                  player.interceptions / player.appearances
                                ).toFixed(2) || 0}
                              </Typography>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell align="left">
                              <Typography variant="h6" color={colors.grey[100]}>
                                Blocked Shots
                              </Typography>
                            </TableCell>
                            <TableCell align="left">
                              <Typography variant="h6" color={colors.grey[100]}>
                                {(
                                  player.blockedShots / player.appearances
                                ).toFixed(2) || 0}
                              </Typography>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell align="left">
                              <Typography variant="h6" color={colors.grey[100]}>
                                Clearances
                              </Typography>
                            </TableCell>
                            <TableCell align="left">
                              <Typography variant="h6" color={colors.grey[100]}>
                                {(
                                  player.clearances / player.appearances
                                ).toFixed(2) || 0}
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
                                {(
                                  player.goalsConceded / player.appearances
                                ).toFixed(2) || 0}
                              </Typography>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell align="left">
                              <Typography variant="h6" color={colors.grey[100]}>
                                Errors To Goal
                              </Typography>
                            </TableCell>
                            <TableCell align="left">
                              <Typography variant="h6" color={colors.grey[100]}>
                                {(
                                  player.errorsToGoal / player.appearances
                                ).toFixed(2) || 0}
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
                            <TableCell align="left">
                              Chance Creation Stats
                            </TableCell>
                            <TableCell align="left">Per Game</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableRow>
                            <TableCell align="left">
                              <Typography variant="h6" color={colors.grey[100]}>
                                Key Passes
                              </Typography>
                            </TableCell>
                            <TableCell align="left">
                              <Typography variant="h6" color={colors.grey[100]}>
                                {(
                                  player.keyPasses / player.appearances
                                ).toFixed(2) || 0}
                              </Typography>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell align="left">
                              <Typography variant="h6" color={colors.grey[100]}>
                                Big Chances Created
                              </Typography>
                            </TableCell>
                            <TableCell align="left">
                              <Typography variant="h6" color={colors.grey[100]}>
                                {(
                                  player.bigChancesCreated / player.appearances
                                ).toFixed(2) || 0}
                              </Typography>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell align="left">
                              <Typography variant="h6" color={colors.grey[100]}>
                                Crosses
                              </Typography>
                            </TableCell>
                            <TableCell align="left">
                              <Typography variant="h6" color={colors.grey[100]}>
                                {(
                                  player.totalCrosses / player.appearances
                                ).toFixed(2) || 0}
                              </Typography>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell align="left">
                              <Typography variant="h6" color={colors.grey[100]}>
                                Crossing Accuracy %
                              </Typography>
                            </TableCell>
                            <TableCell align="left">
                              <Typography variant="h6" color={colors.grey[100]}>
                                {player.accurateCrosses !== 0
                                  ? (
                                      (player.accurateCrosses /
                                        player.totalCrosses) *
                                      100
                                    ).toFixed(2)
                                  : 0}
                                %
                              </Typography>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell align="left">
                              <Typography variant="h6" color={colors.grey[100]}>
                                Through Balls
                              </Typography>
                            </TableCell>
                            <TableCell align="left">
                              <Typography variant="h6" color={colors.grey[100]}>
                                {(
                                  player.throughBalls / player.appearances
                                ).toFixed(2) || 0}
                              </Typography>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell align="left">
                              <Typography variant="h6" color={colors.grey[100]}>
                                Through Ball Accuracy %
                              </Typography>
                            </TableCell>
                            <TableCell align="left">
                              <Typography variant="h6" color={colors.grey[100]}>
                                {player.throughBallsWon !== 0
                                  ? (
                                      (player.throughBallsWon /
                                        player.throughBalls) *
                                      100
                                    ).toFixed(2)
                                  : 0}
                              </Typography>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Box>
                  <Typography
                    variant="h5"
                    color={colors.grey[100]}
                    marginTop={10}
                  >
                    Dribbling and Passing Stats
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
                            <TableCell align="left">Dribbling Stats</TableCell>
                            <TableCell align="left">Per Game</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableRow>
                            <TableCell align="left">
                              <Typography variant="h6" color={colors.grey[100]}>
                                Dribble Attempts
                              </Typography>
                            </TableCell>
                            <TableCell align="left">
                              <Typography variant="h6" color={colors.grey[100]}>
                                {(
                                  player.dribbleAttempts / player.appearances
                                ).toFixed(2) || 0}
                              </Typography>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell align="left">
                              <Typography variant="h6" color={colors.grey[100]}>
                                Successful Dribbles
                              </Typography>
                            </TableCell>
                            <TableCell align="left">
                              <Typography variant="h6" color={colors.grey[100]}>
                                {(
                                  player.dribbledPast / player.appearances
                                ).toFixed(2) || 0}
                              </Typography>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell align="left">
                              <Typography variant="h6" color={colors.grey[100]}>
                                Dribble Success %
                              </Typography>
                            </TableCell>
                            <TableCell align="left">
                              <Typography variant="h6" color={colors.grey[100]}>
                                {player.dribbleAttempts !== 0
                                  ? (
                                      (player.dribbledPast /
                                        player.dribbleAttempts) *
                                      100
                                    ).toFixed(2)
                                  : 0}
                                %
                              </Typography>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell align="left">
                              <Typography variant="h6" color={colors.grey[100]}>
                                Fouls Drawn
                              </Typography>
                            </TableCell>
                            <TableCell align="left">
                              <Typography variant="h6" color={colors.grey[100]}>
                                {(
                                  player.foulsDrawn / player.appearances
                                ).toFixed(2) || 0}
                              </Typography>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell align="left">
                              <Typography variant="h6" color={colors.grey[100]}>
                                Dispossessed
                              </Typography>
                            </TableCell>
                            <TableCell align="left">
                              <Typography variant="h6" color={colors.grey[100]}>
                                {(
                                  player.dispossessed / player.appearances
                                ).toFixed(2) || 0}
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
                            <TableCell align="left">Passing Stats</TableCell>
                            <TableCell align="left">Per Game</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableRow>
                            <TableCell align="left">
                              <Typography variant="h6" color={colors.grey[100]}>
                                Passes
                              </Typography>
                            </TableCell>
                            <TableCell align="left">
                              <Typography variant="h6" color={colors.grey[100]}>
                                {(player.passes / player.appearances).toFixed(
                                  2
                                ) || 0}
                              </Typography>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell align="left">
                              <Typography variant="h6" color={colors.grey[100]}>
                                Accurate Passes
                              </Typography>
                            </TableCell>
                            <TableCell align="left">
                              <Typography variant="h6" color={colors.grey[100]}>
                                {(
                                  player.accuratePasses / player.appearances
                                ).toFixed(2) || 0}
                              </Typography>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell align="left">
                              <Typography variant="h6" color={colors.grey[100]}>
                                Accurate Passes %
                              </Typography>
                            </TableCell>
                            <TableCell align="left">
                              <Typography variant="h6" color={colors.grey[100]}>
                                {player.accuratePassesPercentage || 0}%
                              </Typography>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell align="left">
                              <Typography variant="h6" color={colors.grey[100]}>
                                Long Balls
                              </Typography>
                            </TableCell>
                            <TableCell align="left">
                              <Typography variant="h6" color={colors.grey[100]}>
                                {(
                                  player.longBalls / player.appearances
                                ).toFixed(2) || 0}
                              </Typography>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell align="left">
                              <Typography variant="h6" color={colors.grey[100]}>
                                Long Ball Accuracy %
                              </Typography>
                            </TableCell>
                            <TableCell align="left">
                              <Typography variant="h6" color={colors.grey[100]}>
                                {player.longBallsWon !== 0
                                  ? (
                                      (player.longBallsWon / player.longBalls) *
                                      100
                                    ).toFixed(2)
                                  : 0}
                                %
                              </Typography>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Box>
                </React.Fragment>
              )}
              {player.alternatePosition === "Goalkeeper" && (
                <React.Fragment>
                  <Typography variant="h5" color={colors.grey[100]}>
                    Season Overview
                  </Typography>
                  <TableContainer>
                    <Table
                      sx={{
                        bgcolor: colors.primary[400],
                        marginTop: "30px",
                        width: "80%",
                      }}
                    >
                      <TableHead>
                        <TableRow>
                          <TableCell>Appearances</TableCell>
                          <TableCell>Minutes Played</TableCell>
                          <TableCell>Goals</TableCell>
                          <TableCell>Assists</TableCell>
                          {/* Add the table headers specific to the player's position */}
                          {/* {renderPositionSpecificStats(player.position)?.headers} */}
                          <TableCell>Yellow Cards</TableCell>
                          <TableCell>Red Cards</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell>{player.appearances || 0}</TableCell>
                          <TableCell>{player.minutes || 0}</TableCell>
                          <TableCell>{player.goals || 0}</TableCell>
                          <TableCell>{player.assists || 0}</TableCell>
                          {/* Display the position-specific stats */}
                          {/* {renderPositionSpecificStats(player.position)?.stats} */}
                          <TableCell>{player.yellows || 0}</TableCell>
                          <TableCell>{player.reds || 0}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <Typography
                    variant="h5"
                    color={colors.grey[100]}
                    marginTop={10}
                  >
                    Goalkeeping and Defending Stats
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
                            <TableCell align="left">
                              Goalkeeping Stats
                            </TableCell>
                            <TableCell align="left">Per Game</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableRow>
                            <TableCell align="left">
                              <Typography variant="h6" color={colors.grey[100]}>
                                Saves
                              </Typography>
                            </TableCell>
                            <TableCell align="left">
                              <Typography variant="h6" color={colors.grey[100]}>
                                {(player.saves / player.appearances).toFixed(
                                  2
                                ) || 0}
                              </Typography>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell align="left">
                              <Typography variant="h6" color={colors.grey[100]}>
                                Save Percentage
                              </Typography>
                            </TableCell>
                            <TableCell align="left">
                              <Typography variant="h6" color={colors.grey[100]}>
                                {(
                                  (player.goalsConceded / player.saves) *
                                  100
                                ).toFixed(2) || 0}
                                %
                              </Typography>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell align="left">
                              <Typography variant="h6" color={colors.grey[100]}>
                                Saves Inside Box
                              </Typography>
                            </TableCell>
                            <TableCell align="left">
                              <Typography variant="h6" color={colors.grey[100]}>
                                {(
                                  player.savesInsideBox / player.appearances
                                ).toFixed(2) || 0}
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
                                {(
                                  player.goalsConceded / player.appearances
                                ).toFixed(2) || 0}
                              </Typography>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell align="left">
                              <Typography variant="h6" color={colors.grey[100]}>
                                Errors To Goal
                              </Typography>
                            </TableCell>
                            <TableCell align="left">
                              <Typography variant="h6" color={colors.grey[100]}>
                                {(
                                  player.errorsToGoal / player.appearances
                                ).toFixed(2) || 0}
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
                          width: "90%",
                        }}
                      >
                        <TableHead>
                          <TableRow>
                            <TableCell align="left">Defending Stats</TableCell>
                            <TableCell align="left">Per Game</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableRow>
                            <TableCell align="left">
                              <Typography variant="h6" color={colors.grey[100]}>
                                Tackles
                              </Typography>
                            </TableCell>
                            <TableCell align="left">
                              <Typography variant="h6" color={colors.grey[100]}>
                                {(player.tackles / player.appearances).toFixed(
                                  2
                                ) || 0}
                              </Typography>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell align="left">
                              <Typography variant="h6" color={colors.grey[100]}>
                                Interceptions
                              </Typography>
                            </TableCell>
                            <TableCell align="left">
                              <Typography variant="h6" color={colors.grey[100]}>
                                {(
                                  player.interceptions / player.appearances
                                ).toFixed(2) || 0}
                              </Typography>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell align="left">
                              <Typography variant="h6" color={colors.grey[100]}>
                                Blocked Shots
                              </Typography>
                            </TableCell>
                            <TableCell align="left">
                              <Typography variant="h6" color={colors.grey[100]}>
                                {(
                                  player.blockedShots / player.appearances
                                ).toFixed(2) || 0}
                              </Typography>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell align="left">
                              <Typography variant="h6" color={colors.grey[100]}>
                                Clearances
                              </Typography>
                            </TableCell>
                            <TableCell align="left">
                              <Typography variant="h6" color={colors.grey[100]}>
                                {(
                                  player.clearances / player.appearances
                                ).toFixed(2) || 0}
                              </Typography>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Box>
                  <Typography
                    variant="h5"
                    color={colors.grey[100]}
                    marginTop={10}
                  >
                    Dribbling and Passing Stats
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
                            <TableCell align="left">Dribbling Stats</TableCell>
                            <TableCell align="left">Per Game</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableRow>
                            <TableCell align="left">
                              <Typography variant="h6" color={colors.grey[100]}>
                                Dribble Attempts
                              </Typography>
                            </TableCell>
                            <TableCell align="left">
                              <Typography variant="h6" color={colors.grey[100]}>
                                {(
                                  player.dribbleAttempts / player.appearances
                                ).toFixed(2) || 0}
                              </Typography>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell align="left">
                              <Typography variant="h6" color={colors.grey[100]}>
                                Successful Dribbles
                              </Typography>
                            </TableCell>
                            <TableCell align="left">
                              <Typography variant="h6" color={colors.grey[100]}>
                                {(
                                  player.dribbledPast / player.appearances
                                ).toFixed(2) || 0}
                              </Typography>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell align="left">
                              <Typography variant="h6" color={colors.grey[100]}>
                                Dribble Success %
                              </Typography>
                            </TableCell>
                            <TableCell align="left">
                              <Typography variant="h6" color={colors.grey[100]}>
                                {parseFloat(player.dribbleAttempts) !== 0 &&
                                parseFloat(player.dribbledPast) !== 0
                                  ? (
                                      (parseFloat(player.dribbledPast) /
                                        parseFloat(player.dribbleAttempts)) *
                                      100
                                    ).toFixed(2)
                                  : parseFloat(player.dribbleAttempts) === 0
                                  ? 0
                                  : 0}{" "}
                                %
                              </Typography>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell align="left">
                              <Typography variant="h6" color={colors.grey[100]}>
                                Fouls Drawn
                              </Typography>
                            </TableCell>
                            <TableCell align="left">
                              <Typography variant="h6" color={colors.grey[100]}>
                                {(
                                  player.foulsDrawn / player.appearances
                                ).toFixed(2) || 0}
                              </Typography>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell align="left">
                              <Typography variant="h6" color={colors.grey[100]}>
                                Dispossessed
                              </Typography>
                            </TableCell>
                            <TableCell align="left">
                              <Typography variant="h6" color={colors.grey[100]}>
                                {(
                                  player.dispossessed / player.appearances
                                ).toFixed(2) || 0}
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
                            <TableCell align="left">Passing Stats</TableCell>
                            <TableCell align="left">Per Game</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableRow>
                            <TableCell align="left">
                              <Typography variant="h6" color={colors.grey[100]}>
                                Passes
                              </Typography>
                            </TableCell>
                            <TableCell align="left">
                              <Typography variant="h6" color={colors.grey[100]}>
                                {(player.passes / player.appearances).toFixed(
                                  2
                                ) || 0}
                              </Typography>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell align="left">
                              <Typography variant="h6" color={colors.grey[100]}>
                                Accurate Passes
                              </Typography>
                            </TableCell>
                            <TableCell align="left">
                              <Typography variant="h6" color={colors.grey[100]}>
                                {(
                                  player.accuratePasses / player.appearances
                                ).toFixed(2) || 0}
                              </Typography>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell align="left">
                              <Typography variant="h6" color={colors.grey[100]}>
                                Accurate Passes %
                              </Typography>
                            </TableCell>
                            <TableCell align="left">
                              <Typography variant="h6" color={colors.grey[100]}>
                                {player.accuratePassesPercentage || 0}%
                              </Typography>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell align="left">
                              <Typography variant="h6" color={colors.grey[100]}>
                                Long Balls
                              </Typography>
                            </TableCell>
                            <TableCell align="left">
                              <Typography variant="h6" color={colors.grey[100]}>
                                {(
                                  player.longBalls / player.appearances
                                ).toFixed(2) || 0}
                              </Typography>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell align="left">
                              <Typography variant="h6" color={colors.grey[100]}>
                                Long Ball Accuracy %
                              </Typography>
                            </TableCell>
                            <TableCell align="left">
                              <Typography variant="h6" color={colors.grey[100]}>
                                {player.longBallsWon !== 0
                                  ? (
                                      (player.longBallsWon / player.longBalls) *
                                      100
                                    ).toFixed(2)
                                  : 0}
                                %
                              </Typography>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Box>
                </React.Fragment>
              )}
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default PlayerDetails;
