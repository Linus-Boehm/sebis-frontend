import React from 'react';

class GoalItem extends React.Component {

  render() {
    const {
      goal,
      isSubGoal,
      onSelect,
      isSelected
    } = this.props;

    const {
      title
    } = goal || {};

    return (
      <div
        className={`bg-gray-200 hover:bg-gray-300 mb-2 p-2 cursor-pointer
         ${isSubGoal ? 'ml-3' : ''}
         ${isSelected ? 'bg-blue-300 hover:bg-blue-300' : ''}
        `}
        onClick={() => {
          onSelect(goal._id)
        }}
      >
        <span className="ml-3">
          {title}
        </span>
      </div>
    )
  }
}

export default GoalItem