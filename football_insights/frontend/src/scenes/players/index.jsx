import React, { useEffect, useState, useRef } from 'react';
import { Box, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

const PlayersList = () => {
  const [players, setPlayers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const loadMoreRef = useRef(null);

  useEffect(() => {
    const fetchInitialPlayers = async () => {
      try {
        const response = await fetch('/api/players');
        const data = await response.json();
        const sortedPlayers = data.sort((a, b) => a.name.localeCompare(b.name));
        const initialPlayers = sortedPlayers.slice(0, 10);

        setPlayers(initialPlayers);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching initial players:', error);
      }
    };

    fetchInitialPlayers();
  }, []);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    };

    const handleObserver = (entries) => {
      const [entry] = entries;
      if (entry.isIntersecting && !isLoading) {
        loadMorePlayers();
      }
    };

    const observer = new IntersectionObserver(handleObserver, observerOptions);
    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [isLoading]);

  const loadMorePlayers = async () => {
    setIsLoading(true);

    try {
      const response = await fetch('/api/players');
      const data = await response.json();
      const sortedPlayers = data.sort((a, b) => a.name.localeCompare(b.name));
      const newPlayers = sortedPlayers.slice(players.length, players.length + 10);

      setPlayers((prevPlayers) => [...prevPlayers, ...newPlayers]);
      setIsLoading(false);
    } catch (error) {
      console.error('Error loading more players:', error);
      setIsLoading(false);
    }
  };

  return (
    <Box m="20px" style={{ height: '90vh', overflow: 'auto' }}>
      <List>
        {players.map((player) => (
          <Link to={`/players/${player.id}`} style={{ textDecoration: 'none', color: 'inherit' }} key={player.id}>
            <ListItem disablePadding style={{ margin: '20px 0' }}>
              <ListItemButton>
                <Grid container alignItems="center" spacing={2}>
                  <Grid item>
                    <ListItemIcon>
                      <img src={player.image} alt={player.name} style={{ maxWidth: '60px' }} />
                    </ListItemIcon>
                  </Grid>
                  <Grid item>
                    <ListItemText primary={player.name} />
                  </Grid>
                </Grid>
              </ListItemButton>
            </ListItem>
          </Link>
        ))}

        {isLoading && <div>Loading players...</div>}

        {!isLoading && (
          <div ref={loadMoreRef} style={{ height: '10px' }}>
            &nbsp;
          </div>
        )}
      </List>
    </Box>
  );
};

export default PlayersList;