import React, { useState, useEffect } from 'react';

const ArtistList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingArtistId, setEditingArtistId] = useState(null);
  const [menuOpenId, setMenuOpenId] = useState(null);
  
  const [artists, setArtists] = useState([
    { id: 1, name: "The Jazz Trio", genre: "Jazz", status: "Active" },
    { id: 2, name: "Luna Ray", genre: "Acoustic Pop", status: "On Tour" },
    { id: 3, name: "Midnight Echo", genre: "Rock", status: "Available" },
  ]);

  const [formData, setFormData] = useState({ name: '', genre: '', status: 'Available' });

  // Close menu when clicking outside
  useEffect(() => {
    const closeMenu = () => setMenuOpenId(null);
    if (menuOpenId) window.addEventListener('click', closeMenu);
    return () => window.removeEventListener('click', closeMenu);
  }, [menuOpenId]);

  const filteredArtists = artists.filter(artist => 
    artist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    artist.genre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    artist.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenAdd = () => {
    setFormData({ name: '', genre: '', status: 'Available' });
    setEditingArtistId(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (artist) => {
    setFormData({ name: artist.name, genre: artist.genre, status: artist.status });
    setEditingArtistId(artist.id);
    setIsModalOpen(true);
    setMenuOpenId(null);
  };

  const handleDelete = (id) => {
    if (window.confirm("Remove this artist from the roster?")) {
      setArtists(artists.filter(a => a.id !== id));
      if (selectedArtist?.id === id) setSelectedArtist(null);
    }
    setMenuOpenId(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingArtistId) {
      setArtists(artists.map(a => a.id === editingArtistId ? { ...a, ...formData } : a));
      if (selectedArtist?.id === editingArtistId) setSelectedArtist({ id: editingArtistId, ...formData });
    } else {
      const newArtist = { id: Date.now(), ...formData };
      setArtists([...artists, newArtist]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="view-section">
      <div className="view-header">
        <h2>Artist Profiles</h2>
        <button className="add-button" title="Add New Artist" onClick={handleOpenAdd}>+</button>
      </div>
      <div className="search-container">
        <input 
          type="text" 
          placeholder="Search artists by name, genre or status..." 
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
              <th>Genre</th>
              <th>Status</th>
              <th style={{ width: '50px' }}></th>
            </tr>
          </thead>
          <tbody>
            {filteredArtists.map(artist => (
              <tr 
                key={artist.id} 
                onClick={() => setSelectedArtist(artist)}
                className={selectedArtist?.id === artist.id ? 'selected-row' : ''}
              >
                <td>{artist.name}</td>
                <td>{artist.genre}</td>
                <td>
                  <span className="status-badge" style={{ 
                    backgroundColor: artist.status === 'Active' ? '#dcfce7' : artist.status === 'On Tour' ? '#dbeafe' : '#f3f4f6',
                    color: artist.status === 'Active' ? '#166534' : artist.status === 'On Tour' ? '#1e40af' : '#374151'
                  }}>{artist.status}</span>
                </td>
                <td className="action-cell">
                  <button 
                    className="meatball-button" 
                    onClick={(e) => { e.stopPropagation(); setMenuOpenId(menuOpenId === artist.id ? null : artist.id); }}
                  >
                    ⋮
                  </button>
                  {menuOpenId === artist.id && (
                    <div className="menu-dropdown">
                      <button onClick={(e) => { e.stopPropagation(); handleOpenEdit(artist); }}>Edit Artist</button>
                      <button className="danger" onClick={(e) => { e.stopPropagation(); handleDelete(artist.id); }}>Remove</button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedArtist && (
        <div className="details-section" style={{ marginTop: '2rem' }}>
          <div className="view-header">
            <h2>Artist Details: {selectedArtist.name}</h2>
          </div>
          <div className="stat-card">
            <p><strong>Primary Genre:</strong> {selectedArtist.genre}</p>
            <p><strong>Current Status:</strong> {selectedArtist.status}</p>
            <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: 'var(--text)' }}>
              Social media links, press kits, and active contracts for {selectedArtist.name} would be managed here.
            </p>
          </div>
        </div>
      )}

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>{editingArtistId ? 'Update Artist' : 'New Artist Profile'}</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-grid">
                <div className="form-group full-width">
                  <label>Artist Name</label>
                  <input 
                    type="text" 
                    value={formData.name} 
                    onChange={(e) => setFormData({...formData, name: e.target.value})} 
                    required 
                  />
                </div>
                <div className="form-group">
                  <label>Genre</label>
                  <input 
                    type="text" 
                    value={formData.genre} 
                    onChange={(e) => setFormData({...formData, genre: e.target.value})} 
                    required 
                  />
                </div>
                <div className="form-group">
                  <label>Status</label>
                  <select 
                    value={formData.status} 
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                  >
                    <option value="Active">Active</option>
                    <option value="On Tour">On Tour</option>
                    <option value="Available">Available</option>
                  </select>
                </div>
              </div>
              <div className="modal-actions">
                <button type="button" className="cancel-button" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className="submit-button">Save Profile</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArtistList;