import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";

const TeamDetails = () => {
  const { id } = useParams();
  const [team, setTeams] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/teamstats/" + id);
      const data = await response.json();
      setTeams(data);
    };

    fetchData();
  }, []);

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <div>
          <div>
            <h3>{team.name}</h3>
            <h4>Current Form: {team.current_form} </h4>
            <h4>Played Total: {team.played_total} </h4>
            <h4>Wins: {team.wins} </h4>
            <h4>Draws: {team.draws} </h4>
            <h4>Losses: {team.losses} </h4>
          </div>
        </div>
      </Box>
    </Box>
  );
};

export default TeamDetails;
