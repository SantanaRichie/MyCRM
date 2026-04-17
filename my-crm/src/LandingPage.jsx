import React, { useState } from 'react';
import { database } from './database';

const LandingPage = ({ onEnter }) => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    const db = database.getData();
    
    const user = db.users?.find(
      (u) => u.username === username.trim() && u.password === password.trim()
    );

    if (user) {
      onEnter();
    } else {
      setError('Invalid username or password');
    }
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    const db = database.getData();
    const trimmedUser = username.trim();
    const trimmedPass = password.trim();

    if (db.users?.find(u => u.username === trimmedUser)) {
      setError('Username already taken');
      return;
    }

    const newUser = { username: trimmedUser, password: trimmedPass };
    const updatedUsers = [...(db.users || []), newUser];
    database.saveData({ ...db, users: updatedUsers });
    onEnter();
  };

  return (
    <div className="landing-container">
      <nav className="landing-nav">
        <div className="landing-logo">Artist CRM</div>
        <div className="landing-nav-links">
          <button className="primary-btn" onClick={() => setShowLogin(true)}>Sign In</button>
        </div>
      </nav>

      <header className="hero-section">
        <h1>The Command Center for your <span className="highlight">Art</span></h1>
        <p>A unified workspace for artists and managers to track gigs, manage venues, and launch releases without the chaos of spreadsheets.</p>
        <div className="hero-actions">
          <button className="cta-button" onClick={() => setShowSignUp(true)}>Get Started for Free</button>
        </div>
      </header>

      <section className="features-grid-landing">
        <div className="feature-item">
          <div className="feature-icon">🎸</div>
          <h3>Gig Management</h3>
          <p>Track every performance from inquiry to encore. Keep technical riders and contracts in one place.</p>
        </div>
        <div className="feature-item">
          <div className="feature-icon">🚀</div>
          <h3>Release Roadmaps</h3>
          <p>Plan your EPs and Albums with Jira-style milestone tracking. Assign tasks to your crew and never miss a deadline.</p>
        </div>
        <div className="feature-item">
          <div className="feature-icon">🏢</div>
          <h3>Venue & Client DB</h3>
          <p>Build your private rolodex of venues, capacities, and talent buyers across every city you tour.</p>
        </div>
        <div className="feature-item">
          <div className="feature-icon">📅</div>
          <h3>Workbook Calendar</h3>
          <p>A mobile-optimized vertical week view designed for the artist on the move. Sync your schedule instantly.</p>
        </div>
      </section>

      <footer className="landing-footer">
        <p>&copy; {new Date().getFullYear()} ArtistCRM. Built for the stage.</p>
      </footer>

      {showLogin && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: '400px' }}>
            <h3 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>Sign In</h3>
            <form onSubmit={handleLogin}>
              {error && <div className="error-text">{error}</div>}
              <div className="form-group" style={{ marginBottom: '1rem' }}>
                <label>Username</label>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
              </div>
              <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                <label>Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
              <div className="modal-actions" style={{ justifyContent: 'center' }}>
                <button type="button" className="cancel-button" onClick={() => setShowLogin(false)}>Cancel</button>
                <button type="submit" className="submit-button">Login</button>
              </div>
              <p style={{ marginTop: '1.5rem', fontSize: '0.8rem', color: '#64748b', textAlign: 'center' }}>
                Demo credentials: <strong>admin</strong> / <strong>pwd</strong>
              </p>
            </form>
          </div>
        </div>
      )}

      {showSignUp && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: '400px' }}>
            <h3 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>Create Your Account</h3>
            <form onSubmit={handleSignUp}>
              {error && <div className="error-text">{error}</div>}
              <div className="form-group" style={{ marginBottom: '1rem' }}>
                <label>Username</label>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
              </div>
              <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                <label>Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
              <div className="modal-actions" style={{ justifyContent: 'center' }}>
                <button type="button" className="cancel-button" onClick={() => setShowSignUp(false)}>Cancel</button>
                <button type="submit" className="submit-button">Sign Up</button>
              </div>
              <p style={{ marginTop: '1.5rem', fontSize: '0.8rem', color: '#64748b', textAlign: 'center' }}>
                Already have an account? <span style={{ color: 'var(--accent)', cursor: 'pointer' }} onClick={() => { setShowSignUp(false); setShowLogin(true); }}>Sign In</span>
              </p>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;