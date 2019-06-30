import React from 'react';
import GoalItem from "./GoalItem";
import AddGoalItem from "./AddGoalItem";

class GoalList extends React.Component {

  componentDidMount() {
    this.props.fetchItems()
  }

  renderHeader = () => (
    <div className="p-3 pl-0">
      <span className="is-size-4 is-bold">{this.props.title}</span>
    </div>
  );

  checkFilters(goal) {
    const { title = '' } = goal;

    const regex = new RegExp(this.props.searchFilter, 'i');
    return !!title.match(regex)
  }

  splitChildAndParentGoals = (goals) => {
    const parentGoals = [];

    // store subgoals for each parent id
    // {parent-id-1: [{..subGoal1}, {...subGoal2}],...}
    const subGoalsByParentId = {};

    goals.forEach((goal) => {
      const parentId = goal.parent_goal;
      if (parentId) {
        subGoalsByParentId[ parentId ] = subGoalsByParentId[ parentId ] || [];
        subGoalsByParentId[ parentId ].push(goal);
      } else {
        parentGoals.push(goal)
      }
    });

    return {
      parentGoals,
      subGoalsByParentId
    }
  };

  renderListItems = () => {
    const {
      shouldRenderSubGoals,
      selectedGoal,
      onSelectGoal,
      onAddNewGoal,
      searchFilter
    } = this.props;

    let goals = this.props.goals || [];

    let {
      parentGoals,
      subGoalsByParentId
    } = this.splitChildAndParentGoals(goals);


    return parentGoals.map((goal) => {
      let subGoals = Object.values(subGoalsByParentId[ goal._id ] || {});
      subGoals = subGoals.filter(subGoal => this.checkFilters(subGoal));
      if (subGoals.length === 0 && !this.checkFilters(goal)) {
        return null;
      }

      return (
        <React.Fragment>
          <GoalItem
            key={goal._id}
            goal={goal}
            onSelect={onSelectGoal}
            searchFilter={searchFilter}
            isSelected={selectedGoal && selectedGoal._id === goal._id}
          />
          {
            shouldRenderSubGoals && subGoals.map((subGoal) => (
                <GoalItem
                  key={subGoal._id}
                  goal={subGoal}
                  onSelect={onSelectGoal}
                  isSelected={selectedGoal && selectedGoal._id === subGoal._id}
                  searchFilter={searchFilter}
                  isSubGoal
                />
              )
            ).concat([
              <AddGoalItem key={goal._id + '-add'} parentGoal={goal} onAddNewGoal={onAddNewGoal}/>
            ])
          }
        </React.Fragment>
      )
    }).concat([
      <AddGoalItem key='add' onAddNewGoal={onAddNewGoal}/>
    ])
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