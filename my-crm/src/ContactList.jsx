import React, { useState, useEffect } from 'react';

const ContactList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedContact, setSelectedContact] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingContactId, setEditingContactId] = useState(null);
  const [menuOpenId, setMenuOpenId] = useState(null);

  const [contacts, setContacts] = useState([
    { id: 1, name: "Mike Ross", role: "Agent", phone: "555-0199" },
    { id: 2, name: "Harvey Specter", role: "Manager", phone: "555-0200" },
  ]);

  const [formData, setFormData] = useState({ name: '', role: '', phone: '' });

  useEffect(() => {
    const closeMenu = () => setMenuOpenId(null);
    if (menuOpenId) window.addEventListener('click', closeMenu);
    return () => window.removeEventListener('click', closeMenu);
  }, [menuOpenId]);

  const filteredContacts = contacts.filter(contact => 
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.phone.includes(searchTerm)
  );

  const handleOpenAdd = () => {
    setFormData({ name: '', role: '', phone: '' });
    setEditingContactId(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (contact) => {
    setFormData({ name: contact.name, role: contact.role, phone: contact.phone });
    setEditingContactId(contact.id);
    setIsModalOpen(true);
    setMenuOpenId(null);
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this contact card?")) {
      setContacts(contacts.filter(c => c.id !== id));
      if (selectedContact?.id === id) setSelectedContact(null);
    }
    setMenuOpenId(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingContactId) {
      setContacts(contacts.map(c => c.id === editingContactId ? { ...c, ...formData } : c));
      if (selectedContact?.id === editingContactId) setSelectedContact({ id: editingContactId, ...formData });
    } else {
      setContacts([...contacts, { id: Date.now(), ...formData }]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="view-section">
      <div className="view-header">
        <h2>Contact List</h2>
        <button className="add-button" title="Add New Contact" onClick={handleOpenAdd}>+</button>
      </div>
      <div className="search-container">
        <input 
          type="text" 
          placeholder="Search contacts..." 
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
              <th>Role</th>
              <th>Phone</th>
              <th style={{ width: '50px' }}></th>
            </tr>
          </thead>
          <tbody>
            {filteredContacts.map(contact => (
              <tr 
                key={contact.id} 
                onClick={() => setSelectedContact(contact)}
                className={selectedContact?.id === contact.id ? 'selected-row' : ''}
              >
                <td>{contact.name}</td>
                <td>{contact.role}</td>
                <td>
                  <a href={`tel:${contact.phone}`} className="text-link-btn">
                    {contact.phone}
                  </a>
                </td>
                <td className="action-cell">
                  <button 
                    className="meatball-button" 
                    onClick={(e) => { e.stopPropagation(); setMenuOpenId(menuOpenId === contact.id ? null : contact.id); }}
                  >
                    ⋮
                  </button>
                  {menuOpenId === contact.id && (
                    <div className="menu-dropdown">
                      <button onClick={(e) => { e.stopPropagation(); handleOpenEdit(contact); }}>Edit Card</button>
                      <button className="danger" onClick={(e) => { e.stopPropagation(); handleDelete(contact.id); }}>Delete</button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedContact && (
        <div className="details-section" style={{ marginTop: '2rem' }}>
          <div className="view-header">
            <h2>Contact Card: {selectedContact.name}</h2>
          </div>
          <div className="stat-card">
            <p><strong>Industry Role:</strong> {selectedContact.role}</p>
            <p><strong>Phone Number:</strong> 
              <a href={`tel:${selectedContact.phone}`} className="text-link-btn" style={{ marginLeft: '5px' }}>
                {selectedContact.phone}
              </a>
            </p>
            <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: 'var(--text)' }}>
              Private notes on communication preferences and associated artist rosters for this contact.
            </p>
          </div>
        </div>
      )}

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>{editingContactId ? 'Update Contact' : 'New Contact Card'}</h3>
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
                  <label>Role</label>
                  <input 
                    type="text" 
                    value={formData.role} 
                    onChange={(e) => setFormData({...formData, role: e.target.value})} 
                    required 
                  />
                </div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <input 
                    type="text" 
                    value={formData.phone} 
                    onChange={(e) => setFormData({...formData, phone: e.target.value})} 
                    required 
                  />
                </div>
              </div>
              <div className="modal-actions">
                <button type="button" className="cancel-button" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className="submit-button">Save Contact</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactList;