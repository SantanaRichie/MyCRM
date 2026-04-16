import React, { useState } from 'react';

const ArtistList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const artists = [
    { id: 1, name: "The Jazz Trio", genre: "Jazz", status: "Active" },
    { id: 2, name: "Luna Ray", genre: "Acoustic Pop", status: "On Tour" },
    { id: 3, name: "Midnight Echo", genre: "Rock", status: "Available" },
  ];

  const filteredArtists = artists.filter(artist => 
    artist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    artist.genre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    artist.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="view-section">
      <div className="view-header">
        <h2>Artist Profiles</h2>
        <button className="add-button" title="Add New Artist">+</button>
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
            </tr>
          </thead>
          <tbody>
            {filteredArtists.map(artist => (
              <tr key={artist.id}>
                <td>{artist.name}</td>
                <td>{artist.genre}</td>
                <td><span className="status-badge">{artist.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ArtistList;