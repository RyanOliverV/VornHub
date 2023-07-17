import React, { useState, useEffect, useMemo } from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  useTheme,
  Button,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import CircularProgress from "@mui/material/CircularProgress";
import { Link } from "react-router-dom";
import { tokens } from "../../theme";
import Header from "../../components/Header.jsx";


const Forwards = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [centreforwards, setcentreforwards] = useState([]);
  const [wingers, setwingers] = useState([]);
  const [centreforwardsCurrentPage, setcentreforwardsCurrentPage] = useState(1);
  const [wingersCurrentPage, setwingersCurrentPage] = useState(1);
  const playersPerPage = 5;
  const [centreforwardsTotalCount, setcentreforwardsTotalCount] = useState(0);
  const [wingersTotalCount, setwingersTotalCount] = useState(0);
  const [centreforwardsStartIndex, setcentreforwardsStartIndex] = useState(0);
  const [wingersStartIndex, setwingersStartIndex] = useState(0);
  const [centreforwardsEndIndex, setcentreforwardsEndIndex] = useState(0);
  const [wingersEndIndex, setwingersEndIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [sortConfig, setSortConfig] = useState({
    key: "rating",
    direction: "asc",
  });

  const fetchCentreForwardPlayers = async () => {
    setLoading(true);
  
    const response = await fetch("/api/centreforwards/");
    const data = await response.json();
  
    const sortedPlayers = data.sort((a, b) => b.rating - a.rating);
  
    setcentreforwardsTotalCount(sortedPlayers.length);
  
    const newStartIndex = (centreforwardsCurrentPage - 1) * playersPerPage;
    const newEndIndex = newStartIndex + playersPerPage;
  
    const displayedPlayers = sortedPlayers.slice(newStartIndex, newEndIndex);
  
    const rankedPlayers = displayedPlayers.map((player, index) => {
      let rank = newStartIndex + index + 1;
      if (sortConfig.direction === "desc") {
        rank = newEndIndex - index;
      }
      return {
        ...player,
        rank: rank,
      };
    });
  
    setcentreforwards(rankedPlayers);
    setcentreforwardsStartIndex(newStartIndex);
    setcentreforwardsEndIndex(newEndIndex);
    setLoading(false);
  };
  
  const fetchWingerPlayers = async () => {
    setLoading(true);
  
    const response = await fetch("/api/wingers/");
    const data = await response.json();
  
    const sortedPlayers = data.sort((a, b) => b.rating - a.rating);
  
    setwingersTotalCount(sortedPlayers.length);
  
    const newStartIndex = (wingersCurrentPage - 1) * playersPerPage;
    const newEndIndex = newStartIndex + playersPerPage;
  
    const displayedPlayers = sortedPlayers.slice(newStartIndex, newEndIndex);
  
    const rankedPlayers = displayedPlayers.map((player, index) => {
      let rank = newStartIndex + index + 1;
      if (sortConfig.direction === "desc") {
        rank = newEndIndex - index;
      }
      return {
        ...player,
        rank: rank,
      };
    });
  
    setwingers(rankedPlayers);
    setwingersStartIndex(newStartIndex);
    setwingersEndIndex(newEndIndex);
    setLoading(false);
  };

  useEffect(() => {
    fetchCentreForwardPlayers();
    fetchWingerPlayers();
  }, [centreforwardsCurrentPage, wingersCurrentPage]);

  const HoverTableRow = styled(TableRow)(({ theme }) => ({
    "&:hover": {
      backgroundColor: theme.palette.primary.light,
      cursor: "pointer",
    },
  }));

  const goTocentreforwardsPreviousPage = () => {
    setLoading(true);
    setcentreforwardsCurrentPage((prevPage) => prevPage - 1);
  };

  const goTocentreforwardsNextPage = () => {
    setLoading(true);
    setcentreforwardsCurrentPage((prevPage) => prevPage + 1);
  };

  const goTowingersPreviousPage = () => {
    setLoading(true);
    setwingersCurrentPage((prevPage) => prevPage - 1);
  };

  const goTowingersNextPage = () => {
    setLoading(true);
    setwingersCurrentPage((prevPage) => prevPage + 1);
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedcentreforwards = useMemo(() => {
    const sorted = [...centreforwards].sort((a, b) => {
      if (b.rating < a.rating) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (b.rating > a.rating) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });

    return sorted;
  }, [centreforwards, sortConfig]);

  const sortedwingers = useMemo(() => {
    const sorted = [...wingers].sort((a, b) => {
      if (b.rating < a.rating) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (b.rating > a.rating) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });

    return sorted;
  }, [wingers, sortConfig]);

  return (
    <Box m="20px 70px" height="80vh" display="flex" flexDirection="column" style={{overflow: "auto"}}>
      <Box flexGrow={1}>
      <Header title="Forwards" subtitle="Centre Forwards" />
        {centreforwards.length > 0 ? (
          <Box style={{ maxHeight: "50vh", overflow: "auto" }}>
            <TableContainer component={Paper}>
              <Table size="small" style={{ background: colors.primary[400] }}>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <TableSortLabel
                        active={sortConfig.key === "rank"}
                        direction={
                          sortConfig.key === "rank"
                            ? sortConfig.direction
                            : "asc"
                        }
                        onClick={() => handleSort("rank")}
                      >
                        Rank
                      </TableSortLabel>
                    </TableCell>
                    <TableCell>Player Name</TableCell>
                    <TableCell>
                      <TableSortLabel
                        active={sortConfig.key === "rating"}
                        direction={
                          sortConfig.key === "rating"
                            ? sortConfig.direction
                            : "asc"
                        }
                        onClick={() => handleSort("rating")}
                      >
                        Rating
                      </TableSortLabel>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sortedcentreforwards.map((player, index) => (
                    <HoverTableRow
                      key={player.id}
                      component="tr"
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <TableCell>{player.rank}</TableCell>
                      <TableCell>{player.name}</TableCell>
                      <TableCell>{player.rating}</TableCell>
                    </HoverTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Box
              display="flex"
              justifyContent="center"
              position="sticky"
              left="50%"
              transform="translateX(-50%)"
              zIndex="999"
              mt="10px"
            >
              {centreforwardsCurrentPage > 1 && (
                <Button
                  variant="contained"
                  style={{
                    background: colors.primary[400],
                    marginRight: "10px",
                  }}
                  onClick={goTocentreforwardsPreviousPage}
                >
                  Previous
                </Button>
              )}
              {centreforwardsTotalCount >
                centreforwardsCurrentPage * playersPerPage && (
                <Button
                  variant="contained"
                  style={{ background: colors.primary[400] }}
                  onClick={goTocentreforwardsNextPage}
                >
                  Next
                </Button>
              )}
            </Box>
          </Box>
        ) : null}
      </Box>
      <Box flexGrow={1}>
      <Header subtitle="Wingers" />
        {wingers.length > 0 ? (
          <Box style={{ maxHeight: "50vh", overflow: "auto" }}>
            <TableContainer component={Paper}>
              <Table size="small" style={{ background: colors.primary[400] }}>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <TableSortLabel
                        active={sortConfig.key === "rank"}
                        direction={
                          sortConfig.key === "rank"
                            ? sortConfig.direction
                            : "asc"
                        }
                        onClick={() => handleSort("rank")}
                      >
                        Rank
                      </TableSortLabel>
                    </TableCell>
                    <TableCell>Player Name</TableCell>
                    <TableCell>
                      <TableSortLabel
                        active={sortConfig.key === "rating"}
                        direction={
                          sortConfig.key === "rating"
                            ? sortConfig.direction
                            : "asc"
                        }
                        onClick={() => handleSort("rating")}
                      >
                        Rating
                      </TableSortLabel>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sortedwingers.map((player, index) => (
                    <HoverTableRow
                      key={player.id}
                      component="tr"
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <TableCell>{player.rank}</TableCell>
                      <TableCell>{player.name}</TableCell>
                      <TableCell>{player.rating}</TableCell>
                    </HoverTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Box
              display="flex"
              justifyContent="center"
              position="sticky"
              left="50%"
              transform="translateX(-50%)"
              zIndex="999"
              mt="10px"
            >
              {wingersCurrentPage > 1 && (
                <Button
                  variant="contained"
                  style={{
                    background: colors.primary[400],
                    marginRight: "10px",
                  }}
                  onClick={goTowingersPreviousPage}
                >
                  Previous
                </Button>
              )}
              {wingersTotalCount >
                wingersCurrentPage * playersPerPage && (
                <Button
                  variant="contained"
                  style={{ background: colors.primary[400] }}
                  onClick={goTowingersNextPage}
                >
                  Next
                </Button>
              )}
            </Box>
          </Box>
        ) : null}
      </Box>
      {loading && (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          position="fixed"
          top={loading ? "50%" : "70%"}
          left="50%"
          transform="translate(-50%, -50%)"
          zIndex="999"
        >
          <CircularProgress color="secondary" />
        </Box>
      )}
    </Box>
  );
};

export default Forwards;