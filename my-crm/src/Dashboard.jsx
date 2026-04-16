import React, { useState, useEffect } from 'react';

const Dashboard = ({ onNavigate }) => {
  const [activeMonth, setActiveMonth] = useState(new Date().getMonth());
  const [activeWeekIndex, setActiveWeekIndex] = useState(0);
  const [tabStartIndex, setTabStartIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const year = 2024; // Static year for context, can be made dynamic

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Initialize/Sync week index to "today" on mount or when month is manually changed via tabs
  useEffect(() => {
    const firstDay = new Date(year, activeMonth, 1).getDay();
    const today = new Date();
    if (today.getMonth() === activeMonth && today.getFullYear() === year) {
      setActiveWeekIndex(Math.floor((firstDay + today.getDate() - 1) / 7));
    } else {
      setActiveWeekIndex(0);
    }
  }, [activeMonth]);

  // Effect to keep the active month tab in the visible window of 4 tabs on mobile
  useEffect(() => {
    if (isMobile) {
      if (activeMonth < tabStartIndex) {
        setTabStartIndex(activeMonth);
      } else if (activeMonth > tabStartIndex + 3) {
        setTabStartIndex(Math.max(0, Math.min(activeMonth - 3, 8)));
      }
    }
  }, [activeMonth, isMobile, tabStartIndex]);

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const handleNextMonths = () => setTabStartIndex(prev => Math.min(prev + 1, 8));
  const handlePrevMonths = () => setTabStartIndex(prev => Math.max(prev - 1, 0));

  const getTotalWeeks = (m) => {
    const firstDay = new Date(year, m, 1).getDay();
    const daysInMonth = new Date(year, m + 1, 0).getDate();
    return Math.ceil((firstDay + daysInMonth) / 7);
  };

  const handleNextWeek = () => {
    const totalWeeks = getTotalWeeks(activeMonth);
    if (activeWeekIndex < totalWeeks - 1) {
      setActiveWeekIndex(prev => prev + 1);
    } else if (activeMonth < 11) {
      setActiveMonth(prev => prev + 1); // useEffect handles resetting week index to 0
    }
  };

  const handlePrevWeek = () => {
    if (activeWeekIndex > 0) {
      setActiveWeekIndex(prev => prev - 1);
    } else if (activeMonth > 0) {
      const prevMonth = activeMonth - 1;
      const prevMonthTotalWeeks = getTotalWeeks(prevMonth);
      setActiveMonth(prevMonth);
      // Manually set this because the useEffect would otherwise reset it to 0 or "today"
      setTimeout(() => setActiveWeekIndex(prevMonthTotalWeeks - 1), 0);
    }
  };

  return (
    <div className="dashboard-view">
      <h2>Business Overview</h2>
      <div className="stats-grid">
        <div className="stat-card" onClick={() => onNavigate('gigs')}>
          <h3>Pending Gigs</h3>
          <p>12</p>
        </div>
        <div className="stat-card" onClick={() => onNavigate('artists')}>
          <h3>Total Artists</h3>
          <p>48</p>
        </div>
        <div className="stat-card" onClick={() => onNavigate('contacts')}>
          <h3>New Leads</h3>
          <p>5</p>
        </div>
      </div>
      <div className="calendar-section">
        <h2>{isMobile ? 'Week View' : 'Event Calendar'}</h2>
        <div className="calendar-workbook">
          <div className="calendar-tabs">
            {isMobile && <button className="tab-nav-btn" onClick={handlePrevMonths} disabled={tabStartIndex === 0}>‹</button>}
            {(isMobile ? months.slice(tabStartIndex, tabStartIndex + 4) : months).map((month, index) => {
              const monthIndex = isMobile ? index + tabStartIndex : index;
              return (
                <button 
                  key={month} 
                  className={`month-tab ${activeMonth === monthIndex ? 'active' : ''}`}
                  onClick={() => setActiveMonth(monthIndex)}
                >
                  {month.substring(0, 3)}
                </button>
              );
            })}
            {isMobile && <button className="tab-nav-btn" onClick={handleNextMonths} disabled={tabStartIndex === 8}>›</button>}
          </div>
          <div className="calendar-sheet">
            <div className="calendar-header-mobile">
              {isMobile && <button className="week-nav-btn" onClick={handlePrevWeek} aria-label="Previous week">‹</button>}
              <h3>
                {months[activeMonth]} {year}
                {isMobile && <span className="week-label"> Week {activeWeekIndex + 1}</span>}
              </h3>
              {isMobile && <button className="week-nav-btn" onClick={handleNextWeek} aria-label="Next week">›</button>}
            </div>
            <table className="calendar-table">
              {!isMobile && (
                <thead>
                  <tr>
                    <th>Sun</th><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th>
                  </tr>
                </thead>
              )}
              <tbody>
                {(() => {
                  const firstDay = new Date(year, activeMonth, 1).getDay();
                  const daysInMonth = new Date(year, activeMonth + 1, 0).getDate();
                  const days = [];
                  for (let i = 0; i < firstDay; i++) days.push(<td key={`e-${i}`}></td>);
                  for (let d = 1; d <= daysInMonth; d++) days.push(<td key={d}>{d}</td>);
                  
                  if (isMobile) {
                    const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
                    const weekStart = activeWeekIndex * 7;
                    const weekDays = days.slice(weekStart, weekStart + 7);
                    while (weekDays.length < 7) {
                      weekDays.push(<td key={`pad-mobile-${weekDays.length}`}></td>);
                    }
                    return weekDays.map((dayCell, idx) => (
                      <tr key={`mobile-row-${idx}`}>
                        <td className="day-label">{dayLabels[idx]}</td>
                        {dayCell}
                      </tr>
                    ));
                  }

                  const rows = [];
                  for (let i = 0; i < days.length; i += 7) {
                    const week = days.slice(i, i + 7);
                    while (week.length < 7) {
                      week.push(<td key={`pad-${week.length}`}></td>);
                    }
                    rows.push(<tr key={i}>{week}</tr>);
                  }
                  return rows;
                })()}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;