import React from "react";
import { useState } from "react";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import LiveTvOutlinedIcon from "@mui/icons-material/LiveTvOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import ScoreboardOutlinedIcon from "@mui/icons-material/ScoreboardOutlined";
import TableChartOutlinedIcon from "@mui/icons-material/TableChartOutlined";
import SportsSoccerOutlinedIcon from "@mui/icons-material/SportsSoccerOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

const Item = ({
  id,
  title,
  to,
  icon,
  selected,
  setSelected,
  handleItemClick,
  isCollapsed,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handleClick = () => {
    handleItemClick(id);
  };

  return (
    <MenuItem
      active={selected === id}
      style={{ color: colors.grey[100] }}
      onClick={handleClick}
      icon={icon}
    >
      <Typography variant="h5">
        {title}
      </Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  const handleItemClick = (itemId) => {
    setSelected(itemId);
  };
  
  return (
    <Box
      sx={{
        height: "100vh;",
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* Logo and Menu Ucon */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0px 20px 0px",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                {/* <Typography variant="h3" color={colors.grey[100]}>
                  VornMetrics
                </Typography> */}
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {/* USER */}
          {!isCollapsed && (
            <Box mb="20%">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="200px"
                  src={"../../static/images/logo2.png"}
                  style={{ cursor: "pointer" }}
                />
              </Box>

              {/* <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  Ryan Vaughan
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[500]}>
                  Developer
                </Typography>
              </Box> */}
            </Box>
          )}

          {/* Menu Items */}
          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              id="Dashboard"
              title="Dashboard"
              to="/"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              handleItemClick={handleItemClick}
            />

            {!isCollapsed && (
              <Typography
                variant="h5"
                color={colors.grey[300]}
                sx={{ m: "15px 0 5px 20px" }}
              >
                Real-Time
              </Typography>
            )}
            <Item
              id = "Live Scores"
              title="Live Scores"
              to="/livescores"
              icon={<LiveTvOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              handleItemClick={handleItemClick}
            />

            {!isCollapsed && (
              <Typography
                variant="h5"
                color={colors.grey[300]}
                sx={{ m: "15px 0 5px 20px" }}
              >
                Matchups
              </Typography>
            )}

            <Item
              id = "Fixtures"
              title="Fixtures"
              to="/fixtures"
              icon={<CalendarMonthOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              handleItemClick={handleItemClick}
            />
            <Item
              id = "Match Predictions"
              title="Match Predictions"
              to="/predictions"
              icon={<ScoreboardOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              handleItemClick={handleItemClick}
            />
            <Item
              id = "League Table"
              title="League Table"
              to="/leaguetable"
              icon={<TableChartOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              handleItemClick={handleItemClick}
            />

            {!isCollapsed && (
              <Typography
                variant="h5"
                color={colors.grey[300]}
                sx={{ m: "15px 0 5px 20px" }}
              >
                Statistics
              </Typography>
            )}
            <Item
              id = "Teams"
              title="Teams"
              to="/teams"
              icon={<SportsSoccerOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              handleItemClick={handleItemClick}
            />
            <SubMenu title="Players" icon={<PersonOutlinedIcon />}>
              <Item
                id = "Goalkeepers"
                title={isCollapsed ? "" : "Goalkeepers"}
                to="/players/goalkeepers"
                icon={isCollapsed ? "GK" : ""}
                selected={selected}
                setSelected={setSelected}
                handleItemClick={handleItemClick}
                isCollapsed={isCollapsed}
              ></Item>
              <Item
                id = "Defenders"
                title={isCollapsed ? "" : "Defenders"}
                to="/players/defenders"
                icon={isCollapsed ? "DEF" : ""}
                selected={selected}
                setSelected={setSelected}
                handleItemClick={handleItemClick}
                isCollapsed={isCollapsed}
              >
              </Item>
              <Item
                id = "Midfielders"
                title={isCollapsed ? "" : "Midfielders"}
                icon={isCollapsed ? "MID" : ""}
                to="/players/midfielders"
                selected={selected}
                setSelected={setSelected}
                handleItemClick={handleItemClick}
                isCollapsed={isCollapsed}
              >
              </Item>
              <Item
                id = "Forwards"
                title={isCollapsed ? "" : "Forwards"}
                icon={isCollapsed ? "FWD" : ""}
                to="/players/forwards"
                selected={selected}
                setSelected={setSelected}
                handleItemClick={handleItemClick}
                isCollapsed={isCollapsed}
              >
              </Item>
            </SubMenu>
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
