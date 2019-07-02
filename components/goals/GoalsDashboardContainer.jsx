import React from 'react';
import { connect } from 'react-redux';
import * as GoalActions from '../../store/actions/goals';
import { pick } from 'lodash';
import GoalsDashboard from './GoalsDashboard';
import { fetchTeams } from "../../store/actions/teams";

class GoalsDashboardContainer extends React.Component {

  fetchAssignedGoals = async () => {
    return this.props.dispatch(GoalActions.fetchAllAssignedGoals())
  };

  fetchTeamGoals = async () => {
    return this.props.dispatch(GoalActions.fetchAllTeamGoals())
  };

  fetchOrganizationGoals = async () => {
    return this.props.dispatch(GoalActions.fetchAllOrganizationGoals())
  };

  // ---

  async componentDidMount() {
    await this.props.dispatch(fetchTeams());
  }

  render() {
    return (
      <GoalsDashboard
        {...this.props}

        fetchAssignedGoals={this.fetchAssignedGoals}
        fetchTeamGoals={this.fetchTeamGoals}
        fetchOrganizationGoals={this.fetchOrganizationGoals}

        onSelectGoal={this.onSelectGoal}
        onCreateGoal={this.onCreateGoal}
      />
    )
  }
}

function mapStateToProps(state) {
  const {
    goals,
    selectedGoal,
    assignedGoals,
    teamGoals,
    organizationGoals

  } = state.goals;

  const {
    teamList
  } = state.teams;

  const {
    user
  } = state.auth;

  return {
    goals,
    selectedGoal,

    // views
    assignedGoals: Object.values(pick(goals, assignedGoals.ids)),
    teamGoals: Object.values(pick(goals, teamGoals.ids)),
    organizationGoals: Object.values(pick(goals, organizationGoals.ids)),

    teams: Object.values(teamList),
    user
  };
}

export default connect(mapStateToProps)(GoalsDashboardContainer);