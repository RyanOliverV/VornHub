import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import {
  Box,
  useTheme,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { flexbox, styled } from "@mui/system";
import { tokens } from "../../theme";

const Fixtures = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const HoverTableRow = styled(TableRow)(({ theme }) => ({
    '&:hover': {
      backgroundColor: theme.palette.primary.light,
      cursor: 'pointer',
    },
  }));

  const StyledTableCell = styled(TableCell)({
    width: '10%',
  });

  const [fixtures, setFixtures] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/fixtures/");
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

  return (
<Box style={{ margin: "20px 70px", height: "80vh", overflow: "auto" }}>
  {Object.entries(groupedFixtures).map(([date, fixtures]) => (
    <div key={date}>
      <Typography m="20px 0px" variant="h4" component="h4">
        {date}
      </Typography>
      <TableContainer>
        <Table sx={{ maxWidth: 1200, bgcolor: colors.primary[400] }}>
          <TableBody>
            {fixtures.map((fixture) => (
              <HoverTableRow key={fixture.id} component={Link} to={`/fixtures/${fixture.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <StyledTableCell align="center">
                  {fixture.team1}
                </StyledTableCell>
                <TableCell align="center">
                  <span
                    style={{
                      margin: "5px",
                      padding: "5px",
                      borderRadius: "4px",
                      border: `1px solid ${colors.primary[300]}`,
                      backgroundColor: colors.primary[400],
                      width: "100%",
                    }}
                  >
                    {fixture.time}
                  </span>
                </TableCell>
                <StyledTableCell align="center">
                  {fixture.team2}
                </StyledTableCell>
                <TableCell align="center" style={{ width: "70%" }}>
                  Stadium Name
                </TableCell>
              </HoverTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  ))}
</Box>
  );
};

export default Fixtures;
