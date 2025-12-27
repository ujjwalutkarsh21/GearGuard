export const formatDate = (date) => {
  if (!date) return "N/A";
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const formatDateTime = (date) => {
  if (!date) return "N/A";
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const getStatusColor = (status) => {
  const colors = {
    New: "#0066cc",
    "In Progress": "#ff8c00",
    Repaired: "#00b96b",
    Scrap: "#ff4d4f",
  };
  return colors[status] || "#999";
};

export const getPriorityColor = (priority) => {
  const colors = {
    Low: "#0050b3",
    Medium: "#cc7000",
    High: "#cf1322",
    Critical: "#a4001c",
  };
  return colors[priority] || "#999";
};

export const getDaysUntilDue = (dueDate) => {
  if (!dueDate) return null;
  const today = new Date();
  const due = new Date(dueDate);
  const diff = due - today;
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
};

export const isOverdue = (dueDate) => {
  if (!dueDate) return false;
  return new Date(dueDate) < new Date();
};
