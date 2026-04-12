import React, { useState } from 'react';
import './App.css';
import Dashboard from './Dashboard.jsx';
import GigList from './GigList.jsx';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'gigs': return <GigList />;
      case 'artists': return <div>Artist Profiles Component</div>;
      case 'venues': return <div>Venue Directory Component</div>;
      case 'clients': return <div>Client Database Component</div>;
      case 'contacts': return <div>Contact List Component</div>;
      case 'calendar': return <div>Google Calendar & API Settings</div>;
      default: return <Dashboard onNavigate={setActiveTab} />;
    }
  };

  return (
    <div className="app-container">
      <aside className="sidebar">
        <h1 className={activeTab === 'dashboard' ? 'active' : ''} onClick={() => setActiveTab('dashboard')}>Artist CRM</h1>
        <nav>
          <button className={activeTab === 'dashboard' ? 'active' : ''} onClick={() => setActiveTab('dashboard')}>Dashboard</button>
          {/* <button className={activeTab === 'calendar' ? 'active' : ''} onClick={() => setActiveTab('calendar')}>Calendar</button> */}
          <button className={activeTab === 'gigs' ? 'active' : ''} onClick={() => setActiveTab('gigs')}>Gigs</button>
          <button className={activeTab === 'artists' ? 'active' : ''} onClick={() => setActiveTab('artists')}>Artists</button>
          <button className={activeTab === 'venues' ? 'active' : ''} onClick={() => setActiveTab('venues')}>Venues</button>
          <button className={activeTab === 'clients' ? 'active' : ''} onClick={() => setActiveTab('clients')}>Clients</button>
          <button className={activeTab === 'contacts' ? 'active' : ''} onClick={() => setActiveTab('contacts')}>Contacts</button>
        </nav>
      </aside>

      <div className="main-content">
        <header className="app-header">
          <div className="user-profile">Admin User</div>
        </header>
        <main className="view-container">
          {renderContent()}
        </main>
        <footer className="app-footer">
          <p>&copy; {new Date().getFullYear()} ArtistCRM - Secure Artist Management</p>
        </footer>
      </div>
    </div>
  );
}

export default App;