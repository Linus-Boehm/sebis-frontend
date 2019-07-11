import React from 'react';

// yyyy-mm-dd
function formatDate(date) {
  return new Date(date.getTime() - (date.getTimezoneOffset() * 60000))
    .toISOString()
    .split("T")[ 0 ];
}

export default ({ agreement, assignee }) => {
  let title = 'Objective agreement:';

  if (assignee && assignee.firstname && assignee.lastname) {
    title += ` ${assignee.firstname} ${assignee.lastname}`;
  } else {
    title += ' unassigned'
  }

  if (agreement.start_date) {
    const startDate = new Date(agreement.start_date);
    title += ` ${formatDate(startDate)}`;
  }

  return title
}
