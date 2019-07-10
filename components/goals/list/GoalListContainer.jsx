import React from 'react';
import uuidv4 from 'uuid/v4'
import { connect } from "react-redux";
import GoalList from "./GoalList";
import * as GoalActions from "../../../store/actions/goals";
import { pick } from "lodash";

class GoalListContainer extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      isOpen: true
    }
  }

  componentDidMount() {
    this.props.fetchItems()


    if (this.props.fetchInterval) {
      setInterval(() => {
        this.props.fetchItems()
      }, this.props.fetchInterval)
    }
  }

  onSelectItem = async (id) => {
    const goal = Object.values(pick(this.props.allGoals, id))[ 0 ];

    return this.props.dispatch(GoalActions.assignSelectedGoal(goal))
  };

  onCreateGoal = async ({ parentGoalId }) => {
    const { newGoalTemplate } = this.props;

    const newGoal = {
      _id: uuidv4(),
      parent_goal: parentGoalId,

      ...newGoalTemplate,
    };

    await this.props.dispatch(GoalActions.createGoal(newGoal));

    await this.onSelectItem(newGoal._id)
  };

  render() {

    return (
      <GoalList
        onCreateGoal={this.onCreateGoal}
        onSelectGoal={this.onSelectItem}
        goals={Object.values(this.props.allGoals)}
        filter={() => true}

        {...this.props}
      />
    )
  }
}

function mapStateToProps(state) {
  const {
    selectedGoal,
    goals
  } = state.goals;

  return {
    allGoals: goals,
    selectedGoal,
  };
}

export default connect(mapStateToProps)(GoalListContainer);