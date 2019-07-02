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
  }

  onSelectGoal = async (id) => {
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

    await this.props.fetchItems();

    await this.onSelectGoal(newGoal._id)
  };

  render() {

    console.log(this.props);

    return (
      <GoalList
        onCreateGoal={this.onCreateGoal}
        onSelectGoal={this.onSelectGoal}

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