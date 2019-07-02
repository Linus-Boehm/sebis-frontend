import React from 'react';

class AddGoalItem extends React.Component {

  render() {
    const {
      parentGoal,
      onAddNewGoal
    } = this.props;

    return (
      <div
        className={`mb-2 p-2 ${parentGoal ? 'ml-3' : ''} cursor-pointer bg-gray-200 hover:bg-gray-300`}
        onClick={() => {
          onAddNewGoal(parentGoal)
        }}
      >
        <span className="ml-3 text-gray-600 select-none">
          +  Add {parentGoal ? 'Subgoal' : 'Goal'}
        </span>
      </div>
    )
  }
}

export default AddGoalItem