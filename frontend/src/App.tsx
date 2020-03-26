import React, { useState } from "react";

import Footer from "./components/Footer";
import ApplicationBar from "./components/AppBar/AppBar";

import useAppStyles from "./AppStyles";
import AppTable from "./components/Table";
import {
  createMuiTheme,
  useMediaQuery,
  MuiThemeProvider
} from "@material-ui/core";
import { blue, deepOrange } from "@material-ui/core/colors";

function App() {
  const [searchString, setSearchString] = useState("");
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const muitheme = createMuiTheme({
    palette: {
      primary: blue,
      secondary: deepOrange,
      type: prefersDarkMode ? "dark" : "light"
    }
  });

  const classes = useAppStyles();
  return (
    <MuiThemeProvider theme={muitheme}>
      <div className={classes.root}>
        <ApplicationBar
          handleSearch={searchTerm => {
            setSearchString(searchTerm);
          }}
        />
        <AppTable searchTerm={searchString} />
        <Footer />
      </div>
    </MuiThemeProvider>
  );
}

export default App;
