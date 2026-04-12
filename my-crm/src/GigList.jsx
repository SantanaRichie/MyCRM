import React, { useState, useEffect } from 'react';

const GigList = () => {
  const [selectedGigId, setSelectedGigId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingGigId, setEditingGigId] = useState(null);
  const [menuOpenId, setMenuOpenId] = useState(null);

  const [gigs, setGigs] = useState([
    { id: 1, name: "Summer Jazz Night", venue: "The Blue Note", date: "2024-06-15", status: "Confirmed" },
    { id: 2, name: "Corporate Gala", venue: "Grand Hotel", date: "2024-07-02", status: "Pending" },
    { id: 3, name: "Wedding Performance", venue: "Pine Valley Resort", date: "2024-07-10", status: "Confirmed" },
  ]);

  const [gigDetails, setGigDetails] = useState({
    1: { artist: "The Jazz Trio", contact: "John Doe - 555-1234", location: "New York, NY", notes: "Set up by 6 PM, soundcheck at 5 PM" },
    2: { artist: "Corporate Band", contact: "Jane Smith - 555-5678", location: "Chicago, IL", notes: "Formal attire, arrive by 7 PM" },
    3: { artist: "Wedding Duo", contact: "Emily Davis - 555-9012", location: "Los Angeles, CA", notes: "Outdoor event, bring own equipment" },
  });

  const [formData, setFormData] = useState({
    name: '', venue: '', date: '', status: 'Pending',
    artist: '', contact: '', location: '', notes: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const openEditModal = (gig) => {
    const details = gigDetails[gig.id] || {};
    setFormData({
      name: gig.name,
      venue: gig.venue,
      date: gig.date,
      status: gig.status,
      artist: details.artist || '',
      contact: details.contact || '',
      location: details.location || '',
      notes: details.notes || ''
    });
    setEditingGigId(gig.id);
    setIsModalOpen(true);
    setMenuOpenId(null);
  };

  const handleCancelGig = (id) => {
    if (window.confirm("Are you sure you want to cancel this gig?")) {
      setGigs(gigs.filter(g => g.id !== id));
      const newDetails = { ...gigDetails };
      delete newDetails[id];
      setGigDetails(newDetails);
      if (selectedGigId === id) setSelectedGigId(null);
    }
    setMenuOpenId(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingGigId) {
      setGigs(gigs.map(g => g.id === editingGigId ? { ...g, name: formData.name, venue: formData.venue, date: formData.date, status: formData.status } : g));
      setGigDetails({ ...gigDetails, [editingGigId]: { artist: formData.artist, contact: formData.contact, location: formData.location, notes: formData.notes } });
      setEditingGigId(null);
    } else {
      const newId = Date.now();
      setGigs([...gigs, { id: newId, name: formData.name, venue: formData.venue, date: formData.date, status: formData.status }]);
      setGigDetails({ ...gigDetails, [newId]: { artist: formData.artist, contact: formData.contact, location: formData.location, notes: formData.notes } });
      setSelectedGigId(newId);
    }
    setIsModalOpen(false);
    setFormData({ name: '', venue: '', date: '', status: 'Pending', artist: '', contact: '', location: '', notes: '' });
  };

  // Close menu when clicking outside
  useEffect(() => {
    const closeMenu = () => setMenuOpenId(null);
    if (menuOpenId) {
      window.addEventListener('click', closeMenu);
    }
    return () => window.removeEventListener('click', closeMenu);
  }, [menuOpenId]);

  return (
    <div className="gigs-view">
      <div className="view-header">
        <h2>Gig Management</h2>
        <button className="add-button" title="Add New Gig" onClick={() => { setEditingGigId(null); setIsModalOpen(true); }}>+</button>
      </div>
      <table className="data-table">
        <thead>
          <tr>
            <th>Event Name</th>
            <th>Venue</th>
            <th>Date</th>
            <th>Status</th>
            <th style={{ width: '50px' }}></th>
          </tr>
        </thead>
        <tbody>
          {gigs.map(gig => (
            <tr 
              key={gig.id} 
              onClick={() => setSelectedGigId(gig.id)}
              className={selectedGigId === gig.id ? 'selected-row' : ''}
            >
              <td>{gig.name}</td>
              <td>{gig.venue}</td>
              <td>{gig.date}</td>
              <td>
                <span className="status-badge" style={{ 
                  backgroundColor: gig.status === 'Confirmed' ? '#dcfce7' : '#fef9c3',
                  color: gig.status === 'Confirmed' ? '#166534' : '#854d0e'
                }}>{gig.status}</span>
              </td>
              <td className="action-cell">
                <button 
                  className="meatball-button" 
                  onClick={(e) => { e.stopPropagation(); setMenuOpenId(menuOpenId === gig.id ? null : gig.id); }}
                >
                  ⋮
                </button>
                {menuOpenId === gig.id && (
                  <div className="menu-dropdown">
                    <button onClick={(e) => { e.stopPropagation(); openEditModal(gig); }}>Edit Details</button>
                    <button className="danger" onClick={(e) => { e.stopPropagation(); handleCancelGig(gig.id); }}>Cancel Gig</button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table> 

      {selectedGigId && (
        <div className="details-section" style={{ marginTop: '2rem' }}>
          <h2>Gig Details</h2>
          <table className="data-table">
            <thead>
              <tr>
                <th>Artist</th>
                <th>Contact</th>
                <th>Location</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{gigDetails[selectedGigId].artist}</td>
                <td>{gigDetails[selectedGigId].contact}</td>
                <td>{gigDetails[selectedGigId].location}</td>
                <td>{gigDetails[selectedGigId].notes}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>{editingGigId ? 'Edit Gig' : 'Add New Gig'}</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-grid">
                <div className="form-group">
                  <label>Event Name</label>
                  <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                  <label>Venue</label>
                  <input type="text" name="venue" value={formData.venue} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                  <label>Date</label>
                  <input type="date" name="date" value={formData.date} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                  <label>Status</label>
                  <select name="status" value={formData.status} onChange={handleInputChange}>
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Artist</label>
                  <input type="text" name="artist" value={formData.artist} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                  <label>Contact Info</label>
                  <input type="text" name="contact" value={formData.contact} onChange={handleInputChange} />
                </div>
                <div className="form-group full-width">
                  <label>Notes</label>
                  <textarea name="notes" value={formData.notes} onChange={handleInputChange} rows="3"></textarea>
                </div>
              </div>
              <div className="modal-actions">
                <button type="button" className="cancel-button" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className="submit-button">Add Gig</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default GigList;