import React from 'react';
import uuidv4 from 'uuid/v4'
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

  applyGoalFilter(goals) {
    return goals.filter((goal) => this.props.filter(goal))
  }

  checkSearchFilter(goal) {
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
      disableGoalAdd,
      shouldRenderSubgoals,
      selectedGoal,
      onSelectItem,
      searchFilter,

      onCreateGoal
    } = this.props;

    let goals = this.props.goals || [];
    goals = this.applyGoalFilter(goals);

    let {
      parentGoals,
      subGoalsByParentId
    } = this.splitChildAndParentGoals(goals);


    return parentGoals.map((goal) => {
      let subGoals = Object.values(subGoalsByParentId[ goal._id ] || {});
      subGoals = subGoals.filter(subGoal => this.checkSearchFilter(subGoal));
      if (subGoals.length === 0 && !this.checkSearchFilter(goal)) {
        return null;
      }

      return (
        <React.Fragment key={"fragment-"+goal._id}>
          <GoalItem
            key={"goallist-"+goal._id}
            goal={goal}
            onSelect={onSelectItem}
            searchFilter={searchFilter}
            isSelected={selectedGoal && selectedGoal._id === goal._id}
          />
          {
            shouldRenderSubgoals && subGoals.map((subGoal) => (
                <GoalItem
                  key={"goallist-"+subGoal._id}
                  goal={subGoal}
                  onSelect={onSelectItem}
                  isSelected={selectedGoal && selectedGoal._id === subGoal._id}
                  searchFilter={searchFilter}
                  isSubGoal
                />
              )
            ).concat([
              <AddGoalItem
                key={goal._id + '-add'}
                onCreateGoal={() => {
                  onCreateGoal({
                    parent_goal: goal._id,
                    related_to: goal.related_to,
                    related_model: goal.related_model,
                    is_private: true
                  })
                }}
                isSubGoal/>
            ])
          }
        </React.Fragment>
      )
    }).concat([
      !disableGoalAdd && <AddGoalItem key={"add-new"} onCreateGoal={onCreateGoal}/>
    ])
  };

  render() {
    return (
      <div className="flex flex-col">
        <div className="flex justify-start">
          {!this.props.hideHeader && this.renderHeader()}
        </div>
        <div>
          {this.state.isOpen && this.renderListItems()}
        </div>
      </div>
    )
  }
}

export default GoalList