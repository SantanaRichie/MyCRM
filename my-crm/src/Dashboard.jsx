import React, { useState } from 'react';

const Dashboard = ({ onNavigate }) => {
  const [activeMonth, setActiveMonth] = useState(new Date().getMonth());
  const year = 2024; // Static year for context, can be made dynamic

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  return (
    <div className="dashboard-view">
      <h2>Business Overview</h2>
      <div className="stats-grid">
        <div className="stat-card" onClick={() => onNavigate('gigs')}>
          <h3>Pending Gigs</h3>
          <p>12</p>
        </div>
        <div className="stat-card" onClick={() => onNavigate('artists')}>
          <h3>Total Artists</h3>
          <p>48</p>
        </div>
        <div className="stat-card" onClick={() => onNavigate('contacts')}>
          <h3>New Leads</h3>
          <p>5</p>
        </div>
      </div>
      <div className="calendar-section">
        <h2>Event Calendar</h2>
        <div className="calendar-workbook">
          <div className="calendar-tabs">
            {months.map((month, index) => (
              <button 
                key={month} 
                className={`month-tab ${activeMonth === index ? 'active' : ''}`}
                onClick={() => setActiveMonth(index)}
              >
                {month.substring(0, 3)}
              </button>
            ))}
          </div>
          <div className="calendar-sheet">
            <h3>{months[activeMonth]} {year}</h3>
            <table className="calendar-table">
              <thead>
                <tr>
                  <th>Sun</th><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th>
                </tr>
              </thead>
              <tbody>
                {(() => {
                  const firstDay = new Date(year, activeMonth, 1).getDay();
                  const daysInMonth = new Date(year, activeMonth + 1, 0).getDate();
                  const days = [];
                  for (let i = 0; i < firstDay; i++) days.push(<td key={`e-${i}`}></td>);
                  for (let d = 1; d <= daysInMonth; d++) days.push(<td key={d}>{d}</td>);
                  
                  const rows = [];
                  for (let i = 0; i < days.length; i += 7) {
                    rows.push(<tr key={i}>{days.slice(i, i + 7)}</tr>);
                  }
                  return rows;
                })()}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;