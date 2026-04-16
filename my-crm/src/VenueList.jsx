import React, { useState } from 'react';

const VenueList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const venues = [
    { id: 1, name: "The Blue Note", city: "New York", capacity: 150 },
    { id: 2, name: "Grand Hotel", city: "Chicago", capacity: 500 },
    { id: 3, name: "Pine Valley Resort", city: "Los Angeles", capacity: 300 },
  ];

  const filteredVenues = venues.filter(venue => 
    venue.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    venue.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="view-section">
      <div className="view-header">
        <h2>Venue Directory</h2>
        <button className="add-button" title="Add New Venue">+</button>
      </div>
      <div className="search-container">
        <input 
          type="text" 
          placeholder="Search venues by name or city..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>
      <div className="table-responsive">
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>City</th>
              <th>Capacity</th>
            </tr>
          </thead>
          <tbody>
            {filteredVenues.map(venue => (
              <tr key={venue.id}>
                <td>{venue.name}</td>
                <td>{venue.city}</td>
                <td>{venue.capacity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VenueList;