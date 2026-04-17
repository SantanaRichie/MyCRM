import React, { useState, useEffect } from 'react';

const ClientList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClient, setSelectedClient] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingClientId, setEditingClientId] = useState(null);
  const [menuOpenId, setMenuOpenId] = useState(null);

  const [clients, setClients] = useState([
    { id: 1, name: "Sarah Jenkins", company: "EventCorp", email: "sarah@eventcorp.com" },
    { id: 2, name: "Marcus Thorne", company: "Global Gigs", email: "m.thorne@globalgigs.net" },
  ]);

  const [formData, setFormData] = useState({ name: '', company: '', email: '' });

  useEffect(() => {
    const closeMenu = () => setMenuOpenId(null);
    if (menuOpenId) window.addEventListener('click', closeMenu);
    return () => window.removeEventListener('click', closeMenu);
  }, [menuOpenId]);

  const filteredClients = clients.filter(client => 
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenAdd = () => {
    setFormData({ name: '', company: '', email: '' });
    setEditingClientId(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (client) => {
    setFormData({ name: client.name, company: client.company, email: client.email });
    setEditingClientId(client.id);
    setIsModalOpen(true);
    setMenuOpenId(null);
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this client record?")) {
      setClients(clients.filter(c => c.id !== id));
      if (selectedClient?.id === id) setSelectedClient(null);
    }
    setMenuOpenId(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingClientId) {
      setClients(clients.map(c => c.id === editingClientId ? { ...c, ...formData } : c));
      if (selectedClient?.id === editingClientId) setSelectedClient({ id: editingClientId, ...formData });
    } else {
      setClients([...clients, { id: Date.now(), ...formData }]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="view-section">
      <div className="view-header">
        <h2>Client Database</h2>
        <button className="add-button" title="Add New Client" onClick={handleOpenAdd}>+</button>
      </div>
      <div className="search-container">
        <input 
          type="text" 
          placeholder="Search clients..." 
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
              <th>Company</th>
              <th>Email</th>
              <th style={{ width: '50px' }}></th>
            </tr>
          </thead>
          <tbody>
            {filteredClients.map(client => (
              <tr 
                key={client.id} 
                onClick={() => setSelectedClient(client)}
                className={selectedClient?.id === client.id ? 'selected-row' : ''}
              >
                <td>{client.name}</td>
                <td>{client.company}</td>
                <td>
                  <a href={`mailto:${client.email}`} className="text-link-btn">
                    {client.email}
                  </a>
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
                      <button onClick={(e) => { e.stopPropagation(); handleOpenEdit(client); }}>Edit Profile</button>
                      <button className="danger" onClick={(e) => { e.stopPropagation(); handleDelete(client.id); }}>Remove</button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedClient && (
        <div className="details-section" style={{ marginTop: '2rem' }}>
          <div className="view-header">
            <h2>Client Profile: {selectedClient.name}</h2>
          </div>
          <div className="stat-card">
            <p><strong>Organization:</strong> {selectedClient.company}</p>
            <p><strong>Primary Email:</strong> 
              <a href={`mailto:${selectedClient.email}`} className="text-link-btn" style={{ marginLeft: '5px' }}>
                {selectedClient.email}
              </a>
            </p>
            <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: 'var(--text)' }}>
              Detailed booking preferences and past event history for {selectedClient.company} would be listed here.
            </p>
          </div>
        </div>
      )}

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>{editingClientId ? 'Update Client' : 'New Client Entry'}</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-grid">
                <div className="form-group full-width">
                  <label>Full Name</label>
                  <input 
                    type="text" 
                    value={formData.name} 
                    onChange={(e) => setFormData({...formData, name: e.target.value})} 
                    required 
                  />
                </div>
                <div className="form-group">
                  <label>Company</label>
                  <input 
                    type="text" 
                    value={formData.company} 
                    onChange={(e) => setFormData({...formData, company: e.target.value})} 
                    required 
                  />
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input 
                    type="email" 
                    value={formData.email} 
                    onChange={(e) => setFormData({...formData, email: e.target.value})} 
                    required 
                  />
                </div>
              </div>
              <div className="modal-actions">
                <button type="button" className="cancel-button" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className="submit-button">Save Client</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientList;