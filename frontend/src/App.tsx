import React, { useState } from "react";

import { useApi } from "./hooks/useApi";

import Footer from "./components/Footer";
import ApplicationBar from "./components/AppBar/AppBar";

import useAppStyles from "./AppStyles";
import AppTable from "./components/Table";

function App() {
  const [searchString, setSearchString] = useState("");
  const { handleSearch } = useApi();

  const classes = useAppStyles();
  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <ApplicationBar
        handleSearch={searchTerm => {
          console.log(searchTerm);
          setSearchString(searchTerm);
        }}
      />
      <AppTable searchString={searchString} />
      <Footer />
    </div>
  );
}

export default App;
