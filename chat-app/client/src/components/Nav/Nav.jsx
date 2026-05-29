import { Link, useMatch } from "react-router-dom";
import "./Nav.css";

const Nav = () => {
  const isHome = useMatch("/");
  return (
    <div className={`nav ${isHome ? "box" : "bar"}`}>
      {!isHome ? (
        <Link
          style={isHome ? { marginBottom: "1rem" } : { marginRight: "1rem" }}
          to="/"
        >
          Home
        </Link>
      ) : (
        <p>
          This chat application uses 2 different protocols.
          <br /> Please select a protocol below.
        </p>
      )}
      <Link
        to="/socket"
        style={isHome ? { marginBottom: "1rem" } : { marginRight: "1rem" }}
      >
        WebSocket
      </Link>
      <Link
        to="/poll"
        style={isHome ? { marginBottom: "1rem" } : { marginRight: "1rem" }}
      >
        Long Polling
      </Link>
    </div>
  );
};

export default Nav;
