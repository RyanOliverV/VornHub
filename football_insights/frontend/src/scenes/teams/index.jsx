import React, { useEffect, useState } from 'react';
import { Box, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

const TeamsList = () => {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
        const response = await fetch('/api/teams');
        const data = await response.json();
        setTeams(data);
    };

    fetchData();
  }, []);

  teams.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <Box
      m="20px 70px"
      height="80vh"
      display="flex"
      style={{ overflow: "auto", display: "flex"}}
    >
      <List>
        {teams.map((team) => (
          <Link to={`/teams/${team.id}`} style={{ textDecoration: 'none', color: 'inherit' }} key={team.id}>
            <ListItem disablePadding style={{ margin: '20px 0' }}>
              <ListItemButton>
                <Grid container alignItems="center" spacing={2}>
                  <Grid item>
                    <ListItemIcon>
                      <img src={team.logo} alt={team.name} style={{ maxWidth: '60px' }} />
                    </ListItemIcon>
                  </Grid>
                  <Grid item>
                    <ListItemText primary={team.name} />
                  </Grid>
                </Grid>
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </Box>
  );
};

export default TeamsList;
