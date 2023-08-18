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
import { tokens } from "../../theme";
import Header from "../../components/Header.jsx";

const FixtureDetails = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { id } = useParams(); // Fetch the fixture ID from the URL
  const [fixture, setFixture] = useState(null);
  const [headToHeadData, setHeadToHeadData] = useState(null);
  const [team1Data, setTeam1Data] = useState(null);
  const [team2Data, setTeam2Data] = useState(null);
  const [latestFixtures, setLatestFixtures] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [isLoading, setIsLoading] = useState(true); // Add loading indicator state

  useEffect(() => {
    // Fetch fixture data from your Django API
    const fetchFixtureData = async () => {
      try {
        const response = await fetch(`/api/fixtures/${id}`);
        const data = await response.json();
        setFixture(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false); // Update loading state regardless of success/failure
      }
    };

    fetchFixtureData();
  }, [id]);

  useEffect(() => {
    if (fixture && fixture.participants) {
      const { participants } = fixture;
      const team1Data_ID = participants[0].id;
      const team2Data_ID = participants[1].id;

      const fetchTeamData = async (teamID, setTeamData) => {
        try {
          const response = await fetch(`/api/teams/${teamID}`);
          const data = await response.json();
          setTeamData(data);
        } catch (error) {
          console.log(error);
        }
      };

      fetchTeamData(team1Data_ID, setTeam1Data);
      fetchTeamData(team2Data_ID, setTeam2Data);
    }
  }, [fixture]);

  useEffect(() => {
    // Fetch head-to-head data from your Django API
    if (fixture && !isLoading) {
      const { participants } = fixture;
      console.log('Fixture:', fixture);
      console.log('Participants:', participants);
      const team1Data_ID = participants[0].id;
      const team2Data_ID = participants[1].id;

      const fetchHeadToHeadData = async () => {
        try {
          const response = await fetch(
            `/api/fixtures/${team1Data_ID}/${team2Data_ID}`
          );
          const data = await response.json();
          setHeadToHeadData(data);
        } catch (error) {
          console.log(error);
        }
      };

      fetchHeadToHeadData();
    }
  }, [fixture]);

  useEffect(() => {
    // Fetch head-to-head data from your Django API
    if (fixture && !isLoading) {
      const { participants } = fixture;
      const team1Data_ID = participants[0].id;
      const team2Data_ID = participants[1].id;

      const fetchLatestFixtures = async () => {
        try {
          const response = await fetch(
            `/api/latest-fixtures/${team1Data_ID}/${team2Data_ID}`
          );
          const data = await response.json();

          // Sort the fixtures based on date in descending order
          data.sort((a, b) => new Date(b.date) - new Date(a.date));

          // Get only the last 5 fixtures
          const last5Fixtures = data.slice(0, 5);

          setLatestFixtures(last5Fixtures);
        } catch (error) {
          console.log(error);
        }
      };

      fetchLatestFixtures();
    }
  }, [fixture]);

  const date = fixture?.date;
  // Add a loading indicator or return null when data is still being fetched
  if (isLoading) {
    return <div>Loading...</div>;
  }

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
      <Header
        title="Head To Head"
        subtitle="Compare their stats over the last 10 years"
      />
      <Box style={{ width: "100%", maxWidth: 1000 }}>
        <Box
          marginTop="80px"
          height="20vh"
          display="flex"
          justifyContent="center"
        >
          <Grid marginTop={3} container spacing={1}>
            <Grid item xs={6} container alignItems="center">
              {/* Team 1 Logo */}
              <Grid item xs={12} sm={4} md={3} container justify="center">
                <img
                  src={headToHeadData?.team1_logo}
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
                  {headToHeadData?.team1_country}
                </Typography>
                <Typography variant="h5">{headToHeadData?.team1}</Typography>
              </Grid>

              {/* Team 1 Last 5 Results */}
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
                {headToHeadData?.team1_form.map((result, index) => (
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
            </Grid>

            <Grid item xs={6} container alignItems="center">
              {/* Team 2 Logo */}
              <Grid item xs={12} sm={4} md={3} container justify="center">
                <img
                  src={headToHeadData?.team2_logo}
                  alt="Team 2 Logo"
                  style={{ width: "80%", height: "auto" }}
                />
              </Grid>

              {/* Team 2 Name and Country */}
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
                  {headToHeadData?.team2_country}
                </Typography>
                <Typography variant="h5">{headToHeadData?.team2}</Typography>
              </Grid>

              {/* Team 2 Last 5 Results */}
              <Grid
                item
                xs={12}
                marginTop={1}
                container
                spacing={1}
                alignItems="center"
              >
                <Grid item marginRight={8}>
                  {/* Add some marginTop here */}
                  <Typography variant="h6" color={colors.grey[100]}>
                    Last 5 Results
                  </Typography>
                </Grid>
                {headToHeadData?.team2_form.map((result, index) => (
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
            </Grid>
            {/* Add Tabs */}
            <Grid item xs={12} marginTop={5}>
              <Tabs
                value={activeTab}
                onChange={(event, newValue) => setActiveTab(newValue)}
                TabIndicatorProps={{
                  style: {
                    backgroundColor: colors.grey[100], // Customize the color of the indicator
                  },
                }}
                sx={{
                  "& .MuiTab-root": {
                    color: colors.grey[200], // Customize the color of inactive tabs
                    "&.Mui-selected": {
                      color: colors.grey[100], // Customize the color of active tab
                    },
                  },
                }}
              >
                <Tab label="Season Overview" />
                <Tab label="Head To Head" />
              </Tabs>
            </Grid>

            {/* Add Tab Panels */}
            <Grid item xs={12}>
              {activeTab === 0 && (
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
                        <TableCell align="center">Overall Stats</TableCell>
                        <TableCell align="center">Season Overview</TableCell>
                        <TableCell align="center">Overall Stats</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell align="center">
                          <Typography variant="h6" color={colors.grey[100]}>
                            {team1Data?.matches_played}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Typography variant="h6" color={colors.grey[100]}>
                            Matches Played
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Typography variant="h6" color={colors.grey[100]}>
                            {team2Data?.matches_played}
                          </Typography>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell align="center">
                          <Typography variant="h6" color={colors.grey[100]}>
                            {team1Data?.wins}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Typography variant="h6" color={colors.grey[100]}>
                            Wins
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Typography variant="h6" color={colors.grey[100]}>
                            {team2Data?.wins}
                          </Typography>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell align="center">
                          <Typography variant="h6" color={colors.grey[100]}>
                            {team1Data?.draws}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Typography variant="h6" color={colors.grey[100]}>
                            Draws
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Typography variant="h6" color={colors.grey[100]}>
                            {team2Data?.draws}
                          </Typography>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell align="center">
                          <Typography variant="h6" color={colors.grey[100]}>
                            {team1Data?.losses}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Typography variant="h6" color={colors.grey[100]}>
                            Losses
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Typography variant="h6" color={colors.grey[100]}>
                            {team2Data?.losses}
                          </Typography>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell align="center">
                          <Typography variant="h6" color={colors.grey[100]}>
                            {headToHeadData?.team1_position}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Typography variant="h6" color={colors.grey[100]}>
                            League Position
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Typography variant="h6" color={colors.grey[100]}>
                          {headToHeadData?.team2_position}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
              {activeTab === 1 && (
                <TableContainer>
                  {/* Season Overview Table */}
                  <Table
                    sx={{
                      bgcolor: colors.primary[400],
                      marginTop: "30px",
                      width: "80%",
                    }}
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell align="center">Overall Stats</TableCell>
                        <TableCell align="center">Head To Head</TableCell>
                        <TableCell align="center">Overall Stats</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell align="center">
                          <Typography variant="h6" color={colors.grey[100]}>
                            {headToHeadData?.matches_played || 0}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Typography variant="h6" color={colors.grey[100]}>
                            Matches Played
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Typography variant="h6" color={colors.grey[100]}>
                            {headToHeadData?.matches_played || 0}
                          </Typography>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell align="center">
                          <Typography variant="h6" color={colors.grey[100]}>
                            {headToHeadData?.team1_wins || 0}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Typography variant="h6" color={colors.grey[100]}>
                            Wins
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Typography variant="h6" color={colors.grey[100]}>
                            {headToHeadData?.team2_wins || 0}
                          </Typography>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell align="center">
                          <Typography variant="h6" color={colors.grey[100]}>
                            {headToHeadData?.team1_draws || 0}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Typography variant="h6" color={colors.grey[100]}>
                            Draws
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Typography variant="h6" color={colors.grey[100]}>
                            {headToHeadData?.team2_draws || 0}
                          </Typography>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell align="center">
                          <Typography variant="h6" color={colors.grey[100]}>
                            {headToHeadData?.team1_losses || 0}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Typography variant="h6" color={colors.grey[100]}>
                            Losses
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Typography variant="h6" color={colors.grey[100]}>
                            {headToHeadData?.team2_losses || 0}
                          </Typography>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell align="center">
                          <Typography variant="h6" color={colors.grey[100]}>
                            {headToHeadData?.team1_goals_total || 0}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Typography variant="h6" color={colors.grey[100]}>
                            Goals Scored
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Typography variant="h6" color={colors.grey[100]}>
                            {headToHeadData?.team2_goals_total || 0}
                          </Typography>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell align="center">
                          <Typography variant="h6" color={colors.grey[100]}>
                            {headToHeadData?.team1_cleansheets || 0}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Typography variant="h6" color={colors.grey[100]}>
                            Clean Sheets
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Typography variant="h6" color={colors.grey[100]}>
                            {headToHeadData?.team2_cleansheets || 0}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
              <Typography marginTop={3} variant="h4" color={colors.grey[100]}>
                Recent Meetings
              </Typography>
            </Grid>
            <Grid container spacing={2} marginTop={1}>
              {latestFixtures.map((fixture) => (
                <Grid item xs={12} key={fixture.id}>
                  <Box border="1px solid white" overflow="hidden" width="80%">
                    <TableContainer>
                      <Table
                        sx={{
                          bgcolor: colors.primary[400],
                          width: "100%",
                        }}
                      >
                        <TableBody>
                          {/* Fixture Date Row */}
                          <TableRow>
                            <TableCell
                              align="center"
                              colSpan={3}
                              sx={{ borderBottom: "none" }} // Remove the bottom border for the header cell
                            >
                              {fixture.date}
                            </TableCell>
                          </TableRow>
                          {/* Fixture Time Row */}
                          <TableRow>
                            <TableCell
                              align="center"
                              sx={{
                                width: "40%",
                                fontSize: "0.9rem",
                              }}
                            >
                              <img
                                src={fixture.home_team_logo}
                                style={{
                                  margin: "5px",
                                  maxWidth: "30px",
                                  verticalAlign: "middle",
                                }}
                                alt="Team Logo"
                              />
                              {fixture.home_team}
                            </TableCell>
                            <TableCell
                              align="center"
                              sx={{
                                width: "20%",
                                fontSize: "0.9rem",
                              }}
                            >
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
                            </TableCell>
                            <TableCell
                              align="center"
                              sx={{
                                width: "40%",
                                fontSize: "0.9rem",
                              }}
                            >
                              <img
                                src={fixture.away_team_logo}
                                style={{
                                  margin: "5px",
                                  maxWidth: "30px",
                                  verticalAlign: "middle",
                                }}
                                alt="Team Logo"
                              />
                              {fixture.away_team}
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default FixtureDetails;
