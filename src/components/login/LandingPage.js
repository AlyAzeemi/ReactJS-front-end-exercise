import { Link } from "react-router-dom";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";
import { Container } from "@material-ui/core";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    alignItems: "center",
    direction: "row",
    justifyContent: "center",
  },
  paperSignUp: {
    backgroundColor: "#D5BEFF",
    padding: theme.spacing(2),
    textAlign: "center",
    width: "500",
    height: "300",
  },
  paperLogIn: {
    backgroundColor: "#BEFFD5",
    padding: theme.spacing(2),
    textAlign: "center",
    width: "500",
    height: "300",
  },
  control: {
    padding: theme.spacing(2),
  },
}));

const LandingPage = () => {
  const classes = useStyles();
  return (
    <Container>
      <Grid container className={classes.root} spacing={2}>
        {["LogIn", "SignUp"].map((text) => (
          <Link to={`/${text}`} style={{ textDecoration: "none" }}>
            <Grid item xs={12} md={6} lg={3}>
              <Paper className={classes[`paper${text}`]} elevation={3}>
                <Typography variant="h2" style={{ color: "white" }}>
                  {text}
                </Typography>
              </Paper>
            </Grid>
          </Link>
        ))}
      </Grid>
    </Container>
  );
};

export default LandingPage;
