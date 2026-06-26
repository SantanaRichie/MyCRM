import React, { useState, useEffect } from 'react';

const Dashboard = ({ onNavigate }) => {
  const [activeMonth, setActiveMonth] = useState(new Date().getMonth());
  const [activeWeekIndex, setActiveWeekIndex] = useState(0);
  const [tabStartIndex, setTabStartIndex] = useState(0);
  const [selectedDate, setSelectedDate] = useState(new Date().getDate());
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const year = new Date().getFullYear();
  const [isDayModalOpen, setIsDayModalOpen] = useState(false);

  // Mock data for demonstration - in a real app, this would come from your database
  const dailyEvents = {
    [`${year}-${String(new Date().getMonth() + 1).padStart(2, '0')}-${String(new Date().getDate()).padStart(2, '0')}`]: {
      gigs: [{ name: "Today's Showcase", venue: "Local Lounge", time: "7:00 PM" }],
      tasks: [{ title: "Confirm Soundcheck", status: "Pending" }, { title: "Print Setlists", status: "Done" }]
    },
    "2024-06-15": { gigs: [{ name: "Summer Jazz Night", venue: "The Blue Note", time: "8:00 PM" }], tasks: [] },
    "2024-07-02": { gigs: [{ name: "Corporate Gala", venue: "Grand Hotel", time: "6:30 PM" }], tasks: [] }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Initialize/Sync week index to "today" on mount or when month is manually changed via tabs
  useEffect(() => {
    setSelectedDate(null);
    const firstDay = new Date(year, activeMonth, 1).getDay();
    const today = new Date();
    if (today.getMonth() === activeMonth && today.getFullYear() === year) {
      setActiveWeekIndex(Math.floor((firstDay + today.getDate() - 1) / 7));
      setSelectedDate(today.getDate());
    } else {
      setActiveWeekIndex(0);
    }
  }, [activeMonth, year]);

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

  const handleGoToToday = () => {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentDay = today.getDate();
    
    setSelectedDate(currentDay);
    if (activeMonth === currentMonth) {
      // Manually sync week if already in the current month
      const firstDay = new Date(year, currentMonth, 1).getDay();
      setActiveWeekIndex(Math.floor((firstDay + currentDay - 1) / 7));
    } else {
      setActiveMonth(currentMonth);
    }
  };

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
        <div className="view-header">
          <h2>{isMobile ? 'Week View' : 'Event Calendar'}</h2>
          <button className="today-btn" onClick={handleGoToToday}>Today</button>
        </div>
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
                  const today = new Date();
                  const isCurrentMonth = today.getFullYear() === year && today.getMonth() === activeMonth;
                  const days = [];
                  
                  for (let i = 0; i < firstDay; i++) days.push(<td key={`e-${i}`}></td>);
                  for (let d = 1; d <= daysInMonth; d++) {
                    const isToday = isCurrentMonth && d === today.getDate();
                    const isSelected = selectedDate === d;
                    days.push(
                      <td 
                        key={d} 
                        className={`${isToday ? 'today' : ''} ${isSelected ? 'selected-day' : ''} ${dailyEvents[`${year}-${String(activeMonth + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`] ? 'has-events' : ''}`}
                        onClick={() => { setSelectedDate(d); setIsDayModalOpen(true); }}
                      >
                        {d}
                      </td>
                    );
                  }
                  
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

      {isDayModalOpen && selectedDate && (
        <div className="modal-overlay" onClick={() => setIsDayModalOpen(false)}>
          <div className="modal-content day-detail-modal" onClick={e => e.stopPropagation()}>
            <div className="view-header">
              <h3>{months[activeMonth]} {selectedDate}, {year}</h3>
              <button className="text-link-btn" onClick={() => setIsDayModalOpen(false)}>Close</button>
            </div>
            
            {(() => {
              const dateKey = `${year}-${String(activeMonth + 1).padStart(2, '0')}-${String(selectedDate).padStart(2, '0')}`;
              const dayData = dailyEvents[dateKey];

              if (!dayData) return <p className="empty-state">No events or tasks scheduled for this day.</p>;

              return (
                <div className="day-details">
                  {dayData.gigs?.length > 0 && (
                    <div className="detail-group">
                      <h4>Gigs</h4>
                      {dayData.gigs.map((gig, i) => (
                        <div key={i} className="detail-item gig-item">
                          <strong>{gig.name}</strong>
                          <span>{gig.time} @ {gig.venue}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  {dayData.tasks?.length > 0 && (
                    <div className="detail-group">
                      <h4>Tasks</h4>
                      {dayData.tasks.map((task, i) => (
                        <div key={i} className="detail-item task-item">
                          <span className={`status-dot ${task.status.toLowerCase().replace(' ', '-')}`}></span>
                          {task.title}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;