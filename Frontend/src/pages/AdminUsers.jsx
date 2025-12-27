import React, { useEffect, useState } from "react";
import "../styles/AdminUsers.css";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/users/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="admin-users-page loading">Loading users...</div>;
  }

  return (
    <div className="admin-users-page">
      <div className="admin-header">
        <h1>👥 Registered Users</h1>
        <p className="user-count">
          Total Users: <strong>{users.length}</strong>
        </p>
      </div>

      {error && <div className="error-message">{error}</div>}

      {users.length === 0 ? (
        <div className="no-users">
          <p>No registered users yet.</p>
        </div>
      ) : (
        <div className="users-container">
          <table className="users-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Full Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Joined Date</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr
                  key={user._id}
                  className={`role-${user.role.toLowerCase()}`}
                >
                  <td className="index">{index + 1}</td>
                  <td className="name">
                    <span className="avatar">{user.fullName.charAt(0)}</span>
                    {user.fullName}
                  </td>
                  <td className="email">{user.email}</td>
                  <td className="role">
                    <span
                      className={`role-badge role-${user.role.toLowerCase()}`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="date">
                    {new Date(user.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="users-stats">
        <div className="stat">
          <span className="stat-label">Technicians:</span>
          <span className="stat-value">
            {users.filter((u) => u.role === "Technician").length}
          </span>
        </div>
        <div className="stat">
          <span className="stat-label">Managers:</span>
          <span className="stat-value">
            {users.filter((u) => u.role === "Manager").length}
          </span>
        </div>
        <div className="stat">
          <span className="stat-label">Admins:</span>
          <span className="stat-value">
            {users.filter((u) => u.role === "Admin").length}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;
