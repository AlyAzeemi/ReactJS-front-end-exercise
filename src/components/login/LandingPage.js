import { Link } from "react-router-dom";
import { useLocation } from "react-router";
const LandingPage = () => {
  const location = useLocation();
  if (location.pathname === "/") {
    return (
      <div>
        <header className="header">Welcome. Pick one to proceed.</header>
        <Link to="/login">
          <button className="btn btn-block">Login</button>
        </Link>
        <Link to="/Signup">
          <button className="btn btn-block">Signup</button>
        </Link>
      </div>
    );
  } else {
    return <></>;
  }
};

export default LandingPage;
