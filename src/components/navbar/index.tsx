import { Link } from "react-router-dom";
import "./index.css";

const NavBar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="nav">
        Home
      </Link>
      <Link to="/characters" className="nav">
        Characters
      </Link>
      <Link to="/comics" className="nav">
        Comics
      </Link>
      <Link to="/creators" className="nav">
        Creators
      </Link>
    </nav>
  );
};

export default NavBar;
