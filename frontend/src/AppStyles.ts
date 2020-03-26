import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

const useAppStyles = makeStyles((theme: Theme) => {
  console.log(theme);
  return createStyles({
    root: {
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      backgroundColor: theme.palette.background.default
    }
  });
});

export default useAppStyles;
