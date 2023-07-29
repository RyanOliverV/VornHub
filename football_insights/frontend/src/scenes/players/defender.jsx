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


const Defenders = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [centerbacks, setCenterbacks] = useState([]);
  const [fullbacks, setFullbacks] = useState([]);
  const [centerbacksCurrentPage, setCenterbacksCurrentPage] = useState(1);
  const [fullbacksCurrentPage, setFullbacksCurrentPage] = useState(1);
  const playersPerPage = 5;
  const [centerbacksTotalCount, setCenterbacksTotalCount] = useState(0);
  const [fullbacksTotalCount, setFullbacksTotalCount] = useState(0);
  const [centerbacksStartIndex, setCenterbacksStartIndex] = useState(0);
  const [fullbacksStartIndex, setFullbacksStartIndex] = useState(0);
  const [centerbacksEndIndex, setCenterbacksEndIndex] = useState(0);
  const [fullbacksEndIndex, setFullbacksEndIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [sortConfig, setSortConfig] = useState({
    key: "rating",
    direction: "asc",
  });

  const fetchCenterbackPlayers = async () => {
    setLoading(true);
  
    const response = await fetch("/api/centrebacks/");
    const data = await response.json();
  
    const sortedPlayers = data.sort((a, b) => b.rating - a.rating);
  
    setCenterbacksTotalCount(sortedPlayers.length);
  
    const newStartIndex = (centerbacksCurrentPage - 1) * playersPerPage;
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
  
    setCenterbacks(rankedPlayers);
    setCenterbacksStartIndex(newStartIndex);
    setCenterbacksEndIndex(newEndIndex);
    setLoading(false);
  };
  
  const fetchFullbackPlayers = async () => {
    setLoading(true);
  
    const response = await fetch("/api/fullbacks/");
    const data = await response.json();
  
    const sortedPlayers = data.sort((a, b) => b.rating - a.rating);
  
    setFullbacksTotalCount(sortedPlayers.length);
  
    const newStartIndex = (fullbacksCurrentPage - 1) * playersPerPage;
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
  
    setFullbacks(rankedPlayers);
    setFullbacksStartIndex(newStartIndex);
    setFullbacksEndIndex(newEndIndex);
    setLoading(false);
  };

  useEffect(() => {
    fetchCenterbackPlayers();
    fetchFullbackPlayers();
  }, [centerbacksCurrentPage, fullbacksCurrentPage]);

  const HoverTableRow = styled(TableRow)(({ theme }) => ({
    "&:hover": {
      backgroundColor: theme.palette.primary.light,
      cursor: "pointer",
    },
  }));

  const goToCenterbacksPreviousPage = () => {
    setLoading(true);
    setCenterbacksCurrentPage((prevPage) => prevPage - 1);
  };

  const goToCenterbacksNextPage = () => {
    setLoading(true);
    setCenterbacksCurrentPage((prevPage) => prevPage + 1);
  };

  const goToFullbacksPreviousPage = () => {
    setLoading(true);
    setFullbacksCurrentPage((prevPage) => prevPage - 1);
  };

  const goToFullbacksNextPage = () => {
    setLoading(true);
    setFullbacksCurrentPage((prevPage) => prevPage + 1);
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedCenterbacks = useMemo(() => {
    const sorted = [...centerbacks].sort((a, b) => {
      if (b.rating < a.rating) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (b.rating > a.rating) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });

    return sorted;
  }, [centerbacks, sortConfig]);

  const sortedFullbacks = useMemo(() => {
    const sorted = [...fullbacks].sort((a, b) => {
      if (b.rating < a.rating) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (b.rating > a.rating) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });

    return sorted;
  }, [fullbacks, sortConfig]);

  return (
    <Box m="20px 70px" height="80vh" display="flex" flexDirection="column" style={{overflow: "auto"}}>
      <Box flexGrow={1}>
      <Header title="DEFENDERS" subtitle="CentreBacks" />
        {centerbacks.length > 0 ? (
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
                  {sortedCenterbacks.map((player, index) => (
                    <HoverTableRow
                      key={player.id}
                      component={Link}
                      to={`/players/${player.id}`}
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
              {centerbacksCurrentPage > 1 && (
                <Button
                  variant="contained"
                  style={{
                    background: colors.primary[400],
                    marginRight: "10px",
                  }}
                  onClick={goToCenterbacksPreviousPage}
                >
                  Previous
                </Button>
              )}
              {centerbacksTotalCount >
                centerbacksCurrentPage * playersPerPage && (
                <Button
                  variant="contained"
                  style={{ background: colors.primary[400] }}
                  onClick={goToCenterbacksNextPage}
                >
                  Next
                </Button>
              )}
            </Box>
          </Box>
        ) : null}
      </Box>
      <Box flexGrow={1}>
      <Header subtitle="Fullbacks" />
        {fullbacks.length > 0 ? (
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
                  {sortedFullbacks.map((player, index) => (
                    <HoverTableRow
                      key={player.id}
                      component={Link}
                      to={`/players/${player.id}`}
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
              {fullbacksCurrentPage > 1 && (
                <Button
                  variant="contained"
                  style={{
                    background: colors.primary[400],
                    marginRight: "10px",
                  }}
                  onClick={goToFullbacksPreviousPage}
                >
                  Previous
                </Button>
              )}
              {fullbacksTotalCount >
                fullbacksCurrentPage * playersPerPage && (
                <Button
                  variant="contained"
                  style={{ background: colors.primary[400] }}
                  onClick={goToFullbacksNextPage}
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

export default Defenders;