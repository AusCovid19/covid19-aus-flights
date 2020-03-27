import React, { useState, useEffect } from "react";

import Footer from "./components/Footer";
import ApplicationBar from "./components/AppBar/AppBar";

import useAppStyles from "./AppStyles";
import AppTable from "./components/Table";
import {
  createMuiTheme,
  MuiThemeProvider,
  useMediaQuery
} from "@material-ui/core";
import { blue, deepOrange } from "@material-ui/core/colors";
import UserConfigProvider, {
  useUserConfigState,
  useUserConfigDispatch
} from "./providers/UserConfigProvider";

function AppGlobalState() {
  return (
    <UserConfigProvider>
      <AppCore />
    </UserConfigProvider>
  );
}

function AppCore() {
  const { theme } = useUserConfigState();
  console.log(theme);
  const dispatch = useUserConfigDispatch();

  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const muitheme = createMuiTheme({
    palette: {
      primary: blue,
      secondary: deepOrange,
      type: theme === "dark" ? "dark" : "light"
    }
  });

  useEffect(() => {
    dispatch({
      type: "@@USER_CONFIG/SET_THEME",
      theme: prefersDarkMode ? "dark" : "light"
    });
  }, [dispatch, prefersDarkMode]);

  return (
    <MuiThemeProvider theme={muitheme}>
      <App />
    </MuiThemeProvider>
  );
}
function App() {
  const [searchString, setSearchString] = useState("");
  const classes = useAppStyles();
  return (
    <div className={classes.root}>
      <ApplicationBar
        handleSearch={searchTerm => {
          setSearchString(searchTerm);
        }}
      />
      <AppTable searchTerm={searchString} />
      <Footer />
    </div>
  );
}

export default AppGlobalState;
