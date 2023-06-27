import React, { useEffect, useState } from 'react';
import { Box } from "@mui/material";
import { Link } from "react-router-dom";

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
    <Box m="20px">
    <Box display="flex" justifyContent="space-between" alignItems="center">
    <div>
      {teams.map((team) => (
        <div key={team.id}>
          <h3>{team.name}</h3>
          <Link to={`/teams/${team.id}`}>View Details</Link>
        </div>
      ))}
    </div>
    </Box>
  </Box>
  );
};

export default TeamsList;
