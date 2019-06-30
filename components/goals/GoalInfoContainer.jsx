import React from 'react';
import { connect } from 'react-redux';
import * as GoalActions from '../../store/actions/goals';
import GoalInfo from './GoalInfo';

class GoalInfoContainer extends React.Component {

  onClose = async () => {
    this.props.dispatch(GoalActions.resetSelectedGoal())
  };

  render() {
    return (
      <GoalInfo
        {...this.props}

        onClose={this.onClose}
      />
    )
  }
}

function mapStateToProps(state) {
  const {
    selectedGoal,
  } = state.goals;

  return {
    selectedGoal,
  };
}

export default connect(mapStateToProps)(GoalInfoContainer);