import React, { useState, useEffect } from "react";
import { Typography, Box, useTheme, Grid } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import StyleIcon from "@mui/icons-material/Style";
import Header from "../../components/Header.jsx";
import { tokens } from "../../theme";

const topScorersData = [
  {
    title: "Top Scorer",
    name: "Lionel Messi",
    goals: 35,
    playerFaceUrl: "../../static/images/messi.jpg",
  },
  {
    title: "Top Scorer",
    name: "Cristiano Ronaldo",
    goals: 30,
    playerFaceUrl: '"../../static/images/ronaldo.jpeg"',
  },
];

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [players, setPlayers] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch data from different URLs in parallel
    const fetchPlayersData = async () => {
      try {
        const urls = [
          "/api/most-goals/",
          "/api/most-assists/",
          "/api/most-pens/",
          "/api/most-pens-missed/",
          "/api/most-yellow-cards/",
          "/api/most-red-cards/",
        ];
        const responses = await Promise.all(urls.map((url) => fetch(url)));
        const data = await Promise.all(
          responses.map((response) => response.json())
        );

        setPlayers({
          mostGoals: data[0],
          mostAssists: data[1],
          mostPens: data[2],
          mostPensMissed: data[3],
          mostYellowCards: data[4],
          mostRedCards: data[5],
        });
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlayersData();
  }, []);

  console.log(players);

  return (
    <Box
      m="20px 70px"
      height="80vh"
      display="flex"
      style={{ overflow: "auto", display: "flex", justifyContent: "center" }}
    >
      <Header title="DASHBOARD" subtitle="Welcome to Vorn Metrics" />
      <Box
        marginTop={14}
        height="20vh"
        style={{ width: "100%", maxWidth: 1200 }}
      >
        <Grid container spacing={4}>
          {/* First row */}
          <Grid container item xs={12} spacing={4}>
            <Grid item xs={12} sm={6} md={4}>
              {/* Second row */}
              <Card style={{ backgroundColor: colors.primary[400] }}>
                <CardHeader
                  avatar={
                    <Avatar>
                      <SportsSoccerIcon />
                    </Avatar>
                  }
                  title="Top Scorer"
                />
                <CardContent style={{ display: "flex", alignItems: "center" }}>
                  {players && players.mostGoals ? (
                    <>
                      <Avatar
                        alt={players.mostGoals.name}
                        src={players.mostGoals.logo}
                        sx={{ width: 120, height: 120, marginRight: 2 }}
                      />
                      <div>
                        <Typography variant="h5">
                          {players.mostGoals.name}
                        </Typography>
                        <Typography variant="h6" color={colors.primary[100]}>
                          Goals: {players.mostGoals.total}
                        </Typography>
                      </div>
                    </>
                  ) : (
                    <Typography variant="body1">
                      Top scorer data not available.
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card style={{ backgroundColor: colors.primary[400] }}>
                <CardHeader
                  avatar={
                    <Avatar>
                      <SportsSoccerIcon />
                    </Avatar>
                  }
                  title="Most Assists"
                />
                <CardContent style={{ display: "flex", alignItems: "center" }}>
                  {players && players.mostAssists ? (
                    <>
                      <Avatar
                        alt={players.mostAssists.name}
                        src={players.mostAssists.logo}
                        sx={{ width: 120, height: 120, marginRight: 2 }}
                      />
                      <div>
                        <Typography variant="h5">
                          {players.mostAssists.name}
                        </Typography>
                        <Typography variant="h6" color={colors.primary[100]}>
                          Assists: {players.mostAssists.total}
                        </Typography>
                      </div>
                    </>
                  ) : (
                    <Typography variant="body1">
                      Top scorer data not available.
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card style={{ backgroundColor: colors.primary[400] }}>
                <CardHeader
                  avatar={
                    <Avatar>
                      <SportsSoccerIcon />
                    </Avatar>
                  }
                  title="Most Penalties Scored"
                />
                <CardContent style={{ display: "flex", alignItems: "center" }}>
                  {players && players.mostPens ? (
                    <>
                      <Avatar
                        alt={players.mostPens.name}
                        src={players.mostPens.logo}
                        sx={{ width: 120, height: 120, marginRight: 2 }}
                      />
                      <div>
                        <Typography variant="h5">
                          {players.mostPens.name}
                        </Typography>
                        <Typography variant="h6" color={colors.primary[100]}>
                          Scored: {players.mostPens.total}
                        </Typography>
                      </div>
                    </>
                  ) : (
                    <Typography variant="body1">
                      Top scorer data not available.
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>
            {/* Add more cards for the first row... */}
          </Grid>
          <Grid container item xs={12} spacing={4}>
            <Grid item xs={12} sm={6} md={4}>
              {/* Second row */}
              <Card style={{ backgroundColor: colors.primary[400] }}>
                <CardHeader
                  avatar={
                    <Avatar>
                      <SportsSoccerIcon />
                    </Avatar>
                  }
                  title="Most Penalties Missed"
                />
                <CardContent style={{ display: "flex", alignItems: "center" }}>
                  {players && players.mostPensMissed ? (
                    <>
                      <Avatar
                        alt={players.mostPensMissed.name}
                        src={players.mostPensMissed.logo}
                        sx={{ width: 120, height: 120, marginRight: 2 }}
                      />
                      <div>
                        <Typography variant="h5">
                          {players.mostPensMissed.name}
                        </Typography>
                        <Typography variant="h6" color={colors.primary[100]}>
                          Missed: {players.mostPensMissed.total}
                        </Typography>
                      </div>
                    </>
                  ) : (
                    <Typography variant="body1">
                      Top scorer data not available.
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              {/* Second row */}
              <Card style={{ backgroundColor: colors.primary[400] }}>
                <CardHeader
                  avatar={
                    <Avatar>
                      <StyleIcon />
                    </Avatar>
                  }
                  title="Most Yellow Cards"
                />
                                <CardContent style={{ display: "flex", alignItems: "center" }}>
                  {players && players.mostYellowCards ? (
                    <>
                      <Avatar
                        alt={players.mostYellowCards.name}
                        src={players.mostYellowCards.logo}
                        sx={{ width: 120, height: 120, marginRight: 2 }}
                      />
                      <div>
                        <Typography variant="h5">
                          {players.mostYellowCards.name}
                        </Typography>
                        <Typography variant="h6" color={colors.primary[100]}>
                          Yellow Cards: {players.mostYellowCards.total}
                        </Typography>
                      </div>
                    </>
                  ) : (
                    <Typography variant="body1">
                      Top scorer data not available.
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card style={{ backgroundColor: colors.primary[400] }}>
                <CardHeader
                  avatar={
                    <Avatar>
                      <StyleIcon />
                    </Avatar>
                  }
                  title="Most Red Cards"
                />
                                                <CardContent style={{ display: "flex", alignItems: "center" }}>
                  {players && players.mostRedCards ? (
                    <>
                      <Avatar
                        alt={players.mostRedCards.name}
                        src={players.mostRedCards.logo}
                        sx={{ width: 120, height: 120, marginRight: 2 }}
                      />
                      <div>
                        <Typography variant="h5">
                          {players.mostRedCards.name}
                        </Typography>
                        <Typography variant="h6" color={colors.primary[100]}>
                          Red Cards: {players.mostRedCards.total}
                        </Typography>
                      </div>
                    </>
                  ) : (
                    <Typography variant="body1">
                      Top scorer data not available.
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>
            {/* Add more cards for the second row... */}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard;
