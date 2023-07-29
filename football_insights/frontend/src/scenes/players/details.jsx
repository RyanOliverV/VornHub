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
      const response = await fetch("/api/playerstats/" + id);
      const data = await response.json();
      setPlayers(data);
    };

    fetchData();
  }, []);

  // Replace null values with '0'
  const playerWithDefaults = {
    appearances: player.appearances || 0,
    minutes: player.minutes || 0,
    rating : player.rating || 0,
    goals: player.goals || 0,
    assists: player.assists || 0,
    offsides : player.offsides || 0,
    totalShots: player.totalShots || 0,
    shotsOnTarget: player.shotsOnTarget || 0,
    shotsBlocked : player.shotsBlocked || 0,
    bigChancesMissed: player.bigChancesMissed || 0,
    passes: player.passes || 0,
    accuratePasses: player.accuratePasses || 0,
    accuratePassesPercentage: player.accuratePassesPercentage || 0,
    keyPasses: player.keyPasses || 0,
    bigChancesCreated: player.bigChancesCreated || 0,
    totalCrosses : player.totalCrosses || 0,
    accurateCrosses : player.accurateCrosses || 0,
    longBalls:  player.longBalls || 0,
    longBallsWon: player.longBallsWon || 0,
    throughBalls : player.throughBalls || 0,
    throughBallsWon : player.throughBallsWon || 0,
    dribbleAttempts: player.dribbleAttempts || 0,
    dribbledPast: player.dribbledPast || 0,
    dispossessed: player.dispossessed || 0,
    foulsDrawn: player.foulsDrawn || 0,
    totalDuels: player.totalDuels || 0,
    duelsWon: player.duelsWon || 0,
    aerialsWon: player.aerialsWon || 0,
    tackles: player.tackles || 0,
    interceptions: player.interceptions || 0,
    blockedShots : player.blockedShots || 0,
    clearances: player.clearances || 0,
    goalsConceded: player.goalsConceded || 0,
    fouls: player.fouls || 0,
    saves: player.saves || 0,
    savesInsideBox: player.savesInsideBox || 0,
    errorsToGoal: player.errorsToGoal || 0,
    yellows: player.yellows || 0,
    reds: player.reds || 0,
  };

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
        { label: "Fouls Drawn", key: "foulsDrawn"},
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
        { label: "Fouls Drawn", key: "foulsDrawn"},
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
        { label: "Fouls Drawn", key: "foulsDrawn"},
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
        { label: "Fouls Drawn", key: "foulsDrawn"},
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
        { label: "Aerials Won", key: "aerialsWon"},
        { label: "Goals Conceded", key: "goalsConceded"},
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
        { label: "Fouls Drawn", key: "foulsDrawn"},
        { label: "Total Duels", key: "totalDuels" },
        { label: "Duels Won", key: "duelsWon" },
        { label: "Tackles", key: "tackles" },
        { label: "Interceptions", key: "interceptions" },
        { label: "Blocked Shots", key: "blockedShots" },
        { label: "Clearances", key: "clearances" },
        { label: "Aerials Won", key: "aerialsWon"},
        { label: "Goals Conceded", key: "goalsConceded"},
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
        { label: "Aerials Won", key: "aerialsWon"},
        { label: "Goals Conceded", key: "goalsConceded"},
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
        { label: "Aerials Won", key: "aerialsWon"},
        { label: "Goals Conceded", key: "goalsConceded"},
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
        { label: "Aerials Won", key: "aerialsWon"},
        { label: "Goals Conceded", key: "goalsConceded"},
        { label: "Fouls", key: "fouls" },
      ],
    },
    "Goalkeeper": {
      stats: [
        { label: "Passes", key: "passes" },
        { label: "Accurate Passes", key: "accuratePasses" },
        { label: "Accurate Passes %", key: "accuratePassesPercentage" },
        { label: "Long Balls", key: "longBalls" },
        { label: "Long Balls Won", key: "longBallsWon" },
        { label: "Goals Conceded", key: "goalsConceded"},
        { label: "Errors Leading to Goal", key: "errorsToGoal"},
        { label: "Saves", key: "saves" },
        { label: "Saves Inside Box", key: "savesInsideBox" },
      ],
    },
  };

  // Define a function to render position-specific stats and headers
  const renderPositionSpecificStats = (position) => {
    if (!position || !positionStatsMapping.hasOwnProperty(position)) return null;

    const positionData = positionStatsMapping[position];

    // Extract stats and headers from the positionData
    const stats = positionData.stats.map((stat) => (
      <TableCell key={stat.key}>{playerWithDefaults[stat.key]}</TableCell>
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
      flexDirection="column"
      style={{ overflow: "auto" }}
    >
      <Header
        title={player.name}
        subtitle={player.position}
        secondSubtitle={player.age}
      />
      <Box flexGrow={1}>
        <Box style={{ maxHeight: "80vh", overflow: "auto" }}>
          <TableContainer component={Paper}>
            <Table size="small" style={{ background: colors.primary[400] }}>
              <TableHead>
                <TableRow>
                  <TableCell>Appearances</TableCell>
                  <TableCell>Minutes Played</TableCell>
                  <TableCell>Goals</TableCell>
                  <TableCell>Assists</TableCell>
                  {/* Add the table headers specific to the player's position */}
                  {renderPositionSpecificStats(player.position)?.headers}
                  <TableCell>Yellow Cards</TableCell>
                  <TableCell>Red Cards</TableCell>
                  <TableCell>Rating</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>{playerWithDefaults.appearances}</TableCell>
                  <TableCell>{playerWithDefaults.minutes}</TableCell>
                  <TableCell>{playerWithDefaults.goals}</TableCell>
                  <TableCell>{playerWithDefaults.assists}</TableCell>
                  {/* Display the position-specific stats */}
                  {renderPositionSpecificStats(player.position)?.stats}
                  <TableCell>{playerWithDefaults.yellows}</TableCell>
                  <TableCell>{playerWithDefaults.reds}</TableCell>
                  <TableCell>{playerWithDefaults.rating}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Box>
  );
};

export default PlayerDetails;