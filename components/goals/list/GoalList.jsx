import React from 'react';
import ChevronDownIcon from 'mdi-react/ChevronDownIcon'
import ChevronUpIcon from 'mdi-react/ChevronUpIcon'
import GoalItem from "./GoalItem";
import AddGoalItem from "./AddGoalItem";

class GoalList extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      isOpen: true
    }
  }

  componentDidMount() {
    this.props.fetchItems()
  }

  onClickHeader = () => {
    this.setState({ isOpen: !this.state.isOpen })
  };

  renderHeader = () => (
    <div
      className="flex p-3 pl-0 is-size-4 font-bold cursor-pointer select-none hover:text-black"
      onClick={this.onClickHeader}
    >
      <div className="flex items-center mr-1">
        {this.state.isOpen ? <ChevronDownIcon/> : <ChevronUpIcon/>}
      </div>
      <div>{this.props.title}</div>
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
        <div class="flex justify-start">
          {this.renderHeader()}
        </div>
        <div>
          {this.state.isOpen && this.renderListItems()}
        </div>
      </div>
    )
  }
}

export default GoalList