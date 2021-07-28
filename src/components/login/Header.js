import { Link } from "react-router-dom";
const Header = () => {
  return (
    <Link to="/" style={{ textDecoration: "none" }}>
      <header>
        <h2>Logo</h2>
      </header>
    </Link>
  );
};

export default Header;
