import React from 'react';
import GoalListItem from "./GoalListItem";

class GoalList extends React.Component {

  componentDidMount() {
    this.props.fetchItems()
  }

  renderHeader = () => (
    <div className="p-3 pl-0">
      <span className="is-size-4 is-bold">{this.props.title}</span>
    </div>
  );

  renderListItems = () => {
    const goals = this.props.goals || [];
    if (goals.length === 0)
      return <span className="pl-2 is-size-6">The list is empty</span>

    return goals.map(goal => <GoalListItem key={goal._id} goal={goal}/>)
  };

  render() {

    return (
      <div className="flex flex-col w-full">
        <div>
          {this.renderHeader()}
        </div>
        <div>
          {this.renderListItems()}
        </div>
      </div>
    )
  }
}

export default GoalList