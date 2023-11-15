// App.js
import React, { useState, useEffect } from 'react';
import DisplayOptions from './components/DisplayOptions';
import KanbanBoard from './components/KanbanBoard';

const App = () => {
  const [tickets, setTickets] = useState([]);
  const [groupOption, setGroupOption] = useState('status');
  const [sortOption, setSortOption] = useState('priority');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        // Assuming the API response has a 'tickets' property containing an array of tickets
        setTickets(data.tickets || []);
      } catch (error) {
        console.error('Error fetching data:', error.message);
        // Handle the error (e.g., show an error message to the user)
      }
    };

    fetchData();
  }, []);

  const handleGroupChange = (e) => {
    setGroupOption(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  // Implement logic to group and sort tickets based on 'groupOption' and 'sortOption'

  return (
    <div className="app">
      <h1>Kanban Board</h1>
      <DisplayOptions onGroupChange={handleGroupChange} onSortChange={handleSortChange} />
      <KanbanBoard tickets={tickets} groupOption={groupOption} sortOption={sortOption} />
    </div>
  );
};

export default App;
