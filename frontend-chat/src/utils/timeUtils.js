// Utility functions for formatting timestamps

export const formatMessageTime = (timestamp) => {
  if (!timestamp) return '';
  
  const date = new Date(timestamp);
  const now = new Date();
  const diffInHours = (now - date) / (1000 * 60 * 60);
  
  // If message is from today, show only time
  if (date.toDateString() === now.toDateString()) {
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  }
  
  // If message is from yesterday, show "Yesterday" and time
  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  if (date.toDateString() === yesterday.toDateString()) {
    return `Yesterday ${date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    })}`;
  }
  
  // If message is from this week, show day name and time
  if (diffInHours < 168) { // 7 days * 24 hours
    return `${date.toLocaleDateString('en-US', { weekday: 'short' })} ${date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    })}`;
  }
  
  // If message is older, show date and time
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric' 
  }) + ' ' + date.toLocaleTimeString('en-US', { 
    hour: 'numeric', 
    minute: '2-digit',
    hour12: true 
  });
};

export const formatConversationTime = (timestamp) => {
  if (!timestamp) return '';
  
  const date = new Date(timestamp);
  const now = new Date();
  const diffInHours = (now - date) / (1000 * 60 * 60);
  
  // If message is from today, show only time
  if (date.toDateString() === now.toDateString()) {
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  }
  
  // If message is from yesterday, show "Yesterday"
  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  if (date.toDateString() === yesterday.toDateString()) {
    return 'Yesterday';
  }
  
  // If message is from this week, show day name
  if (diffInHours < 168) { // 7 days * 24 hours
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  }
  
  // If message is older, show date
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric' 
  });
}; 