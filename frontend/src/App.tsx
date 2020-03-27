import React, { useState, useContext } from "react";

import Footer from "./components/Footer";
import ApplicationBar from "./components/AppBar/AppBar";

import useAppStyles from "./AppStyles";
import AppTable from "./components/Table";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import { blue, deepOrange } from "@material-ui/core/colors";
import { UserConfigProvider } from "./providers/UserConfigProvider";
import { UserConfigContext } from "./contexts/UserConfigContext";

function AppGlobalState() {
  return (
    <UserConfigProvider>
      <AppCore />
    </UserConfigProvider>
  );
}

function AppCore() {
  const { theme } = useContext(UserConfigContext);
  const muitheme = createMuiTheme({
    palette: {
      primary: blue,
      secondary: deepOrange,
      type: theme === "dark" ? "dark" : "light"
    }
  });

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
