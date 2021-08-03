import { Link } from "react-router-dom";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";
import { Container } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    alignItems: "center",
    direction: "row",
    justifyContent: "center",
  },
  paperSignUp: {
    padding: theme.spacing(2),
    textAlign: "center",
  },
  paperLogIn: {
    padding: theme.spacing(2),
    textAlign: "center",

    color: "white",
    background: "linear-gradient(to right, black 50%, white 50%)",
    backgroundSize: "200% 100%",
    backgroundPosition: "right bottom",
    transition: "all .5s ease-out",
    "&:hover": {
      backgroundPosition: "left bottom",
    },
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
            <Grid item>
              <Paper
                className={classes[`paper${text}`]}
                elevation={3}
                onMouseOver={() => {
                  var event = new CustomEvent(`${text}Hover`, {
                    detail: `mouse was hovered over ${text}`,
                  });
                  document.dispatchEvent(event);
                  console.log(text);
                }}
              >
                <h1>{text}</h1>
              </Paper>
            </Grid>
          </Link>
        ))}
      </Grid>
    </Container>
  );
};

export default LandingPage;
