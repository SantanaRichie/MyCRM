import React, { useState } from 'react';
import './App.css';
import Dashboard from './Dashboard.jsx';
import GigList from './GigList.jsx';
import ArtistList from './ArtistList.jsx';
import VenueList from './VenueList.jsx';
import ClientList from './ClientList.jsx';
import ContactList from './ContactList.jsx';
import ArtistStories from './ArtistStories.jsx'; // Import the new component

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavigation = (tab) => {
    setActiveTab(tab);
    setIsMenuOpen(false); // Close menu on mobile after selection
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const renderContent = () => {
    switch (activeTab) {
      case 'gigs': return <GigList />;
      case 'artists': return <ArtistList />;
      case 'venues': return <VenueList />;
      case 'clients': return <ClientList />;
      case 'contacts': return <ContactList />;
      case 'projects': return <ArtistStories />; // Add case for Artist Stories
      case 'calendar': return <div>Google Calendar & API Settings</div>;
      default: return <Dashboard onNavigate={setActiveTab} />;
    }
  };

  return (
    <div className="app-container">
      <aside className={`sidebar ${isMenuOpen ? 'mobile-open' : ''}`}>
        <h1 className={activeTab === 'dashboard' ? 'active' : ''}>
          <span onClick={() => handleNavigation('dashboard')}>Artist CRM</span>
          <button className="menu-toggle" onClick={toggleMenu} aria-label="Toggle menu">
            {isMenuOpen ? '✕' : '☰'}
          </button>
        </h1>
        <nav>
          <button className={activeTab === 'dashboard' ? 'active' : ''} onClick={() => handleNavigation('dashboard')}>Dashboard</button>
          {/* <button className={activeTab === 'calendar' ? 'active' : ''} onClick={() => setActiveTab('calendar')}>Calendar</button> */}
          <button className={activeTab === 'gigs' ? 'active' : ''} onClick={() => handleNavigation('gigs')}>Gigs</button>
          <button className={activeTab === 'artists' ? 'active' : ''} onClick={() => handleNavigation('artists')}>Artists</button>
          <button className={activeTab === 'venues' ? 'active' : ''} onClick={() => handleNavigation('venues')}>Venues</button>
          <button className={activeTab === 'clients' ? 'active' : ''} onClick={() => handleNavigation('clients')}>Clients</button>
          <button className={activeTab === 'projects' ? 'active' : ''} onClick={() => handleNavigation('projects')}>Projects</button> {/* New Projects button */}
          <button className={activeTab === 'contacts' ? 'active' : ''} onClick={() => handleNavigation('contacts')}>Contacts</button>
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