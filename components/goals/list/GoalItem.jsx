import React from 'react';

class GoalItem extends React.Component {

  highlightByFilter = (text, filter) => {
    if (filter === '')
      return <span>{text}</span>

    const regex = new RegExp(filter, 'ig');
    const parts = text.split(regex);
    const matches = text.match(regex);

    console.log(JSON.stringify(matches) + ' ' + JSON.stringify(parts))

    return parts.map((part, i) => [
      <span>{part}</span>,
      matches && matches[ i ] && matches[ i ] !== ''
        ? <span className="font-bold">{matches[ i ]}</span>
        : null
    ]);
  };


  render() {
    const {
      goal,
      isSubGoal,
      onSelect,
      isSelected,
      searchFilter
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
          {this.highlightByFilter(title, searchFilter)}
        </span>
      </div>
    )
  }
}

export default GoalItem