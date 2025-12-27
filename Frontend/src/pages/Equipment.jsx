import React, { useEffect, useState, useContext } from "react";
import { DataContext } from "../context/DataContext";
import "../styles/Equipment.css";

const EquipmentList = () => {
  const { equipment, fetchEquipment, loading } = useContext(DataContext);
  const [filters, setFilters] = useState({});
  const [selectedEquipment, setSelectedEquipment] = useState(null);

  useEffect(() => {
    fetchEquipment(filters);
  }, [filters, fetchEquipment]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="equipment-page">
      <h1>Equipment Tracking</h1>

      <div className="filters">
        <input
          type="text"
          name="search"
          placeholder="Search equipment..."
          onChange={handleFilterChange}
        />
        <select name="department" onChange={handleFilterChange}>
          <option value="">All Departments</option>
          <option value="Production">Production</option>
          <option value="IT">IT</option>
          <option value="Maintenance">Maintenance</option>
        </select>
        <select name="category" onChange={handleFilterChange}>
          <option value="">All Categories</option>
          <option value="CNC Machine">CNC Machine</option>
          <option value="Laptop">Laptop</option>
          <option value="Server">Server</option>
          <option value="Printer">Printer</option>
        </select>
      </div>

      <div className="equipment-list">
        {loading ? (
          <p>Loading...</p>
        ) : equipment.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Serial Number</th>
                <th>Category</th>
                <th>Department</th>
                <th>Location</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {equipment.map((item) => (
                <tr key={item._id} onClick={() => setSelectedEquipment(item)}>
                  <td>{item.name}</td>
                  <td>{item.serialNumber}</td>
                  <td>{item.category}</td>
                  <td>{item.department}</td>
                  <td>{item.location}</td>
                  <td>
                    <span className={`status-${item.status.toLowerCase()}`}>
                      {item.status}
                    </span>
                  </td>
                  <td>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedEquipment(item);
                      }}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No equipment found</p>
        )}
      </div>

      {selectedEquipment && (
        <div className="equipment-detail modal">
          <div className="modal-content">
            <span className="close" onClick={() => setSelectedEquipment(null)}>
              &times;
            </span>
            <h2>{selectedEquipment.name}</h2>
            <dl>
              <dt>Serial Number:</dt>
              <dd>{selectedEquipment.serialNumber}</dd>
              <dt>Category:</dt>
              <dd>{selectedEquipment.category}</dd>
              <dt>Department:</dt>
              <dd>{selectedEquipment.department}</dd>
              <dt>Location:</dt>
              <dd>{selectedEquipment.location}</dd>
              <dt>Purchase Date:</dt>
              <dd>
                {new Date(selectedEquipment.purchaseDate).toLocaleDateString()}
              </dd>
              <dt>Warranty Expiration:</dt>
              <dd>
                {selectedEquipment.warrantyExpiration
                  ? new Date(
                      selectedEquipment.warrantyExpiration
                    ).toLocaleDateString()
                  : "N/A"}
              </dd>
              <dt>Assigned Employee:</dt>
              <dd>{selectedEquipment.assignedEmployee || "N/A"}</dd>
              <dt>Status:</dt>
              <dd>{selectedEquipment.status}</dd>
            </dl>
          </div>
        </div>
      )}
    </div>
  );
};

export default EquipmentList;
