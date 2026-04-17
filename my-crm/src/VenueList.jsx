import React, { useState, useEffect } from 'react';

const VenueList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingVenueId, setEditingVenueId] = useState(null);
  const [menuOpenId, setMenuOpenId] = useState(null);

  const [venues, setVenues] = useState([
    { id: 1, name: "The Blue Note", city: "New York", capacity: 150 },
    { id: 2, name: "Grand Hotel", city: "Chicago", capacity: 500 },
    { id: 3, name: "Pine Valley Resort", city: "Los Angeles", capacity: 300 },
  ]);

  const [formData, setFormData] = useState({ name: '', city: '', capacity: '' });

  useEffect(() => {
    const closeMenu = () => setMenuOpenId(null);
    if (menuOpenId) window.addEventListener('click', closeMenu);
    return () => window.removeEventListener('click', closeMenu);
  }, [menuOpenId]);

  const filteredVenues = venues.filter(venue => 
    venue.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    venue.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenAdd = () => {
    setFormData({ name: '', city: '', capacity: '' });
    setEditingVenueId(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (venue) => {
    setFormData({ name: venue.name, city: venue.city, capacity: venue.capacity });
    setEditingVenueId(venue.id);
    setIsModalOpen(true);
    setMenuOpenId(null);
  };

  const handleDelete = (id) => {
    if (window.confirm("Remove this venue from your database?")) {
      setVenues(venues.filter(v => v.id !== id));
      if (selectedVenue?.id === id) setSelectedVenue(null);
    }
    setMenuOpenId(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingVenueId) {
      setVenues(venues.map(v => v.id === editingVenueId ? { ...v, ...formData } : v));
      if (selectedVenue?.id === editingVenueId) setSelectedVenue({ id: editingVenueId, ...formData });
    } else {
      setVenues([...venues, { id: Date.now(), ...formData }]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="view-section">
      <div className="view-header">
        <h2>Venue Directory</h2>
        <button className="add-button" title="Add New Venue" onClick={handleOpenAdd}>+</button>
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
              <th style={{ width: '50px' }}></th>
            </tr>
          </thead>
          <tbody>
            {filteredVenues.map(venue => (
              <tr 
                key={venue.id} 
                onClick={() => setSelectedVenue(venue)}
                className={selectedVenue?.id === venue.id ? 'selected-row' : ''}
              >
                <td>{venue.name}</td>
                <td>
                  <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${venue.name} ${venue.city}`)}`} target="_blank" rel="noopener noreferrer" className="text-link-btn">
                    {venue.city}
                  </a>
                </td>
                <td>{venue.capacity}</td>
                <td className="action-cell">
                  <button 
                    className="meatball-button" 
                    onClick={(e) => { e.stopPropagation(); setMenuOpenId(menuOpenId === venue.id ? null : venue.id); }}
                  >
                    ⋮
                  </button>
                  {menuOpenId === venue.id && (
                    <div className="menu-dropdown">
                      <button onClick={(e) => { e.stopPropagation(); handleOpenEdit(venue); }}>Edit Venue</button>
                      <button className="danger" onClick={(e) => { e.stopPropagation(); handleDelete(venue.id); }}>Delete</button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedVenue && (
        <div className="details-section" style={{ marginTop: '2rem' }}>
          <div className="view-header">
            <h2>Venue Details: {selectedVenue.name}</h2>
          </div>
          <div className="stat-card">
            <p><strong>Location:</strong> 
              <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${selectedVenue.name} ${selectedVenue.city}`)}`} target="_blank" rel="noopener noreferrer" className="text-link-btn" style={{ marginLeft: '5px' }}>
                {selectedVenue.city}
              </a>
            </p>
            <p><strong>Max Capacity:</strong> {selectedVenue.capacity} guests</p>
            <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: 'var(--text)' }}>
              Additional technical specs, sound system details, and booking history would appear here.
            </p>
          </div>
        </div>
      )}

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>{editingVenueId ? 'Edit Venue' : 'Register New Venue'}</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-grid">
                <div className="form-group full-width">
                  <label>Venue Name</label>
                  <input 
                    type="text" 
                    value={formData.name} 
                    onChange={(e) => setFormData({...formData, name: e.target.value})} 
                    required 
                  />
                </div>
                <div className="form-group">
                  <label>City</label>
                  <input 
                    type="text" 
                    value={formData.city} 
                    onChange={(e) => setFormData({...formData, city: e.target.value})} 
                    required 
                  />
                </div>
                <div className="form-group">
                  <label>Capacity</label>
                  <input 
                    type="number" 
                    value={formData.capacity} 
                    onChange={(e) => setFormData({...formData, capacity: e.target.value})} 
                    required 
                  />
                </div>
              </div>
              <div className="modal-actions">
                <button type="button" className="cancel-button" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className="submit-button">Save Venue</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default VenueList;