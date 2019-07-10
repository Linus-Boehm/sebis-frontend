import React from 'react';

class AddGoalItem extends React.Component {

  render() {
    const {
      isSubGoal,
      onCreateGoal
    } = this.props;

    return (
      <div
        className={`mb-2 p-2 ${isSubGoal ? 'ml-3' : ''} cursor-pointer bg-gray-200 hover:bg-gray-300`}
        onClick={() => {
          onCreateGoal()
        }}
      >
        <span className="ml-3 text-gray-600 select-none">
          +  Add {isSubGoal ? 'Subgoal' : 'Goal'}
        </span>
      </div>
    )
  }
}

export default AddGoalItem