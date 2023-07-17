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
} from "@mui/material";
import { styled } from "@mui/system";
import CircularProgress from "@mui/material/CircularProgress";
import { Link } from "react-router-dom";
import { tokens } from "../../theme";

const Goalkeepers = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [players, setPlayers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const playersPerPage = 10;
  const [totalCount, setTotalCount] = useState(0);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [sortConfig, setSortConfig] = useState({
    key: "rating",
    direction: "asc",
  });

  const fetchGoalkeeperPlayers = async () => {
    setLoading(true);

    const response = await fetch("/api/goalkeepers/");
    const data = await response.json();

    const sortedPlayers = data.sort((a, b) => b.rating - a.rating);

    // Calculate the total count of players
    setTotalCount(sortedPlayers.length);

    // Calculate the new start and end indexes based on the current page
    const newStartIndex = (currentPage - 1) * playersPerPage;
    const newEndIndex = newStartIndex + playersPerPage;

    // Slice the players based on the new indexes
    const displayedPlayers = sortedPlayers.slice(newStartIndex, newEndIndex);

    // Assign ranks based on the sorted order and current page
    const rankedPlayers = displayedPlayers.map((player, index) => {
      let rank = startIndex + index + 1;
      if (sortConfig.direction === "desc") {
        rank = newStartIndex + playersPerPage - index;
      }
      return {
        ...player,
        rank: rank,
      };
    });

    // Update the state variables
    setPlayers(rankedPlayers);
    setStartIndex(newStartIndex);
    setEndIndex(newEndIndex);
    setLoading(false);
  };

  useEffect(() => {
    fetchGoalkeeperPlayers();
  }, [currentPage]);

  const HoverTableRow = styled(TableRow)(({ theme }) => ({
    "&:hover": {
      backgroundColor: theme.palette.primary.light,
      cursor: "pointer",
    },
  }));

  const goToPreviousPage = () => {
    setLoading(true);
    setCurrentPage(currentPage - 1);
  };

  const goToNextPage = () => {
    setLoading(true);
    setCurrentPage(currentPage + 1);
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedPlayers = useMemo(() => {
    const sorted = [...players].sort((a, b) => {
      if (b.rating < a.rating) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (b.rating > a.rating) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });

    // Calculate the ranks for the current page
    const rankedPlayers = sorted.map((player, index) => {
      let rank = startIndex + index + 1;
      if (sortConfig.direction === "desc") {
        rank = startIndex + playersPerPage - index;
      }
      return {
        ...player,
        rank: rank,
      };
    });

    return rankedPlayers;
  }, [players, sortConfig, startIndex, totalCount]);

  return (
    <Box m="20px 70px">
      {players.length > 0 ? (
        <Box style={{ height: "80vh", overflow: "auto" }}>
          <TableContainer component={Paper}>
            <Table style={{ background: colors.primary[400] }}>
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
                {sortedPlayers.map((player, index) => (
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
        </Box>
      ) : null}
      <Box
        display="flex"
        justifyContent="center"
        position="fixed"
        bottom="20px"
        left="50%"
        transform="translateX(-50%)"
        zIndex="999"
      >
        {currentPage > 1 && (
          <Button
            variant="contained"
            style={{ background: colors.primary[400], marginRight: "10px" }}
            onClick={goToPreviousPage}
          >
            Previous
          </Button>
        )}
        {players.length === playersPerPage && (
          <Button
            variant="contained"
            style={{ background: colors.primary[400] }}
            onClick={goToNextPage}
          >
            Next
          </Button>
        )}
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

export default Goalkeepers;