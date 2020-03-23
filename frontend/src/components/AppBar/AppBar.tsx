import React from "react";
import {
  IconButton,
  InputBase,
  AppBar,
  Toolbar,
  Typography
} from "@material-ui/core";
import useAppBarStyles from "./styles";
import SearchIcon from "@material-ui/icons/Search";
import GitHubIcon from "../../icons/GitHub.js";
import AppBarProps from "./types";

const ApplicationBar: React.FC<AppBarProps> = ({ handleSearch = () => {} }) => {
  const classes = useAppBarStyles();
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" noWrap>
          COVID-19 Australian Flight Tracker
        </Typography>
        <div className={classes.grow} />
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search (i.e. Flight Destination, Origin, Airline, Flight Number)"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput
            }}
            inputProps={{ "aria-label": "search" }}
            onChange={e => {
              handleSearch(e.target.value as string);
            }}
          />
        </div>
        <div className={classes.grow} />
        <div>
          <IconButton
            aria-label="show more"
            aria-haspopup="true"
            color="inherit"
          >
            <GitHubIcon />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
};
export default ApplicationBar;
