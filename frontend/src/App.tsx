import React, { useState } from "react";

import Footer from "./components/Footer";
import ApplicationBar from "./components/AppBar/AppBar";

import useAppStyles from "./AppStyles";
import AppTable from "./components/Table";

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

export default App;
