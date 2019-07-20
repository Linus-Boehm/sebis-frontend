import React from 'react';
import { connect } from 'react-redux';
import * as GoalActions from '../../store/actions/goals';
import GoalInfo from './GoalInfo';
import { pick } from "lodash";
import * as CommentActions from "../../store/actions/comments";
import * as AgreementActions from "../../store/actions/agreements";

class GoalInfoContainer extends React.Component {

  onChangeInput = (changes) => {
    const { selectedGoal } = this.props;

    this.props.dispatch(GoalActions.assignSelectedGoal({
      ...selectedGoal,
      ...changes
    }))
  };

  componentDidMount() {
    this.interval = setInterval(() => {
      const { selectedGoal } = this.props;

      if (selectedGoal && selectedGoal._id) {
        this.props.dispatch(CommentActions.fetchComments(selectedGoal._id));
      }
    }, 10000);
  }

  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval)
    }
  }

  onUpdateGoal = async (e) => {
    const { selectedGoal } = this.props;

    await this.props.dispatch(GoalActions.updateGoal(selectedGoal));

    const agreement = this.props.agreements[ selectedGoal.related_to ];

    if (!selectedGoal.parent_goal &&
      selectedGoal.related_to &&
      selectedGoal.related_model === 'ObjectiveAgreement' &&
      agreement && !(agreement.reviewer_confirmed && agreement.assignee_confirmed)
    ) {
      await this.props.dispatch(AgreementActions.updateAgreement({
          _id: agreement._id,
          reviewer_confirmed: false,
          assignee_confirmed: false
        })
      )
    }
  };

  onSelectGoal = id => {
    const goal = this.props.allGoals[ id ];
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
        agreementMode={this.props.agreementMode}

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
    agreements,
    selectedAgreement
  } = state.agreements;

  const {
    user
  } = state.auth;

  return {
    selectedGoal,
    selectedAgreement,
    allGoals: goals,
    agreements: agreements,
    currentUser: user
  };
}

export default connect(mapStateToProps)(GoalInfoContainer);