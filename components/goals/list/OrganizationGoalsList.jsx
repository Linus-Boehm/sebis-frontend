import React from 'react';
import { connect } from "react-redux";
import GoalList from "./GoalListContainer";
import * as GoalActions from "../../../store/actions/goals";

class OrganizationGoalsList extends React.Component {

  fetchOrganizationGoals = async () => {
    try {
      await this.props.dispatch(GoalActions.fetchAllOrganizationGoals())
    } catch (e) {
      console.log(e);
    }
  };


  render() {

    const {
      fetches,

      user = {}
    } = this.props;

    const organizationId = (user || {}).organization_id;

    // Used to filter outdated/stale goals in store
    const lastFetchTime = (fetches[ 'organization' ] || {}).assignedAt || new Date();

    return (
      <GoalList
        title={"Organization Goals"}

        fetchItems={() => {
          this.fetchOrganizationGoals()
        }}

        filter={(goal) => (
          goal.assignedAt >= lastFetchTime &&
          goal.related_to === organizationId
        )}

        newGoalTemplate={{
          related_model: 'Organization',
          related_to: organizationId
        }}

      />
    )
  }
}

function mapStateToProps(state) {
  const {
    fetches
  } = state.goals;

  const {
    user
  } = state.users;

  return {
    fetches,
    user
  };
}

export default connect(mapStateToProps)(OrganizationGoalsList);