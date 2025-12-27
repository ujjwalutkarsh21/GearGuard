import React, { useEffect, useContext } from "react";
import { DataContext } from "../context/DataContext";
import "../styles/Kanban.css";

const KanbanBoard = () => {
  const { requests, fetchRequests, updateRequest } = useContext(DataContext);
  useEffect(() => {
    const loadRequests = async () => {
      await fetchRequests();
    };
    loadRequests();
  }, [fetchRequests]);

  const grouped = {
    New: requests.filter((r) => r.status === "New"),
    "In Progress": requests.filter((r) => r.status === "In Progress"),
    Repaired: requests.filter((r) => r.status === "Repaired"),
    Scrap: requests.filter((r) => r.status === "Scrap"),
  };

  const handleDragStart = (e, request) => {
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("request", JSON.stringify(request));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = async (e, status) => {
    e.preventDefault();
    const request = JSON.parse(e.dataTransfer.getData("request"));

    if (request.status !== status) {
      try {
        await updateRequest(request._id, { status });
      } catch (error) {
        console.error("Error updating request:", error);
      }
    }
  };

  return (
    <div className="kanban-board">
      <h1>Maintenance Kanban Board</h1>

      <div className="kanban-container">
        {Object.entries(grouped).map(([status, items]) => (
          <div key={status} className="kanban-column">
            <div className="column-header">
              <h2>{status}</h2>
              <span className="count">{items.length}</span>
            </div>

            <div
              className="column-content"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, status)}
            >
              {items.map((request) => (
                <div
                  key={request._id}
                  className={`kanban-card ${
                    request.isOverdue ? "overdue" : ""
                  }`}
                  draggable
                  onDragStart={(e) => handleDragStart(e, request)}
                >
                  <div className="card-header">
                    <h4>{request.subject}</h4>
                    {request.isOverdue && (
                      <span className="overdue-badge">Overdue</span>
                    )}
                  </div>
                  <p className="card-equipment">{request.equipment?.name}</p>
                  <p className="card-type">{request.type}</p>
                  <div className="card-priority">
                    <span
                      className={`priority-${request.priority.toLowerCase()}`}
                    >
                      {request.priority}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;
