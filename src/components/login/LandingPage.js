import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div>
      <header className="header">Welcome. Pick one to proceed.</header>
      <Link to="/login">
        <button className="btn btn-block">Login</button>
      </Link>
      <Link to="/signup">
        <button className="btn btn-block">Signup</button>
      </Link>
    </div>
  );
};

export default LandingPage;
