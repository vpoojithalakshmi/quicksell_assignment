import React from 'react';
import TicketCard from './TicketCard';
import './KanbanBoard.css';

const KanbanBoard = ({ tickets, groupOption, sortOption }) => {
  // Group and sort the tickets based on user selection
  const groupedAndSortedTickets = groupAndSortTickets(tickets, groupOption, sortOption);

  return (
    <div className="kanban-board">
      {/* Render columns based on grouped and sorted tickets */}
      {groupedAndSortedTickets.map((column) => (
        <div key={column.groupName} className="kanban-column">
          <h2 className="column-heading">
            {getHeadingText(column.groupName)}{' '}
            <span className="group-count">{column.tickets.length}</span>
          </h2>
          {/* Render TicketCards in the column */}
          {column.tickets.map((ticket) => (
            <TicketCard key={ticket.id} ticket={ticket} />
          ))}
        </div>
      ))}
    </div>
  );
};

// Function to group and sort tickets based on user selection
const groupAndSortTickets = (tickets, groupOption, sortOption) => {
  let groupedTickets = [];

  // Group tickets based on the selected option
  switch (groupOption) {
    case 'status':
      groupedTickets = groupByStatus(tickets);
      break;
    case 'user':
      groupedTickets = groupByUser(tickets);
      break;
    case 'priority':
      groupedTickets = groupByPriority(tickets);
      break;
    default:
      // Default to grouping by status if no valid option is selected
      groupedTickets = groupByStatus(tickets);
  }

  // Sort tickets within each group based on the selected option
  groupedTickets.forEach((group) => {
    group.tickets.sort((a, b) => {
      if (sortOption === 'priority') {
        return b.priority - a.priority;
      } else if (sortOption === 'title') {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });
  });

  return groupedTickets;
};

// Function to group tickets by status
const groupByStatus = (tickets) => {
  const grouped = {};
  tickets.forEach((ticket) => {
    if (!grouped[ticket.status]) {
      grouped[ticket.status] = { groupName: ticket.status, tickets: [] };
    }
    grouped[ticket.status].tickets.push(ticket);
  });
  return Object.values(grouped);
};

// Function to group tickets by user
const groupByUser = (tickets) => {
  const grouped = {};
  tickets.forEach((ticket) => {
    if (!grouped[ticket.userId]) {
      grouped[ticket.userId] = { groupName: ticket.userId, tickets: [] };
    }
    grouped[ticket.userId].tickets.push(ticket);
  });
  return Object.values(grouped);
};

// Function to group tickets by priority
const groupByPriority = (tickets) => {
  const grouped = {};
  tickets.forEach((ticket) => {
    const priorityGroup = `Priority ${ticket.priority}`;
    if (!grouped[priorityGroup]) {
      grouped[priorityGroup] = { groupName: priorityGroup, tickets: [] };
    }
    grouped[priorityGroup].tickets.push(ticket);
  });
  return Object.values(grouped);
};

// Function to get heading text based on mapped values
const getHeadingText = (groupName) => {
  const priorityMap = {
    'Priority 4': 'Urgent 4',
    'Priority 3': 'High 3',
    'Priority 2': 'Medium 2',
    'Priority 1': 'Low 1',
    'Priority 0': 'No priority',
  };

  return priorityMap[groupName] || groupName;
};

export default KanbanBoard;
