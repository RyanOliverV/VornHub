import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  useTheme,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { styled } from "@mui/system";
import StadiumOutlinedIcon from "@mui/icons-material/StadiumOutlined";
import { tokens } from "../../theme";

const Livescores = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  const HoverTableRow = styled(TableRow)(({ theme }) => ({
    "&:hover": {
      backgroundColor: colors.primary[600],
      cursor: "pointer",
    },
  }));

  const TeamTableCell = styled(TableCell)({
    width: "40%",
  });

  const ResultTableCell = styled(TableCell)({
    width: "20%",
  });

  const [fixtures, setFixtures] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/livescores-list/");
        const data = await response.json();
        setFixtures(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  // Group fixtures by date
  const groupedFixtures = {};

  fixtures.forEach((fixture) => {
    const date = fixture.date;
    if (!groupedFixtures[date]) {
      groupedFixtures[date] = [];
    }
    groupedFixtures[date].push(fixture);
  });

  const formatDate = (inputDate) => {
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };

    const dateParts = inputDate.split('/');
    const formattedDate = new Date(
      parseInt(dateParts[2]),
      parseInt(dateParts[1]) - 1,
      parseInt(dateParts[0])
    );

    return formattedDate.toLocaleDateString('en-US', options);
  };

  return (
    <Box style={{ margin: "20px", display: "flex", justifyContent: "center" }}>
      <Box style={{ width: "100%", maxWidth: 1000 }}>
        <Box style={{ height: "90vh", overflow: "auto", paddingRight: "50px" }}>
          {Object.entries(groupedFixtures).map(([date, fixtures]) => (
            <div key={date}>
              <Typography m="20px 0px" variant="h4" component="h4">
                {formatDate(date)}
              </Typography>
              <TableContainer>
                <Table sx={{ bgcolor: colors.primary[400] }}>
                  <TableBody>
                    {fixtures.map((fixture) => (
                      <HoverTableRow
                        key={fixture.id}
                        component={
                          fixture.home_score !== null &&
                          fixture.away_score !== null
                            ? "div"
                            : Link
                        }
                        to={
                          fixture.home_score !== null &&
                          fixture.away_score !== null
                            ? `/livescores/${fixture.id}`
                            : `/fixtures/${fixture.id}`
                        }
                        onClick={() =>
                          fixture.home_score !== null &&
                          fixture.away_score !== null
                            ? navigate(`/livescores/${fixture.id}`)
                            : null
                        }
                        style={
                          fixture.home_score !== null &&
                          fixture.away_score !== null
                            ? {
                                cursor: "pointer",
                                textDecoration: "none",
                                color: "inherit",
                              }
                            : { textDecoration: "none", color: "inherit" }
                        }
                      >
                        <TeamTableCell align="center">
                          <img
                            src={fixture.team1_logo}
                            style={{
                              margin: "5px",
                              maxWidth: "30px",
                              verticalAlign: "middle",
                            }}
                            alt="Team Logo"
                          />
                          {fixture.team1}
                        </TeamTableCell>
                        <ResultTableCell align="center">
                          {fixture.home_score === null &&
                          fixture.away_score === null ? (
                            <span
                              style={{
                                margin: "10px",
                                padding: "10px",
                                borderRadius: "4px",
                                border: `1px solid ${colors.primary[300]}`,
                                backgroundColor: colors.primary[400],
                                width: "100%",
                              }}
                            >
                              {fixture.time}
                            </span>
                          ) : (
                            <span
                              style={{
                                margin: "10px",
                                padding: "10px",
                                borderRadius: "4px",
                                border: `1px solid ${colors.primary[300]}`,
                                backgroundColor: colors.primary[400],
                                width: "100%",
                              }}
                            >
                              {fixture.home_score} - {fixture.away_score}
                            </span>
                          )}
                        </ResultTableCell>
                        <TeamTableCell align="center">
                          <img
                            src={fixture.team2_logo}
                            style={{
                              margin: "5px",
                              maxWidth: "30px",
                              verticalAlign: "middle",
                            }}
                            alt="Team Logo"
                          />
                          {fixture.team2}
                        </TeamTableCell>
                        {/* <TableCell
                          align="center"
                          style={{ width: "55%", verticalAlign: "middle", textAlign: "centre" }}
                        >
                          <StadiumOutlinedIcon
                            sx={{
                              verticalAlign: "middle",
                              marginRight: "10px",
                            }}
                          />
                          {fixture.stadium}
                        </TableCell> */}
                      </HoverTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Livescores;
