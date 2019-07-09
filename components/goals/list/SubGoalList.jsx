import React from 'react';
import GoalItem from "./GoalItem";
import * as CommentActions from "../../../store/actions/comments";
import * as GoalActions from "../../../store/actions/goals";

class SubGoalList extends React.Component {

  findSubgoals() {
    const subgoals = [];
    if(this.props.allGoals) {
      for(let i in this.props.allGoals) {
        if(this.props.allGoals.hasOwnProperty(i)) {
          let goal = this.props.allGoals[i];
          if (goal.parent_goal === this.props.parentGoal._id) {
            subgoals.push(goal);
          }
        }
      }
    }
    return subgoals;
  }

  onSelectGoal = id => {
    this.props.dispatch(CommentActions.fetchComments(id));
    return this.props.dispatch(GoalActions.assignSelectedGoal(this.props.allGoals[id]));
  };

  render() {
    return this.findSubgoals().length > 0 &&
        <div className={this.props.className}>
          <h3 className="goal-info-subheader">Subgoals</h3>
          {
            this.findSubgoals().map((goal) => {
              return <GoalItem goal={goal} onSelect={this.onSelectGoal} />
            })
          }
        </div>
  }
}

export default SubGoalList;
