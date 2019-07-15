import React from 'react';
import { connect } from 'react-redux';
import * as GoalActions from '../../store/actions/goals';
import GoalInfo from './GoalInfo';
import { pick } from "lodash";
import * as AgreementActions from "../../store/actions/agreements";
import * as CommentActions from "../../store/actions/comments";

class GoalInfoContainer extends React.Component {

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

  onSelectGoal = id => {
    const goal = this.props.allGoals[id];
    return this.props.dispatch(
      GoalActions.assignSelectedGoal(goal)
    );
  };

  onDeleteGoal = async () => {
    const { selectedGoal } = this.props;

    await this.props.dispatch(GoalActions.deleteGoal(selectedGoal));

    await this.onClose()
  };

  onClose = async () => {
    return this.props.dispatch(GoalActions.resetSelectedGoal())
  };

  render() {
    return (
      <GoalInfo
        onUpdateGoal={this.onUpdateGoal}
        onClose={this.onClose}
        onChangeInput={this.onChangeInput}
        onDeleteGoal={this.onDeleteGoal}
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

  const {
    agreements
  } = state.agreements;

  return {
    selectedGoal,
    allGoals: goals,
    agreements: agreements
  };
}

export default connect(mapStateToProps)(GoalInfoContainer);