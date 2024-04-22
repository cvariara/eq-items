import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <Link to="/">
        <h1>EQ Items</h1>
      </Link>
      <div className="links">
        <div className="link">
          <Link to="/">Home</Link>
        </div>
        <div className="link">
          <Link to="/items">Items</Link>
        </div>
        <div className="link">
          <Link to="/search">Search Item</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
