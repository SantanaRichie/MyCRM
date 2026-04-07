import React from 'react';

const Dashboard = () => {
  return (
    <div className="dashboard-view">
      <h2>Business Overview</h2>
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Pending Gigs</h3>
          <p>12</p>
        </div>
        <div className="stat-card">
          <h3>Total Artists</h3>
          <p>48</p>
        </div>
        <div className="stat-card">
          <h3>New Leads</h3>
          <p>5</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;