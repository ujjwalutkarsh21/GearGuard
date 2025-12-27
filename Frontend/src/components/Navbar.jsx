import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { ThemeContext } from "../context/ThemeContext";
import "../styles/Navbar.css";

const Navbar = () => {
  const { user, logout, isAuthenticated } = useContext(AuthContext);
  const { isDark, toggleTheme } = useContext(ThemeContext);
  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };

  if (!isAuthenticated) return null;

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h2>⚙️ GearGuard</h2>
      </div>

      <div className="navbar-center">
        <a href="/dashboard">Dashboard</a>
        <a href="/kanban">Kanban Board</a>
        <a href="/calendar">Calendar</a>
        <a href="/equipment">Equipment</a>
        <a href="/admin/users" className="admin-link">
          👥 Users
        </a>
      </div>

      <div className="navbar-user">
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          title="Toggle dark mode"
        >
          {isDark ? "☀️" : "🌙"}
        </button>
        <div className="user-info">
          <span className="user-name">{user?.fullName}</span>
          <span className="user-role">{user?.role}</span>
        </div>
        <div className="user-menu">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="menu-toggle"
          >
            ⋮
          </button>
          {showMenu && (
            <div className="dropdown-menu">
              <a href="/profile">Profile</a>
              <a href="/settings">Settings</a>
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
