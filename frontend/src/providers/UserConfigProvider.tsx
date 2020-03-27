import React, { FC, useReducer } from "react";
type Theme = "dark" | "light";
type State = {
  theme: Theme;
};

type Action = {
  type?: "@@USER_CONFIG/SET_THEME";
  theme?: Theme;
};

type Dispatch = (action: Action) => void;

const UserConfigStateContext = React.createContext<State | undefined>(
  undefined
);
const UserConfigDispatchContext = React.createContext<Dispatch | undefined>(
  undefined
);

export const userConfigReducer = (state: State, action: Action) => {
  console.log(action);
  switch (action.type) {
    case "@@USER_CONFIG/SET_THEME": {
      if (action.theme) {
        return {
          theme: action.theme,
          ...state
        };
      }
      return { ...state };
    }
    default: {
      return { ...state };
    }
  }
};

const UserConfigProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(userConfigReducer, { theme: "light" });
  return (
    <UserConfigStateContext.Provider value={state}>
      <UserConfigDispatchContext.Provider value={dispatch}>
        {children}
      </UserConfigDispatchContext.Provider>
    </UserConfigStateContext.Provider>
  );
};

function useUserConfigState() {
  const context = React.useContext(UserConfigStateContext);
  if (context === undefined) {
    throw new Error(
      "useNotificationState must be used within a NotificationProvider"
    );
  }
  return context;
}

function useUserConfigDispatch() {
  const context = React.useContext(UserConfigDispatchContext);
  if (context === undefined) {
    throw new Error(
      "useNotificationDispatch must be used within a NotificationProvider"
    );
  }
  return context;
}

function useNotification() {
  return [useUserConfigState(), useUserConfigDispatch()];
}

export default UserConfigProvider;

export { useNotification, useUserConfigDispatch, useUserConfigState };
