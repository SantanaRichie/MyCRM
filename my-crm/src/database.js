const DB_KEY = 'artist_crm_flat_db';

const seedData = {
  users: [
    { username: 'admin', password: 'pwd' }
  ],
  projects: [
    {
      id: 'proj-1',
      title: 'Album Release: "Echoes of the Void"',
      description: 'Manage all tasks related to the new album launch.',
      tasks: [
        { id: 'task-1', projectId: 'proj-1', title: 'Final Mix & Master', assignee: 'Studio Engineer', status: 'In Progress', dueDate: '2024-05-10' },
        { id: 'task-2', projectId: 'proj-1', title: 'Artwork Design', assignee: 'Graphic Artist', status: 'To Do', dueDate: '2024-05-15' },
        { id: 'task-3', projectId: 'proj-1', title: 'Distributor Upload', assignee: 'Manager', status: 'To Do', dueDate: '2024-05-20' },
        { id: 'task-4', projectId: 'proj-1', title: 'Press Release Draft', assignee: 'Publicist', status: 'Done', dueDate: '2024-04-25' },
      ],
    },
    {
      id: 'proj-2',
      title: 'Summer Tour Planning',
      description: 'Organize logistics for the upcoming summer concert series.',
      tasks: [
        { id: 'task-5', projectId: 'proj-2', title: 'Venue Booking', assignee: 'Agent', status: 'In Progress', dueDate: '2024-06-01' },
        { id: 'task-6', projectId: 'proj-2', title: 'Travel Arrangements', assignee: 'Tour Manager', status: 'To Do', dueDate: '2024-06-10' },
      ],
    },
  ],
  retention: [
    { id: 1, name: "Sarah Jenkins", lastGig: "2024-03-10", totalGigs: 8, status: "Loyal", health: 95, value: "$12,400", rebookCycle: 35 },
    { id: 2, name: "Marcus Thorne", lastGig: "2024-01-15", totalGigs: 2, status: "At Risk", health: 45, value: "$3,200", rebookCycle: 120 },
    { id: 3, name: "EventCorp", lastGig: "2023-11-20", totalGigs: 1, status: "Ghosting", health: 15, value: "$1,500", rebookCycle: 210 },
    { id: 4, name: "Global Gigs", lastGig: "2024-04-01", totalGigs: 12, status: "Loyal", health: 98, value: "$25,000", rebookCycle: 28 },
    { id: 5, name: "Vibe Festival", lastGig: "2024-02-28", totalGigs: 4, status: "Loyal", health: 88, value: "$8,500", rebookCycle: 90 },
    { id: 6, name: "Sonic Boom Agency", lastGig: "2024-05-12", totalGigs: 15, status: "Loyal", health: 99, value: "$32,000", rebookCycle: 21 },
    { id: 7, name: "City Lounge", lastGig: "2023-12-05", totalGigs: 3, status: "At Risk", health: 55, value: "$2,100", rebookCycle: 155 },
    { id: 8, name: "Underground Sounds", lastGig: "2023-08-15", totalGigs: 1, status: "Ghosting", health: 10, value: "$900", rebookCycle: 320 }
  ]
};

export const database = {
  getData: () => {
    const stored = localStorage.getItem(DB_KEY);
    let data = stored ? JSON.parse(stored) : { ...seedData };

    // Ensure all seed data keys exist (handles migrations for new features)
    let changed = false;
    Object.keys(seedData).forEach(key => {
      if (!data[key]) {
        data[key] = seedData[key];
        changed = true;
      }
    });

    if (changed || !stored) {
      localStorage.setItem(DB_KEY, JSON.stringify(data));
    }
    return data;
  },
  saveData: (data) => {
    localStorage.setItem(DB_KEY, JSON.stringify(data));
  }
};