import React, { createContext, useState, useCallback } from "react";
import {
  maintenanceService,
  equipmentService,
  teamService,
} from "../services/api";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [equipment, setEquipment] = useState([]);
  const [requests, setRequests] = useState([]);
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchEquipment = useCallback(async (filters = {}) => {
    try {
      setLoading(true);
      const data = await equipmentService.getAll(filters);
      setEquipment(data);
      return data;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchRequests = useCallback(async (filters = {}) => {
    try {
      setLoading(true);
      const data = await maintenanceService.getAll(filters);
      setRequests(data);
      return data;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchTeams = useCallback(async () => {
    try {
      setLoading(true);
      const data = await teamService.getAll();
      setTeams(data);
      return data;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const createRequest = useCallback(async (data) => {
    try {
      const newRequest = await maintenanceService.create(data);
      setRequests((prev) => [newRequest, ...prev]);
      return newRequest;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  const updateRequest = useCallback(async (id, data) => {
    try {
      const updated = await maintenanceService.update(id, data);
      setRequests((prev) => prev.map((r) => (r._id === id ? updated : r)));
      return updated;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  const value = {
    equipment,
    requests,
    teams,
    loading,
    error,
    fetchEquipment,
    fetchRequests,
    fetchTeams,
    createRequest,
    updateRequest,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export { DataContext };
