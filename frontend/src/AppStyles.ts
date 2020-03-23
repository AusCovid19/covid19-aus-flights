import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

const useAppStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: { height: "100vh", display: "flex", flexDirection: "column" }
  })
);

export default useAppStyles;
