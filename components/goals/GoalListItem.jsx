import React from 'react';

class GoalListItem extends React.Component {

  render() {
    const { title } = this.props.goal || {};
    return (
      <div className="bg-gray-200 hover:bg-gray-300 mb-2 p-1 cursor-pointer">
        <span className="ml-3">
          {title}
        </span>
      </div>
    )
  }
}

export default GoalListItem