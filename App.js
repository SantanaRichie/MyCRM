import React, { useState } from 'react';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'gigs': return <div>Gig Management Component</div>;
      case 'artists': return <div>Artist Profiles Component</div>;
      case 'venues': return <div>Venue Directory Component</div>;
      case 'clients': return <div>Client Database Component</div>;
      case 'contacts': return <div>Contact List Component</div>;
      default: return <div>Welcome to ArtistCRM Dashboard</div>;
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>ArtistCRM</h1>
        <nav>
          <button onClick={() => setActiveTab('dashboard')}>Dashboard</button>
          <button onClick={() => setActiveTab('gigs')}>Gigs</button>
          <button onClick={() => setActiveTab('artists')}>Artists</button>
          <button onClick={() => setActiveTab('venues')}>Venues</button>
          <button onClick={() => setActiveTab('clients')}>Clients</button>
          <button onClick={() => setActiveTab('contacts')}>Contacts</button>
        </nav>
      </header>
      <main className="app-content">
        {renderContent()}
      </main>
      <footer className="app-footer">
        <p>&copy; {new Date().getFullYear()} ArtistCRM - Secure Artist Management</p>
      </footer>
    </div>
  );
}

export default App;
