import React from 'react';

const GigList = () => {
  const mockGigs = [
    { id: 1, name: "Summer Jazz Night", venue: "The Blue Note", date: "2024-06-15", status: "Confirmed" },
    { id: 2, name: "Corporate Gala", venue: "Grand Hotel", date: "2024-07-02", status: "Pending" },
    { id: 3, name: "Wedding Performance", venue: "Pine Valley Resort", date: "2024-07-10", status: "Confirmed" },
  ];

  return (
    <div className="gigs-view">
      <h2>Gig Management</h2>
      <table className="data-table">
        <thead>
          <tr>
            <th>Event Name</th>
            <th>Venue</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {mockGigs.map(gig => (
            <tr key={gig.id}>
              <td>{gig.name}</td>
              <td>{gig.venue}</td>
              <td>{gig.date}</td>
              <td>
                <span className="status-badge" style={{ 
                  backgroundColor: gig.status === 'Confirmed' ? '#dcfce7' : '#fef9c3',
                  color: gig.status === 'Confirmed' ? '#166534' : '#854d0e'
                }}>{gig.status}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GigList;