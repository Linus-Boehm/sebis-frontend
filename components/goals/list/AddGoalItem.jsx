import React from 'react';

class AddGoalItem extends React.Component {

  render() {
    const {
      parentGoal,
      onCreateGoal
    } = this.props;

    const parentGoalId = parentGoal ? parentGoal._id : null;

    return (
      <div
        className={`mb-2 p-2 ${parentGoal ? 'ml-3' : ''} cursor-pointer bg-gray-200 hover:bg-gray-300`}
        onClick={() => {
          const options = { parentGoalId };
          onCreateGoal(options)
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