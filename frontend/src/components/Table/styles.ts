import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

const useTableStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      flex: 1,
      display: "flex",
      justifyContent: "center"
    },
    paper: {
      width: "80%",
      marginBottom: theme.spacing(2)
    },
    table: {
      minWidth: 750
    },
    visuallyHidden: {
      border: 0,
      clip: "rect(0 0 0 0)",
      height: 1,
      margin: -1,
      overflow: "hidden",
      padding: 0,
      position: "absolute",
      top: 20,
      width: 1
    }
  })
);

export default useTableStyles;
