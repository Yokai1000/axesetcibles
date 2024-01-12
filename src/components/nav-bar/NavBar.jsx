import { Link } from "react-router-dom";
import "./style/NavBar.css";
export function Navbar() {
  return (
    <div className="nav-bar">
      <div className="nav-bar-container">
        <div className="nav-bar-search-home">
          <Link className="nav-bar-link" to="/">
            Accueil
          </Link>
        </div>
        <div className="nav-bar-us">
          <Link className="nav-bar-link" to="/us">
            Qui sommes nous ?
          </Link>
        </div>
        <div className="nav-bar-contact">
          <Link className="nav-bar-link" to="/contact">
            Contact
          </Link>
        </div>
      </div>
    </div>
  );
}
