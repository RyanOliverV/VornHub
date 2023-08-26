import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  useTheme,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { styled } from "@mui/system";
import StadiumOutlinedIcon from "@mui/icons-material/StadiumOutlined";
import { tokens } from "../../theme";

const MatchPrediction = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const HoverTableRow = styled(TableRow)(({ theme }) => ({
    "&:hover": {
      backgroundColor: theme.palette.primary.light,
      cursor: "pointer",
    },
  }));

  const TeamTableCell = styled(TableCell)({
    width: "30%",
  });

  const ResultTableCell = styled(TableCell)({
    width: "15%",
  });

  const [fixtures, setFixtures] = useState([]);
  const [predictions, setPredictions] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/fixtures/");
        const data = await response.json();
        setFixtures(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchPredictionsData = async () => {
      try {
        const response = await fetch("/api/predictions/");
        const data = await response.json();
        setPredictions(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPredictionsData();
  }, []);

  // Group fixtures by date
  const groupedFixtures = {};

  fixtures.forEach((fixture) => {
    const date = fixture.date;
    if (!groupedFixtures[date]) {
      groupedFixtures[date] = [];
    }
    groupedFixtures[date].push(fixture);
  });

  const formatDate = (inputDate) => {
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };

    const dateParts = inputDate.split('/');
    const formattedDate = new Date(
      parseInt(dateParts[2]),
      parseInt(dateParts[1]) - 1,
      parseInt(dateParts[0])
    );

    return formattedDate.toLocaleDateString('en-US', options);
  };

  
  const getPredictionForFixture = (fixture, predictions) => {
    const matchingPrediction = predictions.find(
      prediction =>
        prediction.date === fixture.date &&
        ((prediction.team1 === fixture.team1 && prediction.team2 === fixture.team2) ||
        (prediction.team1 === fixture.team2 && prediction.team2 === fixture.team1))
    );
    return matchingPrediction || null;
  };

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

  return (
    <Box
      m="20px 70px"
      height="80vh"
      display="flex"
      style={{ overflow: "auto", display: "flex", justifyContent: "center" }}
    >
      <Box style={{ width: "100%", maxWidth: 1000 }}>
        <Box style={{ height: "90vh", paddingRight: "50px" }}>
          {Object.entries(groupedFixtures).map(([date, fixtures]) => (
            <div key={date}>
              <Typography m="20px 0px" variant="h4" component="h4">
                {formatDate(date)}
              </Typography>
              <TableContainer>
                <Table sx={{ bgcolor: colors.primary[400] }}>
                  {/* Table head */}
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">Home Team</TableCell>
                      <TableCell align="center">Home Prediction</TableCell>
                      <TableCell align="center">Result</TableCell>
                      <TableCell align="center">Away Prediction</TableCell>
                      <TableCell align="center">Away Team</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {fixtures.map((fixture) => {
                      const prediction = getPredictionForFixture(fixture, predictions);
                      return (
                        <HoverTableRow
                          key={fixture.id}
                          to={`/fixtures/${fixture.id}`}
                          style={{ textDecoration: "none", color: "inherit" }}
                        >
                          <TeamTableCell align="center">
                            <Link
                              to={`/fixtures/${fixture.id}`}
                              style={{ textDecoration: "none", color: "inherit" }}
                            >
                              <img
                                src={fixture.team1_logo}
                                style={{
                                  margin: "5px",
                                  maxWidth: "30px",
                                  verticalAlign: "middle",
                                }}
                                alt="Team Logo"
                              />
                              {fixture.team1}
                            </Link>
                          </TeamTableCell>
                          <ResultTableCell align="center">
                            {/* Render your result cell with prediction info */}
                            {prediction && (
                              <span style={{ color: getColorForResult(prediction.team1_prediction) }}>
                                {prediction.team1_prediction}
                              </span>
                            )}
                          </ResultTableCell>
                          <ResultTableCell align="center">
                        <Link
      to={`/fixtures/${fixture.id}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
                          {fixture.home_score === null &&
                            fixture.away_score === null ? (
                            <span
                              style={{
                                margin: "10px",
                                padding: "10px",
                                borderRadius: "4px",
                                border: `1px solid ${colors.primary[300]}`,
                                backgroundColor: colors.primary[400],
                                width: "100%",
                              }}
                            >
                              {fixture.time}
                            </span>
                          ) : (
                            <span
                              style={{
                                margin: "10px",
                                padding: "10px",
                                borderRadius: "4px",
                                border: `1px solid ${colors.primary[300]}`,
                                backgroundColor: colors.primary[400],
                                width: "100%",
                              }}
                            >
                              {fixture.home_score} - {fixture.away_score}
                            </span>
                          )}
                          </Link>
                        </ResultTableCell>
                          <ResultTableCell align="center">
                            {/* Render your result cell with prediction info */}
                            {prediction && (
                              <span style={{ color: getColorForResult(prediction.team2_prediction) }}>
                                {prediction.team2_prediction}
                              </span>
                            )}
                          </ResultTableCell>
                          <TeamTableCell align="center">
                            <Link
                              to={`/fixtures/${fixture.id}`}
                              style={{ textDecoration: "none", color: "inherit" }}
                            >
                              <img
                                src={fixture.team2_logo}
                                style={{
                                  margin: "5px",
                                  maxWidth: "30px",
                                  verticalAlign: "middle",
                                }}
                                alt="Team Logo"
                              />
                              {fixture.team2}
                            </Link>
                          </TeamTableCell>
                        </HoverTableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default MatchPrediction;
