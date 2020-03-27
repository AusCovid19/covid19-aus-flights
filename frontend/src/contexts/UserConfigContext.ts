import React from "react";

export interface UserConfigContextState {
  theme?: "light" | "dark";
}

export const UserConfigContext = React.createContext<UserConfigContextState>({
  theme: "light"
});
