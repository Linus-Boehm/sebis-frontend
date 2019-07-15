import React from 'react';
import { connect } from 'react-redux';
import * as GoalActions from '../../../store/actions/goals';
import { pick } from "lodash";
import ProgressInfo from "./ProgressInfo";

class ProgressInfoContainer extends React.Component {

  onChangeInput = (changes) => {
    const { selectedGoal } = this.props;

    this.props.dispatch(GoalActions.assignSelectedGoal({
      ...selectedGoal,
      ...changes
    }))
  };

  onUpdateGoal = async () => {
    const { selectedGoal } = this.props;

    await this.props.dispatch(GoalActions.updateGoal(selectedGoal))

    const goal = Object.values(pick(this.props.allGoals, selectedGoal._id))[ 0 ];
    await this.props.dispatch(GoalActions.assignSelectedGoal(goal))
  };

  render() {
    return (
      <ProgressInfo
        onUpdateGoal={this.onUpdateGoal}
        onChangeInput={this.onChangeInput}

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

  const {
    agreements
  } = state.agreements;

  return {
    selectedGoal,
    agreements,
    allGoals: goals
  };
}

export default connect(mapStateToProps)(ProgressInfoContainer);
