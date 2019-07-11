import React from 'react';
import { connect } from "react-redux";
import GoalList from "./GoalListContainer";
import * as GoalActions from "../../../store/actions/goals";

class AgreementGoalsList extends React.Component {

  fetchAgreementGoals = async (agreementId) => {
    try {
      await this.props.dispatch(GoalActions.fetchAgreementGoals(agreementId))
    } catch (e) {
      console.log(e);
    }
  };

  render() {

    const {
      fetches,

      agreement = {}
    } = this.props;

    // Used to filter outdated/stale goals in store
    const lastFetchTime = (fetches[ `agreement-${agreement._id}` ] || {}).assignedAt;

    return (
      agreement._id ?
        <GoalList
          title={"Goals"}

          fetchItems={() => {
            this.fetchAgreementGoals(agreement._id)
          }}

          filter={(goal) => (
            goal.assignedAt >= lastFetchTime &&
            goal.related_to && goal.related_to === agreement._id
          )}

          newGoalTemplate={{
            related_model: 'ObjectiveAgreement',
            related_to: agreement._id
          }}

          shouldRenderSubgoals
        /> : null
    )
  }
}

function mapStateToProps(state) {
  const {
    fetches
  } = state.goals;

  return {
    fetches
  };
}

export default connect(mapStateToProps)(AgreementGoalsList);