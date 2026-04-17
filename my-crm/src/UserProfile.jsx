import React, { useState } from 'react';

const UserProfile = () => {
  const [userData] = useState({
    name: "Admin User",
    email: "admin@artistcrm.io",
    role: "System Administrator",
    joined: "January 2024",
    bio: "Managing the world's most talented rosters with precision and style."
  });

  return (
    <div className="profile-view">
      <div className="view-header">
        <h2>Account Profile</h2>
      </div>
      
      <div className="stat-card" style={{ maxWidth: '800px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
          <div className="profile-avatar" style={{
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            backgroundColor: 'var(--accent)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '3rem',
            color: 'white',
            fontWeight: 'bold',
            boxShadow: 'var(--shadow)'
          }}>
            {userData.name.charAt(0)}
          </div>
          <div>
            <h1 style={{ margin: 0 }}>{userData.name}</h1>
            <p style={{ color: 'var(--accent)', fontWeight: '500', margin: '0.2rem 0' }}>{userData.role}</p>
            <p style={{ fontSize: '0.85rem', color: '#6c757d' }}>Member since {userData.joined}</p>
          </div>
        </div>

        <div className="form-grid">
          <div className="form-group">
            <label>Full Name</label>
            <input type="text" value={userData.name} readOnly />
          </div>
          <div className="form-group">
            <label>Email Address</label>
            <input type="email" value={userData.email} readOnly />
          </div>
          <div className="form-group full-width">
            <label>Bio / Artist Statement</label>
            <textarea rows="3" value={userData.bio} readOnly style={{ resize: 'none' }}></textarea>
          </div>
        </div>

        <div className="modal-actions" style={{ marginTop: '2rem', justifyContent: 'flex-start' }}>
          <button className="submit-button" onClick={() => alert('Profile updates are disabled in demo mode.')}>Update Profile</button>
          <button className="cancel-button">Security Settings</button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;