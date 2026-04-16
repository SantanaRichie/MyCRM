import React, { useState } from 'react';

const ClientList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const clients = [
    { id: 1, name: "Sarah Jenkins", company: "EventCorp", email: "sarah@eventcorp.com" },
    { id: 2, name: "Marcus Thorne", company: "Global Gigs", email: "m.thorne@globalgigs.net" },
  ];

  const filteredClients = clients.filter(client => 
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="view-section">
      <div className="view-header">
        <h2>Client Database</h2>
        <button className="add-button" title="Add New Client">+</button>
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
            </tr>
          </thead>
          <tbody>
            {filteredClients.map(client => (
              <tr key={client.id}>
                <td>{client.name}</td>
                <td>{client.company}</td>
                <td>{client.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClientList;