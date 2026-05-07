import React from 'react';
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/auth");
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/">
          <h2>HN<span>Scraper</span></h2>
        </Link>
      </div>

      <div className="nav-right">
        <Link
          to="/bookmarks"
          className={`bookmark-link ${location.pathname === '/bookmarks' ? 'active' : ''}`}
        >
          Bookmarks
        </Link>

        <div className="user-profile">
          <span>{user?.name?.charAt(0) || 'U'}</span>
          <p>Hi, {user?.name || 'User'}</p>
        </div>

        <button onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
