const API_BASE_URL = "http://localhost:5000/api";

const apiCall = async (endpoint, method = "GET", data = null) => {
  const token = localStorage.getItem("token");
  const headers = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const config = {
    method,
    headers,
  };

  if (data) {
    config.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "API Error");
    }

    return await response.json();
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

// Equipment Services
export const equipmentService = {
  getAll: (filters) => {
    const params = new URLSearchParams(filters).toString();
    return apiCall(`/equipment${params ? "?" + params : ""}`);
  },
  getById: (id) => apiCall(`/equipment/${id}`),
  create: (data) => apiCall("/equipment", "POST", data),
  update: (id, data) => apiCall(`/equipment/${id}`, "PUT", data),
  delete: (id) => apiCall(`/equipment/${id}`, "DELETE"),
  getRequests: (id) => apiCall(`/equipment/${id}/requests`),
};

// Maintenance Request Services
export const maintenanceService = {
  getAll: (filters) => {
    const params = new URLSearchParams(filters).toString();
    return apiCall(`/maintenance-requests${params ? "?" + params : ""}`);
  },
  getById: (id) => apiCall(`/maintenance-requests/${id}`),
  create: (data) => apiCall("/maintenance-requests", "POST", data),
  update: (id, data) => apiCall(`/maintenance-requests/${id}`, "PUT", data),
  assign: (id, data) =>
    apiCall(`/maintenance-requests/${id}/assign`, "PATCH", data),
  complete: (id, data) =>
    apiCall(`/maintenance-requests/${id}/complete`, "PATCH", data),
  scrap: (id, data) =>
    apiCall(`/maintenance-requests/${id}/scrap`, "PATCH", data),
  delete: (id) => apiCall(`/maintenance-requests/${id}`, "DELETE"),
  getStatistics: () => apiCall("/maintenance-requests/api/statistics"),
};

// Team Services
export const teamService = {
  getAll: () => apiCall("/teams"),
  getById: (id) => apiCall(`/teams/${id}`),
  create: (data) => apiCall("/teams", "POST", data),
  update: (id, data) => apiCall(`/teams/${id}`, "PUT", data),
  addMember: (id, memberId) =>
    apiCall(`/teams/${id}/add-member`, "PATCH", { memberId }),
  removeMember: (id, memberId) =>
    apiCall(`/teams/${id}/remove-member`, "PATCH", { memberId }),
  delete: (id) => apiCall(`/teams/${id}`, "DELETE"),
};

// User Services
export const userService = {
  register: (data) => apiCall("/users/register", "POST", data),
  login: (email, password) =>
    apiCall("/users/login", "POST", { email, password }),
  getAll: (filters) => {
    const params = new URLSearchParams(filters).toString();
    return apiCall(`/users${params ? "?" + params : ""}`);
  },
  getById: (id) => apiCall(`/users/${id}`),
  update: (id, data) => apiCall(`/users/${id}`, "PUT", data),
  delete: (id) => apiCall(`/users/${id}`, "DELETE"),
};
