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
            <h4>Year Founded: {team.founded} </h4>
            <h4>Country: {team.country} </h4>
            <h4>Stadium: {team.stadium_name} </h4>
            <h4>Capacity: {team.capacity} </h4>
          </div>
        </div>
      </Box>
    </Box>
  );
};

export default TeamDetails;
