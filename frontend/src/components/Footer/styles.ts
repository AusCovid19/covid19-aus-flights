import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { grey } from "@material-ui/core/colors";

const useFooterStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      background: grey[900],
      color: "white",
      padding: "0.5rem 0.5rem"
    },
    container: { alignItems: "left", width: "80%", marginTop: "0.25rem" }
  })
);

export default useFooterStyles;
