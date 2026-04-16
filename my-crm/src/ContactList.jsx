import React, { useState } from 'react';

const ContactList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const contacts = [
    { id: 1, name: "Mike Ross", role: "Agent", phone: "555-0199" },
    { id: 2, name: "Harvey Specter", role: "Manager", phone: "555-0200" },
  ];

  const filteredContacts = contacts.filter(contact => 
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.phone.includes(searchTerm)
  );

  return (
    <div className="view-section">
      <div className="view-header">
        <h2>Contact List</h2>
        <button className="add-button" title="Add New Contact">+</button>
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
            </tr>
          </thead>
          <tbody>
            {filteredContacts.map(contact => (
              <tr key={contact.id}>
                <td>{contact.name}</td>
                <td>{contact.role}</td>
                <td>{contact.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContactList;