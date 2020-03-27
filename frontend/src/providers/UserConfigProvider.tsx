import React, { FC } from "react";
import { useMediaQuery } from "@material-ui/core";

import { UserConfigContext } from "../contexts/UserConfigContext";

export const UserConfigProvider: FC = props => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  return (
    <UserConfigContext.Provider
      value={{ theme: prefersDarkMode ? "dark" : "light" }}
    >
      {props.children}
    </UserConfigContext.Provider>
  );
};
