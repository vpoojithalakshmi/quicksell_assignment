import React from 'react';
import './TicketCard.css';

const TicketCard = ({ ticket, groupOption }) => {
  return (
    <div className="ticket-card">
      {/* Displaying ticket ID in the top-left corner with lighter font */}
      <div className="ticket-id">{`${ticket.id}`}</div>
      {/* User icon in the top-right corner */}
      <div className="user-icon">{getInitials(ticket.userId)}</div>
      <h3>{ticket.title}</h3>
      {/* Displaying tag or status based on the group option */}
      {groupOption === 'priority' ? (
        <p>
          Tag: {ticket.tag.length > 0 ? ticket.tag[0] : 'No Tag'}
        </p>
      ) : 
        null
      }
      {/* Add the "Feature Request" tag in the bottom-left corner */}
      <div className="feature-tag">Feature Request</div>
      {/* Remove the status display */}
      {/* Add more details as needed */}
    </div>
  );
};

// Function to get initials from user ID
const getInitials = (userId) => {
  return userId.split('-').map((part) => part[0]).join('');
};

export default TicketCard;
