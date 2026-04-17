import React, { useState, useEffect } from 'react';
import { database } from './database';

const ClientRetention = () => {
  const [retentionData, setRetentionData] = useState([]);
  const [menuOpenId, setMenuOpenId] = useState(null);

  useEffect(() => {
    const db = database.getData();
    setRetentionData(db.retention || []);
  }, []);

  useEffect(() => {
    const closeMenu = () => setMenuOpenId(null);
    if (menuOpenId) window.addEventListener('click', closeMenu);
    return () => window.removeEventListener('click', closeMenu);
  }, [menuOpenId]);

  const getHealthColor = (health) => {
    if (health > 80) return '#166534'; // Green
    if (health > 40) return '#854d0e'; // Yellow
    return '#ef4444'; // Red
  };

  const calculateAvgCycle = () => {
    if (retentionData.length === 0) return 0;
    const total = retentionData.reduce((sum, item) => sum + (item.rebookCycle || 0), 0);
    return Math.round(total / retentionData.length);
  };

  return (
    <div className="retention-view">
      <div className="view-header">
        <h2>Encore Analytics (Retention)</h2>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Encore Rate</h3>
          <p>64%</p>
          <span className="task-count">Repeat booking percentage</span>
        </div>
        <div className="stat-card">
          <h3>At-Risk Revenue</h3>
          <p>$4,700</p>
          <span className="task-count">From 3 'Ghosting' clients</span>
        </div>
        <div className="stat-card">
          <h3>Avg. Re-booking Cycle</h3>
          <p>{calculateAvgCycle()} Days</p>
          <span className="task-count">Time between tour stops</span>
        </div>
      </div>

      <div className="table-responsive">
        <table className="data-table">
          <thead>
            <tr>
              <th>Client / Talent Buyer</th>
              <th>Last Encore</th>
              <th>Lifetime Gigs</th>
              <th>Avg. Cycle</th>
              <th>Relationship Health</th>
              <th style={{ width: '50px' }}></th>
            </tr>
          </thead>
          <tbody>
            {retentionData.map(client => (
              <tr key={client.id}>
                <td>
                  <strong>{client.name}</strong>
                  <div style={{ fontSize: '0.75rem', color: '#6c757d' }}>Total Value: {client.value}</div>
                </td>
                <td>{client.lastGig}</td>
                <td>{client.totalGigs}</td>
                <td>{client.rebookCycle} days</td>
                <td>
                  <div className="progress-container" style={{ width: '120px' }}>
                    <div 
                      className="progress-bar" 
                      style={{ 
                        width: `${client.health}%`, 
                        backgroundColor: getHealthColor(client.health) 
                      }}
                    ></div>
                  </div>
                  <span style={{ fontSize: '0.75rem', color: getHealthColor(client.health) }}>
                    {client.status} ({client.health}%)
                  </span>
                </td>
                <td className="action-cell">
                  <button 
                    className="meatball-button" 
                    onClick={(e) => { e.stopPropagation(); setMenuOpenId(menuOpenId === client.id ? null : client.id); }}
                  >
                    ⋮
                  </button>
                  {menuOpenId === client.id && (
                    <div className="menu-dropdown">
                      <button onClick={() => alert('Opening email composer...')}>Book Follow-up</button>
                      <button onClick={() => alert('Loading gig history...')}>View Tour History</button>
                      <button className="danger">Mark as Inactive</button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="stat-card" style={{ marginTop: '2rem', borderLeft: '4px solid var(--accent)' }}>
        <h4>💡 Presentation Tip</h4>
        <p style={{ fontSize: '0.9rem', color: 'var(--text)' }}>
          Clients labeled as <strong>"Ghosting"</strong> haven't booked a performance in over 180 days. 
          Use the "Book Follow-up" action to trigger a re-engagement sequence.
        </p>
      </div>
    </div>
  );
};

export default ClientRetention;