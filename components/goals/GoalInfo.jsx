import React from 'react';
import SearchInput from '../../components/utils/inputs/SearchInput'
import GoalList from "./list/GoalList";

class GoalsDashboard extends React.Component {

  render() {
    const {
      selectedGoal,
      onClose
    } = this.props;

    const {
      title,
      description
    } = selectedGoal;

    return (
      <div className="w-full h-full">
        <div className="flex justify-end">
          <span className="text-blue-400 is-size-6 cursor-pointer" onClick={onClose}>Close</span>
        </div>
        <div className="pt-2">
          <span className="is-size-4 is-bold">{title}</span>
        </div>
          <div className="pt-2">
              { description ?
                  (<span className="is-size-6 is-bold">{description}</span>) :
                  (<span className="is-size-6 is-bold text-gray-500">Add description...</span>)
              }
          </div>
        <div className="p-3">
          <span>{JSON.stringify(selectedGoal)}</span>
        </div>
      </div>
    )
  }
}

export default GoalsDashboard