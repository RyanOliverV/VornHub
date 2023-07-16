import React, { useState, useEffect } from "react";

const LiveStatsPage = ({ matchId }) => {
  const [liveStats, setLiveStats] = useState(null);

  useEffect(() => {
    // Function to fetch live stats data using matchId
    const fetchLiveStats = async () => {
      // Simulating an API request delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Fake live stats data
      const fakeData = {
        homeTeam: "Home Team",
        awayTeam: "Away Team",
        goals: 2,
        shots: 10,
        possession: 60,
      };

      setLiveStats(fakeData);
    };

    // Fetch live stats on component mount
    fetchLiveStats();

    // Set up an interval to periodically update live stats
    const interval = setInterval(fetchLiveStats, 5000);

    // Clean up the interval on component unmount
    return () => {
      clearInterval(interval);
    };
  }, [matchId]);

  return (
    <div>
      <h1>Live Stats</h1>
      {liveStats ? (
        <div>
          {/* Render live stats data */}
          <p>Home Team: {liveStats.homeTeam}</p>
          <p>Away Team: {liveStats.awayTeam}</p>
          <p>Goals: {liveStats.goals}</p>
          <p>Shots: {liveStats.shots}</p>
          <p>Possession: {liveStats.possession}%</p>
        </div>
      ) : (
        <p>Loading live stats...</p>
      )}
    </div>
  );
};

export default LiveStatsPage;