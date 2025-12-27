import React, { useEffect, useState, useContext } from "react";
import { DataContext } from "../context/DataContext";
import "../styles/Calendar.css";

const Calendar = () => {
  const { requests, fetchRequests } = useContext(DataContext);
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    fetchRequests({ type: "Preventive" });
  }, [fetchRequests]);

  const preventiveRequests = requests.filter((r) => r.type === "Preventive");

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDay = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const getRequestsForDate = (day) => {
    return preventiveRequests.filter((r) => {
      const reqDate = new Date(r.scheduledDate);
      return (
        reqDate.getDate() === day &&
        reqDate.getMonth() === currentDate.getMonth() &&
        reqDate.getFullYear() === currentDate.getFullYear()
      );
    });
  };

  const previousMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
    );
  };

  const nextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
    );
  };

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDay(currentDate);
  const days = [];

  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }

  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  return (
    <div className="calendar-page">
      <h1>Maintenance Calendar</h1>

      <div className="calendar-header">
        <button onClick={previousMonth}>← Previous</button>
        <h2>
          {currentDate.toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
          })}
        </h2>
        <button onClick={nextMonth}>Next →</button>
      </div>

      <div className="calendar-grid">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="calendar-day-header">
            {day}
          </div>
        ))}

        {days.map((day, index) => (
          <div key={index} className={`calendar-day ${day ? "" : "empty"}`}>
            {day && (
              <>
                <div className="day-number">{day}</div>
                <div className="day-requests">
                  {getRequestsForDate(day).map((req) => (
                    <div key={req._id} className="request-item">
                      {req.subject}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
