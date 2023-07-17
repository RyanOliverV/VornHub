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

const Midfielders = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [defensiveMidfielder, setdefensiveMidfielder] = useState([]);
  const [centralMidfielder, setcentralMidfielder] = useState([]);
  const [defensiveMidfielderCurrentPage, setdefensiveMidfielderCurrentPage] =
    useState(1);
  const [centralMidfielderCurrentPage, setcentralMidfielderCurrentPage] =
    useState(1);
  const playersPerPage = 5;
  const [defensiveMidfielderTotalCount, setdefensiveMidfielderTotalCount] =
    useState(0);
  const [centralMidfielderTotalCount, setcentralMidfielderTotalCount] =
    useState(0);
  const [defensiveMidfielderStartIndex, setdefensiveMidfielderStartIndex] =
    useState(0);
  const [centralMidfielderStartIndex, setcentralMidfielderStartIndex] =
    useState(0);
  const [defensiveMidfielderEndIndex, setdefensiveMidfielderEndIndex] =
    useState(0);
  const [centralMidfielderEndIndex, setcentralMidfielderEndIndex] = useState(0);
  const [attackingMidfielder, setAttackingMidfielder] = useState([]);
  const [attackingMidfielderCurrentPage, setAttackingMidfielderCurrentPage] =
    useState(1);
  const [attackingMidfielderTotalCount, setAttackingMidfielderTotalCount] =
    useState(0);
  const [attackingMidfielderStartIndex, setAttackingMidfielderStartIndex] =
    useState(0);
  const [attackingMidfielderEndIndex, setAttackingMidfielderEndIndex] =
    useState(0);
  const [loading, setLoading] = useState(true);
  const [sortConfig, setSortConfig] = useState({
    key: "rating",
    direction: "asc",
  });

  const fetchDefensiveMidfieldPlayers = async () => {
    setLoading(true);

    const response = await fetch("/api/defensivemidfielders/");
    const data = await response.json();

    const sortedPlayers = data.sort((a, b) => b.rating - a.rating);

    setdefensiveMidfielderTotalCount(sortedPlayers.length);

    const newStartIndex = (defensiveMidfielderCurrentPage - 1) * playersPerPage;
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

    setdefensiveMidfielder(rankedPlayers);
    setdefensiveMidfielderStartIndex(newStartIndex);
    setdefensiveMidfielderEndIndex(newEndIndex);
    setLoading(false);
  };

  const fetchCentralMidfieldPlayers = async () => {
    setLoading(true);

    const response = await fetch("/api/centralmidfielders/");
    const data = await response.json();

    const sortedPlayers = data.sort((a, b) => b.rating - a.rating);

    setcentralMidfielderTotalCount(sortedPlayers.length);

    const newStartIndex = (centralMidfielderCurrentPage - 1) * playersPerPage;
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

    setcentralMidfielder(rankedPlayers);
    setcentralMidfielderStartIndex(newStartIndex);
    setcentralMidfielderEndIndex(newEndIndex);
    setLoading(false);
  };

  const fetchAttackingMidfieldPlayers = async () => {
    setLoading(true);

    const response = await fetch("/api/attackingmidfielders/");
    const data = await response.json();

    const sortedPlayers = data.sort((a, b) => b.rating - a.rating);

    setAttackingMidfielderTotalCount(sortedPlayers.length);

    const newStartIndex = (attackingMidfielderCurrentPage - 1) * playersPerPage;
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

    setAttackingMidfielder(rankedPlayers);
    setAttackingMidfielderStartIndex(newStartIndex);
    setAttackingMidfielderEndIndex(newEndIndex);
    setLoading(false);
  };

  useEffect(
    () => {
      fetchDefensiveMidfieldPlayers();
      fetchCentralMidfieldPlayers();
      fetchAttackingMidfieldPlayers();
    },
    [defensiveMidfielderCurrentPage, centralMidfielderCurrentPage, attackingMidfielderCurrentPage]
  );

  const HoverTableRow = styled(TableRow)(({ theme }) => ({
    "&:hover": {
      backgroundColor: theme.palette.primary.light,
      cursor: "pointer",
    },
  }));

  const goTodefensiveMidfielderPreviousPage = () => {
    setLoading(true);
    setdefensiveMidfielderCurrentPage((prevPage) => prevPage - 1);
  };

  const goTodefensiveMidfielderNextPage = () => {
    setLoading(true);
    setdefensiveMidfielderCurrentPage((prevPage) => prevPage + 1);
  };

  const goTocentralMidfielderPreviousPage = () => {
    setLoading(true);
    setcentralMidfielderCurrentPage((prevPage) => prevPage - 1);
  };

  const goTocentralMidfielderNextPage = () => {
    setLoading(true);
    setcentralMidfielderCurrentPage((prevPage) => prevPage + 1);
  };

  const goToAttackingMidfielderPreviousPage = () => {
    setLoading(true);
    setAttackingMidfielderCurrentPage((prevPage) => prevPage - 1);
  };

  const goToAttackingMidfielderNextPage = () => {
    setLoading(true);
    setAttackingMidfielderCurrentPage((prevPage) => prevPage + 1);
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sorteddefensiveMidfielder = useMemo(() => {
    const sorted = [...defensiveMidfielder].sort((a, b) => {
      if (b.rating < a.rating) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (b.rating > a.rating) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });

    return sorted;
  }, [defensiveMidfielder, sortConfig]);

  const sortedcentralMidfielder = useMemo(() => {
    const sorted = [...centralMidfielder].sort((a, b) => {
      if (b.rating < a.rating) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (b.rating > a.rating) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });

    return sorted;
  }, [centralMidfielder, sortConfig]);

  const sortedAttackingMidfielder = useMemo(() => {
    const sorted = [...attackingMidfielder].sort((a, b) => {
      if (b.rating < a.rating) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (b.rating > a.rating) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });

    return sorted;
  }, [attackingMidfielder, sortConfig]);

  return (
    <Box
      m="20px 70px"
      height="80vh"
      display="flex"
      flexDirection="column"
      style={{ overflow: "auto" }}
    >
      <Box flexGrow={1}>
        <Header title="Midfielders" subtitle="Defensive Midfielders" />
        {defensiveMidfielder.length > 0 ? (
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
                  {sorteddefensiveMidfielder.map((player, index) => (
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
              {defensiveMidfielderCurrentPage > 1 && (
                <Button
                  variant="contained"
                  style={{
                    background: colors.primary[400],
                    marginRight: "10px",
                  }}
                  onClick={goTodefensiveMidfielderPreviousPage}
                >
                  Previous
                </Button>
              )}
              {defensiveMidfielderTotalCount >
                defensiveMidfielderCurrentPage * playersPerPage && (
                <Button
                  variant="contained"
                  style={{ background: colors.primary[400] }}
                  onClick={goTodefensiveMidfielderNextPage}
                >
                  Next
                </Button>
              )}
            </Box>
          </Box>
        ) : null}
      </Box>
      <Box flexGrow={1}>
        <Header subtitle="Central Midfielders" />
        {centralMidfielder.length > 0 ? (
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
                  {sortedcentralMidfielder.map((player, index) => (
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
              {centralMidfielderCurrentPage > 1 && (
                <Button
                  variant="contained"
                  style={{
                    background: colors.primary[400],
                    marginRight: "10px",
                  }}
                  onClick={goTocentralMidfielderPreviousPage}
                >
                  Previous
                </Button>
              )}
              {centralMidfielderTotalCount >
                centralMidfielderCurrentPage * playersPerPage && (
                <Button
                  variant="contained"
                  style={{ background: colors.primary[400] }}
                  onClick={goTocentralMidfielderNextPage}
                >
                  Next
                </Button>
              )}
            </Box>
          </Box>
        ) : null}
      </Box>
      <Box flexGrow={1}>
        <Header subtitle="Attacking Midfielders" />
        {attackingMidfielder.length > 0 ? (
          <Box style={{ maxHeight: "50vh", overflow: "auto" }}>
            <TableContainer component={Paper}>
              <Table size="small" style={{ background: colors.primary[400] }}>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <TableSortLabel
                        active={sortConfig.key === "rank"}
                        direction={sortConfig.key === "rank" ? sortConfig.direction : "asc"}
                        onClick={() => handleSort("rank")}
                      >
                        Rank
                      </TableSortLabel>
                    </TableCell>
                    <TableCell>Player Name</TableCell>
                    <TableCell>
                      <TableSortLabel
                        active={sortConfig.key === "rating"}
                        direction={sortConfig.key === "rating" ? sortConfig.direction : "asc"}
                        onClick={() => handleSort("rating")}
                      >
                        Rating
                      </TableSortLabel>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sortedAttackingMidfielder.map((player, index) => (
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
              {attackingMidfielderCurrentPage > 1 && (
                <Button
                  variant="contained"
                  style={{ background: colors.primary[400], marginRight: "10px" }}
                  onClick={goToAttackingMidfielderPreviousPage}
                >
                  Previous
                </Button>
              )}
              {attackingMidfielderTotalCount > attackingMidfielderCurrentPage * playersPerPage && (
                <Button
                  variant="contained"
                  style={{ background: colors.primary[400] }}
                  onClick={goToAttackingMidfielderNextPage}
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

export default Midfielders;
