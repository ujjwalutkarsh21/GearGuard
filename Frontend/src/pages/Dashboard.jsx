import React, { useEffect, useContext, useMemo } from "react";
import { DataContext } from "../context/DataContext";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const { requests, teams, loading, fetchRequests, fetchTeams } =
    useContext(DataContext);

  useEffect(() => {
    fetchRequests();
    fetchTeams();
  }, [fetchRequests, fetchTeams]);

  const stats = useMemo(() => {
    if (requests.length === 0) {
      return {
        totalRequests: 0,
        openRequests: 0,
        completedRequests: 0,
        overdueRequests: 0,
      };
    }

    return {
      totalRequests: requests.length,
      openRequests: requests.filter((r) =>
        ["New", "In Progress"].includes(r.status)
      ).length,
      completedRequests: requests.filter((r) => r.status === "Repaired")
        .length,
      overdueRequests: requests.filter((r) => r.isOverdue).length,
    };
  }, [requests]);

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>{stats.totalRequests}</h3>
          <p>Total Requests</p>
        </div>
        <div className="stat-card open">
          <h3>{stats.openRequests}</h3>
          <p>Open Requests</p>
        </div>
        <div className="stat-card completed">
          <h3>{stats.completedRequests}</h3>
          <p>Completed</p>
        </div>
        <div className="stat-card overdue">
          <h3>{stats.overdueRequests}</h3>
          <p>Overdue</p>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="recent-requests">
          <h2>Recent Requests</h2>
          {loading ? (
            <p>Loading...</p>
          ) : requests.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Subject</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th>Priority</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {requests.slice(0, 5).map((req) => (
                  <tr key={req._id}>
                    <td>{req.subject}</td>
                    <td>{req.type}</td>
                    <td>
                      <span className={`status-${req.status.toLowerCase()}`}>
                        {req.status}
                      </span>
                    </td>
                    <td>{req.priority}</td>
                    <td>{new Date(req.createdDate).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No requests found</p>
          )}
        </div>

        <div className="teams-info">
          <h2>Maintenance Teams</h2>
          {teams.length > 0 ? (
            <ul>
              {teams.map((team) => (
                <li key={team._id}>
                  {team.name} ({team.members?.length || 0} members)
                </li>
              ))}
            </ul>
          ) : (
            <p>No teams found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
