import React from "react";
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
                  <Avatar
                    alt="Player 4"
                    src={topScorersData[0].playerFaceUrl}
                    sx={{ width: 120, height: 120, marginRight: 2 }}
                  />
                  <div>
                    <Typography variant="h5">Player 4</Typography>
                    <Typography variant="h6" color={colors.primary[100]}>
                      Goals: 20
                    </Typography>
                  </div>
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
                  <Avatar
                    alt="Player 1"
                    src={topScorersData[0].playerFaceUrl}
                    sx={{ width: 120, height: 120, marginRight: 2 }}
                  />
                  <div>
                    <Typography variant="h5">Player 1</Typography>
                    <Typography variant="h6" color={colors.primary[100]}>
                      Assists: 15
                    </Typography>
                  </div>
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
                  <Avatar
                    alt="Player 1"
                    src={topScorersData[0].playerFaceUrl}
                    sx={{ width: 120, height: 120, marginRight: 2 }}
                  />
                  <div>
                    <Typography variant="h5">Player 1</Typography>
                    <Typography variant="h6" color={colors.primary[100]}>
                      Scored: 15
                    </Typography>
                  </div>
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
                  <Avatar
                    alt="Player 4"
                    src={topScorersData[0].playerFaceUrl}
                    sx={{ width: 120, height: 120, marginRight: 2 }}
                  />
                  <div>
                    <Typography variant="h5">Player 4</Typography>
                    <Typography variant="h6" color={colors.primary[100]}>
                      Missed: 20
                    </Typography>
                  </div>
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
                  <Avatar
                    alt="Player 4"
                    src={topScorersData[0].playerFaceUrl}
                    sx={{ width: 120, height: 120, marginRight: 2 }}
                  />
                  <div>
                    <Typography variant="h5">Player 4</Typography>
                    <Typography variant="h6" color={colors.primary[100]}>
                      Yellow Cards: 20
                    </Typography>
                  </div>
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
                  <Avatar
                    alt="Player 4"
                    src={topScorersData[0].playerFaceUrl}
                    sx={{ width: 120, height: 120, marginRight: 2 }}
                  />
                  <div>
                    <Typography variant="h5">Player 4</Typography>
                    <Typography variant="h6" color={colors.primary[100]}>
                      Red Cards: 20
                    </Typography>
                  </div>
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
