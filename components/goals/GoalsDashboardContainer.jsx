import React from 'react';
import { connect } from 'react-redux';
import * as GoalActions from '../../store/actions/goals';
import GoalsDashboard from './GoalsDashboard';
import { fetchTeams } from "../../store/actions/teams";

class GoalsDashboardContainer extends React.Component {

  fetchAssignedGoals = async () => {
    try {
      await this.props.dispatch(GoalActions.fetchAllAssignedGoals())
    } catch (e) {
      console.log(e);
    }
  };

  fetchTeamGoals = async (teamId) => {
    try {
      await this.props.dispatch(GoalActions.fetchTeamGoals(teamId))
    } catch (e) {
      console.log(e);
    }
  };

  fetchOrganizationGoals = async () => {
    try {
      await this.props.dispatch(GoalActions.fetchAllOrganizationGoals())
    } catch (e) {
      console.log(e);
    }
  };

  // ---

  async componentDidMount() {
    try {
      await this.props.dispatch(fetchTeams());
    } catch (e) {
      console.log(e);
    }
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
    fetches,

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

    fetches,

    teams: Object.values(teamList),
    user
  };
}

export default connect(mapStateToProps)(GoalsDashboardContainer);